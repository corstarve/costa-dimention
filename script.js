document.addEventListener("DOMContentLoaded", () => {
    
    const clockElement = document.getElementById('live-clock');
    
    if (clockElement) {
        function updateTime() {
            const now = new Date();
            const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' };
            const dateStr = now.toLocaleDateString('en-GB', options).replace(/,/g, '');
            const timeStr = now.toISOString().substring(11, 19);
            clockElement.textContent = `${dateStr} ${timeStr} GMT`;
        }
        setInterval(updateTime, 1000);
        updateTime();
    }

    //скрол
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (fadeElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        fadeElements.forEach(el => observer.observe(el));
    }
});

//карусель
const carouselData = {
    arts: {
        images: ["images/rutilda.png", "images/yan.png", "images/fri.png", "images/sybau.png", "images/postal.png"],
        currentIndex: 0,
        elementId: 'arts-carousel'
    },
    sketches: {
        images: ["images/lili.png", "images/rika.png", "images/lewi.png", "images/home.png", "images/rut.png", "images/mi.png", "images/ref.png"],
        currentIndex: 0,
        elementId: 'sketches-carousel'
    }
};
//картинки
window.changeImage = function(type, direction) {
    const data = carouselData[type];
    if (!data) return;

    const imgElement = document.getElementById(data.elementId);
    if (!imgElement) return;
    
    imgElement.style.opacity = 0;
    
    setTimeout(() => {
        data.currentIndex = (data.currentIndex + direction + data.images.length) % data.images.length;
        imgElement.src = data.images[data.currentIndex];
        imgElement.style.opacity = 1;
    }, 500);
};