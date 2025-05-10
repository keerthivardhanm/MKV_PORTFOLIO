// GitHub API Integration for Projects Section

document.addEventListener('DOMContentLoaded', () => {
    // Fetch repositories from GitHub API
    async function fetchGitHubProjects() {
        const projectsContainer = document.getElementById('projects-container');
        
        try {
            const response = await fetch('https://github.com/keerthivardhanm');
            if (!response.ok) {
                throw new Error('Failed to fetch GitHub repositories');
            }
            
            let repos = await response.json();
            
            // If the GitHub username doesn't have many repos, we'll use demo projects
            if (repos.length < 4) {
                repos = createDemoProjects();
            } else {
                // Filter repos with portfolio topic if available
                const portfolioRepos = repos.filter(repo => 
                    repo.topics && repo.topics.includes('portfolio')
                );
                
                if (portfolioRepos.length > 0) {
                    repos = portfolioRepos;
                } else {
                    // Use the most recently updated repos
                    repos = repos.sort((a, b) => 
                        new Date(b.updated_at) - new Date(a.updated_at)
                    ).slice(0, 6);
                }
            }
            
            // Clear loading state
            projectsContainer.innerHTML = '';
            
            // Render project cards
            repos.forEach((repo, index) => {
                // Determine project type for filtering
                const projectTypes = getProjectType(repo);
                const projectClass = projectTypes.join(' ');
                
                // Create HTML
                const projectCard = document.createElement('div');
                projectCard.className = `project-card ${projectClass} stagger-item`;
                projectCard.setAttribute('data-description', repo.description || 'A showcase project demonstrating my skills and expertise.');
                projectCard.setAttribute('data-technologies', JSON.stringify(repo.topics || getRandomTechnologies(projectTypes[0])));
                projectCard.setAttribute('data-github', repo.html_url || `https://github.com/keerthivardhanm/${repo.name}`);
                projectCard.setAttribute('data-live', repo.homepage || `https://keerthivardhanm.github.io/${repo.name}`);
                
                projectCard.innerHTML = `
                    <div class="project-img">
                        <img src="${getProjectImage(repo, projectTypes[0])}" alt="${repo.name}">
                        <div class="project-overlay">
                            <div class="overlay-content">
                                <a href="${repo.html_url || `https://github.com/keerthivardhanm/${repo.name}`}" target="_blank"><i class="fab fa-github"></i></a>
                                <a href="${repo.homepage || `https://keerthivardhanm.github.io/${repo.name}`}" target="_blank"><i class="fas fa-external-link-alt"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="project-info">
                        <h3>${formatRepoName(repo.name)}</h3>
                        <p>${repo.description || 'A showcase project demonstrating my skills and expertise.'}</p>
                        <div class="tech-tags">
                            ${(repo.topics || getRandomTechnologies(projectTypes[0])).slice(0, 3).map(tech => `
                                <span class="tech-tag">${tech}</span>
                            `).join('')}
                        </div>
                    </div>
                `;
                
                projectsContainer.appendChild(projectCard);
                
                // Add staggered animation
                setTimeout(() => {
                    projectCard.classList.add('show');
                }, 100 * index);
            });
            
            // Initialize tilt effect and modal
            initTilt();
            setupModal();
            
        } catch (error) {
            console.error('Error fetching GitHub repositories:', error);
            projectsContainer.innerHTML = `
                <div class="error-message" style="grid-column: 1 / -1; text-align: center;">
                    <i class="fas fa-exclamation-circle" style="font-size: 3rem; color: var(--secondary-color); margin-bottom: 1rem;"></i>
                    <p>Couldn't fetch project data. Showing demo projects instead.</p>
                </div>
            `;
            
            // Display demo projects as fallback
            const demoProjects = createDemoProjects();
            renderDemoProjects(demoProjects);
        }
    }
    
    // Create demo projects as fallback
    function createDemoProjects() {
        return [
            {
                name: "Secure-Net",
                description: "A comprehensive network security monitoring tool with real-time threat detection and visualization.",
                type: "cyber",
                technologies: ["Python", "Flask", "WebSockets", "TensorFlow"]
            },
            {
                name: "E-Commerce Platform",
                description: "A fully responsive e-commerce website with secure payment integration and user authentication.",
                type: "web",
                technologies: ["JavaScript", "Node.js", "MongoDB", "Express"]
            },
            {
                name: "Vulnerability Scanner",
                description: "An automated security tool that scans networks for potential vulnerabilities and provides remediation recommendations.",
                type: "cyber",
                technologies: ["Python", "Docker", "REST API", "PostgreSQL"]
            },
            {
                name: "Portfolio Design System",
                description: "A comprehensive design system with reusable components for creating consistent digital experiences.",
                type: "design",
                technologies: ["Figma", "Sketch", "Adobe XD", "UI Components"]
            },
            {
                name: "Password Manager",
                description: "A secure password management application with end-to-end encryption and cross-platform synchronization.",
                type: "cyber",
                technologies: ["JavaScript", "React", "Electron", "End-to-End Encryption"]
            },
            {
                name: "Personal Dashboard",
                description: "A customizable dashboard application with widgets for productivity tracking and time management.",
                type: "web",
                technologies: ["JavaScript", "Vue.js", "Charts.js", "Local Storage"]
            }
        ];
    }
    
    // Render demo projects
    function renderDemoProjects(projects) {
        const projectsContainer = document.getElementById('projects-container');
        projectsContainer.innerHTML = '';
        
        projects.forEach((project, index) => {
            const projectCard = document.createElement('div');
            projectCard.className = `project-card ${project.type} stagger-item`;
            projectCard.setAttribute('data-description', project.description);
            projectCard.setAttribute('data-technologies', JSON.stringify(project.technologies));
            projectCard.setAttribute('data-github', `https://github.com/keerthivardhanm/${project.name.toLowerCase().replace(/\s+/g, '-')}`);
            projectCard.setAttribute('data-live', `https://keerthivardhanm.github.io/${project.name.toLowerCase().replace(/\s+/g, '-')}`);
            
            projectCard.innerHTML = `
                <div class="project-img">
                    <img src="${getProjectImage({name: project.name}, project.type)}" alt="${project.name}">
                    <div class="project-overlay">
                        <div class="overlay-content">
                            <a href="https://github.com/keerthivardhanm/${project.name.toLowerCase().replace(/\s+/g, '-')}" target="_blank"><i class="fab fa-github"></i></a>
                            <a href="https://keerthivardhanm.github.io/${project.name.toLowerCase().replace(/\s+/g, '-')}" target="_blank"><i class="fas fa-external-link-alt"></i></a>
                        </div>
                    </div>
                </div>
                <div class="project-info">
                    <h3>${project.name}</h3>
                    <p>${project.description}</p>
                    <div class="tech-tags">
                        ${project.technologies.slice(0, 3).map(tech => `
                            <span class="tech-tag">${tech}</span>
                        `).join('')}
                    </div>
                </div>
            `;
            
            projectsContainer.appendChild(projectCard);
            
            // Add staggered animation
            setTimeout(() => {
                projectCard.classList.add('show');
            }, 100 * index);
        });
        
        // Initialize tilt effect and modal
        initTilt();
        setupModal();
    }
    
    // Helper function to format repository name
    function formatRepoName(name) {
        return name
            .replace(/-/g, ' ')
            .replace(/_/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    
    // Helper function to determine project type for filtering
    function getProjectType(repo) {
        const name = repo.name.toLowerCase();
        const description = (repo.description || '').toLowerCase();
        const topics = repo.topics || [];
        
        const projectTypes = [];
        
        // Check for cyber security related keywords
        if (
            topics.some(topic => ['security', 'cyber', 'encryption', 'vulnerability'].includes(topic)) ||
            name.includes('security') || 
            name.includes('cyber') || 
            name.includes('secure') ||
            description.includes('security') || 
            description.includes('vulnerability') || 
            description.includes('protection')
        ) {
            projectTypes.push('cyber');
        }
        
        // Check for web development related keywords
        if (
            topics.some(topic => ['web', 'react', 'vue', 'angular', 'frontend', 'backend'].includes(topic)) ||
            name.includes('web') || 
            name.includes('app') || 
            name.includes('site') ||
            description.includes('website') || 
            description.includes('application') || 
            description.includes('platform')
        ) {
            projectTypes.push('web');
        }
        
        // Check for design related keywords
        if (
            topics.some(topic => ['design', 'ui', 'ux', 'figma', 'sketch'].includes(topic)) ||
            name.includes('design') || 
            name.includes('ui') || 
            name.includes('ux') ||
            description.includes('design') || 
            description.includes('interface') || 
            description.includes('experience')
        ) {
            projectTypes.push('design');
        }
        
        // If no specific type is detected, default to web
        if (projectTypes.length === 0) {
            projectTypes.push('web');
        }
        
        return projectTypes;
    }
    
    // Helper function to get random technologies based on project type
    function getRandomTechnologies(type) {
        const techStacks = {
            cyber: ['Python', 'C++', 'TensorFlow', 'Wireshark', 'Encryption', 'Penetration Testing', 'Firewall', 'Kali Linux'],
            web: ['JavaScript', 'HTML5', 'CSS3', 'React', 'Node.js', 'Express', 'MongoDB', 'RESTful API'],
            design: ['Figma', 'Adobe XD', 'UI/UX', 'Sketch', 'Prototyping', 'Wireframing', 'Design Systems', 'User Testing']
        };
        
        // Get the tech stack for the given type, or default to web
        const availableTechs = techStacks[type] || techStacks.web;
        
        // Randomly select 3-4 technologies
        const numTechs = Math.floor(Math.random() * 2) + 3; // 3 or 4
        const selectedTechs = [];
        
        while (selectedTechs.length < numTechs && availableTechs.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableTechs.length);
            const tech = availableTechs.splice(randomIndex, 1)[0];
            selectedTechs.push(tech);
        }
        
        return selectedTechs;
    }
    
    // Helper function to get project image
    function getProjectImage(repo, type) {
        // Use project-specific image if available
        if (repo.homepage && repo.homepage.includes('screenshot')) {
            return repo.homepage;
        }
        
        // Otherwise use a placeholder image based on project type
        const placeholders = {
            cyber: [
                "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=600",
                "https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg?auto=compress&cs=tinysrgb&w=600",
                "https://images.pexels.com/photos/207580/pexels-photo-207580.jpeg?auto=compress&cs=tinysrgb&w=600"
            ],
            web: [
                "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=600",
                "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600",
                "https://images.pexels.com/photos/957040/night-photograph-starry-sky-night-sky-star-957040.jpeg?auto=compress&cs=tinysrgb&w=600"
            ],
            design: [
                "https://images.pexels.com/photos/326424/pexels-photo-326424.jpeg?auto=compress&cs=tinysrgb&w=600",
                "https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=600",
                "https://images.pexels.com/photos/1029624/pexels-photo-1029624.jpeg?auto=compress&cs=tinysrgb&w=600"
            ]
        };
        
        const imageArray = placeholders[type] || placeholders.web;
        
        // Use hash of repo name to consistently select the same image for the same repo
        const hash = repo.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const index = hash % imageArray.length;
        
        return imageArray[index];
    }
    
    // Fetch projects
    fetchGitHubProjects();
});