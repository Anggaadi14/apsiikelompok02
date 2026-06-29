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
      users,
      mahasiswa: mhs?.map(m => ({
        ...m,
        grade_count: counts[m.id_mahasiswa] || 0
      })).filter(m => counts[m.id_mahasiswa] > 0 || m.nim === 'I0323042' || m.nim === 'I0325024'),
      tahun_akademik: ta,
      errors: {
        userErr,
        mhsErr,
        gradeErr,
        enrollErr
      }
    })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message })
  }
}
