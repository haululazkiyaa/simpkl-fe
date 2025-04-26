import { useCallback, useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../context/AuthContext";
import Logout from "../../../components/Elements/Logout";
import SupervisorFinalAssesmentGradeView from "../../../views/Supervisor/FinalAssesment/GradeView";
import SupervisorFinalAssesmentTableView from "../../../views/Supervisor/FinalAssesment/TableView";
import { getKelBimbinganPembimbing } from "../../../services/supervisor/supervisor-final-grade.service";
import { refreshToken } from "../../../services/auth/auth.service";
import { useNavigate } from "react-router-dom";

export default function SupervisorFinalAssesmentPage() {
  const { setProgress } = useContext(AuthContext);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState("");

  const handleDataHarian = useCallback(() => {
    setProgress(30);
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        getKelBimbinganPembimbing(token, (status, data) => {
          if (status) {
            setData(data);
          }
        });
      } else {
        Logout((status) => {
          if (status) {
            navigate("/login");
          }
        });
      }
      setProgress(100);
    });
  }, [setProgress, navigate]);

  useEffect(() => {
    handleDataHarian();
  }, [handleDataHarian]);

  return (
    <>
      <div className="format max-w-none mb-5">
        <h1 className="dark:text-white">Penilaian Akhir</h1>
        <p>
          Anda dapat memberikan penilaian akhir kepada siswa bimbingan Anda
          untuk mengukur kinerja magang siswa selama satu bulan.
        </p>
        <div className="not-format">
          <SupervisorFinalAssesmentTableView
            data={data}
            setSelected={setSelected}
          />
          <SupervisorFinalAssesmentGradeView data={data} selected={selected} />
        </div>
      </div>
    </>
  );
}
