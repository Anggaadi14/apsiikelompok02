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

// ─────────────────────────────────────────────
// Komponen loading
// ─────────────────────────────────────────────
function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-gray-500 font-bold tracking-wider uppercase mt-4">
          Memverifikasi Sesi...
        </p>
      </div>
    </div>
  );
}

// Loading placeholder untuk konten tab
function TabLoading({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-4">
      <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-gray-400 font-semibold">{message}</p>
    </div>
  );
}

// ─────────────────────────────────────────────
// Komponen utama
// ─────────────────────────────────────────────
export default function MahasiswaDashboard() {
  const router = useRouter();

  // State: navigasi
  const [activeTab, setActiveTab]               = useState<'dashboard' | 'cpl'>('dashboard');
  const [selectedSemester, setSelectedSemester] = useState('Ganjil 2024/2025');

  // State: session
  const [sessionUser, setSessionUser]           = useState<UserSession | null>(null);

  // State: data profil (dari Tahap 2)
  const [profile, setProfile]                   = useState<ProfileData | null>(null);
  const [profileLoading, setProfileLoading]     = useState(false);
  const [profileError, setProfileError]         = useState<string | null>(null);

  // State: daftar semester (dari Tahap 2)
  const [availableSemesters, setAvailableSemesters] = useState<string[]>(['Ganjil 2024/2025']);

  // State: CPL data (BARU di Tahap 3)
  const [cplData, setCplData]                   = useState<CplDataItem[]>(cplDataFallback);
  const [detailCpl, setDetailCpl]               = useState<DetailCplItem[]>(detailCPLFallback);
  const [cplLoading, setCplLoading]             = useState(false);
  const [cplError, setCplError]                 = useState<string | null>(null);

  // ── Auth Guard ──────────────────────────────────────────────────────────
  useEffect(() => {
    const rawUser = sessionStorage.getItem('currentUser');
    if (!rawUser) {
      router.push('/');
      return;
    }
    try {
      const userObj = JSON.parse(rawUser) as UserSession;
      if (userObj.role !== 'mahasiswa') {
        router.push(`/dashboard/${userObj.role}`);
      } else {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSessionUser(userObj);
      }
    } catch {
      router.push('/');
    }
  }, [router]);

  // ── Helper fetch dengan session header ─────────────────────────────────
  const fetchWithSession = useCallback(
    async (url: string) => {
      if (!sessionUser) throw new Error('Session belum tersedia');
      const res = await fetch(url, {
        headers: {
          'X-User-Session': JSON.stringify(sessionUser),
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.message ?? `HTTP ${res.status}`);
      }
      return res.json();
    },
    [sessionUser]
  );

  // ── Fetch semua data setelah session tersedia ──────────────────────────
  useEffect(() => {
    if (!sessionUser) return;

    // Profile (sama dengan Tahap 2)
    const loadProfile = async () => {
      setProfileLoading(true);
      setProfileError(null);
      try {
        const result = await fetchWithSession('/api/mahasiswa/profile');
        setProfile(result.data as ProfileData);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Gagal memuat profil';
        setProfileError(msg);
        console.error('[Dashboard] fetch profile error:', err);
      } finally {
        setProfileLoading(false);
      }
    };

    // Semester (sama dengan Tahap 2)
    const loadSemesters = async () => {
      try {
        const result = await fetchWithSession('/api/mahasiswa/semester');
        const semesters = result.data as string[];
        if (semesters.length > 0) {
          setAvailableSemesters(semesters);
          setSelectedSemester(semesters[0]);
        }
      } catch (err) {
        console.warn('[Dashboard] fetch semester gagal, pakai default:', err);
      }
    };
