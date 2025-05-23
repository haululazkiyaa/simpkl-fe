import AdminProfile from "../../views/Profile/AdminProfile";
import { AuthContext } from "../../context/AuthContext";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import StudentProfile from "../../views/Profile/StudentProfile";
import SupervisorProfile from "../../views/Profile/SupervisorProfile";
import { useContext } from "react";

export default function ProfilePage() {
  const { profile } = useContext(AuthContext);

  return (
    <DashboardLayout>
      {profile.role === "ADMINSEKOLAH" ? (
        <AdminProfile />
      ) : profile.role === "PEMBIMBING" ? (
        <SupervisorProfile />
      ) : profile.role === "SISWA" ? (
        <StudentProfile />
      ) : (
        <div>Anda tidak memiliki akses ke halaman ini!</div>
      )}
    </DashboardLayout>
  );
}
