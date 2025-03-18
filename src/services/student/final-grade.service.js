import { axiosReq } from "../axios.service";

// services setting tahun ajaran
export const getNilaiAkhirSiswa = async (token, callback) => {
  await axiosReq
    .get(`${import.meta.env.VITE_API_URL}/nilai-akhir/siswa`, {
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
