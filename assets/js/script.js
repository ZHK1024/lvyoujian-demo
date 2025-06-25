document.addEventListener('DOMContentLoaded', function () {
    const privacyModal = document.getElementById('privacy-modal');
    const agreeButton = document.getElementById('agree-button');
    const disagreeButton = document.getElementById('disagree-button');
    const mainContent = document.getElementById('main-content');

    // Privacy Modal Logic
    if (privacyModal && agreeButton && disagreeButton && mainContent) {
        // Check if already agreed
        if (localStorage.getItem('privacyAgreed') === 'true') {
            privacyModal.classList.add('hidden');
            mainContent.classList.remove('hidden');
        } else {
            privacyModal.classList.remove('hidden');
            mainContent.classList.add('hidden');
        }

        agreeButton.addEventListener('click', function () {
            localStorage.setItem('privacyAgreed', 'true');
            privacyModal.classList.add('hidden');
            mainContent.classList.remove('hidden');
        });

        disagreeButton.addEventListener('click', function () {
            // In a real app, this might close the window or redirect.
            // For this prototype, we'll just inform the user.
            alert('您需要同意隐私政策才能继续使用。');
            // Optionally, disable the app or redirect to a "goodbye" page.
            // window.close(); // This might not work in all browsers for non-script opened windows
        });
    } else {
        console.warn("Privacy modal elements not found. Ensure IDs are correct: privacy-modal, agree-button, disagree-button, main-content");
        // If modal is not on the page, ensure main content is visible
        if(mainContent && !privacyModal) {
            mainContent.classList.remove('hidden');
        }
    }

    // Carousel Logic for index.html
    const carousel = document.getElementById('banner-carousel');
    if (carousel) {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dotsContainer = document.getElementById('carousel-dots');
        let currentSlide = 0;
        const slideInterval = 5000; // 5 seconds

        slides.forEach((slide, index) => {
            const dot = document.createElement('button');
            dot.classList.add('w-3', 'h-3', 'rounded-full', 'transition-colors');
            if (index === 0) {
                dot.classList.add('bg-brand-green');
            } else {
                dot.classList.add('bg-gray-300', 'hover:bg-gray-400');
            }
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetInterval();
            });
            if(dotsContainer) dotsContainer.appendChild(dot);
        });
        
        const dots = dotsContainer ? dotsContainer.querySelectorAll('button') : [];

        function goToSlide(n) {
            slides[currentSlide].classList.remove('opacity-100');
            slides[currentSlide].classList.add('opacity-0');
            if(dots[currentSlide]) {
                dots[currentSlide].classList.remove('bg-brand-green');
                dots[currentSlide].classList.add('bg-gray-300', 'hover:bg-gray-400');
            }

            currentSlide = (n + slides.length) % slides.length;

            slides[currentSlide].classList.remove('opacity-0');
            slides[currentSlide].classList.add('opacity-100');
            if(dots[currentSlide]) {
                dots[currentSlide].classList.add('bg-brand-green');
                dots[currentSlide].classList.remove('bg-gray-300', 'hover:bg-gray-400');
            }
        }

        let autoSlide = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, slideInterval);

        function resetInterval() {
            clearInterval(autoSlide);
            autoSlide = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, slideInterval);
        }
    }


    // Active Nav Link Styling (simple version based on URL)
    const navLinks = document.querySelectorAll('nav a');
    const currentPage = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.remove('text-gray-500');
            link.classList.add('text-brand-green');
            // If you have a more complex active state (e.g., background), add those classes here
        } else {
            link.classList.add('text-gray-500');
            link.classList.remove('text-brand-green');
        }
    });

    // General button hover/click states (Tailwind usually handles this well with hover: and active: prefixes)
    // Adding a small visual feedback for clicks if not covered by Tailwind's default active states.
    const allButtons = document.querySelectorAll('button, a.button'); // Assuming 'a.button' for styled links
    allButtons.forEach(button => {
        button.addEventListener('mousedown', () => {
            if (!button.classList.contains('no-transform')) { // Add 'no-transform' class to buttons you don't want to scale
                 button.style.transform = 'scale(0.98)';
            }
        });
        button.addEventListener('mouseup', () => {
            if (!button.classList.contains('no-transform')) {
                button.style.transform = 'scale(1)';
            }
        });
        button.addEventListener('mouseleave', () => { // Reset if mouse leaves while pressed
            if (!button.classList.contains('no-transform')) {
                button.style.transform = 'scale(1)';
            }
        });
    });

});

// Functions for Subscription Page (to be called from subscription.html)
function showSubscriptionContent(type) {
    const blindBoxContent = document.getElementById('blind-box-content');
    const preferenceContent = document.getElementById('preference-content');
    const customContent = document.getElementById('custom-content'); // Assuming this ID exists

    const blindBoxTab = document.querySelector('[onclick*="blind-box"]');
    const preferenceTab = document.querySelector('[onclick*="preference"]');
    const customTab = document.querySelector('[onclick*="custom"]'); // Assuming this selector exists

    // Reset all content visibility and tab styles
    if(blindBoxContent) blindBoxContent.classList.add('hidden');
    if(preferenceContent) preferenceContent.classList.add('hidden');
    if(customContent) customContent.classList.add('hidden');

    if(blindBoxTab) blindBoxTab.classList.remove('bg-brand-green', 'text-white');
    if(blindBoxTab) blindBoxTab.classList.add('bg-gray-200', 'text-gray-700');
    if(preferenceTab) preferenceTab.classList.remove('bg-brand-green', 'text-white');
    if(preferenceTab) preferenceTab.classList.add('bg-gray-200', 'text-gray-700');
    if(customTab) customTab.classList.remove('bg-brand-green', 'text-white');
    if(customTab) customTab.classList.add('bg-gray-200', 'text-gray-700');


    if (type === 'blind-box' && blindBoxContent && blindBoxTab) {
        blindBoxContent.classList.remove('hidden');
        blindBoxTab.classList.add('bg-brand-green', 'text-white');
        blindBoxTab.classList.remove('bg-gray-200', 'text-gray-700');
    } else if (type === 'preference' && preferenceContent && preferenceTab) {
        preferenceContent.classList.remove('hidden');
        preferenceTab.classList.add('bg-brand-green', 'text-white');
        preferenceTab.classList.remove('bg-gray-200', 'text-gray-700');
    } else if (type === 'custom' && customContent && customTab) {
        customContent.classList.remove('hidden');
        customTab.classList.add('bg-brand-green', 'text-white');
        customTab.classList.remove('bg-gray-200', 'text-gray-700');
    }
}

// Functions for Cart Page (to be called from cart.html)
function updateCartTotal() {
    const cartItems = document.querySelectorAll('.cart-item');
    let total = 0;
    cartItems.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        if (checkbox.checked) {
            const priceElement = item.querySelector('.item-price');
            const quantityElement = item.querySelector('.item-quantity');
            const price = parseFloat(priceElement.dataset.price);
            const quantity = parseInt(quantityElement.textContent);
            total += price * quantity;
        }
    });

    const totalPriceElement = document.getElementById('total-price');
    if (totalPriceElement) {
        totalPriceElement.textContent = `¥${total.toFixed(2)}`;
    }

    // Update promotion message
    const promotionMessage = document.getElementById('promotion-message');
    if (promotionMessage) {
        const freeShippingThreshold = 32; // Example value from prompt
        if (total > 0 && total < freeShippingThreshold) {
            promotionMessage.textContent = `再加¥${(freeShippingThreshold - total).toFixed(2)}享包邮!`;
            promotionMessage.classList.remove('hidden');
        } else {
            promotionMessage.classList.add('hidden');
        }
    }
}

function changeQuantity(button, delta) {
    const quantityElement = button.parentElement.querySelector('.item-quantity');
    let quantity = parseInt(quantityElement.textContent);
    quantity += delta;
    if (quantity < 1) quantity = 1; // Minimum quantity is 1
    quantityElement.textContent = quantity;
    updateCartTotal();
}

function removeItem(button) {
    const itemElement = button.closest('.cart-item');
    if (itemElement) {
        itemElement.remove();
        updateCartTotal();
    }
}

// Consolidated DOMContentLoaded for cart, subscription, and profile pages
document.addEventListener('DOMContentLoaded', () => {
    // Function to load and show the payment page
    async function loadAndShowPaymentPage(amount, itemName) {
        try {
            // Check if payment page container already exists
            let paymentContainer = document.getElementById('dynamic-payment-container');
            if (!paymentContainer) {
                paymentContainer = document.createElement('div');
                paymentContainer.id = 'dynamic-payment-container';
                document.body.appendChild(paymentContainer);
            }

            // Fetch payment.html content
            const response = await fetch('payment.html');
            if (!response.ok) {
                console.error('Failed to load payment.html');
                alert('加载支付页面失败，请稍后重试。');
                return;
            }
            const paymentHtmlContent = await response.text();
            paymentContainer.innerHTML = paymentHtmlContent;

            // The script inside payment.html defines window.showPaymentModal and window.hidePaymentModal
            // We need to ensure it's executed. Browsers might not execute scripts injected via innerHTML directly for security reasons.
            // A common way is to find the script tag and re-create it.
            const scriptTag = paymentContainer.querySelector('script[src="assets/js/script.js"]');
            if (scriptTag) scriptTag.remove(); // Remove the redundant main script.js reference from loaded payment.html

            const inlineScript = paymentContainer.querySelector('script:not([src])');
            if (inlineScript) {
                const newScript = document.createElement('script');
                newScript.textContent = inlineScript.textContent;
                // It's important that the script from payment.html runs AFTER its DOM is in place.
                // Appending it to head or body should execute it.
                document.head.appendChild(newScript).parentNode.removeChild(newScript); // Execute and remove
            }
            
            // Now, showPaymentModal should be defined globally by the executed script from payment.html
            if (window.showPaymentModal) {
                window.showPaymentModal(amount, itemName);
            } else {
                console.error('showPaymentModal function not found after loading payment.html');
                // alert('支付功能初始化失败。');
            }

        } catch (error) {
            console.error('Error loading payment page:', error);
            alert('加载支付页面时发生错误。');
        }
    }


    // Initialize cart functions if on cart page
    if (document.getElementById('cart-page-identifier')) { // Add this ID to the body of cart.html
        const itemCheckboxes = document.querySelectorAll('.cart-item input[type="checkbox"]');
        itemCheckboxes.forEach(cb => cb.addEventListener('change', updateCartTotal));
        updateCartTotal(); // Initial calculation

        const placeOrderButton = document.querySelector('#cart-page-identifier > footer button');
        if (placeOrderButton) {
            placeOrderButton.addEventListener('click', () => {
                const totalPriceText = document.getElementById('total-price').textContent;
                const totalPrice = parseFloat(totalPriceText.replace('¥', ''));
                loadAndShowPaymentPage(totalPrice, '购物车商品');
            });
        }
    }

    // Initialize subscription tabs if on subscription page
    if (document.getElementById('subscription-page-identifier')) { 
        // Set default tab
        showSubscriptionContent('blind-box');

        // Tea preference toggles
        const teaPrefToggles = document.querySelectorAll('.tea-pref-toggle');
        teaPrefToggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                const currentState = this.dataset.state || 'none';
                const heartIcon = this.querySelector('.fa-heart');
                const banIcon = this.querySelector('.fa-ban');

                // Reset icons
                heartIcon.classList.add('text-gray-300');
                heartIcon.classList.remove('text-red-500', 'text-brand-green'); // Ensure brand-green is also removed if used for like
                banIcon.classList.add('text-gray-300');
                banIcon.classList.remove('text-red-500');


                if (currentState === 'none') { // -> like
                    this.dataset.state = 'like';
                    heartIcon.classList.remove('text-gray-300');
                    heartIcon.classList.add('text-red-500'); // Or text-brand-green if preferred for "like"
                } else if (currentState === 'like') { // -> dislike
                    this.dataset.state = 'dislike';
                    banIcon.classList.remove('text-gray-300');
                    banIcon.classList.add('text-red-500');
                } else { // dislike -> none
                    this.dataset.state = 'none';
                }
            });
        });

        // Custom Subscription Logic
        const availableTeasContainer = document.getElementById('available-teas');
        const selectedTeasMailbox = document.getElementById('selected-teas-mailbox');
        const selectedTeaCountElement = document.getElementById('selected-tea-count');
        const mailboxPlaceholder = document.getElementById('mailbox-placeholder');
        const customTeaSearch = document.getElementById('custom-tea-search');
        const MAX_SELECTED_TEAS = 5;

        let selectedCustomTeas = [];

        if (availableTeasContainer && selectedTeasMailbox && selectedTeaCountElement && mailboxPlaceholder) {
            const teaOptions = availableTeasContainer.querySelectorAll('.custom-tea-option');

            teaOptions.forEach(button => {
                button.addEventListener('click', () => {
                    const teaName = button.dataset.teaName;
                    const icon = button.querySelector('i');

                    if (selectedCustomTeas.includes(teaName)) {
                        // Remove tea
                        selectedCustomTeas = selectedCustomTeas.filter(t => t !== teaName);
                        button.classList.remove('bg-green-100', 'border-brand-green', 'text-brand-green');
                        button.classList.add('hover:bg-green-50', 'hover:border-brand-green');
                        icon.classList.remove('fa-check-circle', 'text-brand-green');
                        icon.classList.add('fa-plus-circle', 'text-gray-400');
                        renderMailbox();
                    } else {
                        // Add tea if not exceeding max
                        if (selectedCustomTeas.length < MAX_SELECTED_TEAS) {
                            selectedCustomTeas.push(teaName);
                            button.classList.add('bg-green-100', 'border-brand-green', 'text-brand-green');
                            button.classList.remove('hover:bg-green-50', 'hover:border-brand-green');
                            icon.classList.add('fa-check-circle', 'text-brand-green');
                            icon.classList.remove('fa-plus-circle', 'text-gray-400');
                            renderMailbox();
                        } else {
                            alert(`最多只能选择 ${MAX_SELECTED_TEAS} 种茶叶。`);
                        }
                    }
                });
            });

            if (customTeaSearch) {
                customTeaSearch.addEventListener('input', (e) => {
                    const searchTerm = e.target.value.toLowerCase();
                    teaOptions.forEach(button => {
                        const teaName = button.dataset.teaName.toLowerCase();
                        if (teaName.includes(searchTerm)) {
                            button.style.display = 'flex';
                        } else {
                            button.style.display = 'none';
                        }
                    });
                });
            }
        }

        function renderMailbox() {
            if (!selectedTeasMailbox || !selectedTeaCountElement || !mailboxPlaceholder) return;

            selectedTeasMailbox.innerHTML = ''; // Clear current items
            if (selectedCustomTeas.length === 0) {
                selectedTeasMailbox.appendChild(mailboxPlaceholder);
                mailboxPlaceholder.classList.remove('hidden');
            } else {
                mailboxPlaceholder.classList.add('hidden');
                selectedCustomTeas.forEach(teaName => {
                    const teaTag = document.createElement('div');
                    teaTag.className = 'bg-brand-green text-white text-sm px-3 py-1 rounded-full inline-flex items-center';
                    teaTag.textContent = teaName;
                    
                    const removeBtn = document.createElement('button');
                    removeBtn.className = 'ml-2 text-white opacity-70 hover:opacity-100 no-transform';
                    removeBtn.innerHTML = '<i class="fas fa-times-circle"></i>';
                    removeBtn.onclick = () => {
                        // Find the original button to toggle its state
                        const originalButton = availableTeasContainer.querySelector(`button[data-tea-name="${teaName}"]`);
                        if(originalButton) originalButton.click(); // Simulate click to trigger removal logic
                    };
                    teaTag.appendChild(removeBtn);
                    selectedTeasMailbox.appendChild(teaTag);
                });
            }
            selectedTeaCountElement.textContent = selectedCustomTeas.length;
        }

        // Initial render for mailbox in case of page refresh with state (not implemented here)
        renderMailbox(); 

        const subFooterButtons = document.querySelectorAll('#subscription-page-identifier > footer button');
        if (subFooterButtons.length === 2) {
            subFooterButtons[0].addEventListener('click', () => {
                const selectedModeElement = document.querySelector('#subscription-page-identifier .flex-1.bg-brand-green.text-white');
                const selectedMode = selectedModeElement ? selectedModeElement.textContent.trim() : "未选择模式";
                
                let selectedTier = "未选周期";
                const tierRadios = document.querySelectorAll('input[name="subscription_tier"]');
                tierRadios.forEach(radio => {
                    if (radio.checked) {
                        const labelElement = radio.closest('label');
                        if (labelElement) {
                            const tierTextElement = labelElement.querySelector('span.font-semibold');
                            if (tierTextElement) {
                                selectedTier = tierTextElement.textContent.trim();
                            }
                        }
                    }
                });
                alert(`"${selectedMode} - ${selectedTier}" 已加入购物袋 (原型功能)`);
            });
            subFooterButtons[1].addEventListener('click', () => {
                const selectedModeElement = document.querySelector('#subscription-page-identifier .flex-1.bg-brand-green.text-white');
                const selectedMode = selectedModeElement ? selectedModeElement.textContent.trim() : "未选择模式";
                
                let selectedTier = "未选周期";
                let tierPrice = 0;
                const tierRadios = document.querySelectorAll('input[name="subscription_tier"]');
                tierRadios.forEach(radio => {
                    if (radio.checked) {
                         const labelElement = radio.closest('label');
                        if (labelElement) {
                            const tierTextElement = labelElement.querySelector('span.font-semibold');
                            const priceTextElement = labelElement.querySelector('p.text-sm');
                            if (tierTextElement) {
                                selectedTier = tierTextElement.textContent.trim();
                            }
                            if (priceTextElement) {
                                const match = priceTextElement.textContent.match(/¥(\d+)/);
                                if (match && match[1]) {
                                    tierPrice = parseFloat(match[1]);
                                }
                            }
                        }
                    }
                });

                if (tierPrice > 0) {
                    loadAndShowPaymentPage(tierPrice, `${selectedMode} - ${selectedTier}`);
                } else {
                    alert('请选择一个订阅周期。'); // Or handle if no tier is selected
                }
            });
        }
    }

    // For profile.html
    if (document.getElementById('profile-page-identifier')) {
        // The links are now direct `<a>` tags, not within a grid, and have hrefs.
        // No specific JS is needed for navigation as the hrefs are set correctly.
        // Placeholder alert logic can be removed if direct navigation is sufficient.
        // Example: If you still wanted to intercept clicks for some reason:
        /*
        const profileLinks = document.querySelectorAll('#profile-page-identifier main ul a');
        profileLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href !== '#') {
                    // Allow navigation
                } else {
                    e.preventDefault();
                    const linkTextElement = link.querySelector('span.font-medium');
                    if (linkTextElement){
                        const linkText = linkTextElement.textContent.trim();
                        alert(`跳转到 "${linkText}" 页面 (原型功能)`);
                    }
                }
            });
        });
        */
    }

    // For coupons.html - Copy invite link
    const copyInviteLinkButton = document.getElementById('copy-invite-link');
    if (copyInviteLinkButton) {
        copyInviteLinkButton.addEventListener('click', () => {
            const inviteLink = document.getElementById('invite-link-text').textContent;
            navigator.clipboard.writeText(inviteLink)
                .then(() => {
                    alert('邀请链接已复制到剪贴板！');
                    copyInviteLinkButton.textContent = '已复制!';
                    setTimeout(() => {
                        copyInviteLinkButton.textContent = '复制链接';
                    }, 2000);
                })
                .catch(err => {
                    console.error('无法复制链接: ', err);
                    alert('复制失败，请手动复制。');
                });
        });
    }
});

// Function to open subscription detail page
function openSubscriptionDetail(type) {
    window.location.href = `subscription-detail.html?type=${type}`;
}

// Make function globally available
window.openSubscriptionDetail = openSubscriptionDetail;
