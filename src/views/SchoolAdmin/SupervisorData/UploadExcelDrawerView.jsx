import { useContext, useState } from "react";

import Alert from "../../../components/Elements/Alert/index.jsx";
import { AuthContext } from "../../../context/AuthContext.jsx";
import Button from "../../../components/Elements/Button/index.jsx";
import Drawer from "../../../components/Elements/Drawer/index.jsx";
import Logout from "../../../components/Elements/Logout/index.js";
import PropTypes from "prop-types";
import SuccessBadge from "../../../components/Elements/SuccessBadge/index.jsx";
import { importExcelGuru } from "../../../services/school-admin/supervisor-data.service.js";
import { refreshToken } from "../../../services/auth/auth.service.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function UploadExcelDrawerView(props) {
  const { handleDataPembimbing, id } = props;
  const { setProgress } = useContext(AuthContext);
  const navigate = useNavigate();

  // handle loading
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validate if file is excel
      if (
        selectedFile.type === "application/vnd.ms-excel" ||
        selectedFile.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        setFile(selectedFile);
        setMessage("");
      } else {
        setFile(null);
        setMessage("File harus berupa dokumen Excel (.xls atau .xlsx)");
      }
    }
  };

  const handleDownloadTemplate = () => {
    setProgress(30);
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        // Create a link to download the template
        const link = document.createElement("a");
        link.href = `/templates/template-data-guru.xlsx`;
        link.setAttribute("download", "template_guru.xlsx");
        link.setAttribute("target", "_blank");
        // Add token to link
        link.setAttribute("Authorization", `Bearer ${token}`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast.success("Mengunduh template Excel...", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
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

  const handleUploadExcel = (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Silakan pilih file Excel terlebih dahulu");
      return;
    }

    setProgress(30);
    setLoading(true);
    setMessage("");
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    refreshToken((status, token) => {
      if (status) {
        setProgress(60);

        // Start a progress simulation
        const progressInterval = setInterval(() => {
          setUploadProgress((prevProgress) => {
            const newProgress = prevProgress + 5;
            if (newProgress >= 90) {
              clearInterval(progressInterval);
              return 90;
            }
            return newProgress;
          });
        }, 200);

        importExcelGuru(formData, token, (status, message) => {
          clearInterval(progressInterval);
          setUploadProgress(100);

          if (status) {
            toast.success("Sukses! Data pembimbing berhasil diunggah.", {
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            handleDataPembimbing();
            setMessage("success");
            setFile(null);
            // Reset file input
            document.getElementById("excel_file").value = "";
          } else {
            setMessage(message || "Gagal mengunggah data");
            toast.error("Gagal mengunggah data pembimbing!", {
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }

          setLoading(false);
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

  const initDrawer = () => {
    setMessage("");
    setFile(null);
    setUploadProgress(0);
    // Reset file input if it exists
    const fileInput = document.getElementById("excel_file");
    if (fileInput) fileInput.value = "";
    document.getElementById("init-drawer" + id).click();
  };

  return (
    <>
      <Button variant="green" onClick={() => initDrawer()}>
        <i className="fa-solid fa-file-excel mr-2"></i>Unggah Excel
      </Button>
      <Drawer title="Unggah Data Pembimbing dari Excel" id={id}>
        {message !== "success" ? (
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={(e) => handleUploadExcel(e)}
          >
            <div className="mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Silakan unduh template Excel terlebih dahulu, isi dengan data
                pembimbing yang ingin ditambahkan, lalu unggah kembali file
                Excel tersebut.
              </p>
              <Button variant="blue" onClick={handleDownloadTemplate}>
                <i className="fa-solid fa-download mr-2"></i>Unduh Template
                Excel
              </Button>
            </div>

            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="excel_file"
              >
                File Excel
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="excel_file"
                type="file"
                accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                onChange={handleFileChange}
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                Hanya menerima file excel (.xls atau .xlsx)
              </p>
            </div>

            {loading && uploadProgress > 0 && (
              <div className="mb-6">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-blue-700 dark:text-white">
                    Mengunggah...
                  </span>
                  <span className="text-sm font-medium text-blue-700 dark:text-white">
                    {uploadProgress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {message && message !== "success" && <Alert>{message}</Alert>}

            <Button type="submit" width="full" disabled={loading || !file}>
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
                  Mengunggah...
                </>
              ) : (
                "Unggah Data"
              )}
            </Button>
          </form>
        ) : (
          <SuccessBadge id={id}>Berhasil mengunggah data!</SuccessBadge>
        )}
      </Drawer>
    </>
  );
}

UploadExcelDrawerView.propTypes = {
  handleDataPembimbing: PropTypes.func,
  id: PropTypes.string,
};
