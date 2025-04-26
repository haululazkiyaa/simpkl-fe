import { axiosReq } from "../axios.service";

// services setting tahun ajaran
export const getKelBimbinganPembimbing = async (token, callback) => {
  await axiosReq
    .get(`${import.meta.env.VITE_API_URL}/kelompok-bimbingan/guru-pembimbing`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      callback(true, res.data.data);
    })
    .catch(() => {
      callback(false);
    });
};
export const getNilaiAkhirPembimbing = async (id, token, callback) => {
  await axiosReq
    .get(`${import.meta.env.VITE_API_URL}/nilai-akhir?id_siswa=${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      callback(true, res.data.data);
    })
    .catch(() => {
      callback(false);
    });
};

export const addNilaiAkhirPembimbing = async (data, token, callback) => {
  await axiosReq
    .post(`${import.meta.env.VITE_API_URL}/nilai-akhir/create`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then(() => {
      callback(true);
    })
    .catch((error) => {
      callback(false, error.response?.data.message);
    });
};
