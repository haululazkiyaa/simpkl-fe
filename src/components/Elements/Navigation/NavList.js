export const NavList = [
  {
    label: "Dashboard",
    href: "/",
    icon: "fa-house",
  },
  {
    group: "Admin Sekolah",
    child: [
      {
        label: "Pengaturan",
        href: "/school-admin/settings",
        icon: "fa-gear",
      },
      {
        label: "Pengumuman",
        href: "/school-admin/announcements",
        icon: "fa-bullhorn",
      },
      {
        label: "Kelola Jurusan",
        href: "/school-admin/major-management",
        icon: "fa-list-ul",
      },
      {
        label: "Data Perusahaan",
        href: "/school-admin/company-data",
        icon: "fa-building",
      },
      {
        label: "Data Pembimbing",
        href: "/school-admin/supervisor-data",
        icon: "fa-user-tie",
      },
      {
        label: "Data Siswa",
        href: "/school-admin/student-data",
        icon: "fa-user",
      },
      {
        label: "Kelompok Bimbingan",
        href: "/school-admin/guidance-group",
        icon: "fa-users",
      },
      {
        label: "Penilaian",
        href: "/school-admin/assesment",
        icon: "fa-chart-simple",
      },
    ],
  },
  {
    group: "Admin Perusahaan",
    child: [
      {
        label: "Profil Perusahaan",
        href: "/company-admin/profile",
        icon: "fa-building",
      },
      {
        label: "Data Instruktur",
        href: "/company-admin/instructor-data",
        icon: "fa-building-user",
      },
      {
        label: "Kelompok Bimbingan",
        href: "/company-admin/guidance-group",
        icon: "fa-users",
      },
    ],
  },
  {
    group: "Instruktur",
    child: [
      {
        label: "Monitoring Harian",
        href: "/instructor/daily-monitoring",
        icon: "fa-calendar-days",
      },
      {
        label: "Monitoring Bulanan",
        href: "/instructor/monthly-monitoring",
        icon: "fa-calendar-check",
      },
    ],
  },
  {
    group: "Pembimbing",
    child: [
      {
        label: "Monitoring Harian",
        href: "/supervisor/daily-monitoring",
        icon: "fa-calendar-days",
      },
      {
        label: "Monitoring Bulanan",
        href: "/supervisor/monthly-monitoring",
        icon: "fa-calendar-check",
      },
      {
        label: "Kehadiran",
        href: "/supervisor/presence",
        icon: "fa-clipboard-check",
      },
      {
        label: "Penilaian Bulanan",
        href: "/supervisor/monthly-assesment",
        icon: "fa-chart-simple",
      },
      {
        label: "Penilaian Akhir",
        href: "/supervisor/final-assesment",
        icon: "fa-book",
      },
    ],
  },
  {
    group: "Siswa",
    child: [
      {
        label: "Jurnal Harian",
        href: "/student/daily-journal",
        icon: "fa-calendar-days",
      },
      {
        label: "Jurnal Bulanan",
        href: "/student/monthly-journal",
        icon: "fa-calendar-check",
      },
      {
        label: "Kehadiran",
        href: "/student/presence",
        icon: "fa-clipboard-check",
      },
      {
        label: "Penilaian Bulanan",
        href: "/student/monthly-grade",
        icon: "fa-chart-simple",
      },
      {
        label: "Nilai Akhir",
        href: "/student/final-grade",
        icon: "fa-book",
      },
    ],
  },
];
