import { axiosReq } from "../axios.service";

// services setting tahun ajaran
export const getAnnouncement = async (token, callback) => {
  await axiosReq
    .get(`${import.meta.env.VITE_API_URL}/pengumuman/all`, {
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

export const addAnnouncement = async (data, token, callback) => {
  await axiosReq
    .post(`${import.meta.env.VITE_API_URL}/pengumuman/create`, data, {
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

export const updateAnnouncement = async (data, token, callback) => {
  await axiosReq
    .put(`${import.meta.env.VITE_API_URL}/pengumuman/update`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then(() => {
      callback(true);
    })
    .catch((error) => {
      callback(false, error.response.data.message);
    });
};

export const deleteAnnouncement = async (data, token, callback) => {
  await axiosReq
    .delete(`${import.meta.env.VITE_API_URL}/pengumuman/delete`, {
      data,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      callback(true, res.data.message);
    })
    .catch((error) => {
      callback(false, error.response.data.message);
    });
};
