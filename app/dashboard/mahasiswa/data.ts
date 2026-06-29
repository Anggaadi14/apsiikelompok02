export interface CplDataItem {
  name: string;
  nilai: number;
  target: number;
  status: string;
  kategori: string;
}

export interface CpmkItem {
  kode: string;
  deskripsi: string;
  bobot: number;
  nilai: number;
  matakuliah: string;
  semester: number;
  nilaiMK: string;
}

export interface IkItem {
  kode: string;
  deskripsi: string;
  bobot: number;
  nilai: number;
  cpmk: CpmkItem[];
}

export interface DetailCplItem {
  cpl: string;
  deskripsi: string;
  nilai: number;
  status: string;
  ik: IkItem[];
}

export interface MataKuliahItem {
  semester: string;
  kode: string;
  nama: string;
  sks: number;
  nilai: string;
  nilaiAngka: number;
}

export const cplData: CplDataItem[] = [
  { name: 'CPL-1', nilai: 85, target: 80, status: 'Tercapai', kategori: 'Pengetahuan' },
  { name: 'CPL-2', nilai: 78, target: 80, status: 'Belum Tercapai', kategori: 'Keterampilan Khusus' },
  { name: 'CPL-3', nilai: 92, target: 80, status: 'Tercapai', kategori: 'Keterampilan Umum' },
  { name: 'CPL-4', nilai: 88, target: 80, status: 'Tercapai', kategori: 'Pengetahuan' },
  { name: 'CPL-5', nilai: 75, target: 80, status: 'Belum Tercapai', kategori: 'Keterampilan Khusus' },
  { name: 'CPL-6', nilai: 90, target: 80, status: 'Tercapai', kategori: 'Sikap' },
  { name: 'CPL-7', nilai: 0, target: 80, status: 'Belum Ditempuh', kategori: 'Keterampilan Umum' },
  { name: 'CPL-8', nilai: 86, target: 80, status: 'Tercapai', kategori: 'Pengetahuan' },
  { name: 'CPL-9', nilai: 0, target: 80, status: 'Belum Ditempuh', kategori: 'Sikap' },
  { name: 'CPL-10', nilai: 83, target: 80, status: 'Tercapai', kategori: 'Keterampilan Khusus' },
];

export const radarData = cplData.map(cpl => ({
  subject: cpl.name,
  nilai: cpl.nilai,
  target: cpl.target,
}));

export const detailCPL: DetailCplItem[] = [
  {
    cpl: 'CPL-1',
    deskripsi: 'Mampu menerapkan pengetahuan matematika, sains, dan teknik industri',
    nilai: 85,
    status: 'Tercapai',
    ik: [
      {
        kode: 'IK-1.1',
        deskripsi: 'Memahami konsep dasar matematika teknik',
        bobot: 50,
        nilai: 87,
        cpmk: [
          {
            kode: 'CPMK-1.1',
            deskripsi: 'Mahasiswa mampu menjelaskan konsep probabilitas',
            bobot: 40,
            nilai: 85,
            matakuliah: 'Statistika Industri (TI2101)',
            semester: 3,
            nilaiMK: 'A'
          },
          {
            kode: 'CPMK-1.2',
            deskripsi: 'Mahasiswa mampu menghitung distribusi probabilitas',
            bobot: 60,
            nilai: 88,
            matakuliah: 'Statistika Industri (TI2101)',
            semester: 3,
            nilaiMK: 'A'
          }
        ]
      },
      {
        kode: 'IK-1.2',
        deskripsi: 'Menerapkan metode statistika dalam analisis data',
        bobot: 50,
        nilai: 83,
        cpmk: [
          {
            kode: 'CPMK-2.1',
            deskripsi: 'Mahasiswa mampu melakukan uji hipotesis',
            bobot: 100,
            nilai: 83,
            matakuliah: 'Statistika Industri (TI2101)',
            semester: 3,
            nilaiMK: 'A'
          }
        ]
      }
    ]
  },
  {
    cpl: 'CPL-2',
    deskripsi: 'Mampu merancang sistem terintegrasi dengan mempertimbangkan aspek teknis dan ekonomis',
    nilai: 78,
    status: 'Belum Tercapai',
    ik: [
      {
        kode: 'IK-2.1',
        deskripsi: 'Merancang fasilitas produksi (lini produksi) dengan mempertimbangkan K3, sistem kerja dan aspek ekonomi',
        bobot: 100,
        nilai: 78,
        cpmk: [
          {
            kode: 'CPMK-3.1',
            deskripsi: 'Mahasiswa mampu merancang tata letak pabrik',
            bobot: 50,
            nilai: 75,
            matakuliah: 'Perancangan Tata Letak Pabrik (TI2102)',
            semester: 4,
            nilaiMK: 'B+'
          },
          {
            kode: 'CPMK-3.2',
            deskripsi: 'Mahasiswa mampu menganalisis aliran material',
            bobot: 50,
            nilai: 80,
            matakuliah: 'Perancangan Tata Letak Pabrik (TI2102)',
            semester: 4,
            nilaiMK: 'B+'
          }
        ]
      }
    ]
  },
  {
    cpl: 'CPL-3',
    deskripsi: 'Mampu menerapkan kompetensi rekayasa tingkat lanjut di bidang teknik Industri',
    nilai: 92,
    status: 'Tercapai',
    ik: [
      {
        kode: 'IK-3.1',
        deskripsi: 'Mampu merancang eksperimen',
        bobot: 100,
        nilai: 92,
        cpmk: [
          {
            kode: 'CPMK-3.1',
            deskripsi: 'Mampu mengembangkan dan mengevaluasi skenario perbaikan sistem dengan pendekatan simulasi',
            bobot: 100,
            nilai: 92,
            matakuliah: 'Simulasi Sistem (TI3202)',
            semester: 6,
            nilaiMK: 'A'
          }
        ]
      }
    ]
  },
  {
    cpl: 'CPL-4',
    deskripsi: 'Mampu menerapkan kompetensi rekayasa tingkat lanjut di bidang teknik industri',
    nilai: 88,
    status: 'Tercapai',
    ik: [
      {
        kode: 'IK-4.1',
        deskripsi: 'Kemampuan memformulasikan masalah teknik yang kompleks',
        bobot: 100,
        nilai: 88,
        cpmk: [
          {
            kode: 'CPMK-4.1',
            deskripsi: 'Mampu menentukan karakteristik mutu dari suatu produk',
            bobot: 100,
            nilai: 88,
            matakuliah: 'Pengendalian dan Penjaminan Mutu (TI3203)',
            semester: 6,
            nilaiMK: 'A'
          }
        ]
      }
    ]
  },
  {
    cpl: 'CPL-5',
    deskripsi: 'Mampu menerapkan kompetensi rekayasa tingkat lanjut di bidang teknik Industri',
    nilai: 75,
    status: 'Belum Tercapai',
    ik: [
      {
        kode: 'IK-5.1',
        deskripsi: 'Mampu menggunakan metode teknik modern untuk menganalisis masalah keteknikan',
        bobot: 100,
        nilai: 75,
        cpmk: [
          {
            kode: 'CPMK-5.1',
            deskripsi: 'Mahasiswa mampu menerapkan Machine Learning untuk memecahkan masalah kompleks',
            bobot: 100,
            nilai: 75,
            matakuliah: 'Analitika Data (TI3104)',
            semester: 5,
            nilaiMK: 'B'
          }
        ]
      }
    ]
  },
  {
    cpl: 'CPL-6',
    deskripsi: 'Mampu menerapkan kompetensi rekayasa tingkat lanjut di bidang teknik industri',
    nilai: 90,
    status: 'Tercapai',
    ik: [
      {
        kode: 'IK-6.1',
        deskripsi: 'Mampu menyampaikan hasil pekerjaan dalam bentuk laporan tertulis',
        bobot: 100,
        nilai: 90,
        cpmk: [
          {
            kode: 'CPMK-6.1',
            deskripsi: 'Mampu menyusun laporan skripsi',
            bobot: 100,
            nilai: 90,
            matakuliah: 'Skripsi (TI4201)',
            semester: 8,
            nilaiMK: 'A'
          }
        ]
      }
    ]
  },
  {
    cpl: 'CPL-7',
    deskripsi: 'Mampu berkomunikasi efektif dalam tim multidisiplin',
    nilai: 0,
    status: 'Belum Ditempuh',
    ik: [
      {
        kode: 'IK-7.1',
        deskripsi: 'Mampu membuat perencanaan waktu, biaya dan sumber daya dalam proyek keteknikan',
        bobot: 100,
        nilai: 0,
        cpmk: [
          {
            kode: 'CPMK-7.1',
            deskripsi: 'Mahasiswa mampu membuat rencana sumber daya dari aktivitas problem analysis',
            bobot: 100,
            nilai: 0,
            matakuliah: 'Capstone I (TI4102)',
            semester: 7,
            nilaiMK: '-'
          }
        ]
      }
    ]
  },
  {
    cpl: 'CPL-8',
    deskripsi: 'Mampu menerapkan kompetensi rekayasa tingkat lanjut di bidang teknik industri',
    nilai: 86,
    status: 'Tercapai',
    ik: [
      {
        kode: 'IK-8.1',
        deskripsi: 'Mampu melaksanakan tugas yang menjadi tanggung jawabnya dalam sebuah tim',
        bobot: 100,
        nilai: 86,
        cpmk: [
          {
            kode: 'CPMK-8.1',
            deskripsi: 'Mahasiswa melaksanakan tugas yang menjadi tanggung jawabnya dalam sebuah tim pada aktivitas problem analysis',
            bobot: 100,
            nilai: 86,
            matakuliah: 'Capstone I (TI4102)',
            semester: 7,
            nilaiMK: 'A'
          }
        ]
      }
    ]
  },
  {
    cpl: 'CPL-9',
    deskripsi: 'Mampu menerapkan kompetensi rekayasa tingkat lanjut di bidang teknik industri',
    nilai: 0,
    status: 'Belum Ditempuh',
    ik: [
      {
        kode: 'IK-9.1',
        deskripsi: 'Kemampuan menerapkan standar, regulasi, dan kebijakan yang relevan dalam penyelesaian masalah teknik industri',
        bobot: 100,
        nilai: 0,
        cpmk: [
          {
            kode: 'CPMK-9.1',
            deskripsi: 'Menunjukkan etika seorang insinyur professional dalam menghasilkan rancangan yang memiliki keberpihakan pada keamanan, keselamatan, sosiokultural, dan lingkungan',
            bobot: 100,
            nilai: 0,
            matakuliah: 'Capstone II (TI4202)',
            semester: 8,
            nilaiMK: '-'
          }
        ]
      }
    ]
  },
  {
    cpl: 'CPL-10',
    deskripsi: 'Mampu menerapkan kompetensi rekayasa tingkat lanjut di bidang teknik industri',
    nilai: 83,
    status: 'Tercapai',
    ik: [
      {
        kode: 'IK-10.1',
        deskripsi: 'Mengidentifikasi sumber pengetahuan dan informasi untuk meningkatkan kompetensi',
        bobot: 100,
        nilai: 83,
        cpmk: [
          {
            kode: 'CPMK-10.1',
            deskripsi: 'Menggali sumber informasi yang diperlukan dalam memformulasikan masalah',
            bobot: 100,
            nilai: 83,
            matakuliah: 'Metodologi Penelitian (TI3204)',
            semester: 6,
            nilaiMK: 'B+'
          }
        ]
      }
    ]
  }
];

export const mataKuliahData: MataKuliahItem[] = [
  { semester: 'Semester 5', kode: 'TI-301', nama: 'Sistem Produksi', sks: 3, nilai: 'A', nilaiAngka: 88 },
  { semester: 'Semester 5', kode: 'TI-305', nama: 'Ergonomi', sks: 3, nilai: 'B+', nilaiAngka: 82 },
  { semester: 'Semester 5', kode: 'TI-308', nama: 'Pengendalian Kualitas', sks: 3, nilai: 'A-', nilaiAngka: 85 },
];
