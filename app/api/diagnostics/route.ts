// app/api/diagnostics/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '@/app/lib/supabase/admin'

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

    // 4. Get active academic years
    const { data: ta } = await admin
      .from('tahun_akademik')
      .select('*')

    return NextResponse.json({
      success: true,
      users,
      mahasiswa: mhs?.map(m => ({
        ...m,
        grade_count: counts[m.id_mahasiswa] || 0
      })),
      tahun_akademik: ta,
      errors: {
        userErr,
        mhsErr,
        gradeErr
      }
    })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message })
  }
}
