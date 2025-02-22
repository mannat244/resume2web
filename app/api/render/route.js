import { NextResponse } from "next/server";
import { writeFileSync } from "fs";
import path from "path";

const timestamp = Date.now();

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
    <title>Portfolio - ${details?.name || 'Portfolio'}</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.12/typed.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css">
    <style>
        :root {
            --primary: #4f46e5;
            --primary-dark: #4338ca;
            --secondary: #3b82f6;
            --text: #1f2937;
            --bg: #ffffff;
            --card-bg: #f3f4f6;
            --gradient: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            scroll-behavior: smooth;
        }

        body {
            font-family: system-ui, -apple-system, sans-serif;
            color: var(--text);
            line-height: 1.6;
        }

        /* Navbar Styles */
     .navbar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            padding: 1rem 0;
        }

        .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .nav-logo {
            font-size: 1.5rem;
            font-weight: bold;
            color: var(--primary);
            text-decoration: none;
        }

        .nav-logo-full {
            display: block;
        }

        .nav-logo-short {
            display: none;
        }

        .nav-links {
            display: flex;
            gap: 2rem;
            list-style: none;
        }

        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            color: var(--text);
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
            z-index: 1001;
        }

        .nav-links a {
            text-decoration: none;
            color: var(--text);
            font-weight: 500;
            transition: color 0.3s;
            position: relative;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .nav-links a i {
            font-size: 1.1rem;
        }

        .nav-links a::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 0;
            height: 2px;
            background: var(--gradient);
            transition: width 0.3s;
        }

        .nav-links a:hover {
            color: var(--primary);
        }

        .nav-links a:hover::after {
            width: 100%;
        }

         @media (max-width: 768px) {
            .nav-logo-full {
                display: none;
            }

            .nav-logo-short {
                display: block;
            }

            .mobile-menu-btn {
                display: block;
            }

            .nav-links {
                position: fixed;
                top: 70px; /* Height of navbar */
                left: 0;
                right: 0;
                background: rgba(255, 255, 255, 0.98);
                padding: 1rem 2rem;
                flex-direction: column;
                gap: 1rem;
                height: auto;
                visibility: hidden;
                opacity: 0;
                transform: translateY(-1rem);
                transition: all 0.3s ease;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            }

            .nav-links.active {
                visibility: visible;
                opacity: 1;
                transform: translateY(0);
            }

            .nav-links li {
                width: 100%;
            }

            .nav-links a {
                display: flex;
                align-items: center;
                padding: 0.75rem 0;
                width: 100%;
            }

            .nav-links a i {
                width: 24px;
                margin-right: 1rem;
            }
        }

        /* Contact Icons */
        .contact-item i {
            font-size: 1.5rem;
            color: var(--primary);
        }

       
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }

        /* Hero Section Enhancement */
        .hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            position: relative;
            background: var(--gradient);
            color: white;
            padding-top: 80px; /* Account for navbar */
        }

        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
            opacity: 0.1;
        }

        .hero-content {
            max-width: 800px;
            z-index: 1;
            text-align: center;
            margin: 0 auto;
        }

        .hero-title {
            font-size: 4.5rem;
            margin-bottom: 1rem;
            color: white;
            font-weight: 800;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        .typed-text {
            font-size: 1.8rem;
            margin-bottom: 2rem;
            color: rgba(255, 255, 255, 0.9);
        }

        section {
            padding: 5rem 0;
        }

        .section-title {
            font-size: 2.5rem;
            margin-bottom: 3rem;
            text-align: center;
            color: var(--primary);
            position: relative;
            padding-bottom: 1rem;
        }

        .section-title::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 3px;
            background: var(--gradient);
            border-radius: 2px;
        }

        /* Rest of the styles remain the same but with updated colors */
        .skill-item {
            background: var(--card-bg);
            padding: 1.5rem;
            margin: 10px;
            border-radius: 8px;
            transition: all 0.3s;
            border: 1px solid transparent;
        }

        .skill-item:hover {
            transform: translateY(-5px);
            border-color: var(--primary);
            box-shadow: 0 10px 20px rgba(79, 70, 229, 0.1);
        }

        .timeline-item {
            border-left: 3px solid var(--primary);
            position: relative;
            padding: 30px;
        }

        .timeline-item::before {
            content: '';
            position: absolute;
            left: -8px;
            top: 24px;
            width: 13px;
            height: 13px;
            background: var(--primary);
            border-radius: 50%;
        }

        /* Keep the rest of your existing styles... */

        projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }

        .project-card {
            background: var(--card-bg);
            border-radius: 8px;
            margin: 10px;
            padding: 1.5rem;
            transition: transform 0.3s;
        }

        .project-card:hover {
            transform: scale(1.02);
        }

        .contact-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
        }

        .contact-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            background: var(--card-bg);
            border-radius: 8px;
            transition: transform 0.3s;
            text-decoration: none;
            color: var(--text);
        }

        .contact-item:hover {
            transform: translateY(-5px);
        }

        .scroll-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background: var(--primary);
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s;
        }

        .scroll-top.visible {
            opacity: 1;
        }

        @media (max-width: 768px) {
            .hero-title {
                font-size: 2.5rem;
            }
            
            .section-title {
                font-size: 2rem;
            }

    </style>
</head>
<body>
     <nav class="navbar">
        <div class="nav-container">
            <a href="#" class="nav-logo">
                <span class="nav-logo-full">${details?.name || 'Portfolio'}</span>
                <span class="nav-logo-short">${details?.name?.split(' ').map(word => word[0]).join('') || 'P'}</span>
            </a>
            <button class="mobile-menu-btn" aria-label="Toggle navigation menu">
                <i class="fas fa-bars"></i>
            </button>
            <ul class="nav-links">
                ${details?.skills?.length ? `<li><a href="#skills"><i class="fas fa-tools"></i> <span>Skills</span></a></li>` : ''}
                ${details?.work_experience?.length ? `<li><a href="#experience"><i class="fas fa-briefcase"></i> <span>Experience</span></a></li>` : ''}
                ${details?.education?.length ? `<li><a href="#education"><i class="fas fa-graduation-cap"></i> <span>Education</span></a></li>` : ''}
                ${details?.projects?.length ? `<li><a href="#projects"><i class="fas fa-code-branch"></i> <span>Projects</span></a></li>` : ''}
                <li><a href="#contact"><i class="fas fa-envelope"></i> <span>Contact</span></a></li>
            </ul>
        </div>
    </nav>


    <section class="hero">
        <div class="container hero-content">
            <h1 class="hero-title">${details?.name || 'Welcome'}</h1>
            <div class="typed-text"></div>
        </div>
    </section>

    ${details?.skills?.length ? `
    <section id="skills">
        <div class="container">
            <h2 class="section-title">Skills</h2>
            <div class="skills-grid">
                ${details.skills.map(skill => `
                    <div class="skill-item" data-aos="fade-up">
                        <h3>${skill}</h3>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    <!-- Rest of your sections remain the same -->
    ${details?.work_experience?.length ? `
    <section id="experience">
        <div class="container">
            <h2 class="section-title">Work Experience</h2>
            <div class="timeline">
                ${details.work_experience.map(exp => `
                    <div class="timeline-item" data-aos="fade-left">
                        <h3>${exp.position} at ${exp.company}</h3>
                        <p>${exp.start_date} - ${exp.end_date}</p>
                        <ul>
                            ${exp.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    ${details?.education?.length ? `
    <section id="education">
        <div class="container">
            <h2 class="section-title">Education</h2>
            <div class="timeline">
                ${details.education.map(edu => `
                    <div class="timeline-item" data-aos="fade-right">
                        <h3>${edu.degree} ${edu.field_of_study ? `in ${edu.field_of_study}` : ''}</h3>
                        <p>${edu.institution || ''}</p>
                        <p>${edu.start_year || ''} - ${edu.end_year || ''}</p>
                        ${edu.gpa ? `<p>GPA: ${edu.gpa}</p>` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    ${details?.projects?.length ? `
    <section id="projects">
        <div class="container">
            <h2 class="section-title">Projects</h2>
            <div class="projects-grid">
                ${details.projects.map(project => `
                    <div class="project-card" data-aos="fade-up">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="technologies">
                            ${project.technologies.map(tech => `<span>${tech}</span>`).join(', ')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    <section id="contact">
        <div class="container">
            <h2 class="section-title">Contact</h2>
            <div class="contact-container">
                ${details?.contact?.email ? `
                    <a href="mailto:${details.contact.email}" class="contact-item" data-aos="fade-up">
                        <i class="fas fa-envelope"></i>
                        <span>${details.contact.email}</span>
                    </a>
                ` : ''}
                ${details?.contact?.phone ? `
                    <div class="contact-item" data-aos="fade-up">
                        <i class="fas fa-phone"></i>
                        <span>${details.contact.phone}</span>
                    </div>
                ` : ''}
                ${details?.contact?.linkedin ? `
                    <a href="${details.contact.linkedin}" class="contact-item" data-aos="fade-up" target="_blank">
                        <i class="fab fa-linkedin"></i>
                        <span>LinkedIn</span>
                    </a>
                ` : ''}
                ${details?.contact?.github ? `
                    <a href="${details.contact.github}" class="contact-item" data-aos="fade-up" target="_blank">
                        <i class="fab fa-github"></i>
                        <span>GitHub</span>
                    </a>
                ` : ''}
            </div>
        </div>
    </section>

    <div class="scroll-top">↑</div>

    <script>

        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        let isMenuOpen = false;

        function toggleMenu() {
            isMenuOpen = !isMenuOpen;
            navLinks.classList.toggle('active');
            mobileMenuBtn.innerHTML = isMenuOpen 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
            mobileMenuBtn.setAttribute('aria-expanded', isMenuOpen);
        }

        function closeMenu() {
            if (isMenuOpen) {
                isMenuOpen = false;
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        }

        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-container')) {
                closeMenu();
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });


        // Initialize Typed.js
        if (${details?.hero?.greeting ? true : false}) {
            new Typed('.typed-text', {
                strings: ['${details?.hero?.greeting || ''}'],
                typeSpeed:  30,
                backSpeed: 30,
                loop: false
            });
        }

        // Initialize AOS
        AOS.init({
            duration: 1000,
            once: true
        });

        // Scroll to top functionality
        const scrollTop = document.querySelector('.scroll-top');
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                scrollTop.classList.add('visible');
            } else {
                scrollTop.classList.remove('visible');
            }
        });

        scrollTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    </script>
</body>
</html>
`;
    
    
    

try{
    console.log(htmlContent)

    
    const filePath = path.join(process.cwd(), "public", `portfolio_${timestamp}.html`);

    console.log(`portfolio_${timestamp}.html`)

    writeFileSync(filePath, htmlContent, "utf8");

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

    