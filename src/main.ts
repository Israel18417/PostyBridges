import './style.css'
import { serviceData } from './serviceData'
import type { ServiceDetails } from './serviceData'
import type { LegalData } from './legalData'

// ==========================================
// Safari-compatible smooth scroll helper
// scrollIntoView({ behavior: 'smooth' }) only supported in Safari 15.4+
// ==========================================
function smoothScrollTo(el: HTMLElement | null) {
  if (!el) return;
  // Check for native smooth scroll support
  const supportsNativeSmooth = 'scrollBehavior' in document.documentElement.style;
  if (supportsNativeSmooth) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    // Polyfill: manual easing scroll for Safari <15.4
    const targetY = el.getBoundingClientRect().top + window.pageYOffset - 80;
    const startY = window.pageYOffset;
    const diff = targetY - startY;
    let start: number | null = null;
    const duration = 600;
    function step(timestamp: number) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease in-out cubic
      const ease = progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
      window.scrollTo(0, startY + diff * ease);
      if (elapsed < duration) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
}

// ==========================================
// Cost Estimator System Variables & Calculations
// ==========================================
let selectedVehicle = 'sedan';
const selectedServices = new Set<string>(['tracking']); // Default check tracking
const installationFeePerService = 20000;
const discountedInstallationFee = 40000;

const vehicleProfiles: Record<string, { label: string }> = {
  sedan: { label: 'Sedan / Coupe' },
  suv: { label: 'SUV / Truck' },
  luxury: { label: 'Luxury / EV' }
};

function formatNaira(value: number) {
  return `₦${Math.round(value).toLocaleString('en-NG')}`;
}

function getServicePrice(details: ServiceDetails, vehicleType: string) {
  return details.prices[vehicleType] ?? details.prices.sedan ?? 0;
}

function getServicePriceLabel(details: ServiceDetails) {
  const uniquePrices = [...new Set(Object.values(details.prices))].sort((a, b) => a - b);
  if (uniquePrices.length === 1) {
    return formatNaira(uniquePrices[0]);
  }
  return `${formatNaira(uniquePrices[0])} - ${formatNaira(uniquePrices[uniquePrices.length - 1])}`;
}

function getInstallationFee(serviceCount: number) {
  if (serviceCount >= 3) {
    return discountedInstallationFee;
  }
  return serviceCount * installationFeePerService;
}

// ==========================================
// DOM Elements Setup & Event Handlers
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  let cachedLegalData: LegalData | null = null;
  // Navigation & Scroll
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-links a');
  const hamburger = document.getElementById('hamburger-menu');
  const navLinksList = document.getElementById('nav-links');
  
  // Testimonials
  const testimonialsSlider = document.getElementById('testimonials-slider');
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');
  
  // Estimator UI elements
  const vehicleCards = document.querySelectorAll('#vehicle-type-container .radio-card');
  const checklistItems = document.querySelectorAll('#services-checklist .checklist-item');
  const liveTotal = document.getElementById('live-total');
  const discountIndicator = document.getElementById('discount-indicator');
  const discountText = document.getElementById('discount-text');
  
  // Summary Panel elements
  const summaryVehicle = document.getElementById('summary-vehicle');
  const summaryServicesCount = document.getElementById('summary-services-count');
  const summaryHardwarePrice = document.getElementById('summary-hardware-price');
  const summaryInstallPrice = document.getElementById('summary-install-price');
  
  // Modal controllers
  const serviceModal = document.getElementById('service-modal');
  const closeServiceModalBtn = document.getElementById('close-service-modal');
  const serviceModalBody = document.getElementById('service-modal-body');
  
  const bookingModal = document.getElementById('booking-modal');
  const closeBookingModalBtn = document.getElementById('close-booking-modal');
  const btnCloseSuccess = document.getElementById('btn-close-success');
  const btnSubmitEstimate = document.getElementById('btn-submit-estimate');
  const contactFormElement = document.getElementById('contact-form-element') as HTMLFormElement | null;
  const legalModal = document.getElementById('legal-modal');
  const closeLegalModalBtn = document.getElementById('close-legal-modal');
  const legalModalBody = document.getElementById('legal-modal-body');
  let lastFocusedElement: HTMLElement | null = null;

  const setMenuOpen = (isOpen: boolean) => {
    navLinksList?.classList.toggle('active', isOpen);
    hamburger?.classList.toggle('open', isOpen);
    hamburger?.setAttribute('aria-expanded', String(isOpen));
    hamburger?.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  };

  const openModal = (modal: HTMLElement | null) => {
    if (!modal) return;
    lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    modal.removeAttribute('aria-hidden');
    modal.classList.add('active');
    const dialog = modal.querySelector<HTMLElement>('.modal-content');
    dialog?.focus({ preventScroll: true });
  };

  const closeModal = (modal: HTMLElement | null) => {
    if (!modal) return;
    const wasActive = modal.classList.contains('active');
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    if (wasActive) {
      lastFocusedElement?.focus({ preventScroll: true });
    }
  };

  // Header Scroll Effect
  const sections = ['hero', 'services', 'estimator', 'why-us', 'faq', 'contact'];
  let scrollRaf = 0;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    if (scrollRaf) {
      window.cancelAnimationFrame(scrollRaf);
    }
    scrollRaf = window.requestAnimationFrame(() => {
      highlightNavOnScroll();
    });
  }, { passive: true });

  // Scroll section highlight logic
  function highlightNavOnScroll() {
    const scrollPos = window.scrollY + 150;
    for (const sectionId of sections) {
      const section = document.getElementById(sectionId);
      if (section) {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-sec') === sectionId) {
              link.classList.add('active');
            }
          });
          break;
        }
      }
    }
  }

  // Mobile Menu Toggle
  hamburger?.addEventListener('click', () => {
    setMenuOpen(!navLinksList?.classList.contains('active'));
  });

  // Close Mobile Menu on Link Click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      setMenuOpen(false);
    });
  });

  // Close Mobile Menu on Click Outside
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (
      navLinksList?.classList.contains('active') &&
      !navLinksList.contains(target) &&
      !hamburger?.contains(target)
    ) {
      setMenuOpen(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setMenuOpen(false);
      closeModal(serviceModal);
      closeModal(bookingModal);
      closeModal(legalModal);
    }
  });

  // Smooth scroll buttons
  document.getElementById('btn-explore')?.addEventListener('click', (e) => {
    e.preventDefault();
    smoothScrollTo(document.getElementById('services'));
  });

  document.getElementById('btn-estimate')?.addEventListener('click', (e) => {
    e.preventDefault();
    smoothScrollTo(document.getElementById('estimator'));
  });

  document.getElementById('btn-header-quote')?.addEventListener('click', () => {
    smoothScrollTo(document.getElementById('estimator'));
  });

  const setupHeavyInteractions = () => {
    // ==========================================
    // Testimonials Carousel Logic
    // ==========================================
    let currentSlide = 0;
    const slideCount = document.querySelectorAll('.testimonial-slide').length;

    function updateSliderPosition() {
      if (testimonialsSlider) {
        testimonialsSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
      }
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slideCount;
      updateSliderPosition();
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + slideCount) % slideCount;
      updateSliderPosition();
    }

    nextBtn?.addEventListener('click', nextSlide);
    prevBtn?.addEventListener('click', prevSlide);

    // Auto-scroll testimonials every 6 seconds once the browser is idle and the slider is visible.
    let autoScroll = 0;
    let autoScrollTimeout = 0;
    let userHasInteracted = false;

    const startAutoScroll = () => {
      if (autoScroll) return;
      autoScroll = window.setInterval(nextSlide, 6000);
    };

    const stopAutoScroll = () => {
      if (autoScrollTimeout) {
        clearTimeout(autoScrollTimeout);
        autoScrollTimeout = 0;
      }
      if (autoScroll) {
        clearInterval(autoScroll);
        autoScroll = 0;
      }
    };

    const scheduleAutoScroll = () => {
      if (!userHasInteracted) return;
      if (autoScrollTimeout) {
        clearTimeout(autoScrollTimeout);
      }
      autoScrollTimeout = window.setTimeout(() => {
        const sliderRect = testimonialsSlider?.getBoundingClientRect();
        if (sliderRect && sliderRect.top < window.innerHeight && sliderRect.bottom > 0) {
          startAutoScroll();
        }
      }, 7000);
    };

    const activateInteractions = () => {
      if (userHasInteracted) return;
      userHasInteracted = true;
      
      // Clean up event listeners
      window.removeEventListener('pointerdown', activateInteractions);
      window.removeEventListener('keydown', activateInteractions);
      window.removeEventListener('touchstart', activateInteractions);
      window.removeEventListener('pointermove', activateInteractions);
      
      // Start auto-scroll if it is currently intersecting
      const sliderRect = testimonialsSlider?.getBoundingClientRect();
      if (sliderRect && sliderRect.top < window.innerHeight && sliderRect.bottom > 0) {
        scheduleAutoScroll();
      }
    };

    window.addEventListener('pointerdown', activateInteractions, { passive: true });
    window.addEventListener('keydown', activateInteractions, { passive: true });
    window.addEventListener('touchstart', activateInteractions, { passive: true });
    window.addEventListener('pointermove', activateInteractions, { passive: true });

    // Reset auto-scroll timer on manual navigation
    [prevBtn, nextBtn].forEach(btn => {
      btn?.addEventListener('click', () => {
        stopAutoScroll();
        startAutoScroll();
      });
    });

    const testimonialsObserver = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          scheduleAutoScroll();
        } else {
          stopAutoScroll();
        }
      }
    }, { threshold: 0.1 });

    if (testimonialsSlider) {
      testimonialsObserver.observe(testimonialsSlider);
    }
  };

  const runWhenIdle = (work: () => void) => {
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(work, { timeout: 2500 });
    } else {
      setTimeout(work, 1500);
    }
  };

  runWhenIdle(() => {
    // ==========================================
    // FAQ Accordion Controls
    // ==========================================
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const question = item.querySelector<HTMLButtonElement>('.faq-question');
      const answer = item.querySelector<HTMLElement>('.faq-answer');
      question?.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(faq => {
          faq.classList.remove('active');
          faq.querySelector<HTMLButtonElement>('.faq-question')?.setAttribute('aria-expanded', 'false');
          const faqAnswer = faq.querySelector<HTMLElement>('.faq-answer');
          if (faqAnswer) {
            faqAnswer.hidden = true;
          }
        });
        if (!isActive) {
          item.classList.add('active');
          question.setAttribute('aria-expanded', 'true');
          if (answer) {
            answer.hidden = false;
          }
        }
      });
    });

  // ==========================================
  // Interactive Service Details Modal
  // ==========================================
  function openServiceModal(serviceKey: string) {
    const details = serviceData[serviceKey];
    if (!details || !serviceModalBody || !serviceModal) return;

    let featuresHtml = '';
    details.features.forEach(f => {
      featuresHtml += `
        <div class="modal-feature-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <div>
            <h4>${f.title}</h4>
            <p>${f.desc}</p>
          </div>
        </div>
      `;
    });

    let specsHtml = '';
    details.specs.forEach(s => {
      specsHtml += `
        <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.03); font-size:0.9rem;">
          <span style="color:var(--text-secondary);">${s.label}</span>
          <span style="font-weight:500; color:#fff;">${s.value}</span>
        </div>
      `;
    });

    serviceModalBody.innerHTML = `
      <h3 id="service-modal-title">${details.name}</h3>
      <div class="modal-subtitle">${details.tagline}</div>
      <p class="modal-desc">${details.description}</p>
      
      <h4 style="margin-bottom:16px; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:8px;">Core Features & Integrations</h4>
      <div class="modal-features">${featuresHtml}</div>
      
      <div class="modal-details-grid">
        <div>
          <h4 style="margin-bottom:12px;">Technical Specs</h4>
          ${specsHtml}
        </div>
        <div style="background:rgba(255,255,255,0.02); border:1px solid var(--glass-border); padding:20px; border-radius:12px;">
          <h4 style="margin-bottom:12px;">Service Profile</h4>
          <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.9rem;">
            <span style="color:var(--text-secondary)">Installation Duration:</span>
            <span style="color:#fff; font-weight:500;">${details.installTime}</span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.9rem;">
            <span style="color:var(--text-secondary)">Warranty Period:</span>
            <span style="color:#fff; font-weight:500;">${details.warranty}</span>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:0.9rem;">
            <span style="color:var(--text-secondary)">Base Service Price:</span>
            <span style="color:var(--accent-cyan); font-weight:bold;">${getServicePriceLabel(details)}</span>
          </div>
        </div>
      </div>
      
      <div class="modal-actions">
        <button class="btn-primary" id="btn-select-in-estimator" type="button" data-service="${details.id}" style="width:100%; justify-content:center;">
          Select This Upgrade in Cost Estimator
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>
      </div>
    `;

    openModal(serviceModal);

    // Add event handler inside the newly rendered modal body
    document.getElementById('btn-select-in-estimator')?.addEventListener('click', (e) => {
      const button = e.currentTarget as HTMLButtonElement;
      const serviceId = button.getAttribute('data-service');
      if (serviceId) {
        // Select in estimator checkboxes
        selectedServices.clear(); // Clear previous standard checks, focus on selected
        selectedServices.add(serviceId);
        
        // Sync DOM checks
        checklistItems.forEach(item => {
          const sName = item.getAttribute('data-service');
          const input = item.querySelector('input[type="checkbox"]') as HTMLInputElement | null;
          if (sName === serviceId) {
            item.classList.add('selected');
            if (input) input.checked = true;
          } else {
            item.classList.remove('selected');
            if (input) input.checked = false;
          }
        });
        
        // Update price calculations
        calculateEstimate();
        
        // Close modal and scroll
        closeModal(serviceModal);
        smoothScrollTo(document.getElementById('estimator'));
      }
    });
  }

  // Click handler for service card click
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't open if they specifically clicked a nested anchor link, let that trigger
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.closest('.service-link')) return;
      
      const serviceKey = card.getAttribute('data-service');
      if (serviceKey) {
        openServiceModal(serviceKey);
      }
    });
  });

  // Or click specs details directly
  document.querySelectorAll('.service-card .service-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const card = link.closest('.service-card');
      const serviceKey = card?.getAttribute('data-service');
      if (serviceKey) {
        openServiceModal(serviceKey);
      }
    });
  });

  // Footer / other triggers
  document.querySelectorAll('.service-link-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceKey = trigger.getAttribute('data-service');
      if (serviceKey) {
        openServiceModal(serviceKey);
      }
    });
  });

  closeServiceModalBtn?.addEventListener('click', () => {
    closeModal(serviceModal);
  });

  // Click outside modal content to close
  window.addEventListener('click', (e) => {
    if (e.target === serviceModal) {
      closeModal(serviceModal);
    }
    if (e.target === bookingModal) {
      closeModal(bookingModal);
    }
    if (e.target === legalModal) {
      closeModal(legalModal);
    }
  });

  // ==========================================
  // Cost Estimator System Interaction
  // ==========================================
  
  // 1. Vehicle Type selector click
  vehicleCards.forEach(card => {
    card.addEventListener('click', () => {
      vehicleCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const radioInput = card.querySelector('input[type="radio"]') as HTMLInputElement | null;
      if (radioInput) {
        radioInput.checked = true;
        selectedVehicle = radioInput.value;
      }
      calculateEstimate();
    });
  });

  // 2. Service Checklist click toggle
  checklistItems.forEach(item => {
    // Make entire list card clickable
    item.addEventListener('click', (e) => {
      const checkbox = item.querySelector('input[type="checkbox"]') as HTMLInputElement | null;
      
      // If client clicked the checkbox directly, don't double toggle
      if (e.target === checkbox) {
        const isChecked = checkbox?.checked || false;
        const serviceName = item.getAttribute('data-service') || '';
        if (isChecked) {
          item.classList.add('selected');
          selectedServices.add(serviceName);
        } else {
          item.classList.remove('selected');
          selectedServices.delete(serviceName);
        }
        calculateEstimate();
        return;
      }
      
      if (checkbox) {
        checkbox.checked = !checkbox.checked;
        const isChecked = checkbox.checked;
        const serviceName = item.getAttribute('data-service') || '';
        if (isChecked) {
          item.classList.add('selected');
          selectedServices.add(serviceName);
        } else {
          item.classList.remove('selected');
          selectedServices.delete(serviceName);
        }
        calculateEstimate();
      }
    });
  });

  // Calculate live estimate values
  function calculateEstimate() {
    let subtotal = 0;

    checklistItems.forEach(item => {
      const serviceKey = item.getAttribute('data-service') || '';
      const details = serviceData[serviceKey];
      const priceLabel = item.querySelector('.checklist-item-price');
      if (details && priceLabel) {
        priceLabel.textContent = formatNaira(getServicePrice(details, selectedVehicle));
      }
    });
    
    // Sum selected equipment prices for the current vehicle profile.
    selectedServices.forEach(srvKey => {
      const details = serviceData[srvKey];
      if (details) {
        subtotal += getServicePrice(details, selectedVehicle);
      }
    });

    const vehicleProfile = vehicleProfiles[selectedVehicle];
    const standardInstallationFee = selectedServices.size * installationFeePerService;
    const installationFee = getInstallationFee(selectedServices.size);
    const discountAmount = standardInstallationFee - installationFee;
    const finalTotal = subtotal + installationFee;

    // Update dynamic pricing UI
    if (liveTotal) {
      liveTotal.textContent = Math.round(finalTotal).toLocaleString('en-NG');
    }

    // Toggle Discount Tag
    if (discountIndicator && discountText) {
      if (discountAmount > 0) {
        discountIndicator.style.display = 'inline-flex';
        discountText.textContent = `Installation Discount: Save ${formatNaira(discountAmount)}`;
      } else {
        discountIndicator.style.display = 'none';
      }
    }

    // Update Summary list
    if (summaryVehicle) {
      summaryVehicle.textContent = vehicleProfile ? vehicleProfile.label : '';
    }
    if (summaryServicesCount) {
      summaryServicesCount.textContent = `${selectedServices.size} Upgrade${selectedServices.size !== 1 ? 's' : ''}`;
    }
    if (summaryHardwarePrice) {
      summaryHardwarePrice.textContent = formatNaira(subtotal);
    }
    if (summaryInstallPrice) {
      summaryInstallPrice.textContent = formatNaira(installationFee);
    }
  }

  // Run initial calculation once on boot
  calculateEstimate();
  // Carousel startup is handled inside setupHeavyInteractions.

  // ==========================================
  // Booking Submission & Lock Price Trigger
  // ==========================================
  btnSubmitEstimate?.addEventListener('click', () => {
    if (selectedServices.size === 0) {
      alert('Please check at least one vehicle upgrade integration service to estimate.');
      return;
    }

    // Generate simulated reference ID
    const refId = `#PB-${Math.floor(1000 + Math.random() * 9000)}`;
    const totalValStr = liveTotal ? liveTotal.textContent : '0';
    const vehicleProfile = vehicleProfiles[selectedVehicle];
    
    // Populate variables inside success dialog modal
    const successRef = document.getElementById('success-ref');
    const successVehicle = document.getElementById('success-vehicle');
    const successServicesCount = document.getElementById('success-services-count');
    const successTotal = document.getElementById('success-total');
    
    if (successRef) successRef.textContent = refId;
    if (successVehicle) successVehicle.textContent = vehicleProfile ? vehicleProfile.label : 'Sedan';
    if (successServicesCount) successServicesCount.textContent = `${selectedServices.size} Service Upgrades`;
    if (successTotal) successTotal.textContent = `₦${totalValStr}`;

    // Show success booking modal
    openModal(bookingModal);
  });

  closeBookingModalBtn?.addEventListener('click', () => {
    closeModal(bookingModal);
  });

  btnCloseSuccess?.addEventListener('click', () => {
    closeModal(bookingModal);
  });

  async function openLegalModal(legalKey: string) {
    if (!cachedLegalData) {
      const module = await import('./legalData');
      cachedLegalData = module.legalData;
    }

    const details = cachedLegalData?.[legalKey];
    if (!details || !legalModalBody || !legalModal) return;

    const sectionsHtml = details.sections.map(section => `
      <section class="legal-section">
        <h4>${section.heading}</h4>
        <p>${section.body}</p>
      </section>
    `).join('');

    legalModalBody.innerHTML = `
      <span class="section-tag">PostyBridges Legal</span>
      <h3 id="legal-modal-title">${details.title}</h3>
      <p class="legal-updated">${details.updated}</p>
      <p class="modal-desc">${details.intro}</p>
      <div class="legal-sections">${sectionsHtml}</div>
      <p class="legal-note">This information is a practical customer summary, not a substitute for independent legal advice.</p>
    `;
    openModal(legalModal);
  }

  document.querySelectorAll('.legal-link').forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const legalKey = link.getAttribute('data-legal');
      if (legalKey) {
        openLegalModal(legalKey);
      }
    });
  });

  closeLegalModalBtn?.addEventListener('click', () => {
    closeModal(legalModal);
  });

  // Check if form was just successfully submitted via redirect
  if (window.location.search.includes('submitted=true')) {
    alert('Thank you for contacting PostyBridges! We have received your car service specifications and an automotive electrical technician will reach out to you shortly.');
    // Clean up query parameters from address bar to prevent repeat alerts on refresh
    const cleanUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + window.location.hash;
    window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
  }

  // Resilient form submission using the serverless email API
  contactFormElement?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitBtn = contactFormElement.querySelector('button[type="submit"]') as HTMLButtonElement | null;
    const statusMessage = document.getElementById('contact-form-status');

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';
    }

    if (statusMessage) {
      statusMessage.textContent = '';
      statusMessage.classList.remove('error');
      statusMessage.classList.remove('success');
    }

    try {
      const formData = new FormData(contactFormElement);
      const payload = Object.fromEntries(formData.entries());

      const response = await fetch(contactFormElement.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        const fallbackMessage = response.status >= 500
          ? 'The contact service is temporarily unavailable. Please email postybridges@gmail.com directly or try again later.'
          : 'Please check the form and try again.';
        throw new Error(errorBody.error || fallbackMessage);
      }

      if (statusMessage) {
        statusMessage.innerHTML = `
          <div class="status-card">
            <div class="status-card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div>
              <strong>Message received.</strong>
              <span>Thanks for reaching out. A PostyBridges technician will review your vehicle details and contact you shortly.</span>
            </div>
          </div>
        `;
        statusMessage.classList.add('success');
      }
      contactFormElement.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message';
      }
    } catch (error) {
      if (statusMessage) {
        statusMessage.textContent = error instanceof Error
          ? error.message
          : 'The contact service is temporarily unavailable. Please email postybridges@gmail.com directly or try again later.';
        statusMessage.classList.add('error');
      }
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message';
      }
      console.error('Contact form submission failed:', error);
    }
  });
  });

  runWhenIdle(setupHeavyInteractions);

  // ==========================================
  // Light / Dark Theme Toggle Logic love it
  // ==========================================
  const themeToggle = document.getElementById('theme-toggle');
  
  // Check for saved theme preference, default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  const themeToggleLabel = themeToggle?.querySelector('.toggle-text');
  const setThemeLabel = (theme: string) => {
    if (themeToggleLabel) {
      themeToggleLabel.textContent = theme === 'light' ? 'Dark mode' : 'Light mode';
    }
    themeToggle?.setAttribute('aria-pressed', String(theme === 'light'));
    themeToggle?.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
  };

  setThemeLabel(savedTheme);

  themeToggle?.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    setThemeLabel(newTheme);
  });
});

