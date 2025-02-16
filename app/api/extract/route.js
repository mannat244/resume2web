import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import { NextResponse } from "next/server";


const genAI = new GoogleGenerativeAI("AIzaSyA0XvXVGfkCMFBeNI58aVKIKI3Skq_RADU");
const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' });

export async function POST(req) {
    const data = await req.json()
    console.log(data)
    const filepath = await data.path ;
    console.log(filepath)

    try {

        const result = await model.generateContent([
            {
                inlineData: {
                    data: Buffer.from(fs.readFileSync(filepath)).toString("base64"),
                    mimeType: "application/pdf",
                },
            },
            'Extract key details from this resume and return a structured JSON object with the following fields: name (Full name of the individual), contact (Email, phone number, and LinkedIn profile if available), skills (A list of all relevant technical and soft skills), experience (A list containing job roles with company (Name of the organization), position (Job title), duration (Time period of employment), responsibilities (Key tasks performed)), education (A list of degrees obtained, each containing degree (Name of the qualification), institution (Name of the university/college), year (Year of completion)), projects (A list of projects, each including title (Name of the project), description (Brief overview of the project), technologies (Technologies or tools used)), certifications (A list of certifications with name (Certification title), issuing_organization (Organization that provided the certification), year (Year of completion)). Ensure the JSON format is well-structured, clean, and free of unnecessary text. If any section is missing, return null for single values and an empty array [] for lists. Now, process the document and return only the structured JSON output without additional explanation.',
        ]);

        return NextResponse.json({
            details: result.response.text().replace(/^```json\s*/, "").replace(/\s*```$/, ""),
            status: 200,
        });

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            details: error,
            status: 502,
        });

        
    }


}