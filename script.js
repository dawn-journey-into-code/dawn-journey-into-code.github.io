document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. גלילה חלקה לקישורי התפריט ותמיכה בקישורים חיצוניים ---
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // בודקים אם הקישור הוא עוגן פנימי באותו עמוד (מתחיל בסולמית)
            if (href && href.startsWith('#')) {
                e.preventDefault(); // עוצר את הקפיצה הרגילה רק לקישורים פנימיים!
                
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    // גלילה לאזור המבוקש עם קיזוז קל כדי שהתפריט לא יסתיר את הכותרת
                    window.scrollTo({
                        top: targetSection.offsetTop - 70, 
                        behavior: 'smooth'
                    });
                }
            }
            // אם הקישור לא מתחיל בסולמית (כמו 'lumi.html'), הקוד מתעלם והדפדפן יעבור דף כרגיל.
        });
    });

    // --- 2. אנימציות חשיפה בגלילה מרובה (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // האנימציה תתחיל כש-15% מהאלמנט נכנס למסך
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // כשהאלמנט נכנס למסך (בגלילה למטה או למעלה) - מפעיל את האנימציה
                entry.target.classList.add('show-section');
            } else {
                // כשהאלמנט יוצא מהמסך - מאפס אותו כדי שהאנימציה תקרה שוב בפעם הבאה
                entry.target.classList.remove('show-section');
            }
        });
    }, observerOptions);

    // תופס את כל האלמנטים המוסתרים ומתחיל לעקוב אחריהם ללא הפסקה
    const hiddenElements = document.querySelectorAll('.hidden-section');
    hiddenElements.forEach(el => observer.observe(el));
});
