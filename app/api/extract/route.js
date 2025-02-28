import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import { unlinkSync } from "fs";
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
            "Extract  all relevant information from the following resume text and return a JSON object that strictly follows the schema below. This schema is designed to build a modern personal website. It includes a Hero section with a personalized greeting summary (generated by analyzing the resume text you must ensure no symbols like i'm or any i've or ticks that may interfere with html exist, e.g. \"Hello, I am John Doe, a passionate software developer...\"), a \"My Work\" section for work experience, a \"My Education\" section for the education timeline, a \"What I Have to Offer\" section that combines projects, certifications, awards, publications, volunteer experience, interests, and languages, and a \"Contact\" section (using mailto links for email). Use null for any missing single-value field and an empty array for any list fields if no data is provided. Do not output any extra commentary—only the JSON. The schema is: { 'name': '<Full Name>', 'hero': { 'greeting': '<Personalized greeting summary, e.g. \"Hello, I am John Doe, a passionate ...\", or null>', 'backgroundImage': '<URL of Background Image or null>' }, 'contact': { 'email': '<Email Address>', 'phone': '<Phone Number>', 'address': '<Postal Address or null>', 'linkedin': '<LinkedIn URL or null>', 'website': '<Personal Website URL or null>', 'github': '<GitHub URL or null>' }, 'skills': ['<Skill 1>', '<Skill 2>', '...'], 'education': [ { 'degree': '<Degree Name>', 'field_of_study': '<Field of Study or Major>', 'institution': '<Institution Name>', 'start_year': '<Start Year>', 'end_year': '<Graduation Year>', 'gpa': '<GPA (if available) or null>' } ], 'work_experience': [ { 'company': '<Company Name>', 'position': '<Job Title>', 'start_date': '<Start Date (Month/Year format)>', 'end_date': '<End Date (Month/Year or \"Present\")>', 'responsibilities': ['<Responsibility 1>', '<Responsibility 2>', '...'] } ], 'projects': [ { 'title': '<Project Title>', 'description': '<Brief Description of the Project>', 'technologies': ['<Technology 1>', '<Technology 2>', '...'] } ], 'certifications': [ { 'title': '<Certification Title>', 'issuing_organization': '<Issuing Organization>', 'year': '<Year Obtained>' } ], 'awards': ['<Award 1>', '<Award 2>', '...'], 'publications': ['<Publication 1>', '<Publication 2>', '...'], 'volunteer_experience': [ { 'organization': '<Volunteer Organization>', 'role': '<Volunteer Role>', 'description': '<Brief Description>', 'year': '<Year(s) Involved>' } ], 'interests': ['<Interest or Hobby 1>', '<Interest or Hobby 2>', '...'], 'languages': ['<Language 1>', '<Language 2>', '...'] }. Process the following resume text and output the JSON accordingly.",
        ]);


        setTimeout(() => {
            try {
                unlinkSync(filepath);
                console.log("Upload File deleted successfully!");
            } catch (err) {
                console.error("Error upload deleting file:", err);
            }
        }, 30000);


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