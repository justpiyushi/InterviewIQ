import InterviewReport from "../models/interviewReport.model.js";
// IMPORT THE PURE VERSION TO AVOID THE ENOENT PATH BUG
import pdfParse from "pdf-parse/lib/pdf-parse.js";
import {
  generateInterviewReport,
  generateResumePDF,
} from "../services/ai.service.js";
import fs from "fs";

export const getInterviewReport = async (req, res) => {
  try {
    const resumeFile = req.file;

    if (!resumeFile) {
      return res.status(400).json({ message: "No resume file uploaded." });
    }

    const resumeContent = await pdfParse(resumeFile.buffer);
    const { selfDescription, jobDescription } = req.body;

    const interviewReportByAI = await generateInterviewReport({
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
    });

    const interviewReport = await InterviewReport.create({
      user: req.user._id,
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
      ...interviewReportByAI,
    });

    return res.status(201).json({
      message: "Interview report generated successfully!!",
      interviewReport,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getInterviewReportById = async (req, res) => {
  try {
    const { interviewId } = req.params;

    const interviewReport = await InterviewReport.findById(interviewId);

    if (!interviewReport) {
      return res.status(404).json({
        success: false,
        message: "Interview report not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Interview Report fetched successfully",
      interviewReport,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const getAllInterviewReportsByUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const interviewReports = await InterviewReport.find({ user: userId })
      .sort({ createdAt: -1 })
      .select(
        "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan",
      );

    return res.status(200).json({
      success: true,
      message: "Interview reports fetched successfully",
      interviewReports,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

/**
 * @description Controller to generate resume PDF based on user self description, resume and job description
 */

export const generateResumePdf = async (req, res) => {
  const { interviewReportId } = req.params;

  try {
    const interviewReport = await InterviewReport.findById(interviewReportId);

    if (!interviewReport)
      return res.status(404).json({
        message: "Interview report not found",
      });

    const { resume, jobDescription, selfDescription } = interviewReport;
    const pdfBuffer = await generateResumePDF({
      resume,
      selfDescription,
      jobDescription,
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="resume_${interviewReportId}.pdf"`,
    );

    res.send(pdfBuffer);
  } catch (error) {
    console.log(error);
  }
};
