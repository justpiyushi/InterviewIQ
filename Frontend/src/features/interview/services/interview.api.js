import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const generateInterviewReport = async ({
  jobDescription,
  resume,
  selfDescription,
}) => {
  try {
    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);
    formData.append("resume", resume);

    const response = await api.post("/api/v1/interview/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllInterviewReports = async () => {
  try {
    const response = await api.get("/api/v1/interview/reports");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getInterviewReportById = async (interviewId) => {
  try {
    const response = await api.get(`/api/v1/interview/reports/${interviewId}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const generateResumePdf = async ({ interviewReportId }) => {
  try {
    const response = await api.post(
      `/api/v1/interview/resume/pdf/${interviewReportId}`,
      null,
      {
        responseType: "blob",
      },
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
