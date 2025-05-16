import { useContext, useState } from "react";

import { AuthContext } from "../../context/AuthContext";
import Input from "../../components/Elements/Input";
import { changePassword } from "../../services/auth/profile.service"; // You need to implement this API call
import { refreshToken } from "../../services/auth/auth.service";
import { useNavigate } from "react-router-dom";

export default function ResetPasswordView() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { setProgress } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!oldPassword || !newPassword || !confirmPassword) {
      setErrorMsg("Semua field wajib diisi.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg("Password baru dan konfirmasi password tidak sama.");
      return;
    }

    setLoading(true);
    setProgress(30);

    refreshToken((status, token) => {
      if (!status) {
        setProgress(100);
        setLoading(false);
        setErrorMsg("Sesi Anda telah habis. Silakan login kembali.");
        navigate("/login");
        return;
      }

      setProgress(60);
      changePassword(
        { old_password: oldPassword, new_password: newPassword },
        token,
        (success, message) => {
          setLoading(false);
          setProgress(100);
          if (success) {
            setSuccessMsg("Password berhasil diubah.");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
          } else {
            setErrorMsg(message || "Gagal mengubah password.");
          }
        }
      );
    });
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-2">Ganti Password</h1>
      <p className="text-gray-500 mb-6">
        Silakan masukkan password lama dan password baru Anda.
      </p>

      {successMsg && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errorMsg}
        </div>
      )}
      {setSuccessMsg ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Password Lama"
            type="password"
            name="old_password"
            id="old_password"
            placeholder="Masukkan password lama"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <Input
            label="Password Baru"
            type="password"
            name="new_password"
            id="new_password"
            placeholder="Masukkan password baru"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input
            label="Konfirmasi Password Baru"
            type="password"
            name="confirm_password"
            id="confirm_password"
            placeholder="Konfirmasi password baru"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Ganti Password"}
          </button>
        </form>
      ) : (
        <a
          href="/"
          className="w-full text-center block bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          Kembali
        </a>
      )}
    </div>
  );
}
