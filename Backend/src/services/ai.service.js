import { GoogleGenAI } from "@google/genai";
import * as z from "zod";
import puppeteer from "puppeteer";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      "A score between 0 and 100 indicating how well the candidate's profile match with the job description",
    ),
  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The technical question that can be asked in interview"),
        intention: z
          .string()
          .describe("The intention of interviewer behind asking this question"),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, what approach to take etc.",
          ),
      }),
    )
    .describe(
      "Technical questions that can be asked in the interview along with their intention and answer",
    ),
  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The behavioral question that can be asked in interview"),
        intention: z
          .string()
          .describe("The intention of interviewer behind asking this question"),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, what approach to take etc.",
          ),
      }),
    )
    .describe(
      "Behavioral questions that can be asked in the interview along with their intention and answer",
    ),
  skillGaps: z
    .array(
      z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z
          .enum(["low", "medium", "high"])
          .describe("The severity of the skill gap"),
      }),
    )
    .describe(
      "List of skills which the candidate lacks along with their severity level",
    ),
  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe("The day number in teh preparation plan, starting from 1"),
        focus: z
          .string()
          .describe("The main focus of this day in the preparation plan"),
        tasks: z
          .array(z.string())
          .describe("List of tasks to be done on this day"),
      }),
    )
    .describe(
      "A day-wise preparation plan for the candidate to follow in order",
    ),
  title: z.string().describe("The title of the interview report"),
});

const jsonSchema = z.toJSONSchema(interviewReportSchema);
delete jsonSchema.$schema;

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  try {
    const prompt = `You are an experienced technical interviewer.

Analyze the candidate's resume, self-description and job description.

Generate ONLY the following information.

1. matchScore
   - Integer between 0 and 100.

2. technicalQuestions (an array of objects)
   - 10 technical interview questions.
   - For each question provide:
     - question
     - intention
     - answer

3. behavioralQuestions (an array of objects)
   - 5 behavioral questions.
   - For each question provide:
     - question
     - intention
     - answer

4. skillGaps (an array of objects)
   - List missing skills.
   - Severity must be low, medium or high.

5. preparationPlan (an array of objects)
   - 7-day preparation plan.
   - Each day should contain:
       - day
       - focus
       - tasks

Return ONLY valid JSON.
Do not include markdown.
Do not include explanations.
Do not invent additional fields.

Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}
        `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: jsonSchema,
      },
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.log(error);
  }
}

async function generateResumePDF({ resume, selfDescription, jobDescription }) {
  const resumepdfSchema = z.object({
    html: z
      .string()
      .describe(
        "The HTML content of the resume which can be converted to PDF using any library like puppeteer",
      ),
  });

  const prompt = `Generate resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
                    `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: z.toJSONSchema(resumepdfSchema),
      },
    });

    const jsonContent = JSON.parse(response.text);

    const pdfBuffer = await generatePdfFromHtml(jsonContent.html);

    console.log("Finished preparing PDF");
    return pdfBuffer;
  } catch (error) {
    console.log(error);
  }
}

async function generatePdfFromHtml(htmlContent) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    margin: {
      top: "20mm",
      bottom: "20mm",
      left: "15mm",
      right: "15mm",
    },
  });

  await browser.close();
  return pdfBuffer;
}

export { generateInterviewReport, generateResumePDF };
