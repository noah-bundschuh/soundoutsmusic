
/* Gallery: Hidden Part Toggle */
const hiddenGallery = document.getElementById('hidden-gallery');
const galleryHideBtn = document.getElementById('hidden-gallery-btn');

// Initales Setzen Auf hidden
if (!hiddenGallery.style.display) {
    hiddenGallery.style.display = 'none'; // Oder was dein Layout braucht
}

// Button Toggle Funktionalität
galleryHideBtn.addEventListener('click', () => {

    if (hiddenGallery.style.display === 'none') {
        hiddenGallery.style.display = 'grid';
        galleryHideBtn.innerHTML = 'Weniger anzeigen';
    } else {
        hiddenGallery.style.display = 'none';
        galleryHideBtn.innerHTML = 'Mehr anzeigen';
    }
});



/* Gallery Overlay */
document.addEventListener('DOMContentLoaded', () => {
    // Toggle für versteckte Galerie
    const hiddenGallery = document.getElementById('hidden-gallery');
    const toggleBtn = document.getElementById('hidden-gallery-btn');
    let isExpanded = false;
    
    if (toggleBtn && hiddenGallery) {
        toggleBtn.addEventListener('click', () => {
            hiddenGallery.classList.toggle('hiddenGallery');
            isExpanded = !isExpanded;
            toggleBtn.textContent = isExpanded ? 'Weniger anzeigen' : 'Mehr anzeigen';
        });
    }
    
    // Lightbox Elemente
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');
    const lightboxVideoSource = document.getElementById('lightbox-video-source');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    // Items in der richtigen Reihenfolge sammeln
    const allItems = [];
    
    // Alle .imgCard durchgehen (behält DOM-Reihenfolge)
    document.querySelectorAll('.imgCard').forEach(card => {
        if (card.classList.contains('videoThumbnail')) {
            // Es ist ein Video
            const videoSrc = card.dataset.video;
            const img = card.querySelector('img');
            
            if (videoSrc) {
                allItems.push({
                    type: 'video',
                    src: videoSrc,
                    alt: img ? img.alt : 'Video',
                    element: card
                });
            }
        } else if (card.classList.contains('imgThumbnail')) {
            // Es ist ein Bild
            const img = card.querySelector('img');
            
            if (img) {
                allItems.push({
                    type: 'image',
                    src: img.src,
                    alt: img.alt,
                    element: card
                });
            }
        }
    });
    
    console.log('=== ITEMS IN REIHENFOLGE ===');
    allItems.forEach((item, i) => {
        console.log(`${i}: ${item.type} - ${item.src}`);
    });
    
    let currentIndex = 0;
    
    // Funktion zum Öffnen der Lightbox
    function openLightbox(index) {
        currentIndex = index;
        const item = allItems[index];
        
        console.log('Öffne Index', index, ':', item.type);
        
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        if (lightboxCaption) {
            lightboxCaption.textContent = item.alt;
        }
        
        if (item.type === 'image') {
            lightboxImg.src = item.src;
            lightboxImg.style.display = 'block';
            lightboxVideo.style.display = 'none';
            lightboxVideo.pause();
        } else if (item.type === 'video') {
            lightboxVideoSource.src = item.src;
            lightboxVideo.load();
            lightboxVideo.style.display = 'block';
            lightboxImg.style.display = 'none';
        }
    }
    
    // Funktion zum Schließen
    function closeLightbox() {
        lightbox.style.display = 'none';
        lightboxVideo.pause();
        lightboxImg.style.display = 'none';
        lightboxVideo.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Click Events für alle Items
    allItems.forEach((item, index) => {
        item.element.style.cursor = 'pointer';
        item.element.addEventListener('click', () => {
            openLightbox(index);
        });
    });
    
    // Close Button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }
    
    // Klick außerhalb
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Previous Button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + allItems.length) % allItems.length;
            openLightbox(currentIndex);
        });
    }
    
    // Next Button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % allItems.length;
            openLightbox(currentIndex);
        });
    }
    
    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'block') {
            if (e.key === 'Escape') {
                closeLightbox();
            }
            if (e.key === 'ArrowLeft' && prevBtn) {
                prevBtn.click();
            }
            if (e.key === 'ArrowRight' && nextBtn) {
                nextBtn.click();
            }
        }
    });
});