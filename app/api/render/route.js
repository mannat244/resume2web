import { NextResponse } from "next/server";
import { writeFileSync ,fs , readFileSync , unlinkSync} from "fs";
import path from "path";



export async function POST(req) {

    let { details , templates , timestamps } = await req.json();

    let cleaned = details.trim();
  
    cleaned = cleaned.replace(/^\s*```(?:\w+)?\s*/i, '');
    
    cleaned = cleaned.replace(/\s*```\s*$/i, '');
    
    details = JSON.parse(cleaned);

    console.log(templates, timestamps)
    

let design1 = `<!DOCTYPE html>
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
</html>`;

let design2 = `<!DOCTYPE html>
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
    --primary: #00e5ff;
    --primary-dark: #00b8d4;
    --secondary: #7c4dff;
    --text: #e0e0e0;
    --dark-bg: #121212;
    --card-bg: #1e1e1e;
    --nav-bg: rgba(18, 18, 18, 0.95);
    --gradient: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    --card-hover: #2d2d2d;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
}

body {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    background-color: var(--dark-bg);
    color: var(--text);
    line-height: 1.6;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 4rem;
}

/* Navbar Styles */
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: var(--nav-bg);
    backdrop-filter: blur(10px);
    z-index: 1000;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-logo {
    font-size: 1.5rem;
    font-weight: bold;
    background: var(--gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-decoration: none;
}

.nav-logo-full {
    display: block;
}

.nav-logo-short {
    display: none;
}

.mobile-menu-btn {
    display: none;
    background: none;
    border: none;
    color: var(--text);
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
}

.nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
}

.nav-links a {
    text-decoration: none;
    color: var(--text);
    font-weight: 500;
    transition: all 0.3s;
    opacity: 0.8;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.nav-links a:hover {
    opacity: 1;
    color: var(--primary);
}

/* Hero Section */
.hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    background: var(--dark-bg);
    padding-top: 80px;
    overflow: hidden;
}

.hero::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: 
        radial-gradient(circle at 20% 30%, var(--primary-dark) 0%, transparent 70%),
        radial-gradient(circle at 80% 70%, var(--secondary) 0%, transparent 70%);
    opacity: 0.1;
    filter: blur(60px);
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
    background: var(--gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 800;
}

.typed-text {
    font-size: 1.8rem;
    margin-bottom: 2rem;
    color: var(--text);
    opacity: 0.9;
}

/* Section Styles */
section {
    padding: 5rem 0;
}

.section-title {
    font-size: 2.5rem;
    margin-bottom: 3rem;
    text-align: center;
    background: var(--gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
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

/* Skills Section */
.skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    padding: 1rem;
}

.skill-item {
    background: var(--card-bg);
    padding: 1.5rem;
    margin: 10px;
    border-radius: 12px;
    transition: all 0.3s;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
}

.skill-item:hover {
    transform: translateY(-5px);
    background: var(--card-hover);
    border-color: var(--primary);
    box-shadow: 0 10px 20px rgba(0, 229, 255, 0.1);
}

/* Timeline Styles */
.timeline-item {
    border-left: 3px solid var(--primary);
    position: relative;
    padding: 30px;
    background: var(--card-bg);
    border-radius: 0 12px 12px 0;
    margin: 0 1rem 20px 1rem;
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
    box-shadow: 0 0 10px var(--primary);
}

/* Projects Section */
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 1rem;
}

.project-card {
    background: var(--card-bg);
    border-radius: 12px;
    margin: 10px;
    padding: 1.5rem;
    transition: all 0.3s;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.project-card:hover {
    transform: translateY(-5px);
    background: var(--card-hover);
    border-color: var(--primary);
    box-shadow: 0 10px 20px rgba(0, 229, 255, 0.1);
}

/* Contact Section */
.contact-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    padding: 1rem;
}

.contact-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
    background: var(--card-bg);
    border-radius: 12px;
    transition: all 0.3s;
    text-decoration: none;
    color: var(--text);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.contact-item:hover {
    transform: translateY(-5px);
    background: var(--card-hover);
    border-color: var(--primary);
}

.contact-item i {
    font-size: 1.5rem;
    color: var(--primary);
}

/* Scroll Top Button */
.scroll-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: var(--gradient);
    color: white;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    transition: all 0.3s;
    font-size: 1.2rem;
    box-shadow: 0 4px 12px rgba(0, 229, 255, 0.3);
}

.scroll-top.visible {
    opacity: 1;
}

/* Media Queries */
@media (max-width: 768px) {
    .container {
        padding: 0 1rem;
    }

    .nav-logo-full {
        display: none;
    }

    .nav-logo-short {
        display: block;
    }

    .mobile-menu-btn {
        display: block;
        position: relative;
        z-index: 1001;
    }

    .nav-links {
        position: fixed;
        top: 70px;
        left: 0;
        right: 0;
        background: var(--nav-bg);
        padding: 1rem 2rem;
        flex-direction: column;
        gap: 1rem;
        visibility: hidden;
        opacity: 0;
        transform: translateY(-1rem);
        transition: all 0.3s ease;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .nav-links.active {
        visibility: visible;
        opacity: 1;
        transform: translateY(0);
    }

    .hero-title {
        font-size: 2.5rem;
    }

    .typed-text {
        font-size: 1.4rem;
    }

    .section-title {
        font-size: 2rem;
    }

    .timeline-item {
        margin: 0 0 20px 0;
    }
}

@media (min-width: 769px) and (max-width: 1024px) {
    .container {
        padding: 0 2rem;
    }
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
</html>`;

let design3 = `<!DOCTYPE html>
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
    --primary: #FF69B4;
    --secondary: #4ECDC4;
    --accent: #FFD700;
    --text: #2C3E50;
    --dark-bg: #F8F9FA;
    --card-bg: #FFFFFF;
    --nav-bg: rgba(255, 255, 255, 0.95);
    --gradient: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    --card-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
    --border-radius: 20px;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
}

body {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    background-color: var(--dark-bg);
    color: var(--text);
    line-height: 1.6;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

/* Navbar Styles */
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: var(--nav-bg);
    backdrop-filter: blur(10px);
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--primary);
    text-decoration: none;
    transition: all 0.3s;
}

.nav-logo:hover {
    transform: scale(1.05);
}

.nav-logo-full {
    display: block;
}

.nav-logo-short {
    display: none;
}

.mobile-menu-btn {
    display: none;
    background: none;
    border: none;
    color: var(--text);
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
}

.nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
}

.nav-links a {
    text-decoration: none;
    color: var(--text);
    font-weight: 500;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 50px;
}

.nav-links a:hover {
    background: var(--gradient);
    color: white;
    transform: translateY(-2px);
}

/* Hero Section */
.hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    padding-top: 80px;
    overflow: hidden;
}

.hero::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: 
        radial-gradient(circle at 20% 30%, var(--primary) 0%, transparent 70%),
        radial-gradient(circle at 80% 70%, var(--secondary) 0%, transparent 70%);
    opacity: 0.1;
    filter: blur(60px);
}

.hero-content {
    
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    z-index: 1;
}

.hero-text {
    padding-right: 2rem;
}

.hero-image {
    position: relative;
}



.hero-title {
    font-size: 4rem;
    margin-bottom: 1rem;
    background: var(--gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 800;
}

.typed-text {
    font-size: 1.8rem;
    margin-bottom: 2rem;
    color: var(--text);
    opacity: 0.9;
}

/* Section Styles */
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

/* Skills Section */
.skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    padding: 1rem;
}

.skill-item {
    background: var(--card-bg);
    padding: 2rem;
    border-radius: var(--border-radius);
    transition: all 0.3s;
    box-shadow: var(--card-shadow);
    text-align: center;
}

.skill-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

/* Timeline Styles */
.timeline-item {
    background: var(--card-bg);
    padding: 2rem;
    border-radius: var(--border-radius);
    margin-bottom: 2rem;
    box-shadow: var(--card-shadow);
    transition: all 0.3s;
    border-left: 5px solid var(--primary);
}

.timeline-item:hover {
    transform: translateX(10px);
}

/* Projects Section */
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 1rem;
}

.project-card {
    background: var(--card-bg);
    border-radius: var(--border-radius);
    padding: 2rem;
    transition: all 0.3s;
    box-shadow: var(--card-shadow);
}

.project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

/* Contact Section */
.contact-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    padding: 1rem;
}

.contact-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
    background: var(--card-bg);
    border-radius: var(--border-radius);
    transition: all 0.3s;
    text-decoration: none;
    color: var(--text);
    box-shadow: var(--card-shadow);
}

.contact-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    background: var(--gradient);
    color: white;
}

.contact-item i {
    font-size: 1.5rem;
    color: var(--primary);
}

.contact-item:hover i {
    color: white;
}

/* Scroll Top Button */
.scroll-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: var(--gradient);
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    transition: all 0.3s;
    font-size: 1.2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.scroll-top.visible {
    opacity: 1;
}

.scroll-top:hover {
    transform: translateY(-5px);
}

/* Media Queries */
@media (max-width: 768px) {
    .container {
        padding: 0 1rem;
    }

    .nav-logo-full {
        display: none;
    }

    .nav-logo-short {
        display: block;
    }

    .mobile-menu-btn {
        display: block;
        position: relative;
        z-index: 1001;
    }

    .nav-links {
        position: fixed;
        top: 70px;
        left: 0;
        right: 0;
        background: var(--nav-bg);
        padding: 1rem;
        flex-direction: column;
        gap: 0.5rem;
        visibility: hidden;
        opacity: 0;
        transform: translateY(-1rem);
        transition: all 0.3s ease;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    .nav-links.active {
        visibility: visible;
        opacity: 1;
        transform: translateY(0);
    }

    .hero-content {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 2rem;
    }

    .hero-text {
        padding-right: 0;
    }

    .hero-title {
        font-size: 2.5rem;
    }

    .typed-text {
        font-size: 1.4rem;
    }

    .section-title {
        font-size: 2rem;
    }
}

@media (min-width: 769px) and (max-width: 1024px) {
    .container {
        padding: 0 2rem;
    }
    
    .hero-content {
        gap: 2rem;
    }
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
</html>`;

let design4 = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio - ${details?.name || 'Portfolio'}</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.12/typed.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
    <link href="https://fonts.cdnfonts.com/css/netflix-font" rel="stylesheet">
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css">
    <style>
    :root {
    --netflix-red: #E50914;
    --netflix-black: #141414;
    --netflix-dark: #181818;
    --netflix-gray: #808080;
    --netflix-white: #FFFFFF;
    --card-hover: #2C2C2C;
    --nav-bg: rgba(20, 20, 20, 0.95);
    --gradient: linear-gradient(to bottom, rgba(20, 20, 20, 0) 0%, var(--netflix-black) 100%);
    --title-font: 'Netflix Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
}

body {
    font-family: var(--title-font);
    background-color: var(--netflix-black);
    color: var(--netflix-white);
    line-height: 1.6;
}

.container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 4%;
}

/* Navbar Styles */
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: var(--nav-bg);
    backdrop-filter: blur(10px);
    z-index: 1000;
    transition: background-color 0.3s;
}

.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 4%;
}

.nav-logo {
    font-size: 2rem;
    font-weight: bold;
    color: var(--netflix-red);
    text-decoration: none;
    transition: all 0.3s;
}

.nav-logo:hover {
    transform: scale(1.05);
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

.nav-links a {
    text-decoration: none;
    color: var(--netflix-white);
    font-weight: 500;
    transition: all 0.3s;
    opacity: 0.8;
    font-size: 0.9rem;
}

.nav-links a:hover {
    opacity: 1;
    transform: scale(1.1);
}

/* Hero Section */
.hero {
    position: relative;
    min-height: 80vh;
    display: flex;
    align-items: center;
    padding: 70px 0;
    background: linear-gradient(to bottom, rgba(20, 20, 20, 0.7), var(--netflix-black)),
                url('https://picsum.photos/1920/1080') center/cover no-repeat;
}

.hero::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 7.4rem;
    background: var(--gradient);
}

.hero-content {
    width: 100%;
    position: relative;
    z-index: 2;
    padding: 0 4%;
}

.hero-title {
    font-size: 4rem;
    font-weight: 800;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.typed-text {
    font-size: 1.8rem;
    color: var(--netflix-white);
    margin-bottom: 2rem;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

/* Section Styles */
section {
    padding: 3rem 0;
}

.section-title {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: var(--netflix-white);
    padding-left: 4%;
}

/* Skills Grid - Netflix Card Style */
.skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    padding: 0 4%;
}

.skill-item {
    background: var(--netflix-dark);
    aspect-ratio: 16/9;
    border-radius: 4px;
    transition: all 0.3s;
    overflow: hidden;
    position: relative;
}

.skill-item:hover {
    transform: scale(1.05);
    z-index: 2;
}

.skill-item h3 {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.9));
    margin: 0;
}

/* Timeline - Netflix Style */
.timeline {
    padding: 0 4%;
}

.timeline-item {
    background: var(--netflix-dark);
    padding: 2rem;
    margin-bottom: 1.5rem;
    border-radius: 4px;
    transition: all 0.3s;
}

.timeline-item:hover {
    transform: scale(1.02);
    background: var(--card-hover);
}

/* Projects Grid */
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
    padding: 0 4%;
}

.project-card {
    background: var(--netflix-dark);
    border-radius: 4px;
    overflow: hidden;
    transition: all 0.3s;
    aspect-ratio: 16/9;
    position: relative;
}

.project-card:hover {
    transform: scale(1.05);
    z-index: 2;
}

.project-card h3 {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.9));
    margin: 0;
}

/* Contact Section */
.contact-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    padding: 0 4%;
}

.contact-item {
    background: var(--netflix-dark);
    padding: 1.5rem;
    border-radius: 4px;
    transition: all 0.3s;
    text-decoration: none;
    color: var(--netflix-white);
    display: flex;
    align-items: center;
    gap: 1rem;
}

.contact-item:hover {
    transform: scale(1.05);
    background: var(--card-hover);
}

.contact-item i {
    color: var(--netflix-red);
    font-size: 1.5rem;
}

/* Mobile Menu Button */
.mobile-menu-btn {
    display: none;
    background: none;
    border: none;
    color: var(--netflix-white);
    font-size: 1.5rem;
    cursor: pointer;
}

/* Media Queries */
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
        top: 70px;
        left: 0;
        right: 0;
        background: var(--nav-bg);
        padding: 1rem 0;
        flex-direction: column;
        gap: 0;
        visibility: hidden;
        opacity: 0;
        transform: translateY(-1rem);
        transition: all 0.3s ease;
    }

    .nav-links.active {
        visibility: visible;
        opacity: 1;
        transform: translateY(0);
    }

    .nav-links a {
        padding: 1rem 2rem;
        width: 100%;
        display: block;
    }

    .hero-title {
        font-size: 2.5rem;
    }

    .typed-text {
        font-size: 1.4rem;
    }

    .section-title {
        font-size: 1.8rem;
        padding-left: 1rem;
    }
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
</html>`;

let design5 =`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio - ${details?.name || 'Portfolio'}</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.12/typed.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
    <link href="https://fonts.cdnfonts.com/css/netflix-font" rel="stylesheet">
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css">
    <style>
     :root {
            --primary: #00f2fe;
            --primary-dark: #0092ff;
            --secondary: #4837ff;
            --text: #e2e8f0;
            --text-muted: #94a3b8;
            --bg: #0f172a;
            --bg-darker: #020617;
            --card-bg: #1e293b;
            --nav-bg: rgba(15, 23, 42, 0.9);
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
            background-color: var(--bg);
            overflow-x: hidden;
        }

        /* Technical Background Pattern */
        .technical-pattern {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
                linear-gradient(rgba(15, 23, 42, 0.97), rgba(15, 23, 42, 0.97)),
                url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563eb' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
            z-index: -1;
        }

        /* Enhanced Navbar */
        .navbar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: var(--nav-bg);
            backdrop-filter: blur(10px);
            z-index: 1000;
            padding: 1rem 0;
            transition: all 0.3s ease;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .navbar.scrolled {
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
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
            background: var(--gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
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

        .nav-links a {
            text-decoration: none;
            color: var(--text);
            font-weight: 500;
            transition: all 0.3s;
            position: relative;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            border: 1px solid transparent;
        }

        .nav-links a:hover {
            border-color: var(--primary);
            background: rgba(0, 242, 254, 0.1);
            color: var(--primary);
        }

        .nav-links a i {
            color: var(--primary);
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

        /* Enhanced Hero Section */
        .hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            position: relative;
            padding-top: 80px;
            background: var(--bg-darker);
            overflow: hidden;
        }

        .hero::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background: var(--gradient);
            clip-path: polygon(70% 0, 100% 0, 100% 100%, 40% 100%);
            opacity: 0.1;
        }

        .hero-content {
            max-width: 1200px;
            margin: auto auto;
            padding: 0 2rem;
            position: relative;
            z-index: 1;
        }

        .hero-text {
            padding-right: 2rem;
        }

        .hero-title {
            font-size: 4rem;
            font-weight: 800;
            margin-bottom: 1.5rem;
            background: var(--gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            line-height: 1.2;
        }

        .typed-text {
            font-size: 1.5rem;
            margin-bottom: 2rem;
            color: var(--text-muted);
        }

        .hero-image {
            position: relative;
            width: 100%;
            height: 500px;
        }

        .hero-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
            box-shadow: 0 0 40px rgba(0, 242, 254, 0.3);
            border: 2px solid var(--primary);
        }

        /* Enhanced Section Styles */
        section {
            padding: 6rem 0;
            position: relative;
            overflow: hidden;
        }

        section:nth-child(even) {
            background: var(--bg-darker);
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
            position: relative;
            z-index: 1;
        }

        .section-title {
            font-size: 2.5rem;
            margin-bottom: 3rem;
            text-align: center;
            background: var(--gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            position: relative;
        }

        /* Enhanced Skills Grid */
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 1.5rem;
        }

        .skill-item {
            background: var(--card-bg);
            padding: 2rem;
            border-radius: 20px;
            transition: all 0.3s;
            border: 1px solid rgba(255, 255, 255, 0.1);
            text-align: center;
        }

        .skill-item:hover {
            transform: translateY(-5px);
            border-color: var(--primary);
            box-shadow: 0 0 30px rgba(0, 242, 254, 0.2);
        }

        /* Enhanced Timeline */
        .timeline {
            position: relative;
            max-width: 800px;
            margin: 0 auto;
        }

        .timeline-item {
            background: var(--card-bg);
            padding: 2rem;
            border-radius: 20px;
            margin-bottom: 2rem;
            position: relative;
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s;
        }

        .timeline-item:hover {
            transform: translateX(10px);
            border-color: var(--primary);
            box-shadow: 0 0 30px rgba(0, 242, 254, 0.2);
        }

        .timeline-item::before {
            content: '';
            position: absolute;
            left: -40px;
            top: 50%;
            width: 20px;
            height: 20px;
            background: var(--gradient);
            border-radius: 50%;
        }

        /* Enhanced Project Cards */
        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
        }

        .project-card {
            background: var(--card-bg);
            border-radius: 20px;
            padding: 2rem;
            transition: all 0.3s;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .project-card:hover {
            transform: translateY(-10px);
            border-color: var(--primary);
            box-shadow: 0 0 30px rgba(0, 242, 254, 0.2);
        }

        /* Enhanced Contact Section */
        .contact-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
        }

        .contact-item {
            background: var(--card-bg);
            padding: 2rem;
            border-radius: 20px;
            display: flex;
            align-items: center;
            gap: 1rem;
            transition: all 0.3s;
            text-decoration: none;
            color: var(--text);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .contact-item:hover {
            transform: translateY(-5px);
            border-color: var(--primary);
            box-shadow: 0 0 30px rgba(0, 242, 254, 0.2);
        }

        .contact-item i {
            font-size: 1.5rem;
            color: var(--primary);
        }

        /* Scroll Top Button */
        .scroll-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background: var(--gradient);
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            opacity: 0;
            transition: all 0.3s;
            box-shadow: 0 0 20px rgba(0, 242, 254, 0.3);
        }

        .scroll-top.visible {
            opacity: 1;
        }

        /* Mobile Responsiveness */
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
                top: 70px;
                left: 0;
                right: 0;
                background: var(--nav-bg);
                backdrop-filter: blur(10px);
                padding: 2rem;
                flex-direction: column;
                gap: 1rem;
                visibility: hidden;
                opacity: 0;
                transform: translateY(-1rem);
                transition: all 0.3s ease;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }

            .nav-links.active {
                visibility: visible;
                opacity: 1;
                transform: translateY(0);
            }

            .hero-content {
                grid-template-columns: 1fr;
                text-align: center;
                padding-top: 2rem;
                gap: 2rem;
            }

            .hero-text {
                padding-right: 0;
                order: 2;
            }


            .hero-title {
                font-size: 2.5rem;
            }

            .typed-text {
                font-size: 1.2rem;
            }

            .timeline-item::before {
                left: 50%;
                transform: translateX(-50%);
                top: -30px;
            }

            .section-title {
                font-size: 2rem;
            }
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
            <div class="hero-text">
        </div>
    </div>
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
</html>`;
let design6 =`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio - ${details?.name || 'Portfolio'}</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.12/typed.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
    <style>
        :root {
    --primary: #1a1a1a;
    --secondary: #333333;
    --accent: #d4af37;
    --accent-light: #e5c76b;
    --text: #333333;
    --bg: #ffffff;
    --card-bg: rgba(248, 248, 248, 0.95);
    --gradient: linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(51, 51, 51, 0.95) 100%);
    --font-heading: 'Playfair Display', serif;
    --font-body: 'Montserrat', sans-serif;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
}

body {
    font-family: var(--font-body);
    color: var(--text);
    line-height: 1.6;
    background-color: var(--bg);
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

/* Navbar Styles */
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(10px);
    z-index: 1000;
    padding: 1rem 0;
    border-bottom: 1px solid rgba(212, 175, 55, 0.2);
}

.nav-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-logo {
    font-family: var(--font-heading);
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--primary);
    text-decoration: none;
    letter-spacing: 1px;
}

.nav-logo-full {
    display: block;
    position: relative;
}

.nav-logo-full::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 30%;
    height: 2px;
    background: var(--accent);
    transition: width 0.3s ease;
}

.nav-logo:hover .nav-logo-full::after {
    width: 100%;
}

.nav-logo-short {
    display: none;
}

.nav-links {
    display: flex;
    gap: 3rem;
    list-style: none;
}

.nav-links a {
    text-decoration: none;
    color: var(--text);
    font-weight: 500;
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s;
    padding: 5px 0;
    position: relative;
}

.nav-links a::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--accent);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
}

.nav-links a:hover::before {
    transform: scaleX(1);
    transform-origin: left;
}

.nav-links a:hover {
    color: var(--accent);
}

.mobile-menu-btn {
    display: none;
    background: none;
    border: none;
    color: var(--text);
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
}

/* Hero Section */
.hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    padding-top: 80px;
    background: linear-gradient(45deg, rgba(26, 26, 26, 0.05) 0%, rgba(212, 175, 55, 0.05) 100%);
    overflow: hidden;
}

.hero::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 60%;
    height: 100%;
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(26, 26, 26, 0.05) 100%);
    clip-path: polygon(20% 0, 100% 0, 100% 100%, 0% 100%);
}

.hero-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    position: relative;
    z-index: 2;
}

.hero-text {
    padding-right: 2rem;
    position: relative;
}

.hero-text::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    width: 60px;
    height: 60px;
    border-left: 2px solid var(--accent);
    border-top: 2px solid var(--accent);
}

.hero-title {
    font-family: var(--font-heading);
    font-size: 4.5rem;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    color: var(--primary);
    position: relative;
}

.typed-text {
    font-size: 1.2rem;
    color: var(--secondary);
    margin-bottom: 2rem;
    font-weight: 300;
    position: relative;
    padding-left: 2rem;
}

.typed-text::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 20px;
    height: 2px;
    background: var(--accent);
}

.hero-image {
    position: relative;
    height: 600px;
}

.hero-image::before {
    content: '';
    position: absolute;
    bottom: -20px;
    right: -20px;
    width: 60px;
    height: 60px;
    border-right: 2px solid var(--accent);
    border-bottom: 2px solid var(--accent);
}

.hero-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
    box-shadow: 20px 20px 60px rgba(0, 0, 0, 0.1);
}

/* Sections */
section {
    padding: 8rem 0;
    position: relative;
}

section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, var(--accent), transparent);
}

.container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
}

.section-title {
    font-family: var(--font-heading);
    font-size: 3rem;
    margin-bottom: 4rem;
    text-align: center;
    color: var(--primary);
    position: relative;
    padding-bottom: 1rem;
}

.section-title::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 1px;
    background: linear-gradient(to right, transparent, var(--accent), transparent);
}

.section-title::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 10px;
    height: 10px;
    background: var(--accent);
    border-radius: 50%;
}

/* Skills Grid */
.skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem;
}

.skill-item {
    background: var(--card-bg);
    padding: 2.5rem;
    border-radius: 4px;
    transition: all 0.3s;
    text-align: center;
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(212, 175, 55, 0.1);
}

.skill-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent, rgba(212, 175, 55, 0.05), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s;
}

.skill-item:hover::before {
    transform: translateX(100%);
}

.skill-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    border-color: rgba(212, 175, 55, 0.3);
}

.skill-item h3 {
    font-family: var(--font-heading);
    color: var(--primary);
    font-size: 1.2rem;
    position: relative;
}

/* Timeline */
.timeline {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
}

.timeline::before {
    content: '';
    position: absolute;
    top: 0;
    left: -1px;
    width: 2px;
    height: 100%;
    background: linear-gradient(to bottom, transparent, var(--accent), transparent);
}

.timeline-item {
    border-left: 2px solid var(--accent);
    padding: 2rem 2rem 2rem 3rem;
    position: relative;
    margin-bottom: 2rem;
    background: var(--card-bg);
    border-radius: 0 4px 4px 0;
    transition: all 0.3s;
}

.timeline-item:hover {
    transform: translateX(10px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.timeline-item::before {
    content: '';
    position: absolute;
    left: -6px;
    top: 32px;
    width: 10px;
    height: 10px;
    background: var(--accent);
    border-radius: 50%;
    transition: all 0.3s;
}

.timeline-item:hover::before {
    transform: scale(1.5);
    box-shadow: 0 0 10px var(--accent);
}

.timeline-item h3 {
    font-family: var(--font-heading);
    color: var(--primary);
    margin-bottom: 0.5rem;
}

/* Projects Grid */
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
}

.project-card {
    background: var(--card-bg);
    padding: 2.5rem;
    border-radius: 4px;
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(212, 175, 55, 0.1);
}

.project-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(to right, var(--accent), var(--accent-light));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
}

.project-card:hover::before {
    transform: scaleX(1);
}

.project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    border-color: rgba(212, 175, 55, 0.3);
}

.project-card h3 {
    font-family: var(--font-heading);
    color: var(--primary);
    margin-bottom: 1rem;
}

/* Contact Section */
.contact-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
}

.contact-item {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 2rem;
    background: var(--card-bg);
    border-radius: 4px;
    transition: all 0.3s;
    text-decoration: none;
    color: var(--text);
    border: 1px solid rgba(212, 175, 55, 0.1);
    position: relative;
    overflow: hidden;
}

.contact-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent, rgba(212, 175, 55, 0.05), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s;
}

.contact-item:hover::before {
    transform: translateX(100%);
}

.contact-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    border-color
    border-color: rgba(212, 175, 55, 0.3);
}

.contact-item i {
    font-size: 1.5rem;
    color: var(--accent);
    transition: transform 0.3s ease;
}

.contact-item:hover i {
    transform: scale(1.2);
}

/* Scroll Top Button */
.scroll-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: var(--accent);
    color: white;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    transition: all 0.3s;
    font-size: 1.2rem;
    box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
}

.scroll-top.visible {
    opacity: 1;
}

.scroll-top:hover {
    background: var(--accent-light);
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(212, 175, 55, 0.4);
}

/* Mobile Responsive Styles */
@media (max-width: 1200px) {
    .hero-title {
        font-size: 4rem;
    }
    
    .hero-image {
        height: 550px;
    }
}

@media (max-width: 1024px) {
    .hero-title {
        font-size: 3.5rem;
    }
    
    .hero-image {
        height: 500px;
    }

    .section-title {
        font-size: 2.8rem;
    }
}

@media (max-width: 768px) {
    .nav-logo-full {
        display: none;
    }

    .nav-logo-short {
        display: block;
        font-size: 2rem;
    }

    .mobile-menu-btn {
        display: block;
    }

    .nav-links {
        position: fixed;
        top: 72px;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.98);
        padding: 2rem;
        flex-direction: column;
        gap: 1.5rem;
        visibility: hidden;
        opacity: 0;
        transform: translateY(-1rem);
        transition: all 0.3s ease;
        border-bottom: 1px solid rgba(212, 175, 55, 0.2);
        backdrop-filter: blur(10px);
    }

    .nav-links.active {
        visibility: visible;
        opacity: 1;
        transform: translateY(0);
    }

    .nav-links a {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .nav-links a i {
        width: 20px;
        text-align: center;
    }

    .hero-content {
        grid-template-columns: 1fr;
        gap: 3rem;
        text-align: center;
        padding-top: 2rem;
    }

    .hero-text {
        padding-right: 0;
    }

    .hero-text::before {
        display: none;
    }

    .typed-text {
        padding-left: 0;
    }

    .typed-text::before {
        display: none;
    }

    .hero-title {
        font-size: 2.8rem;
    }

    .hero-image {
        height: 400px;
        margin: 0 auto;
        max-width: 80%;
    }

    .hero-image::before {
        display: none;
    }

    .section-title {
        font-size: 2.5rem;
    }

    section {
        padding: 6rem 0;
    }
}

@media (max-width: 480px) {
    .hero-title {
        font-size: 2.2rem;
    }

    .hero-image {
        height: 300px;
        max-width: 100%;
    }

    .section-title {
        font-size: 2rem;
    }

    .skill-item,
    .project-card,
    .contact-item {
        padding: 1.5rem;
    }

    section {
        padding: 4rem 0;
    }
}

/* Animation Classes */
[data-aos] {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

[data-aos].aos-animate {
    opacity: 1;
    transform: translateY(0);
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
                ${details?.skills?.length ? <li><a href="#skills"><i class="fas fa-tools"></i> <span>Skills</span></a></li> : ''}
                ${details?.work_experience?.length ? <li><a href="#experience"><i class="fas fa-briefcase"></i> <span>Experience</span></a></li> : ''}
                ${details?.education?.length ? <li><a href="#education"><i class="fas fa-graduation-cap"></i> <span>Education</span></a></li> : ''}
                ${details?.projects?.length ? <li><a href="#projects"><i class="fas fa-code-branch"></i> <span>Projects</span></a></li> : ''}
                <li><a href="#contact"><i class="fas fa-envelope"></i> <span>Contact</span></a></li>
            </ul>
        </div>
    </nav>


   <section class="hero">
    <div class="hero-content">
        <div class="hero-text" data-aos="fade-right">
            <h1 class="hero-title">${details?.name || 'Welcome'}</h1>
            <div class="typed-text"></div>
        </div>
        <div class="hero-image" data-aos="fade-left">
            <img src="/api/placeholder/800/1000" alt="Fashion Designer Portrait">
        </div>
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
                            ${exp.responsibilities.map(resp => <li>${resp}</li>).join('')}
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
                            ${project.technologies.map(tech => <span>${tech}</span>).join(', ')}
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
</html>`;

let htmlContent;

switch (templates) {
  case 1:
    htmlContent = design1;
    break;
  case 2:
    htmlContent = design2;
    break;
  case 3:
    htmlContent = design3;
    break;
  case 4: 
  htmlContent = design4;
    break;
  case 5:
    htmlContent=design5;
    break; 
  default:
    htmlContent = design6;
    break;
}

       
try{

    const filePath = path.join(process.cwd(), "public", `portfolio_${timestamps}.html`);

    console.log(`portfolio_${timestamps}.html`)


    writeFileSync(filePath, htmlContent, "utf8");

    setTimeout(() => {
        try {
            unlinkSync(filePath);
            console.log("File deleted successfully!");
        } catch (err) {
            console.error("Error deleting file:", err);
        }
    }, 30000);

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

    