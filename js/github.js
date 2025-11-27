document.addEventListener('DOMContentLoaded', () => {
    const projects = [
        {
            name: "StreamHub",
            description: "StreamHub is a fast, ad-free torrent video streaming application that allows users to instantly stream content directly from magnet links, torrent files, or direct video URLs — all from within their browser. Built with WebTorrent, Node.js, and Vite, it features real-time streaming, automatic video file detection, and a sleek dark-mode UI, delivering a seamless and fully local media experience with no tracking or third-party dependencies.",
            type: "web",
            technologies: ["WebTorrent", "Node.js", "Express", "Vite", "HTML5", "CSS3", "JavaScript"],
            github: "https://github.com/keerthivardhanm/streamhub",
            live: "no live preview availble local run only",
            image: "https://imgs.search.brave.com/51c9hEjLPV5FfSjLKMVVlrTWwD5QqVbINMrYKI13xxA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNDIv/ODc4LzEzMC9zbWFs/bC9zZWN1cnJpdHkt/bmV0d29yay1wYXNz/d29kLWRlY3J5cGlu/Zy1jeWJlci1zZWN1/cml0eS1wYXNzd29y/ZC1nbG9iYWwtb25s/aW5lLXRlY2hub2xv/Z3ktaW5mb3JtYXRp/b24tc2VjdXJpdHkt/c3lzdGVtLXBob3Rv/LmpwZw"
        },
        {
            name: "BulkGenAI Ultra",
            description: "A fully responsive e-commerce website with secure payment integration and user authentication.",
            type: "web",
            technologies: ["JavaScript", "Node.js", "MongoDB", "Express"],
            github: "https://github.com/keerthivardhanm/projects/tree/19802c630876d35fd66c94442701d1baaa616c20/BulkGenAI-Ultra",
            live: "https://bulk-image-gen.vercel.app/",
            image: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            name: "E-Commerce Platform",
            description: "A fully responsive e-commerce website with secure payment integration and user authentication.",
            type: "web",
            technologies: ["JavaScript", "Node.js", "MongoDB", "Express"],
            github: "https://github.com/keerthivardhanm/flipkart-verse-clone-app",
            live: "https://flipkart-verse-clone-app.lovable.app",
            image: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            name: "Password Manager",
            description: "A secure password management app with end-to-end encryption and cross-platform sync.",
            type: "cyber",
            technologies: ["JavaScript", "React", "Electron", "Encryption"],
            github: "https://github.com/keerthivardhanm/password-manager",
            live: "https://keerthivardhanm.github.io/password-manager",
            image: "https://imgs.search.brave.com/x-oF1FxYxY3Y7_dEWUrnRPE2QZAz70ZmpPjI6MENbig/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/c2VjdXJlLWxvZ2lu/LWNvbmNlcHQtaWxs/dXN0cmF0aW9uXzEx/NDM2MC00Njg1Lmpw/Zz9zZW10PWFpc19o/eWJyaWQmdz03NDA"
        },
        {
            name: "Python Projects Repository",
            description: "A curated collection of my Python projects, Explore the source code, documentation, and live demos for each project.",
            type: "others",
            technologies: ["Python", "Docker", "REST API", "PostgreSQL"],
            github: "https://github.com/keerthivardhanm/projects/tree/14f2e0b741f568612c9cfc490f6c073aa0c8c7fe/python-projects",
            live: "https://github.com/keerthivardhanm/projects/tree/14f2e0b741f568612c9cfc490f6c073aa0c8c7fe/python-projects",
            image: "https://imgs.search.brave.com/8bTIP7OrFu05UVky0hBY_mwW-3H-_EMQZwnNsN-Q1Ww/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMTMv/MDEzLzU2OC9zbWFs/bC9weXRob24tcHJv/Z3JhbW1pbmctbGFu/Z3VhZ2Utb24tc2Vy/dmVyLXJvb20tYmFj/a2dyb3VuZC1wcm9n/cmFtaW5nLXdvcmtm/bG93LWFic3RyYWN0/LWFsZ29yaXRobS1j/b25jZXB0LW9uLXZp/cnR1YWwtc2NyZWVu/LXBob3RvLmpwZw"
        },
        {
            name: "explore more projects",
            description: "u can find various projects on my GitHub profile, showcasing my skills in verious fields.feel free to explore.",
            type: "cyber, web, design, others",
            technologies: ["projects"],
            github: "https://github.com/keerthivardhanm",
            live: "https://github.com/keerthivardhanm",
            image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600"
        }
    ];

    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.innerHTML = '';

    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = `project-card ${project.type} stagger-item`;
        projectCard.setAttribute('data-description', project.description);
        projectCard.setAttribute('data-technologies', JSON.stringify(project.technologies));
        projectCard.setAttribute('data-github', project.github);
        projectCard.setAttribute('data-live', project.live);

        // Use project.image if available, otherwise fallback to getProjectImage
        const imgSrc = project.image || getProjectImage(project.name, project.type);

        projectCard.innerHTML = `
            <div class="project-img">
                <img src="${imgSrc}" alt="${project.name}">
                <div class="project-overlay">
                    <div class="overlay-content">
                        <a href="${project.github}" target="_blank"><i class="fab fa-github"></i></a>
                        <a href="${project.live}" target="_blank"><i class="fas fa-external-link-alt"></i></a>
                    </div>
                </div>
            </div>
            <div class="project-info">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <div class="tech-tags">
                    ${project.technologies.slice(0, 3).map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
        `;

        projectsContainer.appendChild(projectCard);

        setTimeout(() => {
            projectCard.classList.add('show');
        }, 100 * index);
    });

    initTilt();
    setupModal();

    // Image based on project type
    function getProjectImage(name, type) {
        const placeholders = {
            cyber: [
                "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg",
                "https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg",
                "https://images.pexels.com/photos/207580/pexels-photo-207580.jpeg"
            ],
            web: [
                "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg",
                "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg",
                "https://images.pexels.com/photos/957040/night-photograph-starry-sky-night-sky-star-957040.jpeg"
            ],
            design: [
                "https://images.pexels.com/photos/326424/pexels-photo-326424.jpeg",
                "https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg",
                "https://images.pexels.com/photos/1029624/pexels-photo-1029624.jpeg"
            ]
        };

        const list = placeholders[type] || placeholders.web;
        const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return list[hash % list.length] + '?auto=compress&cs=tinysrgb&w=600';
    }
});
