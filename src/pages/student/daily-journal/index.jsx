import { useCallback, useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../context/AuthContext";
import Logout from "../../../components/Elements/Logout";
import ReactConfetti from "react-confetti";
import StudentDailyJournalDetailView from "../../../views/Student/DailyJournal/DetailView";
import StudentDailyJournalTableView from "../../../views/Student/DailyJournal/TableView";
import StudentDailyJournalUpdateDrawerView from "../../../views/Student/DailyJournal/UpdateDrawerView";
import { getJurnalHarian } from "../../../services/student/daily-journal.service";
import { refreshToken } from "../../../services/auth/auth.service";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "@uidotdev/usehooks";

export default function StudentDailyJournalPage() {
  const { setProgress } = useContext(AuthContext);
  const { width, height } = useWindowSize();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState("");
  const [confetti, setConfetti] = useState(false);
  const [tanggal, setTanggal] = useState("");
  const [today, setToday] = useState("");

  const handleDataHarian = useCallback(() => {
    if (tanggal == "") {
      const date = new Date();
      const dd = String(date.getDate()).padStart(2, "0");
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const yyyy = date.getFullYear();
      const dateString = yyyy + "-" + mm + "-" + dd;
      setTanggal(dateString);
      setToday(dateString);
    }

    setProgress(30);
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        getJurnalHarian(tanggal, token, (status, data) => {
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
  }, [setProgress, navigate, setTanggal, tanggal]);

  useEffect(() => {
    setData([]);
    handleDataHarian();
  }, [handleDataHarian, tanggal]);

  useEffect(() => {
    if (confetti) {
      setTimeout(() => {
        setConfetti(false);
      }, 5000);
    }
  }, [confetti]);

  return (
    <>
      <div className="format max-w-none mb-5">
        <h1 className="dark:text-white">Jurnal Harian</h1>
        <p>
          Anda dapat melihat Jurnal harian yang sudah Anda buat,
          menambahkan, mengubah dan menghapus jurnal harian. Namun Anda
          hanya dibatasi untuk membuat satu jurnal per hari. Anda juga dapat
          melihat komentar yang diberikan oleh Guru Pembimbing dan
          Instruktur disini.
        </p>
        
        <div className="not-format">
          <StudentDailyJournalTableView
            handleDataHarian={handleDataHarian}
            setData={setData}
            data={data}
            setSelected={setSelected}
            tanggal={tanggal}
            setTanggal={setTanggal}
            today={today}
            selected={selected}
            setConfetti={setConfetti}
          />
          <StudentDailyJournalUpdateDrawerView
            handleDataHarian={handleDataHarian}
            selected={selected}
            id="1"
          />
          <StudentDailyJournalDetailView data={data} selected={selected} />
          {confetti && (
            <ReactConfetti
              width={width - 20}
              height={height}
              recycle={false}
            />
          )}
        </div>
      </div>
    </>
  );
}
