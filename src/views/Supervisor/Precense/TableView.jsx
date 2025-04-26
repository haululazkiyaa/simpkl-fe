import { AuthContext } from "../../../context/AuthContext.jsx";
import Button from "../../../components/Elements/Button/index.jsx";
import Input from "../../../components/Elements/Input/index.jsx";
import Logout from "../../../components/Elements/Logout/index.js";
import NotFound from "../../../components/Elements/EmptyState/NotFound.jsx";
import PropTypes from "prop-types";
import { refreshToken } from "../../../services/auth/auth.service.js";
import { submitKehadiran } from "../../../services/supervisor/supervisor-presence.service.js";
import { toast } from "react-toastify";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function SupervisorPresenceTableView(props) {
  const { handlePresensi, data, setData, tanggal, setTanggal } = props;
  const { setProgress } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleStatusKehadiran = (item, status) => {
    const newData = data.map((data) => {
      if (data.id_bimbingan === item.id_bimbingan) {
        return { ...data, status: status };
      }
      return data;
    });

    setData(newData);
  };

  const handleSubmitPresensi = () => {
    setProgress(30);
    let list_kehadiran = [];
    for (let item of data) {
      list_kehadiran.push({
        id_bimbingan: item.id_bimbingan,
        status: item.status,
      });
    }
    const presensi = {
      tanggal: tanggal,
      data: list_kehadiran,
    };
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        submitKehadiran(presensi, token, (status) => {
          if (status) {
            toast.success(`Sukses! Presensi berhasil disimpan.`, {
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            handlePresensi();
          } else {
            toast.error("Gagal menyimpan presensi!", {
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
    });
  };

  return (
    <>
      <div className={`md:flex justify-between`}>
        <div className="space-x-2 flex items-center justify-center mb-5">
          <label className="text-black font-bold dark:text-white">
            Pilih Tanggal:
          </label>
          <Input
            type="date"
            name="tanggal"
            id="tanggal"
            placeholder="Masukan tanggal jurnal"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            required={true}
          />
        </div>
        {data.length != 0 && (
          <div className="space-x-2 mb-5">
            <Button variant="yellow" onClick={() => handleSubmitPresensi()}>
              <i className="fa-solid fa-floppy-disk mr-2"></i>
              Submit Presensi
            </Button>
          </div>
        )}
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="w-16 px-3">
                No.
              </th>
              <th scope="col" className="px-6 py-3">
                NIS / NISN
              </th>
              <th scope="col" className="px-6 py-3">
                Nama Siswa
              </th>
              <th scope="col" className="w-16 px-3">
                Hadir
              </th>
              <th scope="col" className="w-16 px-3">
                Izin
              </th>
              <th scope="col" className="w-16 px-3">
                Sakit
              </th>
              <th scope="col" className="w-16 px-3">
                Alpa
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length != 0 ? (
              data.map((item, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="w-16 px-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4 truncate text-left">
                    {item.kelompok_bimbingan?.siswa?.nis} /{" "}
                    {item.kelompok_bimbingan?.siswa?.nisn}
                  </td>
                  <td className="px-6 py-4 truncate text-left">
                    {item.kelompok_bimbingan?.siswa?.nama}
                  </td>
                  <td className="w-16 px-3">
                    <div className="flex">
                      <div className="flex items-center">
                        <input
                          id={"hadir" + index}
                          type="radio"
                          value="Hadir"
                          name={"kehadiran" + index}
                          checked={item.status === "Hadir"}
                          onChange={(e) =>
                            handleStatusKehadiran(item, e.target.value)
                          }
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor={"hadir" + index}
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Hadir
                        </label>
                      </div>
                    </div>
                  </td>
                  <td className="w-16 px-3">
                    <div className="flex">
                      <div className="flex items-center">
                        <input
                          id={"izin" + index}
                          type="radio"
                          value="Izin"
                          name={"kehadiran" + index}
                          checked={item.status === "Izin"}
                          onChange={(e) =>
                            handleStatusKehadiran(item, e.target.value)
                          }
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor={"izin" + index}
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Izin
                        </label>
                      </div>
                    </div>
                  </td>
                  <td className="w-16 px-3">
                    <div className="flex">
                      <div className="flex items-center">
                        <input
                          id={"sakit" + index}
                          type="radio"
                          value="Sakit"
                          name={"kehadiran" + index}
                          checked={item.status === "Sakit"}
                          onChange={(e) =>
                            handleStatusKehadiran(item, e.target.value)
                          }
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor={"sakit" + index}
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Sakit
                        </label>
                      </div>
                    </div>
                  </td>
                  <td className="w-16 px-3">
                    <div className="flex">
                      <div className="flex items-center">
                        <input
                          id={"alpa" + index}
                          type="radio"
                          value="Alpa"
                          name={"kehadiran" + index}
                          checked={item.status === "Alpa"}
                          onChange={(e) =>
                            handleStatusKehadiran(item, e.target.value)
                          }
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor={"alpa" + index}
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Alpa
                        </label>
                      </div>
                    </div>
                  </td>
                </tr>
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
    </>
  );
}

SupervisorPresenceTableView.propTypes = {
  data: PropTypes.any,
  setSelected: PropTypes.any,
  setData: PropTypes.any,
  handlePresensi: PropTypes.func,
  setTanggal: PropTypes.any,
  tanggal: PropTypes.any,
};