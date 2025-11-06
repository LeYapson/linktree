document.addEventListener('DOMContentLoaded', function() {
    // Effet de particules au clic
    function createParticle(x, y, color) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${x}px;
            top: ${y}px;
        `;
        
        document.body.appendChild(particle);
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 100 + 50;
        const life = 1000;
        
        let vx = Math.cos(angle) * velocity;
        let vy = Math.sin(angle) * velocity;
        let currentX = x;
        let currentY = y;
        let opacity = 1;
        
        const animate = () => {
            currentX += vx * 0.016;
            currentY += vy * 0.016;
            vy += 300 * 0.016; // gravité
            opacity -= 0.016;
            
            particle.style.left = currentX + 'px';
            particle.style.top = currentY + 'px';
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                if (document.body.contains(particle)) {
                    document.body.removeChild(particle);
                }
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    // Ajouter des particules au clic sur les boutons
    const linkButtons = document.querySelectorAll('.link-button');
    linkButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = button.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            
            const colors = {
                'pink': '#ff6b9d',
                'blue': '#4dabf7',
                'purple': '#9775fa',
                'green': '#51cf66',
                'orange': '#ff922b'
            };
            
            const color = colors[button.dataset.color] || '#ffffff';
            
            // Créer plusieurs particules avec des couleurs spéciales pour les sections
            const particleCount = button.closest('.support-section') ? 10 : 8;
            for (let i = 0; i < particleCount; i++) {
                setTimeout(() => {
                    createParticle(x, y, color);
                }, i * 50);
            }
        });
        
        // Effet de vibration subtile au survol
        button.addEventListener('mouseenter', function() {
            this.style.animation = 'shake 0.5s ease-in-out';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    });
    
    // Animation de typing pour le nom d'utilisateur
    const username = document.querySelector('.username');
    const originalText = username.textContent;
    username.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            username.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    setTimeout(typeWriter, 500);
    
    // Parallax subtil pour les étoiles
    document.addEventListener('mousemove', function(e) {
        const stars = document.querySelector('.stars');
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        
        stars.style.transform = `translate(${x * 0.02}px, ${y * 0.02}px)`;
    });
    
    // Effets pour les icônes sociales
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach((icon, index) => {
        // Effet de particules au clic des icônes sociales
        icon.addEventListener('click', function(e) {
            const rect = icon.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            
            const platformColors = {
                'twitch': '#9146ff',
                'twitter': '#1da1f2',
                'youtube': '#ff0000',
                'tiktok': '#fe2c55',
                'discord': '#5865f2',
                'instagram': '#e1306c'
            };
            
            const platform = icon.dataset.platform;
            const color = platformColors[platform] || '#ffffff';
            
            // Créer des particules spécifiques à la plateforme
            for (let i = 0; i < 6; i++) {
                setTimeout(() => {
                    createParticle(x, y, color);
                }, i * 30);
            }
        });
        
        // Animation de pulsation subtile
        icon.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.6s ease-in-out';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    });

    // Animation d'apparition séquentielle pour les sections
    const sections = document.querySelectorAll('.links-container');
    sections.forEach((section, index) => {
        section.style.animationDelay = `${0.8 + (index * 0.3)}s`;
    });
});

// Ajouter l'animation de shake au CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-2px); }
        75% { transform: translateX(2px); }
    }
`;
document.head.appendChild(style);

// Effet de neige pixelisée (optionnel)
function createPixelSnow() {
    const snow = document.createElement('div');
    snow.innerHTML = '❄';
    snow.style.cssText = `
        position: fixed;
        top: -10px;
        color: rgba(255, 255, 255, 0.8);
        font-size: ${Math.random() * 10 + 10}px;
        left: ${Math.random() * 100}vw;
        animation: fall ${Math.random() * 3 + 2}s linear infinite;
        pointer-events: none;
        z-index: 1;
    `;
    
    document.body.appendChild(snow);
    
    setTimeout(() => {
        if (document.body.contains(snow)) {
            document.body.removeChild(snow);
        }
    }, 5000);
}

// Ajouter l'animation de chute
const fallStyle = document.createElement('style');
fallStyle.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
        }
    }
`;
document.head.appendChild(fallStyle);

// Créer de la neige occasionnellement
setInterval(createPixelSnow, 2000);