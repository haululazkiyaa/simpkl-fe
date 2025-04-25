import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import Logout from "../../../components/Elements/Logout";
import SupervisorDailyMonitoringCommentView from "../../../views/Supervisor/DailyMonitoring/CommentView";
import SupervisorDailyMonitoringJournalView from "../../../views/Supervisor/DailyMonitoring/JournalView";
import SupervisorDailyMonitoringTableView from "../../../views/Supervisor/DailyMonitoring/TableView";
import SupervisorDailyMonitoringUpdateDrawerView from "../../../views/Supervisor/DailyMonitoring/UpdateDrawerView";
import { getJurnalPembimbing } from "../../../services/supervisor/supervisor-monitoring.service";
import { refreshToken } from "../../../services/auth/auth.service";
import { useNavigate } from "react-router-dom";


export default function SupervisorDailyMonitoringPage() {
  const { setProgress } = useContext(AuthContext);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState("");
  const [tanggal, setTanggal] = useState("");

  const handleDataHarian = useCallback(() => {
    setData([]);
    if (tanggal == "") {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();
      const dateString = yyyy + "-" + mm + "-" + dd;
      setTanggal(dateString);
    }

    setProgress(30);
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        getJurnalPembimbing(tanggal, token, (status, data) => {
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
  }, [setProgress, navigate, tanggal]);

  useEffect(() => {
    handleDataHarian();
  }, [handleDataHarian]);

  return (
    <>
      <div className="format max-w-none mb-5">
        <h1 className="dark:text-white">Monitoring Harian</h1>
        <p>
          Anda dapat melihat jurnal harian yang sudah dibuat oleh siswa
          bimbingan Anda, dan memberikan komentar. Jika data belum ada, hubungi
          siswa bimbingan Anda.
        </p>
        <div className="not-format">
          <SupervisorDailyMonitoringTableView
            data={data}
            selected={selected}
            setSelected={setSelected}
            tanggal={tanggal}
            setTanggal={setTanggal}
            handleDataHarian={handleDataHarian}
          />
          <SupervisorDailyMonitoringUpdateDrawerView
            handleDataHarian={handleDataHarian}
            selected={selected}
            id="1"
          />
          <SupervisorDailyMonitoringJournalView
            data={data}
            selected={selected}
          />
          <SupervisorDailyMonitoringCommentView
            data={data}
            selected={selected}
            id="1"
          />
        </div>
      </div>
    </>
  );
}
