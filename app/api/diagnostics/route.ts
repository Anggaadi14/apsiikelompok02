// app/api/diagnostics/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '@/app/lib/supabase/admin'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const admin = createSupabaseAdminClient()

    // 1. Get all app_user rows
    const { data: users, error: userErr } = await admin
      .from('app_user')
      .select('id_user, email, role, status, id_mahasiswa, nama_input')
    
    // 2. Get all mahasiswa rows
    const { data: mhs, error: mhsErr } = await admin
      .from('mahasiswa')
      .select('id_mahasiswa, nim, nama_mahasiswa, email_sso, angkatan')

    // 3. Get count of grades in nilai_detail grouped by id_mahasiswa
    const { data: gradeCounts, error: gradeErr } = await admin
      .from('nilai_detail')
      .select('id_mahasiswa')
    
    const counts: Record<number, number> = {}
    if (gradeCounts) {
      for (const g of gradeCounts) {
        counts[g.id_mahasiswa] = (counts[g.id_mahasiswa] || 0) + 1
      }
    }

    // Get a sample of 10 rows from nilai_detail
    const { data: gradeSample } = await admin
      .from('nilai_detail')
      .select('*')
      .limit(10)

    // Check enrollments for Ferizki (663) and Riswanto (25)
    const { data: enrollments, error: enrollErr } = await admin
      .from('mahasiswa_kelas')
      .select('id_kelas, id_mahasiswa')
      .in('id_mahasiswa', [25, 663])

    // Fetch data_bermasalah records
    const { data: dataBermasalah } = await admin
      .from('data_bermasalah')
      .select('*')
      .limit(50)

    // Fetch upload_log_nilai records
    const { data: uploadLogs } = await admin
      .from('upload_log_nilai')
      .select('*')
      .order('uploaded_at', { ascending: false })

    // Fetch kelas_mk joined with mata_kuliah
    const { data: classes, error: classesErr } = await admin
      .from('kelas_mk')
      .select(`
        id_kelas,
        id_mata_kuliah,
        tahun_akademik,
        semester,
        kode_kelas,
        mata_kuliah:id_mata_kuliah ( kode_mk, nama_mk )
      `)

    // Fetch Fisika I and Analitika Data courses and their CPMK and mappings
    const { data: targetCourses } = await admin
      .from('mata_kuliah')
      .select(`
        id_mata_kuliah,
        kode_mk,
        nama_mk,
        cpmk (
          id_cpmk,
          kode_cpmk,
          deskripsi_id,
          mapping_cpmk_ik (
            id_ik,
            bobot_percent:bobot_persen,
            indikator_kinerja:id_ik (
              kode_ik,
              id_cpl,
              cpl:id_cpl ( kode_cpl )
            )
          )
        )
      `)
      .or('nama_mk.ilike.%fisika%,nama_mk.ilike.%analitika%')

    // Fetch mapping_media_cpmk for Analitika Data CPMKs
    const { data: mediaCpmk, error: mediaCpmkErr } = await admin
      .from('mapping_media_cpmk')
      .select(`
        id_mapping,
        id_cpmk,
        id_komponen,
        bobot_persen
      `)
      .in('id_cpmk', [35, 36, 37])

    // 4. Get active academic years
    const { data: ta } = await admin
      .from('tahun_akademik')
      .select('*')

    return NextResponse.json({
      success: true,
      total_grades_count: gradeCounts?.length || 0,
      unique_students_with_grades: Object.keys(counts).map(Number),
      grade_sample: gradeSample,
      enrollments,
      data_bermasalah: dataBermasalah,
      upload_logs: uploadLogs,
      classes,
      target_courses: targetCourses,
      media_cpmk: mediaCpmk,
      users,
      mahasiswa: mhs?.map(m => ({
        ...m,
        grade_count: counts[m.id_mahasiswa] || 0
      })).filter(m => 
        counts[m.id_mahasiswa] > 0 || 
        m.nim === 'I0323042' || 
        m.nim === 'I0325024' ||
        m.nama_mahasiswa.toLowerCase().includes('angga') ||
        m.nama_mahasiswa.toLowerCase().includes('ferizki') ||
        m.nama_mahasiswa.toLowerCase().includes('riswanto')
      ),
      tahun_akademik: ta,
      errors: {
        userErr,
        mhsErr,
        gradeErr,
        enrollErr,
        classesErr,
        mediaCpmkErr
      }
    })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message })
  }
}
