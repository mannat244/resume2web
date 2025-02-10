import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { mkdir} from "fs/promises";
import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
try {
  const formData = await req.formData();
  const file = formData.get("file");

  if(!file){
    return NextResponse.json({error:"no File Found!"},{status:400})
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const uploadDir = path.join(process.cwd(),"public/userdata")
  await mkdir(uploadDir, {recursive:true})

  const timestamp = Date.now();
  const filepath = path.join(uploadDir,`resume_${timestamp}.pdf`)
  await writeFile(filepath, buffer)
  const url = `/userdata/resume_${timestamp}.pdf`
 

const genAI = new GoogleGenerativeAI("AIzaSyA0XvXVGfkCMFBeNI58aVKIKI3Skq_RADU");

const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' });

const result = await model.generateContent([
    {
        inlineData: {
            data: Buffer.from(fs.readFileSync(filepath)).toString("base64"),
            mimeType: "application/pdf",
        },
    },
    'Extract key details from this resume and return a structured JSON object with the following fields: name (Full name of the individual), contact (Email, phone number, and LinkedIn profile if available), skills (A list of all relevant technical and soft skills), experience (A list containing job roles with company (Name of the organization), position (Job title), duration (Time period of employment), responsibilities (Key tasks performed)), education (A list of degrees obtained, each containing degree (Name of the qualification), institution (Name of the university/college), year (Year of completion)), projects (A list of projects, each including title (Name of the project), description (Brief overview of the project), technologies (Technologies or tools used)), certifications (A list of certifications with name (Certification title), issuing_organization (Organization that provided the certification), year (Year of completion)). Ensure the JSON format is well-structured, clean, and free of unnecessary text. If any section is missing, return null for single values and an empty array [] for lists. Now, process the document and return only the structured JSON output without additional explanation.',
]);
console.log(result.response.text());

  return NextResponse.json({
    message: result.response.text(),
    url: `/userdata/resume_${timestamp}.pdf`,
  });
} catch (error) {
  console.log(error)
}

}

export async function GET() {
  return NextResponse.json({ message: "Hello World" });
}
