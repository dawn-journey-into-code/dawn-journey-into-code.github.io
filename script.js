document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. גלילה חלקה לקישורי התפריט ---
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // גלילה לאזור המבוקש עם קיזוז קל כדי שהתפריט לא יסתיר את הכותרת
                window.scrollTo({
                    top: targetSection.offsetTop - 70, 
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 2. אנימציות חשיפה בגלילה (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // האנימציה תתחיל כש-15% מהאלמנט נכנס למסך
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // מוסיף את המחלקה שמפעילה את האנימציה
                entry.target.classList.add('show-section');
                // מפסיק לעקוב אחרי האלמנט כדי שהאנימציה תקרה רק פעם אחת
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // תופס את כל האלמנטים המוסתרים ומתחיל לעקוב אחריהם
    const hiddenElements = document.querySelectorAll('.hidden-section');
    hiddenElements.forEach(el => observer.observe(el));
});
