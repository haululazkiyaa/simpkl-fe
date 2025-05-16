import { AuthContext } from "../../context/AuthContext";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import ResetPasswordView from "../../views/Profile/ResetPassword";
import { useContext } from "react";

export default function ResetPassword() {
  const { profile } = useContext(AuthContext);

  // Check if the user is logged in
  if (!profile) {
    return (
      <DashboardLayout>
        <p>Anda harus masuk untuk mengatur ulang kata sandi Anda.</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <ResetPasswordView />
    </DashboardLayout>
  );
}
