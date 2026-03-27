### app.js

```javascript
// Smooth Scroll Implementation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Parallax Effect for hero-image and case-image
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        let offsetTop = element.offsetTop;
        let speedFactor = 0.5; // Adjust the speed factor as needed

        window.requestAnimationFrame(() => {
            element.style.backgroundPositionY = `${(window.scrollY - offsetTop) * speedFactor}px`;
        });
    });
});

// Magnetic CTA Button
const magneticButton = document.querySelector('.magnetic-button');

document.addEventListener('mousemove', (e) => {
    const buttonRect = magneticButton.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const centerX = buttonRect.left + buttonRect.width / 2;
    const centerY = buttonRect.top + buttonRect.height / 2;

    const deltaX = (mouseX - centerX) * 0.1; // Adjust the multiplier for intensity
    const deltaY = (mouseY - centerY) * 0.1;

    magneticButton.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
});

document.addEventListener('mouseleave', () => {
    magneticButton.style.transform = 'translate(0, 0)';
});

// Scale/Blur on Scroll-text if not active
const scrollText = document.querySelector('.scroll-text');

window.addEventListener('scroll', () => {
    const viewportHeight = window.innerHeight;
    const textTop = scrollText.getBoundingClientRect().top;

    if (textTop > viewportHeight || textTop < -scrollText.offsetHeight) {
        scrollText.style.transform = 'scale(0.5)';
        scrollText.style.filter = 'blur(2px)';
    } else {
        scrollText.style.transform = 'scale(1)';
        scrollText.style.filter = 'blur(0)';
    }
});
```

### style.css

```css
/* General Styles */
body, html {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
}

/* Parallax Effect */
.parallax {
    background-attachment: fixed;
    background-size: cover;
    height: 100vh; /* Adjust as needed */
}

.hero-image {
    background-image: url('path/to/hero-image.jpg'); /* Replace with your image path */
}

.case-image {
    background-image: url('path/to/case-image.jpg'); /* Replace with your image path */
}

/* Magnetic Button */
.magnetic-button {
    position: relative;
    display: inline-block;
    padding: 15px 30px;
    background-color: #3498db;
    color: white;
    border: none;
    cursor: pointer;
    transition: transform 0.2s ease-out;
}

/* Scroll Text */
.scroll-text {
    font-size: 2em;
    margin: 50px 20px;
    transition: transform 0.3s, filter 0.3s;
}
```

Make sure to replace the placeholder image paths with your actual image files.

