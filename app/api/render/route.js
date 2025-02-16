import { NextResponse } from "next/server";

export async function POST(req) {

    let { details } = await req.json();

    let cleaned = details.trim();
  
    cleaned = cleaned.replace(/^\s*```(?:\w+)?\s*/i, '');
    
    cleaned = cleaned.replace(/\s*```\s*$/i, '');
    
    details = JSON.parse(cleaned);

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Portfolio - ${details?.name || "Unknown"}</title>
      <style>
        /* Global Styles */
        body {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #121212;
          color: #f5f5f5;
          line-height: 1.6;
        }
        a {
          color: #1e90ff;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
        header {
          background-color: #1e1e1e;
          padding: 20px;
          text-align: center;
        }
        header h1 {
          margin: 0;
          font-size: 2rem;
        }
        nav {
          margin-top: 15px;
        }
        nav ul {
          list-style: none;
          display: flex;
          justify-content: center;
          margin: 0;
          padding: 0;
        }
        nav ul li {
          margin: 0 15px;
        }
        nav ul li a {
          font-weight: bold;
          font-size: 1rem;
        }
        main {
          max-width: 1000px;
          margin: 40px auto;
          padding: 20px;
        }
        section {
          margin-bottom: 40px;
          background-color: #1e1e1e;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }
        section h2 {
          border-bottom: 2px solid #1e90ff;
          padding-bottom: 10px;
          margin-bottom: 20px;
        }
        ul {
          list-style-type: disc;
          margin-left: 20px;
        }
        footer {
          background-color: #1e1e1e;
          text-align: center;
          padding: 20px;
          margin-top: 40px;
        }
      </style>
    </head>
    <body>
      <header>
        <h1>${details?.name || "No Name Provided"}</h1>
        <nav>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#education">Education</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <section id="about">
          <h2>About</h2>
          <p>${details?.about || "Hi! This is " + details?.name + " Welcome to my portfolio." }</p>
        </section>
        <section id="contact">
          <h2>Contact</h2>
          <p><strong>Phone:</strong> ${details?.contact?.phone || "N/A"}</p>
          <p><strong>Email:</strong> ${details?.contact?.email || "N/A"}</p>
          <p><strong>LinkedIn:</strong> <a href="https://${details?.contact?.linkedin || "#"}" target="_blank">${details?.contact?.linkedin || "N/A"}</a></p>
          <p><strong>GitHub:</strong> <a href="https://${details?.contact?.github || "#"}" target="_blank">${details?.contact?.github || "N/A"}</a></p>
        </section>
        <section id="skills">
          <h2>Skills</h2>
          <ul>
            ${details?.skills && details.skills.length > 0 
              ? details.skills.map(skill => `<li>${skill}</li>`).join("")
              : "<li>No skills available</li>"}
          </ul>
        </section>
        <section id="education">
          <h2>Education</h2>
          <ul>
            ${details?.education && details.education.length > 0 
              ? details.education.map(edu => `<li><strong>${edu?.degree || "Unknown Degree"}</strong>, ${edu?.institution || "Unknown Institution"} (${edu?.year || "N/A"})</li>`).join("")
              : "<li>No education information available</li>"}
          </ul>
        </section>
        <section id="projects">
          <h2>Projects</h2>
          <ul>
            ${details?.projects && details.projects.length > 0 
              ? details.projects.map(proj => `<li><strong>${proj?.title || "Untitled Project"}</strong>: ${proj?.description || "No description"}<br><small>Technologies: ${proj?.technologies?.join(', ') || "N/A"}</small></li>`).join("")
              : "<li>No projects available</li>"}
          </ul>
        </section>
        <section id="certifications">
          <h2>Certifications</h2>
          <ul>
            ${details?.certifications && details.certifications.length > 0 
              ? details.certifications.map(cert => `<li>${cert?.name || "Unknown Certification"}</li>`).join("")
              : "<li>No certifications available</li>"}
          </ul>
        </section>
      </main>
      <footer>
        <p>&copy; ${new Date().getFullYear()} ${details?.name || "Portfolio"}. All rights reserved.</p>
      </footer>
    </body>
    </html>
    `;
    

try{
    console.log(htmlContent)
    return new NextResponse(htmlContent, {
        status: 200,
        headers: {
            "Content-Type": "text/html",
        }
    })

} catch (error) {
    console.log(error)
    return NextResponse.json({
        details: error,
        status: 502,
    });

    
}

}