import { AuthContext } from "../../../context/AuthContext.jsx";
import Button from "../../../components/Elements/Button/index.jsx";
import ConfirmModal from "../../../components/Elements/ConfirmModal/index.jsx";
import Logout from "../../../components/Elements/Logout/index.js";
import NotFound from "../../../components/Elements/EmptyState/NotFound.jsx";
import PropTypes from "prop-types";
import { refreshToken } from "../../../services/auth/auth.service.js";
import { setPerusahaan } from "../../../services/school-admin/company-data.service copy.js";
import { toast } from "react-toastify";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function CompanyDataTableView(props) {
  const { handleDataPerusahaan, data, selected, setSelected } = props;
  const { setProgress } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleStatusPerusahaan = (option) => {
    setProgress(30);
    const data = {
      id: selected.id,
      status: option,
    };
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        setPerusahaan(data, token, (status, message) => {
          if (status) {
            toast.success(message, {
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            handleDataPerusahaan();
          } else {
            toast.error(message, {
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

  const initModal = (item) => {
    setSelected(item);
    document.getElementById("init-modal").click();
  };

  const initModal1 = (item) => {
    setSelected(item);
    document.getElementById("init-modal1").click();
  };

  const initModal2 = (item) => {
    setSelected(item);
    document.getElementById("init-modal2").click();
  };

  const updateDrawer = (item) => {
    setSelected(item);
    document.getElementById("update-drawer1").click();
  };

  const initStaticModal = (item) => {
    setSelected(item);
    document.getElementById("init-static-modal").click();
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="w-16 px-3">
                No.
              </th>
              <th scope="col" className="px-6 py-3">
                Nama Perusahaan
              </th>
              <th scope="col" className="px-6 py-3">
                Foto Perusahaan
              </th>
              <th scope="col" className="px-6 py-3">
                Nama Pimpinan
              </th>
              <th scope="col" className="px-6 py-3">
                No. HP
              </th>
              <th scope="col" className="px-6 py-3">
                Alamat
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Website
              </th>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Kata Sandi Sementara
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="w-16 px-3">
                Aktif/ Non-aktifkan
              </th>
              <th scope="col" className="w-16 px-3">
                Approval Akun
              </th>
              <th scope="col" className="w-16 px-3">
                Edit
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
                  <td className="px-6 py-4">{item.nama_perusahaan}</td>
                  <td className="px-6 py-4">
                    <Button
                      variant="default"
                      onClick={() => initStaticModal(item)}
                    >
                      <i className="fa-solid fa-eye"></i>
                    </Button>
                  </td>
                  <td className="px-6 py-4 text-left">
                    {item.pimpinan}
                  </td>
                  <td className="px-6 py-4 text-left">{item.no_hp}</td>
                  <td className="px-1 py-4 min-w-[300px] text-left">{item.alamat}</td>
                  <td className="px-6 py-4 text-left">{item.email}</td>
                  <td className="px-6 py-4"><a href={item.website} target="_blank" rel="noopener noreferrer">{item.website}</a></td>
                  <td className="px-6 py-4">{item.user?.username}</td>
                  <td className="px-6 py-4">
                    {item.user?.temp_password || "-"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center">
                      {item.status === "AKTIF" ? (
                        <>
                          <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2 animate-pulse"></div>{" "}
                          Aktif
                        </>
                      ) : item.status === "NONAKTIF" ? (
                        <>
                          <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>{" "}
                          Nonaktif
                        </>
                      ) : item.status === "PENDING" ? (
                        <>
                          <div className="h-2.5 w-2.5 rounded-full bg-amber-500 me-2"></div>{" "}
                          Pending
                        </>
                      ) : item.status === "REJECT" ? (
                        <>
                          <div className="h-2.5 w-2.5 rounded-full bg-purple-500 me-2"></div>{" "}
                          Nonaktif
                        </>
                      ) : (
                        <>
                          <div className="h-2.5 w-2.5 rounded-full bg-gray-500 me-2"></div>{" "}
                          -
                        </>
                      )}
                    </div>
                  </td>
                  <td className="w-16 px-3">
                    {(item.status === "AKTIF" ||
                      item.status === "NONAKTIF") && (
                      <div className="flex items-center justify-center">
                        <Button
                          variant="default"
                          onClick={() => initModal(item)}
                        >
                          <i className="fa-solid fa-power-off"></i>
                        </Button>
                      </div>
                    )}
                  </td>
                  <td className="w-16 px-3">
                    {item.status === "PENDING" ? (
                      <div className="flex items-center justify-center space-x-2">
                        <Button
                          variant="green"
                          onClick={() => initModal1(item)}
                        >
                          <i className="fa-solid fa-check"></i>
                        </Button>
                        <Button variant="red" onClick={() => initModal2(item)}>
                          <i className="fa-solid fa-xmark"></i>
                        </Button>
                      </div>
                    ) : item.status === "REJECT" ? (
                      "Ditolak"
                    ) : (
                      "Disetujui"
                    )}
                  </td>
                  <td className="w-16 px-3">
                    {!(item.status === "REJECT" || item.status === "") && (
                      <div className="flex items-center justify-center">
                        <Button
                          variant="yellow"
                          onClick={() => updateDrawer(item)}
                        >
                          <i className="fa-solid fa-pen"></i>
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={13}>
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
      <ConfirmModal
        desc={`Apakah anda yakin ingin ${
          selected?.status === "AKTIF" ? "menon-aktifkan" : "mengaktifkan"
        } perusahaan ${selected?.nama_perusahaan}?`}
        labelOk="Ya"
        labelCancel="Tidak"
        onClick={() =>
          handleStatusPerusahaan(
            selected?.status === "AKTIF" ? "NONAKTIF" : "AKTIF"
          )
        }
      />
      <ConfirmModal
        desc={`Apakah anda yakin menyetujui akun perusahaan ${selected.nama_perusahaan}?`}
        labelOk="Ya"
        labelCancel="Tidak"
        onClick={() => handleStatusPerusahaan("AKTIF")}
        id="1"
      />
      <ConfirmModal
        desc={`Apakah anda yakin menolak akun perusahaan ${selected.nama_perusahaan}?`}
        labelOk="Ya"
        labelCancel="Tidak"
        onClick={() => handleStatusPerusahaan("REJECT")}
        id="2"
      />
    </>
  );
}

CompanyDataTableView.propTypes = {
  data: PropTypes.any,
  handleDataPerusahaan: PropTypes.func,
  selected: PropTypes.any,
  setSelected: PropTypes.any,
  id: PropTypes.string,
};
