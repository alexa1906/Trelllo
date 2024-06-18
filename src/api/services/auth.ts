import axios from "axios";
import app from "../axios";



export const refresh = (refreshToken: string): Promise<string | null> => {
  return axios
    .post("/auth/refresh-token", { refreshToken })
    .then((response) => {
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      return accessToken;
    })
    .catch((error) => {
      console.error("Token refresh failed:", error);
      throw error;
    });
};

export const fetchBoards = () => {
  console.log("Fetching All Boards");
  return app.get("/workspace");
};

export const fetchUserInfo = () => {
  console.log("Fetching user info");
  return app.get("");
};

export const fetchBoardByBoardID = () => {
  console.log("Fetching a specific board");
  return app.get("/");
};

export const fetchCardByCardID = () => {
  console.log("Fetching a specific card, to see/add description");
  return app.get("/");
};

export const createNewBoard = () => {
  console.log("Creating new board");
  return app.post("/");
};

export const createNewCoulumn = () => {
  console.log("Creating new Column");
  return app.post("/");
};

export const createNewCard = () => {
  console.log("Creating new Card");
  return app.post("/");
};

// export const addDescriptionToThe

// export const fetchCertificates = (companyId: string) => {
//   console.log("Fetching certificates");
//   return api.get(`/companies/${companyId}/certificates`);
// };

// export const createCertificates = (companyId: string) => {
//   console.log("Creating certificates");
//   return api.post(`/companies/${companyId}/certificates`);
// };

// export const getCertificateRow = async (
//   companyId: string,
//   certificateId: string
// ) => {
//   const response = await api.get(
//     `/companies/${companyId}/certificates/${certificateId}/raw`,
//     {
//       responseType: "blob",
//     }
//   );

//   const blobData = response?.data;
//   const blob = new Blob([blobData], {
//     type: response?.headers["content-type"],
//   });

//   // return URL.createObjectURL(blob);
//   return blobData;
// };

// export const deleteCertificateRaw = (
//   companyId: string,
//   certificateId: string
// ) => {
//   return api.delete(`/companies/${companyId}/certificates/${certificateId}`);
// };

// export const updateCertificate = (
//   companyId: string,
//   certificateId: string,
//   type: any,
//   file: any
// ) => {
//   return api
//     .put(`/companies/${companyId}/certificates/${certificateId}`, file, {
//       headers: { "Content-Type": type },
//       params: {
//         "date-of-issue": "2024-02-15",
//         "valid-from": "2024-02-22",
//         expiry: "2024-02-24",
//       },
//     })
//     .catch((error) => {
//       console.error("Error updating certificate:", error);
//     });
// };

// export const getCertificateVersions = (
//   companyId: string,
//   certificateId: string
// ) => {
//   return api.get(
//     `/companies/${companyId}/certificates/${certificateId}/versions`
//   );
// };

// export const getInitialCertificate = (
//   companyId: string,
//   certificateId: string
// ) => {
//   return api.get(`/companies/${companyId}/certificates/${certificateId}`);
// };
