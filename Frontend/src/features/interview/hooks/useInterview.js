import * as interviewAPI from "../services/interview.api.js";
import { useContext, useEffect } from "react";
import { InterviewContext } from "../Interview.context.jsx";
import { useParams } from "react-router";

export const useInterview = () => {
  const context = useContext(InterviewContext);
  const { interviewId } = useParams();

  if (!context)
    throw new Error("useInterview must be used within InterviewProvider");

  const { loading, setLoading, report, setReport, reports, setReports } =
    useContext(InterviewContext);

  const generateReport = async ({
    jobDescription,
    selfDescription,
    resume,
  }) => {
    setLoading(true);
    let response = null;

    try {
      response = await interviewAPI.generateInterviewReport({
        jobDescription,
        selfDescription,
        resume,
      });
      setReport(response.interviewReport);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

    return response.data.interviewReport;
  };

  const getReportById = async (interviewId) => {
    setLoading(true);
    let response = null;

    try {
      response = await interviewAPI.getInterviewReportById(interviewId);
      setReport(response.data.interviewReport);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    return response.data.interviewReport;
  };

  const getAllReports = async () => {
    setLoading(true);
    let response = null;

    try {
      response = await interviewAPI.getAllInterviewReports();
      setReports(response.interviewReports);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

    return response.interviewReports;
  };

  const getResumePdf = async (interviewReportId) => {
    setLoading(true);
    let response = null;
    try {
      const response = await interviewAPI.generateResumePdf({
        interviewReportId,
      });

      const url = window.URL.createObjectURL(
        new Blob([response], { type: "application/pdf" }),
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `resume_${interviewReportId}.pdf`);
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(url);
      link.remove();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    } else {
      getAllReports();
    }
  }, [interviewId]);

  return {
    loading,
    report,
    reports,
    generateReport,
    getAllReports,
    getReportById,
    getResumePdf,
  };
};
