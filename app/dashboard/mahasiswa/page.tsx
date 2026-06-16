'use client';
// app/dashboard/mahasiswa/page.tsx
//
// PERUBAHAN dari Tahap 2:
//   - cplData, detailCPL TIDAK lagi dari data.ts
//   - Keduanya sekarang di-fetch dari API:
//       GET /api/mahasiswa/cpl → cplData + detailCpl
//   - data.ts tetap ada sebagai fallback jika API gagal (development safety)
//   - Loading state per tab (dashboard, cpl) ditambahkan
//   - <CplView /> sekarang menerima prop `profile` agar kartu profil di tab
//     Report tidak lagi hardcode "Ahmad Fadli / 3.75".
//   - Tab "Riwayat Nilai" dihapus (sudah tercover di tab Detail CPL).

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import ProfileCard from './components/ProfileCard';
import DashboardView from './components/DashboardView';
import CplView from './components/CplView';
// Fallback jika API gagal (hanya untuk development)
import {
  cplData as cplDataFallback,
  detailCPL as detailCPLFallback,
} from './data';
import { Home, Award } from 'lucide-react';
import { UserSession } from '../../data/users';
import { CplDataItem, DetailCplItem } from './data';

// ─────────────────────────────────────────────
// Tipe data dari API
// ─────────────────────────────────────────────
interface ProfileData {
  nim: string;
  nama_mahasiswa: string;
  angkatan: number;
  semester_aktif: number;
  ipk: number;
  prodi: string;
}

type JsPdfWithAutoTable = { lastAutoTable?: { finalY?: number } };
