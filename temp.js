document.addEventListener("DOMContentLoaded", function() {
    const emojiContainer = document.querySelector('.emoji-container');
  const imageContainer = document.querySelector('.image-container');
  const imageRect = getElementBoundingRect(imageContainer);
  const leftBoundary = 100; // Adjust this value to change the left boundary

  function createEmoji() {
    const emoji = document.createElement('i');
    emoji.classList.add('fas');
    const icons = ['fa-heart', 'fa-kiss'];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    emoji.classList.add(randomIcon);
    emoji.style.color = getRandomColor();

    // Set initial position and size
    const imageSize = Math.floor(Math.random() * 30) + 20;
    emoji.style.fontSize = `${imageSize}px`;
    const startX = imageRect.left + imageRect.width / 2;
    const startY = imageRect.top;

    emoji.style.left = `${startX}px`;
    emoji.style.top = `${startY}px`;

    // Randomize direction
    const cornerX = Math.random() < 0.5 ? leftBoundary : window.innerWidth - leftBoundary;
    const cornerY = Math.random() < 0.5 ? 0 : window.innerHeight;

    // Calculate speed based on distance to corner
    const distanceX = Math.abs(cornerX - startX);
    const distanceY = Math.abs(cornerY - startY);
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    const speedX = (cornerX - startX) / distance * 2;
    const speedY = (cornerY - startY) / distance * 2;

    // Append emoji to container
    emojiContainer.appendChild(emoji);

    // Animate emoji
    animateEmoji(emoji, startX, startY, speedX, speedY);

    // Remove emoji after animation
    setTimeout(() => {
      emoji.remove();
    }, 4000);
  }
  
    function animateEmoji(emoji, x, y, speedX, speedY) {
      const animationFrame = () => {
        x += speedX;
        y += speedY;
  
        emoji.style.left = `${x}px`;
        emoji.style.top = `${y}px`;
  
        // Increase size
        const currentSize = parseFloat(emoji.style.fontSize.replace('px', ''));
        emoji.style.fontSize = `${currentSize * 1.001}px`;
  
        requestAnimationFrame(animationFrame);
      };
  
      requestAnimationFrame(animationFrame);
    }
  
    function getRandomColor() {
        const red = Math.floor(Math.random() * 51) + 204; // Random value for the red component (204-255)
        const green = 0; // Fixed at zero
        const blue = 0; // Fixed at zero
        return `rgb(${red}, ${green}, ${blue})`; // Return the color in RGB format
    }
    
  
    function getElementBoundingRect(element) {
      const rect = element.getBoundingClientRect();
      return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
        width: rect.width,
        height: rect.height
      };
    }
  
    setInterval(createEmoji, 500);
  });