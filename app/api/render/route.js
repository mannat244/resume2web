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
    --netflix-light-gray: #B3B3B3;
    --netflix-white: #FFFFFF;
    --card-hover: #2C2C2C;
    --nav-bg: rgba(0, 0, 0, 0.9);
    --gradient: linear-gradient(to bottom, rgba(20, 20, 20, 0) 0%, var(--netflix-black) 100%);
    --neon-glow: 0 0 10px rgba(229, 9, 20, 0.7);
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
    overflow-x: hidden;
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
        transition: all 0.3s;
        padding: 0.8rem 0;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    }

    .navbar.scrolled {
        padding: 0.5rem 0;
        background: rgba(0, 0, 0, 0.95);
    }

    .nav-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 4%;
    }

    .nav-logo {
        font-size: 2rem;
        font-weight: bold;
        color: var(--netflix-red);
        text-decoration: none;
        transition: all 0.3s;
        text-shadow: var(--neon-glow);
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
        position: relative;
    }

    .nav-links a:hover {
        opacity: 1;
    }

    .nav-links a::after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        bottom: -5px;
        left: 0;
        background-color: var(--netflix-red);
        transition: width 0.3s;
    }

    .nav-links a:hover::after {
        width: 100%;
    }

    /* Hero Section */
    .hero {
        position: relative;
        min-height: 100vh;
        display: flex;
        align-items: center;
        padding: 0;
        margin-top: 0;
        overflow: hidden;
    }

    .hero-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%), 
                    url('https://img.freepik.com/free-vector/gradient-black-technology-background_23-2149209060.jpg') center/cover no-repeat;
        z-index: -1;
    }

    .hero-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at center, rgba(229, 9, 20, 0.1), transparent 60%);
        z-index: -1;
    }

    .hero::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 10rem;
        background: var(--gradient);
        z-index: 1;
    }

    .hero-content {
        width: 100%;
        position: relative;
        z-index: 2;
        padding: 0 4%;
    }

    .hero-title {
        font-size: 5rem;
        font-weight: 800;
        margin-bottom: 1rem;
        text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.7);
        background: linear-gradient(45deg, #ffffff,rgb(209, 209, 209));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        position: relative;
        display: inline-block;
    }

    .hero-title::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 5px;
        bottom: -10px;
        left: 0;
        background: var(--netflix-red);
        box-shadow: var(--neon-glow);
    }

    .typed-text {
        font-size: 2rem;
        color: var(--netflix-white);
        margin: 2rem 0;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
    }

    .hero-cta {
        display: inline-block;
        background-color: var(--netflix-red);
        color: var(--netflix-white);
        padding: 0.8rem 2rem;
        border-radius: 4px;
        font-weight: bold;
        text-decoration: none;
        transition: all 0.3s;
        margin-top: 1rem;
        box-shadow: var(--neon-glow);
    }

    .hero-cta:hover {
        transform: scale(1.1);
        box-shadow: 0 0 20px rgba(229, 9, 20, 0.9);
    }

    .scroll-indicator {
        position: absolute;
        bottom: 3rem;
        left: 50%;
        transform: translateX(-50%);
        animation: bounce 2s infinite;
        z-index: 2;
        color: var(--netflix-white);
        font-size: 2rem;
        text-shadow: var(--neon-glow);
    }

    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0) translateX(-50%);
        }
        40% {
            transform: translateY(-20px) translateX(-50%);
        }
        60% {
            transform: translateY(-10px) translateX(-50%);
        }
    }

    /* Stats Section */
    .stats-section {
        background-color: rgba(20, 20, 20, 0.7);
        padding: 2rem 0;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .stats-container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
        text-align: center;
    }

    .stat-item {
        padding: 1.5rem;
    }

    .stat-number {
        font-size: 2.5rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
        color: var(--netflix-red);
        text-shadow: var(--neon-glow);
    }

    .stat-label {
        font-size: 0.9rem;
        color: var(--netflix-light-gray);
    }

   /* Section Styles */
section {
    padding: 4rem 0;
    position: relative;
}

section:nth-child(odd) {
    background-color: rgba(24, 24, 24, 0.7);
}

.container {
    width: 92%;
    max-width: 1400px;
    margin: 0 auto;
}

.section-title {
    font-size: 2.5rem;
    margin-bottom: 2.5rem;
    color: var(--netflix-white);
    position: relative;
    display: inline-block;
    font-weight: 700;
    letter-spacing: 0.5px;
}

.section-title::after {
    content: '';
    position: absolute;
    width: 60px;
    height: 4px;
    bottom: -10px;
    left: 0;
    background: var(--netflix-red);
    box-shadow: var(--neon-glow);
}

   .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
    margin-top: 2rem;
}

.skill-item {
    background: var(--netflix-dark);
    border-radius: 4px;
    transition: all 0.3s ease;
    overflow: hidden;
    position: relative;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    aspect-ratio: 2/3;
    cursor: pointer;
}

.skill-item:hover {
    transform: scale(1.05);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    z-index: 10;
}

.skill-poster {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover !important;
    background-position: center !important;
    transition: all 0.5s ease;
}

.skill-poster::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        0deg,
        rgba(20, 20, 20, 0.8) 0%,
        rgba(20, 20, 20, 0.4) 50%,
        rgba(20, 20, 20, 0.1) 100%
    );
    opacity: 0.7;
    transition: all 0.3s ease;
}

.skill-item:hover .skill-poster {
    transform: scale(1.1);
}

.skill-item:hover .skill-poster::before {
    opacity: 0.9;
    background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.9) 0%,
        rgba(20, 20, 20, 0.6) 50%,
        rgba(20, 20, 20, 0.3) 100%
    );
}

.skill-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1.5rem;
    z-index: 2;
    transition: all 0.4s ease;
}

.skill-item:hover .skill-content {
    transform: translateY(-10px);
}

.skill-item h3 {
    margin: 0 0 10px 0;
    font-size: 1.4rem;
    font-weight: 700;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    transition: all 0.3s;
    letter-spacing: 0.5px;
}

.skill-item:hover h3 {
    transform: scale(1.05);
    color: var(--netflix-white);
}

.skill-rating {
    display: flex;
    margin-top: 10px;
    opacity: 0.8;
    transition: all 0.3s;
}

.skill-item:hover .skill-rating {
    opacity: 1;
}

.skill-rating i {
    color: var(--netflix-red);
    margin-right: 3px;
    text-shadow: 0 0 5px rgba(229, 9, 20, 0.5);
}


    /* Timeline - Netflix Style */
    .timeline {
        padding: 0 4%;
        position: relative;
    }

    .timeline::before {
        content: '';
        position: absolute;
        width: 3px;
        background-color: var(--netflix-red);
        box-shadow: var(--neon-glow);
        top: 0;
        bottom: 0;
        left: 30px;
        margin-left: -1.5px;
    }

    .timeline-item {
        position: relative;
        background: rgba(24, 24, 24, 0.8);
        padding: 2rem 2rem 2rem 60px;
        margin-bottom: 2rem;
        border-radius: 8px;
        transition: all 0.3s;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }

    .timeline-item::before {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        background-color: var(--netflix-red);
        border: 4px solid var(--netflix-dark);
        border-radius: 50%;
        left: -10px;
        top: 2rem;
        box-shadow: var(--neon-glow);
    }

    .timeline-item:hover {
        transform: translateX(10px);
        background: var(--card-hover);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    }

    .timeline-item h3 {
        margin-bottom: 0.5rem;
        font-size: 1.4rem;
    }

    .timeline-date {
        display: inline-block;
        padding: 0.3rem 0.8rem;
        background-color: rgba(229, 9, 20, 0.2);
        border-radius: 4px;
        margin-bottom: 1rem;
        font-size: 0.9rem;
        color: var(--netflix-light-gray);
    }

    .timeline-item ul {
        list-style-type: none;
        margin-top: 1rem;
    }

    .timeline-item ul li {
        margin-bottom: 0.5rem;
        position: relative;
        padding-left: 1.5rem;
    }

    .timeline-item ul li::before {
        content: "→";
        color: var(--netflix-red);
        position: absolute;
        left: 0;
    }

   /* Projects Grid */
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 25px;
    margin-top: 2rem;
}

.project-card {
    background: var(--netflix-dark);
    border-radius: 6px;
    overflow: hidden;
    transition: all 0.4s ease;
    position: relative;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    height: 400px;
}

.project-poster {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover !important;
    background-position: center !important;
    transition: all 0.5s ease;
}

.project-poster::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        0deg,
        rgba(20, 20, 20, 0.9) 0%,
        rgba(20, 20, 20, 0.5) 50%,
        rgba(20, 20, 20, 0.3) 100%
    );
    opacity: 0.7;
    transition: all 0.3s ease;
}

.project-card:hover {
    transform: translateY(-15px) scale(1.02);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
    z-index: 10;
}

.project-card:hover .project-poster {
    transform: scale(1.1);
}

.project-card:hover .project-poster::before {
    opacity: 0.95;
    background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.95) 0%,
        rgba(20, 20, 20, 0.7) 60%,
        rgba(20, 20, 20, 0.4) 100%
    );
}

.project-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 2rem;
    z-index: 2;
    transition: all 0.5s ease;
    transform: translateY(0);
}

.project-card:hover .project-content {
    transform: translateY(-20px);
}

.project-title {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    transition: all 0.3s;
}

.project-card:hover .project-title {
    color: var(--netflix-white);
}

.project-description {
    margin-bottom: 1rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s ease;
    font-size: 1rem;
    color: var(--netflix-light-gray);
    max-height: 0;
    overflow: hidden;
}

.project-card:hover .project-description {
    opacity: 1;
    transform: translateY(0);
    max-height: 150px;
}

.project-technologies {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 1rem;
    transition: all 0.3s;
    opacity: 0.7;
}

.project-card:hover .project-technologies {
    opacity: 1;
}

.project-technologies span {
    background-color: rgba(229, 9, 20, 0.2);
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 0.85rem;
    color: var(--netflix-light-gray);
    transition: all 0.3s;
    border: 1px solid rgba(229, 9, 20, 0.3);
}

.project-technologies span:hover {
    background-color: rgba(229, 9, 20, 0.4);
    color: var(--netflix-white);
}
    /* Contact Section */
    .contact-section {
        background: linear-gradient(to bottom, var(--netflix-black), #000);
        padding: 5rem 0;
    }

    .contact-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
        padding: 0 4%;
    }

    .contact-item {
        background: rgba(28, 28, 28, 0.7);
        padding: 1.5rem;
        border-radius: 8px;
        transition: all 0.3s;
        text-decoration: none;
        color: var(--netflix-white);
        display: flex;
        align-items: center;
        gap: 1rem;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(5px);
    }

    .contact-item:hover {
        transform: translateY(-5px);
        background: var(--card-hover);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    }

    .contact-icon {
        width: 50px;
        height: 50px;
        background-color: var(--netflix-red);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: var(--neon-glow);
    }

    .contact-icon i {
        font-size: 1.5rem;
    }

    .contact-text {
        flex: 1;
    }

    .contact-text h3 {
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
    }

    /* Footer */
    footer {
        background-color: #000;
        padding: 2rem 0;
        text-align: center;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .footer-content {
        color: var(--netflix-gray);
        font-size: 0.9rem;
    }

    .footer-links {
        display: flex;
        justify-content: center;
        gap: 1.5rem;
        margin: 1rem 0;
    }

    .footer-links a {
        color: var(--netflix-light-gray);
        text-decoration: none;
        transition: color 0.3s;
    }

    .footer-links a:hover {
        color: var(--netflix-red);
    }

    /* Scroll to top */
    .scroll-top {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background-color: var(--netflix-red);
        color: var(--netflix-white);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s;
        z-index: 100;
        box-shadow: var(--neon-glow);
    }

    .scroll-top.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .scroll-top:hover {
        background-color: #c00;
        transform: translateY(-5px);
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

    /* Animations */
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .fade-in {
        animation: fadeIn 0.8s ease forwards;
    }

    /* Media Queries */
    @media (max-width: 992px) {
        .stats-container {
            grid-template-columns: repeat(2, 1fr);
        }
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

        .nav-links a::after {
            display: none;
        }

        .hero-title {
            font-size: 3rem;
        }

        .typed-text {
            font-size: 1.4rem;
        }

        .section-title {
            font-size: 2rem;
        }

        .timeline::before {
            left: 20px;
        }
        
        .timeline-item {
            padding-left: 50px;
        }
        
        .timeline-item::before {
            left: -15px;
        }
        
        .stats-container {
            grid-template-columns: 1fr;
        }
    }
	
	@media (max-width: 768px) {
    .skills-grid {
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 15px;
    }
    
    .projects-grid {
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
    
    .section-title {
        font-size: 2rem;
    }
    
    .skill-item h3 {
        font-size: 1.2rem;
    }
}

@media (max-width: 480px) {
    .skills-grid {
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 10px;
    }
    
    .project-card {
        height: 350px;
    }
    
    .project-title {
        font-size: 1.5rem;
    }
}


    @media (max-width: 576px) {
        .skills-grid, .projects-grid {
            grid-template-columns: 1fr;
        }
    }

    .skill-poster {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.skill-poster::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%);
    z-index: 1;
}

.skill-item:hover .skill-poster {
    transform: scale(1.1);
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
        <div class="hero-background"></div>
        <div class="hero-overlay"></div>
        <div class="container hero-content">
            <h1 class="hero-title fade-in">${details?.name || 'Welcome'}</h1>
            <div class="typed-text"></div>
            <a href="#skills" class="hero-cta">Explore My Work</a>
        </div>
        <div class="scroll-indicator">
            <i class="fas fa-chevron-down"></i>
        </div>
    </section>

    <div class="stats-section">
        <div class="container">
            <div class="stats-container">
                <div class="stat-item" data-aos="fade-up">
                    <div class="stat-number">5+</div>
                    <div class="stat-label">Years Experience</div>
                </div>
                <div class="stat-item" data-aos="fade-up" data-aos-delay="100">
                    <div class="stat-number">20+</div>
                    <div class="stat-label">Projects Completed</div>
                </div>
                <div class="stat-item" data-aos="fade-up" data-aos-delay="200">
                    <div class="stat-number">15+</div>
                    <div class="stat-label">Happy Clients</div>
                </div>
                <div class="stat-item" data-aos="fade-up" data-aos-delay="300">
                    <div class="stat-number">99%</div>
                    <div class="stat-label">Satisfaction Rate</div>
                </div>
            </div>
        </div>
    </div>

    ${details?.skills?.length ? `
   <section id="skills">
    <div class="container">
        <h2 class="section-title">Skills</h2>
        <div class="skills-grid">
            ${details.skills.map((skill, index) => `
            <div class="skill-item" data-aos="fade-up" data-aos-delay="${index * 50}">
                <div class="skill-poster" style="background: linear-gradient(135deg, rgba(229, 9, 20, 0.3), rgba(20, 20, 20, 0.3)), url('https://picsum.photos/seed/${skill}/300/450') center no-repeat"></div>
                <div class="skill-content">
                    <h3>${skill}</h3>
                    <div class="skill-rating">
                        ${Array(5).fill().map(() => `<i class="fas fa-star"></i>`).join('')}
                    </div>
                </div>
            </div>
            `).join('')}
        </div>
    </div>
</section>
    ` : ''}

    ${details?.work_experience?.length ? `
    <section id="experience">
        <div class="container">
            <h2 class="section-title">Work Experience</h2>
            <div class="timeline">
                ${details.work_experience.map((exp, index) => `
                    <div class="timeline-item" data-aos="fade-up" data-aos-delay="${index * 100}">
                        <h3>${exp.position} at ${exp.company}</h3>
                        <div class="timeline-date">${exp.start_date} - ${exp.end_date}</div>
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
                ${details.education.map((edu, index) => `
                    <div class="timeline-item" data-aos="fade-up" data-aos-delay="${index * 100}">
                        <h3>${edu.degree} ${edu.field_of_study ? `in ${edu.field_of_study}` : ''}</h3>
                        <div class="timeline-date">${edu.start_year || ''} - ${edu.end_year || ''}</div>
                        <p>${edu.institution || ''}</p>
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
                ${details.projects.map((project, index) => `
                    <div class="project-card" data-aos="fade-up" data-aos-delay="${index * 100}">
                        <div class="project-poster" style="background: linear-gradient(135deg, #FF416C, #FF4B2B), url('https://api.iconify.design/carbon/development.svg?color=%23ffffff&width=100&height=100') center no-repeat"></div>
                        <div class="project-content">
                            <h3 class="project-title">${project.title}</h3>
                            <p class="project-description">${project.description}</p>
                            <div class="project-technologies">
                                ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                            </div>
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
                ${details?.skills?.length ? `<li><a href="#skills"><i class="fas fa-tools"></i> <span>Skills</span></a></li>` : ''}
                ${details?.work_experience?.length ? `<li><a href="#experience"><i class="fas fa-briefcase"></i> <span>Experience</span></a></li>` : ''}
                ${details?.education?.length ? `<li><a href="#education"><i class="fas fa-graduation-cap"></i> <span>Education</span></a></li>` : ''}
                ${details?.projects?.length ? `<li><a href="#projects"><i class="fas fa-code-branch"></i> <span>Projects</span></a></li>` : ''}
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
            <img src="http://localhost:3000/girl.png" alt="Fashion Designer Portrait">
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
            console.log("HTML File deleted successfully!");
        } catch (err) {
            console.error("Error HTML deleting file:", err);
        }
    }, 60000);


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

    