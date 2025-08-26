/* ===================================
   ACCESSIBILITY TOGGLE FUNCTIONALITY
   Manages the accessibility mode toggle
   =================================== */

(function() {
    'use strict';

    // Initialize accessibility toggle when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        initAccessibilityToggle();
    });

    function initAccessibilityToggle() {
        const toggleButton = document.getElementById('accessibilityToggle');
        const accessText = document.getElementById('accessText');
        const body = document.body;
        
        if (!toggleButton) {
            console.warn('Accessibility toggle button not found');
            return;
        }

        // Check if accessibility mode was previously enabled
        const isAccessibilityMode = localStorage.getItem('accessibilityMode') === 'true';
        
        if (isAccessibilityMode) {
            enableAccessibilityMode();
        }

        // Add click event listener
        toggleButton.addEventListener('click', function(e) {
            e.preventDefault();
            toggleAccessibilityMode();
        });

        // Add keyboard support
        toggleButton.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleAccessibilityMode();
            }
        });

        function toggleAccessibilityMode() {
            const isCurrentlyEnabled = body.classList.contains('accessibility-mode');
            
            if (isCurrentlyEnabled) {
                disableAccessibilityMode();
            } else {
                enableAccessibilityMode();
            }
        }

        function enableAccessibilityMode() {
            body.classList.add('accessibility-mode');
            
            // Update button text and icon
            if (accessText) {
                accessText.textContent = 'ON';
            }
            
            // Update button title
            toggleButton.setAttribute('title', 'Desactivar modo accesible');
            toggleButton.setAttribute('aria-pressed', 'true');
            
            // Change icon to indicate active state
            const icon = toggleButton.querySelector('i');
            if (icon) {
                icon.className = 'bi bi-eye-slash';
            }
            
            // Save preference
            localStorage.setItem('accessibilityMode', 'true');
            
            // Apply accessibility improvements
            applyAccessibilityStyles();
            
            // Show notification
            showAccessibilityNotification('Modo accesible activado', 'success');
        }

        function disableAccessibilityMode() {
            body.classList.remove('accessibility-mode');
            
            // Update button text and icon
            if (accessText) {
                accessText.textContent = 'A11Y';
            }
            
            // Update button title
            toggleButton.setAttribute('title', 'Activar modo accesible');
            toggleButton.setAttribute('aria-pressed', 'false');
            
            // Change icon back to normal
            const icon = toggleButton.querySelector('i');
            if (icon) {
                icon.className = 'bi bi-eye';
            }
            
            // Save preference
            localStorage.setItem('accessibilityMode', 'false');
            
            // Remove accessibility styles
            removeAccessibilityStyles();
            
            // Show notification
            showAccessibilityNotification('Modo accesible desactivado', 'info');
        }

        function applyAccessibilityStyles() {
            // Create and inject accessibility CSS if not already present
            let accessibilityStylesheet = document.getElementById('accessibility-runtime-styles');
            
            if (!accessibilityStylesheet) {
                accessibilityStylesheet = document.createElement('style');
                accessibilityStylesheet.id = 'accessibility-runtime-styles';
                document.head.appendChild(accessibilityStylesheet);
            }

            // Enhanced accessibility styles
            const accessibilityCSS = `
                .accessibility-mode {
                    /* Reduce all animations */
                    *, *::before, *::after {
                        animation-duration: 0.1s !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.1s !important;
                    }
                    
                    /* Remove background animations */
                    .particles-container {
                        display: none !important;
                    }
                    
                    body::before {
                        display: none !important;
                    }
                    
                    .hero::before {
                        display: none !important;
                    }
                    
                    /* Reduce glow effects */
                    h1, h2, h3, h4, h5, h6 {
                        text-shadow: 0 0 2px rgba(0, 245, 255, 0.3) !important;
                    }
                    
                    .neon-text {
                        text-shadow: 0 0 2px rgba(0, 245, 255, 0.3) !important;
                        animation: none !important;
                    }
                    
                    .btn-futuristic {
                        box-shadow: 0 0 5px rgba(0, 245, 255, 0.2) !important;
                    }
                    
                    .cyber-card {
                        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2) !important;
                    }
                    
                    /* Improve text contrast */
                    p, .text-content {
                        color: #e0e0e0 !important;
                        line-height: 1.8 !important;
                    }
                    
                    /* Better focus indicators */
                    *:focus {
                        outline: 3px solid #00f5ff !important;
                        outline-offset: 2px !important;
                    }
                    
                    /* Improve button accessibility */
                    .btn {
                        min-height: 48px !important;
                        padding: 12px 24px !important;
                        font-size: 1.1rem !important;
                    }
                    
                    /* Better link visibility */
                    a {
                        text-decoration: underline !important;
                    }
                    
                    a:hover {
                        text-decoration: none !important;
                        background-color: rgba(0, 245, 255, 0.1) !important;
                    }
                }
            `;
            
            accessibilityStylesheet.textContent = accessibilityCSS;
        }

        function removeAccessibilityStyles() {
            const accessibilityStylesheet = document.getElementById('accessibility-runtime-styles');
            if (accessibilityStylesheet) {
                accessibilityStylesheet.remove();
            }
        }

        function showAccessibilityNotification(message, type = 'info') {
            // Remove existing notification
            const existingNotification = document.querySelector('.accessibility-notification');
            if (existingNotification) {
                existingNotification.remove();
            }

            // Create notification element
            const notification = document.createElement('div');
            notification.className = `accessibility-notification accessibility-notification-${type}`;
            notification.setAttribute('role', 'alert');
            notification.setAttribute('aria-live', 'polite');
            
            notification.innerHTML = `
                <div class="notification-content">
                    <i class="bi bi-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                    <span>${message}</span>
                    <button class="notification-close" aria-label="Cerrar notificación">
                        <i class="bi bi-x"></i>
                    </button>
                </div>
            `;

            // Add notification styles
            const notificationStyles = `
                .accessibility-notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: rgba(0, 0, 0, 0.9);
                    color: white;
                    padding: 16px 20px;
                    border-radius: 8px;
                    border: 2px solid #00f5ff;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                    z-index: 10000;
                    max-width: 300px;
                    font-size: 14px;
                    animation: slideInRight 0.3s ease-out;
                }
                
                .accessibility-notification-success {
                    border-color: #39ff14;
                }
                
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    padding: 0;
                    margin-left: auto;
                    font-size: 16px;
                }
                
                .notification-close:hover {
                    color: #00f5ff;
                }
                
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;

            // Add styles if not already present
            if (!document.getElementById('notification-styles')) {
                const styleSheet = document.createElement('style');
                styleSheet.id = 'notification-styles';
                styleSheet.textContent = notificationStyles;
                document.head.appendChild(styleSheet);
            }

            // Add to page
            document.body.appendChild(notification);

            // Add close functionality
            const closeButton = notification.querySelector('.notification-close');
            closeButton.addEventListener('click', function() {
                notification.style.animation = 'slideOutRight 0.3s ease-in';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            });

            // Auto-remove after 5 seconds
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.style.animation = 'slideOutRight 0.3s ease-in';
                    setTimeout(() => {
                        if (notification.parentNode) {
                            notification.remove();
                        }
                    }, 300);
                }
            }, 5000);
        }
    }

    // Expose global function for external use
    window.toggleAccessibilityMode = function() {
        const toggleButton = document.getElementById('accessibilityToggle');
        if (toggleButton) {
            toggleButton.click();
        }
    };

})();