import { axiosReq } from "../axios.service";

// services setting tahun ajaran
export const addPerusahaan = async (data, token, callback) => {
  await axiosReq
    .post(`${import.meta.env.VITE_API_URL}/perusahaan/create`, data, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    })
    .then(() => {
      callback(true);
    })
    .catch((error) => {
      callback(false, error.response?.data.message);
    });
};

export const setPerusahaan = async (data, token, callback) => {
  await axiosReq
    .put(`${import.meta.env.VITE_API_URL}/perusahaan/update`, data, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    })
    .then(() => {
      callback(true);
    })
    .catch(() => {
      callback(false);
    });
};
