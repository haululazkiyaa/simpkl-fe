import {
  addNilaiAkhirPembimbing,
  getNilaiAkhirPembimbing,
} from "../../../services/supervisor/supervisor-final-grade.service.js";
import { useCallback, useContext, useEffect, useState } from "react";

import Alert from "../../../components/Elements/Alert/index.jsx";
import { AuthContext } from "../../../context/AuthContext.jsx";
import Button from "../../../components/Elements/Button/index.jsx";
import Input from "../../../components/Elements/Input/index.jsx";
import Logout from "../../../components/Elements/Logout/index.js";
import Modal from "../../../components/Elements/Modal/index.jsx";
import NotFound from "../../../components/Elements/EmptyState/NotFound.jsx";
import PropTypes from "prop-types";
import TextArea from "../../../components/Elements/TextArea/index.jsx";
import { refreshToken } from "../../../services/auth/auth.service.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function SupervisorFinalAssesmentGradeView(props) {
  const { setProgress } = useContext(AuthContext);
  const { selected } = props;
  const navigate = useNavigate();

  const [detail, setDetail] = useState([]);

  // handle loading
  const [loading, setLoading] = useState(false);

  // handle message
  const [message, setMessage] = useState("");

  const handleNilaiAkhir = useCallback(() => {
    setDetail([]);
    setProgress(30);
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        getNilaiAkhirPembimbing(selected.siswa?.id, token, (status, data) => {
          if (status) {
            setDetail(data);
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
  }, [setProgress, navigate, selected]);

  const handleKeterangan = (item, value) => {
    const newData = detail.map((data) => {
      if (data.id_aspek_penilaian === item.id_aspek_penilaian) {
        return { ...data, keterangan: value };
      }
      return data;
    });

    setDetail(newData);
  };

  const handleNilai = (item, value) => {
    const newData = detail.map((data) => {
      if (data.id_aspek_penilaian === item.id_aspek_penilaian) {
        return { ...data, nilai: value };
      }
      return data;
    });

    setDetail(newData);
  };

  const handleSimpanNilai = (e) => {
    e.preventDefault();
    setProgress(30);
    setLoading(true);
    setMessage("");
    let list_nilai = [];
    for (let item of detail) {
      list_nilai.push({
        id_aspek_penilaian: item.id_aspek_penilaian,
        nilai: parseInt(item.nilai),
        keterangan: item.keterangan,
      });
    }
    const data = {
      id_siswa: selected.siswa?.id,
      data: list_nilai,
    };
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        addNilaiAkhirPembimbing(data, token, (status, message) => {
          if (status) {
            toast.success(`Sukses! penilaian akhir diperbarui.`, {
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            handleNilaiAkhir();
          } else {
            setMessage(message);
            toast.error("Gagal memperbarui penilaian akhir!", {
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
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
      setLoading(false);
    });
  };

  useEffect(() => {
    if (selected) handleNilaiAkhir();
  }, [handleNilaiAkhir, selected]);

  return (
    <Modal title="Detail Nilai Akhir Siswa">
      <Alert variant="info">
        <ul>
          <li>
            - Aspek-aspek penilaian yang tampil hanya dapat diatur oleh admin,
            jika terdapat kekeliruan hubungi admin.
          </li>
          <li>
            - Jika pembimbing belum memberikan nilai akhir maka secara default
            siswa adalah 0.
          </li>
          <li>
            - Untuk memberikan nilai siswa silahkan isi kolom skor dan
            keterangan jika diperlukan.
          </li>
        </ul>
      </Alert>
      <form
        className="space-y-4 md:space-y-6"
        onSubmit={(e) => handleSimpanNilai(e)}
      >
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No.
                </th>
                <th scope="col" className="px-6 py-3">
                  Aspek Penilaian
                </th>
                <th scope="col" className="w-28 px-3 truncate">
                  Skor (1-100)
                </th>
                <th scope="col" className="w-72 px-3 truncate">
                  Deskripsi Penilaian
                </th>
              </tr>
            </thead>
            <tbody>
              {detail.length != 0 ? (
                detail
                  .reduce((acc, item) => {
                    const kelompokIndex = acc.findIndex(
                      (group) =>
                        group.kelompok_penilaian ===
                        item.aspek_penilaian?.kelompok_penilaian
                    );
                    if (kelompokIndex === -1) {
                      acc.push({
                        kelompok_penilaian:
                          item.aspek_penilaian?.kelompok_penilaian,
                        items: [item],
                      });
                    } else {
                      acc[kelompokIndex].items.push(item);
                    }
                    return acc;
                  }, [])
                  .map((group, groupIndex) => (
                    <>
                      <tr
                        className="bg-gray-200 dark:bg-gray-700"
                        key={groupIndex}
                      >
                        <td
                          colSpan={5}
                          className="px-6 py-4 text-left font-bold"
                        >
                          {group.kelompok_penilaian}
                        </td>
                      </tr>
                      {group.items.map((item, index) => (
                        <tr
                          key={index}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 dark:text-white text-left"
                          >
                            {index + 1}
                          </th>
                          <td className="px-6 py-4 text-left">
                            {item.aspek_penilaian?.judul}
                          </td>
                          <td className="w-28 px-3">
                            <Input
                              type="number"
                              name={"skor" + index}
                              id={"skor" + index}
                              placeholder="Nilai"
                              value={item.nilai || "0"}
                              onChange={(e) =>
                                handleNilai(item, e.target.value)
                              }
                            />
                          </td>
                          <td className=" w-72 p-3">
                            <TextArea
                              name={"keterangan" + index}
                              id={"keterangan" + index}
                              placeholder="Masukan keterangan pembimbing"
                              value={item.keterangan}
                              onChange={(e) =>
                                handleKeterangan(item, e.target.value)
                              }
                              required={true}
                            />
                          </td>
                        </tr>
                      ))}
                    </>
                  ))
              ) : (
                <tr>
                  <td colSpan={8}>
                    <NotFound />
                    <h3 className="text-xl text-black font-bold mb-5 dark:text-white">
                      Opps! Belum ada data apapun!
                    </h3>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Alert>{message}</Alert>
        <Button variant="yellow" type="submit" width="full" disabled={loading}>
          {loading ? (
            <>
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Loading...
            </>
          ) : (
            <>
              <i className="fa-solid fa-pen mr-2"></i>Perbarui Nilai
            </>
          )}
        </Button>
      </form>
    </Modal>
  );
}

SupervisorFinalAssesmentGradeView.propTypes = {
  setProgress: PropTypes.any,
  selected: PropTypes.any,
};
