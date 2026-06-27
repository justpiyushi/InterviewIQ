import { Router } from "express";
import authUser from "../middleware/auth.middleware.js";
import upload from "../middleware/file.middleware.js";
import * as interviewController from "../controllers/interview.controller.js";

const interviewRouter = Router();

/**
 *  @route POST /api/v1/interview
 *  @description generate new interview report on the basis of user self description, resume pdf and job description
 *  @access Private
 */
interviewRouter.post(
  "/",
  authUser,
  upload.single("resume"),
  interviewController.getInterviewReport,
);

/**
 * @route GET /api/v1/interview/reports/:interviewId
 * @description get interview report by interviewId
 * @access Private
 */
interviewRouter.get(
  "/reports/:interviewId",
  authUser,
  interviewController.getInterviewReportById,
);

/**
 * @route GET /api/v1/interview/reports
 * @description get all interview reports of the logged in user
 * @access Private
 */
interviewRouter.get(
  "/reports",
  authUser,
  interviewController.getAllInterviewReportsByUser,
);

/**
 * @route GET /api/v1/interview/resume/pdf
 * @description generate resume pdf on the basis of user self description, resume content and job description
 * @access Private
 */
interviewRouter.post(
  "/resume/pdf/:interviewReportId",
  authUser,
  interviewController.generateResumePdf,
);

export default interviewRouter;
