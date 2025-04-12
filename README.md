# Resume2Web - Convert Your Resume to a Stunning Website

## Introduction
Resume2Web is a powerful tool designed to help users convert their resumes into fully functional, professional-looking static websites. The main goal of this project is to provide a simple yet effective solution for professionals who want to showcase their skills and experience online without manually designing a website.

## What's New?
✅ Cloudinary Integration – We’ve replaced local file handling with Cloudinary, making the app fully compatible with serverless platforms like Vercel.
✅ Deployed Live – Visit the live app at: https://resume2webcloud.vercel.app

## Why We Built Resume2Web
Creating an online portfolio or resume website often requires knowledge of web development, hosting, and design principles. Many professionals struggle with this process, which is why Resume2Web was built:
- **Automated Conversion**: Users can upload their resumes, and the system will generate a clean, structured website from it.
- **Handcrafted Templates**: We provide multiple professionally designed templates to choose from.
- **Ease of Use**: No coding knowledge is required; simply upload your resume, and you're good to go.
- **Open-Source and Extensible**: Developers can modify and improve the project as needed.

## Tech Stack
Resume2Web is built using modern technologies to ensure high performance and ease of use:
- **Next.js**: The framework for server-side rendering and API handling.
- **Tailwind CSS**: For designing responsive and visually appealing templates.
- **Gemini AI (Google)**: Used for extracting and processing resume content.
- **Node.js**: Powers the backend and API endpoints for handling user uploads and rendering templates.

## API Endpoints
Resume2Web is divided into three main API endpoints that handle the core functionality:

### 1. `/api/upload` - Handling Resume Uploads
- Accepts a resume file (PDF) from the user.
- Temporarily stores the file and returns a reference URL.
- Ensures smooth file handling with validation and error checking.

### 2. `/api/extract` - Extracting Content from Resumes
- Parses the uploaded file to extract structured text (work experience, skills, education, etc.).
- Uses Gemini AI to refine and format extracted content.
- Returns structured JSON data containing key details.

### 3. `/api/render` - Generating the Final Website
- Takes extracted data and a selected template.
- Dynamically fills the template with the user’s resume details.
- Generates a static HTML page ready for download.

## Deployment Limitations on Vercel
Due to Vercel's limitations on writing to disk, **this project will NOT run properly on a deployed Vercel link**. The rendering process requires saving and modifying files temporarily, which is restricted in Vercel's serverless environment. But now you can use the resume2web cloud version deployed at https://resume2webcloud.vercel.app

### **To Run This Project Locally:**
1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/resume2web.git
   cd resume2web
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   Create a `.env.local` file and add the following:
   ```sh
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=<your_nextauth_secret>
   GOOGLE_CLIENT_ID=<your_google_client_id>
   GOOGLE_CLIENT_SECRET=<your_google_client_secret>
   GEMINI_API=<your_google_studio_api>
   ```
4. **Run the development server:**
   ```sh
   npm run dev
   ```
5. **Access the application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Conclusion
Resume2Web simplifies the process of turning a resume into a personal website with just a few clicks. Due to file system constraints on Vercel, the project must be run locally for full functionality. Clone the repository, set up your environment variables, and start generating your resume website today!

For contributions, feel free to fork the repository and submit a pull request. Happy coding!

