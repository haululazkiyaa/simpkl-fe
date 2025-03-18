import { useCallback, useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../context/AuthContext";
import FinalGradeTableView from "../../../views/Student/FinalGrade/TableView";
import Logout from "../../../components/Elements/Logout";
import { getNilaiAkhirSiswa } from "../../../services/student/final-grade.service";
import { refreshToken } from "../../../services/auth/auth.service";
import { useNavigate } from "react-router-dom";

export default function FinalGradePage() {
  const { setProgress } = useContext(AuthContext);
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const handleNilaiAkhir = useCallback(() => {
    setData([]);

    setProgress(30);
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        getNilaiAkhirSiswa(token, (status, data) => {
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
    handleNilaiAkhir();
  }, [handleNilaiAkhir]);

  return (
    <>
      <div className="format max-w-none mb-5">
        <h1 className="dark:text-white">Nilai Akhir</h1>
        <div className="flex-none flex-row lg:flex">
          <div className="basis-2/6 lg:mr-5">
            <h2 className="dark:text-white">Daftar Nilai</h2>
            <p>
              Anda dapat melihat nilai akhir disini. Harap diingat bahwa jika
              guru belum memberikan nilai akhir, maka secara default nilai nol
              (0). Jika ada kekeliruan silahkan hubungi guru pembimbing Anda.
            </p>
          </div>

          <div className="basis-4/6">
            <div className="not-format">
              <FinalGradeTableView
                handleNilaiAkhir={handleNilaiAkhir}
                data={data}
                setData={setData}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
