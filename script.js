// Main JavaScript file for Pesantren Modern Raudhatussalam website
// Addressing issues with WhatsApp buttons, dark mode toggle, and image display

document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    initThemeToggle();
    
    // Initialize Slideshow
    initSlideshow();
    
    // Initialize WhatsApp Integration
    initWhatsAppFunctionality();
    
    // Initialize Facility Modal
    initFacilityModal();
    
    // Initialize Tab System
    initTabSystem();
    
    // Initialize FAQ Accordion
    initFaqAccordion();
    
    // Initialize Cookie Consent
    initCookieConsent();
    
    // Initialize Smooth Scrolling
    initSmoothScrolling();
    
    // Initialize Back to Top Button
    initBackToTopButton();
    
    // Initialize Lightbox Gallery
    initLightboxGallery();
    
    // Fix image loading issues
    fixImageDisplay();
    
    console.log('Pesantren Modern Raudhatussalam website initialized successfully');
});

/**
 * Theme Toggle Functionality
 * Fixes issues with dark mode toggle not working
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.querySelector('.theme-toggle-mobile');
    const body = document.body;
    
    // Check if elements exist
    if (!themeToggle && !mobileThemeToggle) {
        console.warn('Theme toggle buttons not found in the DOM');
        return;
    }
    
    // Check for saved theme preference or respect OS preference
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const currentTheme = localStorage.getItem("theme");
    
    // Set initial theme
    if (currentTheme === "dark" || (currentTheme !== "light" && prefersDarkScheme.matches)) {
        enableDarkMode();
    } else {
        enableLightMode();
    }
    
    // Toggle theme on button click (desktop)
    if (themeToggle) {
        themeToggle.addEventListener("click", function(e) {
            e.preventDefault();
            toggleTheme();
        });
    }
    
    // Toggle theme on button click (mobile)
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener("click", function(e) {
            e.preventDefault();
            toggleTheme();
        });
    }
    
    // Helper function to toggle theme
    function toggleTheme() {
        if (body.classList.contains("dark-mode")) {
            enableLightMode();
        } else {
            enableDarkMode();
        }
    }
    
    // Helper function to enable dark mode
    function enableDarkMode() {
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
        
        // Update button text and icon
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i><span>Light Mode</span>';
        }
        
        if (mobileThemeToggle) {
            mobileThemeToggle.innerHTML = '<i class="fas fa-sun"></i><span>Light</span>';
        }
    }
    
    // Helper function to enable light mode
    function enableLightMode() {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
        localStorage.setItem("theme", "light");
        
        // Update button text and icon
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i><span>Dark Mode</span>';
        }
        
        if (mobileThemeToggle) {
            mobileThemeToggle.innerHTML = '<i class="fas fa-moon"></i><span>Dark</span>';
        }
    }
    
    // Listen for changes in system preferences
    prefersDarkScheme.addEventListener("change", function(e) {
        if (!localStorage.getItem("theme")) {
            if (e.matches) {
                enableDarkMode();
            } else {
                enableLightMode();
            }
        }
    });
}

/**
 * Slideshow Functionality
 * Fixed to work reliably and properly display images
 */
function initSlideshow() {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");
    
    if (!slides.length || !dots.length) {
        console.warn('Slideshow elements not found in the DOM');
        return;
    }
    
    let slideIndex = 0;
    let slideInterval;
    
    // Display the first slide
    showSlide(slideIndex);
    
    // Start automatic slideshow
    startSlideshow();
    
    // Next/previous controls
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            slideIndex = (slideIndex - 1 + slides.length) % slides.length;
            showSlide(slideIndex);
            resetSlideInterval();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            slideIndex = (slideIndex + 1) % slides.length;
            showSlide(slideIndex);
            resetSlideInterval();
        });
    }
    
    // Thumbnail image controls
    for (let i = 0; i < dots.length; i++) {
        dots[i].addEventListener('click', function(e) {
            e.preventDefault();
            slideIndex = i;
            showSlide(slideIndex);
            resetSlideInterval();
        });
    }
    
    // Handle visibility changes (tab switching)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            clearInterval(slideInterval);
        } else {
            startSlideshow();
        }
    });
    
    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        
        // Remove active class from all dots
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        
        // Show the current slide and activate the corresponding dot
        slides[index].style.display = "block";
        if (dots[index]) {
            dots[index].className += " active";
        }
        
        // Preload the next image for smoother transitions
        const nextIndex = (index + 1) % slides.length;
        const nextSlide = slides[nextIndex];
        const nextImage = nextSlide.querySelector('img');
        
        if (nextImage && nextImage.src) {
            const preloadImg = new Image();
            preloadImg.src = nextImage.src;
        }
    }
    
    // Function to start the slideshow
    function startSlideshow() {
        // Clear any existing interval
        clearInterval(slideInterval);
        
        // Set new interval
        slideInterval = setInterval(function() {
            slideIndex = (slideIndex + 1) % slides.length;
            showSlide(slideIndex);
        }, 5000); // Change slide every 5 seconds
    }
    
    // Function to reset the slide interval after manual navigation
    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideshow();
    }
    
    // Add touch swipe functionality for mobile
    let touchStartX = 0;
    const slideshowContainer = document.querySelector('.slideshow-container');
    
    if (slideshowContainer) {
        slideshowContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        slideshowContainer.addEventListener('touchend', function(e) {
            const touchEndX = e.changedTouches[0].screenX;
            const diff = touchEndX - touchStartX;
            const threshold = 50; // Minimum swipe distance
            
            if (diff > threshold) {
                // Swipe right - show previous slide
                slideIndex = (slideIndex - 1 + slides.length) % slides.length;
            } else if (diff < -threshold) {
                // Swipe left - show next slide
                slideIndex = (slideIndex + 1) % slides.length;
            }
            
            showSlide(slideIndex);
            resetSlideInterval();
        }, { passive: true });
    }
}

/**
 * WhatsApp Integration
 * Fixed issue with WhatsApp buttons not working
 */
function initWhatsAppFunctionality() {
    // Fix individual WhatsApp buttons
    const whatsappButtons = document.querySelectorAll('.whatsapp-button, [data-number]');
    
    whatsappButtons.forEach(button => {
        // Remove existing event listeners (if any)
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        // Add new event listener
        newButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const number = this.getAttribute('data-number');
            if (!number) {
                console.warn('WhatsApp button missing data-number attribute');
                return;
            }
            
            // Format number (remove spaces, add country code if missing)
            let formattedNumber = number.replace(/\s+/g, '');
            
            // Ensure number has country code
            if (!formattedNumber.startsWith('+') && !formattedNumber.startsWith('62')) {
                if (formattedNumber.startsWith('0')) {
                    formattedNumber = '62' + formattedNumber.substring(1);
                } else {
                    formattedNumber = '62' + formattedNumber;
                }
            }
            
            // Create default message
            let message = 'Assalamualaikum, saya ingin bertanya tentang pendaftaran santri baru di Pesantren Modern Raudhatussalam.';
            
            // Open WhatsApp link
            window.open(`https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`, '_blank');
        });
    });
    
    // Fix floating WhatsApp button
    const mainWhatsappButton = document.getElementById('main-whatsapp-button');
    const whatsappOptions = document.getElementById('whatsapp-options');
    
    if (mainWhatsappButton && whatsappOptions) {
        // Remove existing event listeners
        const newMainButton = mainWhatsappButton.cloneNode(true);
        mainWhatsappButton.parentNode.replaceChild(newMainButton, mainWhatsappButton);
        
        // Add new event listener
        newMainButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            whatsappOptions.classList.toggle('active');
        });
        
        // Close the menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.floating-whatsapp')) {
                whatsappOptions.classList.remove('active');
            }
        });
        
        // Setup the option buttons
        const optionButtons = whatsappOptions.querySelectorAll('.whatsapp-option');
        
        optionButtons.forEach(option => {
            // Remove existing event listeners
            const newOption = option.cloneNode(true);
            option.parentNode.replaceChild(newOption, option);
            
            // Add new event listener
            newOption.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const number = this.getAttribute('data-number');
                if (!number) {
                    console.warn('WhatsApp option missing data-number attribute');
                    return;
                }
                
                // Format number
                let formattedNumber = number.replace(/\s+/g, '');
                
                // Ensure number has country code
                if (!formattedNumber.startsWith('+') && !formattedNumber.startsWith('62')) {
                    if (formattedNumber.startsWith('0')) {
                        formattedNumber = '62' + formattedNumber.substring(1);
                    } else {
                        formattedNumber = '62' + formattedNumber;
                    }
                }
                
                // Create default message
                let message = 'Assalamualaikum, saya ingin bertanya tentang pendaftaran santri baru di Pesantren Modern Raudhatussalam.';
                
                // Open WhatsApp link
                window.open(`https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`, '_blank');
                
                // Close the menu
                whatsappOptions.classList.remove('active');
            });
        });
    }
}

/**
 * Facility Modal
 * Fixed to properly display facility images
 */
function initFacilityModal() {
    const facilityItems = document.querySelectorAll('.facility-item');
    const facilityModal = document.getElementById('facilityModal');
    const facilityModalImage = document.getElementById('facilityModalImage');
    const facilityModalCaption = document.getElementById('facilityModalCaption');
    const closeModal = document.querySelector('.close-modal');
    
    if (!facilityModal || !facilityModalImage || !facilityModalCaption) {
        console.warn('Facility modal elements not found in the DOM');
        return;
    }
    
    // Setup facility items
    facilityItems.forEach(item => {
        item.addEventListener('click', function() {
            const imagePath = this.getAttribute('data-image');
            const facilityName = this.querySelector('.facility-name')?.textContent || 'Fasilitas';
            
            if (!imagePath) {
                console.warn('Facility item missing data-image attribute');
                return;
            }
            
            // Load image and show modal
            const img = new Image();
            img.onload = function() {
                facilityModalImage.src = imagePath;
                facilityModalCaption.textContent = facilityName;
                facilityModal.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            };
            
            img.onerror = function() {
                console.error(`Failed to load facility image: ${imagePath}`);
                facilityModalImage.src = 'img/placeholder.jpg'; // Fallback image
                facilityModalCaption.textContent = facilityName + ' (Gambar tidak tersedia)';
                facilityModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            };
            
            img.src = imagePath;
        });
    });
    
    // Close button
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            facilityModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        });
    }
    
    // Close on click outside
    facilityModal.addEventListener('click', function(e) {
        if (e.target === facilityModal) {
            facilityModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && facilityModal.style.display === 'flex') {
            facilityModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

/**
 * Tab System
 * Handles tab interfaces throughout the site
 */
function initTabSystem() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (!tabButtons.length || !tabContents.length) {
        return; // No tabs found
    }
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            if (!tabId) {
                console.warn('Tab button missing data-tab attribute');
                return;
            }
            
            // Deactivate all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Activate current tab
            this.classList.add('active');
            
            const targetTab = document.getElementById(tabId);
            if (targetTab) {
                targetTab.classList.add('active');
            } else {
                console.warn(`Tab content with ID "${tabId}" not found`);
            }
        });
    });
    
    // Activate first tab by default if none is active
    if (!document.querySelector('.tab-button.active') && tabButtons.length > 0) {
        tabButtons[0].click();
    }
}

/**
 * FAQ Accordion
 * Handles collapsible FAQ sections
 */
function initFaqAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (!faqQuestions.length) {
        return; // No FAQs found
    }
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            
            if (!answer || !answer.classList.contains('faq-answer')) {
                console.warn('FAQ answer element not found');
                return;
            }
            
            const toggle = this.querySelector('.faq-toggle i');
            
            // Check if answer is currently visible
            const isOpen = answer.style.maxHeight !== '' && answer.style.maxHeight !== '0px';
            
            if (isOpen) {
                // Close answer
                answer.style.maxHeight = '0px';
                answer.style.opacity = '0';
                
                if (toggle) {
                    toggle.className = 'fas fa-plus';
                }
            } else {
                // Open answer
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.opacity = '1';
                
                if (toggle) {
                    toggle.className = 'fas fa-minus';
                }
                
                // Close other answers (optional - uncomment to enable)
                /*
                faqQuestions.forEach(q => {
                    if (q !== question) {
                        const otherAnswer = q.nextElementSibling;
                        const otherToggle = q.querySelector('.faq-toggle i');
                        
                        if (otherAnswer) {
                            otherAnswer.style.maxHeight = '0px';
                            otherAnswer.style.opacity = '0';
                        }
                        
                        if (otherToggle) {
                            otherToggle.className = 'fas fa-plus';
                        }
                    }
                });
                */
            }
        });
    });
    
    // Initialize - make sure answers are hidden
    faqQuestions.forEach(question => {
        const answer = question.nextElementSibling;
        const toggle = question.querySelector('.faq-toggle i');
        
        if (answer) {
            answer.style.maxHeight = '0px';
            answer.style.opacity = '0';
        }
        
        if (toggle) {
            toggle.className = 'fas fa-plus';
        }
    });
}

/**
 * Cookie Consent
 * Manages cookie consent banner
 */
function initCookieConsent() {
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptCookies = document.getElementById('acceptCookies');
    const rejectCookies = document.getElementById('rejectCookies');
    
    if (!cookieConsent || !acceptCookies || !rejectCookies) {
        return; // Elements not found
    }
    
    // Check if user has already made a choice
    if (!localStorage.getItem('cookieConsent')) {
        // Show the cookie consent banner with a slight delay
        setTimeout(() => {
            cookieConsent.classList.add('active');
        }, 1000);
    }
    
    // Accept button
    acceptCookies.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieConsent.classList.remove('active');
    });
    
    // Reject button
    rejectCookies.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'rejected');
        cookieConsent.classList.remove('active');
    });
}

/**
 * Smooth Scrolling
 * Provides smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') {
                return; // Skip empty anchors
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerOffset = 80; // Adjust as needed
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL hash without scrolling
                history.pushState(null, null, targetId);
            }
        });
    });
}

/**
 * Back to Top Button
 * Manages back-to-top button visibility and behavior
 */
function initBackToTopButton() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (!backToTopButton) {
        return; // Button not found
    }
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
    
    // Scroll to top when clicked
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Initial check
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('active');
    }
}

/**
 * Lightbox Gallery
 * Initializes and configures lightbox for image galleries
 */
function initLightboxGallery() {
    // Check if lightbox is available
    if (typeof lightbox === 'undefined') {
        console.warn('Lightbox library not loaded');
        return;
    }
    
    // Configure lightbox options
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'fadeDuration': 300,
        'imageFadeDuration': 300,
        'alwaysShowNavOnTouchDevices': true,
        'disableScrolling': true
    });
}

/**
 * Fix Image Display
 * Addresses issues with images not loading correctly
 */
function fixImageDisplay() {
    // Fix all images on the page
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Skip images that are already loaded
        if (img.complete && img.naturalHeight !== 0) {
            return;
        }
        
        // Setup error handling for images
        img.onerror = function() {
            // Try to fix path by adding prefix if missing
            if (!img.src.startsWith('http') && !img.src.startsWith('/')) {
                img.src = '/' + img.src;
            }
            
            // If still fails, use a placeholder
            img.onerror = function() {
                console.warn(`Failed to load image: ${img.src}`);
                img.src = 'img/placeholder.jpg';
                img.alt = img.alt || 'Image not available';
            };
        };
    });
    
    // Fix background images
    const elementsWithBackgroundImage = document.querySelectorAll('[style*="background-image"]');
    
    elementsWithBackgroundImage.forEach(element => {
        const style = window.getComputedStyle(element);
        const backgroundImage = style.backgroundImage;
        
        if (backgroundImage && backgroundImage !== 'none') {
            // Extract URL
            const match = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
            
            if (match && match[1]) {
                const url = match[1];
                
                // Create a test image to check if URL is valid
                const testImg = new Image();
                testImg.onerror = function() {
                    // Try to fix path
                    if (!url.startsWith('http') && !url.startsWith('/')) {
                        element.style.backgroundImage = `url('/${url}')`;
                    } else {
                        // Use a placeholder background
                        element.style.backgroundImage = 'url("img/placeholder-bg.jpg")';
                    }
                };
                testImg.src = url;
            }
        }
    });
}

// Additional utility functions

/**
 * Format WhatsApp Number
 * Helper function to format WhatsApp numbers correctly
 */
function formatWhatsAppNumber(number) {
    if (!number) return '';
    
    // Remove all non-numeric characters
    let cleanNumber = number.replace(/\D/g, '');
    
    // Remove leading zero if present
    if (cleanNumber.startsWith('0')) {
        cleanNumber = cleanNumber.substring(1);
    }
    
    // Add country code if not present
    if (!cleanNumber.startsWith('62')) {
        cleanNumber = '62' + cleanNumber;
    }
    
    return cleanNumber;
}

/**
 * Create WhatsApp Link
 * Helper function to create WhatsApp links with proper formatting
 */
function createWhatsAppLink(number, message = '') {
    const formattedNumber = formatWhatsAppNumber(number);
    let encodedMessage = '';
    
    if (message) {
        encodedMessage = encodeURIComponent(message);
    } else {
        encodedMessage = encodeURIComponent('Assalamualaikum, saya ingin bertanya tentang pendaftaran santri baru di Pesantren Modern Raudhatussalam.');
    }
    
    return `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
}

/**
 * Helper to safely add event listeners
 * Ensures the event listener is only added once
 */
function safeAddEventListener(element, eventType, callback) {
    if (!element) return;
    
    // Clone the element to remove any existing event listeners
    const newElement = element.cloneNode(true);
    element.parentNode.replaceChild(newElement, element);
    
    // Add the new event listener
    newElement.addEventListener(eventType, callback);
    
    return newElement;
}

/**
 * Debug Helper 
 * Helps identify issues on the page
 */
function debugPageIssues() {
    // Check for broken images
    const images = document.querySelectorAll('img');
    let brokenImages = 0;
    
    images.forEach(img => {
        if (!img.complete || img.naturalHeight === 0) {
            console.warn(`Broken image: ${img.src}`);
            brokenImages++;
        }
    });
    
    console.log(`Found ${brokenImages} broken images out of ${images.length} total images`);
    
    // Check for non-functioning buttons
    const buttons = document.querySelectorAll('button, .whatsapp-button, [data-number]');
    buttons.forEach(button => {
        if (!button.onclick && !button.addEventListener) {
            console.warn('Button may have issues:', button);
        }
    });
    
    // Check for event listeners
    console.log('WhatsApp buttons found:', document.querySelectorAll('.whatsapp-button, [data-number]').length);
    console.log('Theme toggle found:', document.getElementById('theme-toggle') ? 'Yes' : 'No');
}

// Run debug check after everything else has initialized
setTimeout(debugPageIssues, 2000);