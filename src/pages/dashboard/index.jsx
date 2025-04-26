import { useCallback, useContext, useEffect, useState } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import PropTypes from "prop-types";
import { getAnnouncement } from "../../services/school-admin/announcement-data.service";

import { AuthContext } from "../../context/AuthContext";
import Logout from "../../components/Elements/Logout";
import { refreshToken } from "../../services/auth/auth.service";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const { setProgress } = useContext(AuthContext);
  const navigate = useNavigate();

  const [pengumuman, setPengumuman] = useState([]);

  const handleDataPengumuman = useCallback(() => {
    setProgress(30);
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        getAnnouncement(token, (status, data) => {
          if (status) {
            const activeAnnouncements = data.filter((item) => item.status === true);
            setPengumuman(activeAnnouncements);
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
    handleDataPengumuman();
  }, [handleDataPengumuman]);

  return (
    <DashboardLayout>
      <div className="max-w-none mb-5">
        <div className="flex-none flex-row lg:flex">
          <div className="basis-4/6">
            <div className="not-format lg:mr-5">
              <div
                id="default-carousel"
                className="relative w-full "
                data-carousel="slide"
              >
                <div className="relative h-24 overflow-hidden rounded-lg md:h-40 mb-5 p-6 bg-white border border-gray-200 shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <div
                    className="hidden duration-700 ease-in-out"
                    data-carousel-item
                  >
                    <img
                      src="https://masulyablog.sirv.com/slider.png"
                      className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                      alt="..."
                    />
                  </div>
                  <div
                    className="hidden duration-700 ease-in-out"
                    data-carousel-item
                  >
                    <img
                      src="https://masulyablog.sirv.com/slider.png"
                      className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                      alt="..."
                    />
                  </div>
                  <div
                    className="hidden duration-700 ease-in-out"
                    data-carousel-item
                  >
                    <img
                      src="https://masulyablog.sirv.com/slider.png"
                      className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                      alt="..."
                    />
                  </div>
                  <div
                    className="hidden duration-700 ease-in-out"
                    data-carousel-item
                  >
                    <img
                      src="https://masulyablog.sirv.com/slider.png"
                      className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                      alt="..."
                    />
                  </div>
                  <div
                    className="hidden duration-700 ease-in-out"
                    data-carousel-item
                  >
                    <img
                      src="https://masulyablog.sirv.com/slider.png"
                      className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                      alt="..."
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                  data-carousel-prev
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg
                      className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 1 1 5l4 4"
                      />
                    </svg>
                    <span className="sr-only">Previous</span>
                  </span>
                </button>
                <button
                  type="button"
                  className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                  data-carousel-next
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg
                      className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <span className="sr-only">Next</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="basis-2/6">
            <div className="rounded-lg p-3 bg-white border border-gray-200 shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 border-t-4 border-t-blue-500">
              <h2 className="font-bold text-lg">Pengumuman</h2>
              {/* <p className="text-gray-500 dark:text-white border-b border-neutral-100 my-2 pb-2">
                <span className="text-black">28 Desember 2023</span> - Peserta
                magang harap segera melakukan konfirmasi kepada guru pembimbing
                terkait perusahaannya.
              </p>
              <p className="text-gray-500 dark:text-white border-b border-neutral-100 my-2 pb-2">
                <span className="text-black">23 Desember 2023</span> - Peserta
                magang harap segera melakukan konfirmasi kepada guru pembimbing
                terkait perusahaannya.
              </p> */}
              {pengumuman.length > 0 ? (
                pengumuman.map((item, index) => (
                  <p key={index} className="text-gray-500 dark:text-white border-b border-neutral-100 my-2 pb-2">
                    <span className="text-black">
                      {new Date(item.createdAt).toLocaleString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span> - {item.pengumuman}
                  </p>
                ))
              ) : (
                <p className="text-gray-500 dark:text-white my-2 pb-2">Tidak ada pengumuman</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

DashboardPage.propTypes = {
  handleLogout: PropTypes.func,
};
