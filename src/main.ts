import './style.css'
import { injectSpeedInsights } from '@vercel/speed-insights'

// Initialize Vercel Speed Insights
injectSpeedInsights()

// ==========================================
// Service Detail Specs Data
// ==========================================
interface ServiceDetails {
  id: string;
  name: string;
  tagline: string;
  description: string;
  installTime: string;
  warranty: string;
  features: { title: string; desc: string }[];
  specs: { label: string; value: string }[];
  prices: Record<string, number>;
}

const serviceData: Record<string, ServiceDetails> = {
  tracking: {
    id: 'tracking',
    name: 'GPS Vehicle Tracking Upgrade',
    tagline: 'Military-Grade Real-Time Asset Tracking',
    description: 'PostyBridges advanced vehicle tracking provides remote immobilizer switches, geo-fence notifications, and speed monitoring directly to your iOS or Android app. Ideal for personal security, anti-theft protection, and commercial logistics management.',
    installTime: '2 - 3 Hours',
    warranty: '2 Years Replacement',
    features: [
      { title: 'Real-time Tracking', desc: 'Updates coordinates every 10 seconds via GLONASS / GPS dual band systems.' },
      { title: 'Remote Cut-off', desc: 'Enable secure engine shut down remotely from your smartphone in case of unauthorized access.' },
      { title: 'Geofencing Alerts', desc: 'Define secure area perimeters and get instant SMS or push warnings if a vehicle crosses them.' },
      { title: 'Internal Battery Backup', desc: 'Unit functions up to 72 hours even if the vehicle\'s primary battery is disconnected.' }
    ],
    specs: [
      { label: 'Network Band', value: '4G LTE / GSM Multi-band fallback' },
      { label: 'GPS Sensitivity', value: '-165 dBm tracking' },
      { label: 'Backup Battery', value: '450mAh Li-Polymer' },
      { label: 'Enclosure Rating', value: 'IP67 Waterproof & Dustproof' }
    ],
    prices: {
      sedan: 80000,
      suv: 120000,
      luxury: 150000
    }
  },
  speedlimit: {
    id: 'speedlimit',
    name: 'Speed Limit Installation',
    tagline: 'Standard Safety & Legal Compliance Governors',
    description: 'We install premium electronic speed governors that integrate directly with your car\'s Engine Control Unit (ECU) or mechanical throttle body. Highly recommended for commercial transport, corporate fleet compliance, and driver safety programs.',
    installTime: '3 Hours',
    warranty: '1 Year Warranty',
    features: [
      { title: 'Precision Speed Control', desc: 'Restricts vehicle velocity smoothly at preset limits without losing engine acceleration power.' },
      { title: 'Tamper-Proof Seal', desc: 'Equipped with physical security seals and digital verification log tracking.' },
      { title: 'ECU Calibration', desc: 'Direct digital interface options for newer drive-by-wire electronic throttle cars.' },
      { title: 'Regulatory Compliant', desc: 'Fully compliant with national transport and safety governor specifications.' }
    ],
    specs: [
      { label: 'Governor Type', value: 'Electronic throttle / fuel-cut combo' },
      { label: 'Speed Limit Range', value: 'Adjustable from 60 to 120 km/h' },
      { label: 'Diagnostics Interface', value: 'OBD-II compliant calibration port' },
      { label: 'Voltage Support', value: '12V / 24V Auto-switching' }
    ],
    prices: {
      sedan: 100000,
      suv: 150000,
      luxury: 150000
    }
  },
  dashcam: {
    id: 'dashcam',
    name: 'Intelligent Dual-Channel Dash Cams',
    tagline: 'Ultra-HD Road Recording and Parking Monitors',
    description: 'High-end front and rear dash camera setups hardwired directly to your vehicle\'s fusebox for persistent 24/7 parking mode. Features intelligent loop-recording, night-vision cameras, and G-shock incident locking sensors.',
    installTime: '1 - 2 Hours',
    warranty: '2 Years Warranty',
    features: [
      { title: 'Dual Lens 4K + 1080p', desc: 'Sony STARVIS image sensors capture crystal-clear license plate details day or night.' },
      { title: 'Hardwired Parking Mode', desc: 'Monitors the vehicle while parked, recording impacts or motion without draining your car battery.' },
      { title: 'Wi-Fi App Link', desc: 'Download, play, and share recorded footage instantly via local Wi-Fi pairing.' },
      { title: 'Built-in GPS Logger', desc: 'Embeds vehicle speed, location coordinates, and route metadata inside video tracks.' }
    ],
    specs: [
      { label: 'Video Resolution', value: 'Front: 4K UHD, Rear: 1080p FHD' },
      { label: 'Viewing Angle', value: '150° diagonal wide-angle field' },
      { label: 'Storage Capacity', value: 'Supports up to 256GB MicroSD' },
      { label: 'Battery Monitor', value: 'Automatic low-voltage power cut-off' }
    ],
    prices: {
      sedan: 90000,
      suv: 90000,
      luxury: 90000
    }
  },
  android: {
    id: 'android',
    name: 'Premium Android Screen Installation',
    tagline: 'Infotainment System Upgrades with Smart Integration',
    description: 'Upgrade your vehicle\'s console to a gorgeous high-definition capacitive IPS touchscreen system. Built-in Apple CarPlay & Android Auto allow you to control maps, music streams, calls, and messages using steering buttons or voice commands.',
    installTime: '3 - 4 Hours',
    warranty: '2 Years Warranty',
    features: [
      { title: 'Wireless Integration', desc: 'Syncs your iPhone or Android phone wirelessly as soon as you step inside.' },
      { title: 'OEM Steering Support', desc: 'Fully maps your vehicle\'s original steering wheel dials and HVAC controls.' },
      { title: 'Surround Sound DSP', desc: 'Integrated Digital Sound Processor chip offers custom equalization settings for high-end audio.' },
      { title: 'AHD Camera Ready', desc: 'Seamlessly displays high-definition reversing grids and side monitoring systems.' }
    ],
    specs: [
      { label: 'Processor & RAM', value: 'Octa-core 2.0GHz, 4GB/6GB LPDDR4' },
      { label: 'Display Screen', value: '9" / 10.1" QLED panel, 1280x720 pixels' },
      { label: 'Operating System', value: 'Android Automotive OS' },
      { label: 'Connectivity', value: 'Wi-Fi, Bluetooth 5.0, GPS, 4G SIM tray' }
    ],
    prices: {
      sedan: 70000,
      suv: 70000,
      luxury: 70000
    }
  },
  pushstart: {
    id: 'pushstart',
    name: 'Smart Push-to-Start Button Upgrade',
    tagline: 'Keyless Passive Entry and Intelligent Ignition',
    description: 'Transform your traditional metal key tumbler ignition into a modern, proximity-sensing push button. Features high-security transponder keychains, security immobilizer lockups, and convenient remote engine starting options.',
    installTime: '4 Hours',
    warranty: '2 Years Warranty',
    features: [
      { title: 'Proximity Entry (PKE)', desc: 'Car doors unlock automatically when you approach within 1.5m and lock as you walk away.' },
      { title: 'Smart-Key Fobs', desc: 'Comes with two designer heavy-duty keyfobs with built-in emergency backup physical keys.' },
      { title: 'Remote Start Logic', desc: 'Warm up your cabin or power on air conditioning from home via remote fob ignition.' },
      { title: 'Secure Rolling Code', desc: 'Encrypted RF protocols prevent relay attacks and key cloning diagnostics.' }
    ],
    specs: [
      { label: 'Relay Frequency', value: '433.92 MHz encrypted rolling code' },
      { label: 'Standby Current', value: '< 6mA low-draw battery protector' },
      { label: 'Button Lifespan', value: 'Tested for 500,000 engine start cycles' },
      { label: 'Immobilizer Bypass', value: 'Compatible with transponder key modules' }
    ],
    prices: {
      sedan: 160000,
      suv: 160000,
      luxury: 160000
    }
  }
};

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

const legalData: Record<string, { title: string; updated: string; intro: string; sections: { heading: string; body: string }[] }> = {
  privacy: {
    title: 'Privacy Policy',
    updated: 'Last updated: May 2026',
    intro: 'This policy explains how PostyBridges collects and uses customer information when you request a quote, contact our workshop, or install vehicle technology services in Nigeria.',
    sections: [
      {
        heading: 'Information we collect',
        body: 'We collect the details you submit, including your name, email address, phone number, vehicle make and model, service request, and message. If you install GPS tracking or fleet systems, service setup may also involve vehicle identifiers, device identifiers, location records, geofence alerts, and service logs needed to operate the product.'
      },
      {
        heading: 'How we use your information',
        body: 'We use this information to respond to inquiries, prepare quotes, confirm bookings, install and support vehicle systems, process warranty requests, prevent misuse, and keep operational records. We do not sell customer personal data.'
      },
      {
        heading: 'Nigeria data protection rights',
        body: 'PostyBridges aims to handle personal data in line with the Nigeria Data Protection Act 2023. You may request access, correction, deletion, restriction, or information about how your data is used, subject to lawful retention needs and service obligations.'
      },
      {
        heading: 'Sharing and retention',
        body: 'We may share limited information with technicians, device platform providers, email service providers, hosting providers, or regulators where required by law. We keep information only as long as needed for service delivery, support, warranty, legal compliance, fraud prevention, and legitimate business records.'
      },
      {
        heading: 'Contact',
        body: 'For privacy requests, contact postybridges@gmail.com or call +234 (0) 902 002 3287. Include your name, vehicle details, and the request you want us to review.'
      }
    ]
  },
  terms: {
    title: 'Terms of Service',
    updated: 'Last updated: May 2026',
    intro: 'These terms apply when you use the PostyBridges website, request a quote, book an installation, or purchase vehicle technology services from us in Nigeria.',
    sections: [
      {
        heading: 'Quotes and bookings',
        body: 'Website estimates are guidance only until a technician confirms your vehicle model, wiring condition, part compatibility, installation location, and selected package. Final pricing, timelines, and availability may change after inspection.'
      },
      {
        heading: 'Customer responsibilities',
        body: 'You must provide accurate vehicle and contact information, confirm lawful ownership or authority to modify the vehicle, remove personal valuables before service, and disclose existing electrical faults, prior modifications, tracking devices, or warranty restrictions.'
      },
      {
        heading: 'Installation and use',
        body: 'PostyBridges installs products for lawful vehicle security, safety, convenience, and fleet management. You are responsible for using GPS tracking, remote cut-off, speed limiters, dash cams, and other systems lawfully, including respecting driver, passenger, employee, and third-party privacy rights.'
      },
      {
        heading: 'Payments and cancellations',
        body: 'Deposits, balances, cancellation windows, and rescheduling terms will be confirmed before work begins. Custom-ordered parts, opened electronics, and completed installation labour may not be refundable except where required by applicable Nigerian consumer protection law.'
      },
      {
        heading: 'Consumer rights',
        body: 'Nothing in these terms removes rights available under Nigerian law, including fair dealing, accurate information, reasonable care and skill, and remedies for defective goods or services under applicable consumer protection rules.'
      }
    ]
  },
  warranty: {
    title: 'Warranty Info',
    updated: 'Last updated: May 2026',
    intro: 'This warranty summary explains how PostyBridges supports vehicle technology installations. Exact warranty periods may vary by product, brand, package, and invoice terms.',
    sections: [
      {
        heading: 'Coverage',
        body: 'Warranty covers defects in supplied hardware and installation workmanship during the stated warranty period. Typical coverage may include tracker units, dash cam systems, Android screens, push-to-start kits, speed limiter modules, installation wiring, mounting, and configuration issues caused by our workmanship.'
      },
      {
        heading: 'What is not covered',
        body: 'Warranty does not cover accident damage, misuse, tampering, water ingress not caused by our installation, power surges, battery failure, vehicle wiring faults, unauthorized repairs, third-party modifications, SIM/data subscription issues, normal wear, or faults from parts not supplied by PostyBridges.'
      },
      {
        heading: 'Claims process',
        body: 'Contact us with your name, phone number, invoice or booking reference, vehicle details, product installed, and a clear description of the issue. We may inspect the vehicle before approving repair, replacement, reconfiguration, or another remedy.'
      },
      {
        heading: 'Repair and replacement',
        body: 'If a valid warranty issue is confirmed, PostyBridges may repair the installation, reconfigure the system, replace defective parts, or provide another fair remedy. Remedies are handled in line with the product warranty and applicable Nigerian consumer protection expectations.'
      },
      {
        heading: 'Safety note',
        body: 'If a vehicle develops electrical smoke, burning smell, repeated fuse failure, starting failure, or unsafe driving behaviour after installation, stop using the affected system and contact PostyBridges immediately.'
      }
    ]
  }
};

// ==========================================
// DOM Elements Setup & Event Handlers
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
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

  // Header Scroll Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
    highlightNavOnScroll();
  });

  // Scroll section highlight logic
  function highlightNavOnScroll() {
    const scrollPos = window.scrollY + 150;
    const sections = ['hero', 'services', 'estimator', 'why-us', 'faq', 'contact'];
    
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
    navLinksList?.classList.toggle('active');
    hamburger.classList.toggle('open');
  });

  // Close Mobile Menu on Link Click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinksList?.classList.remove('active');
      hamburger?.classList.remove('open');
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
      navLinksList.classList.remove('active');
      hamburger?.classList.remove('open');
    }
  });

  // Smooth scroll buttons
  document.getElementById('btn-explore')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('btn-estimate')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('estimator')?.scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('btn-header-quote')?.addEventListener('click', () => {
    document.getElementById('estimator')?.scrollIntoView({ behavior: 'smooth' });
  });

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

  // Auto-scroll testimonials every 6 seconds
  let autoScroll = setInterval(nextSlide, 6000);
  
  // Reset auto-scroll timer on manual navigation
  [prevBtn, nextBtn].forEach(btn => {
    btn?.addEventListener('click', () => {
      clearInterval(autoScroll);
      autoScroll = setInterval(nextSlide, 6000);
    });
  });

  // ==========================================
  // FAQ Accordion Controls
  // ==========================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close all open FAQs
      faqItems.forEach(faq => faq.classList.remove('active'));
      // Toggle current
      if (!isActive) {
        item.classList.add('active');
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
      <h3>${details.name}</h3>
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
        <button class="btn-primary" id="btn-select-in-estimator" data-service="${details.id}" style="width:100%; justify-content:center;">
          Select This Upgrade in Cost Estimator
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>
      </div>
    `;

    serviceModal.classList.add('active');

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
        serviceModal.classList.remove('active');
        document.getElementById('estimator')?.scrollIntoView({ behavior: 'smooth' });
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
    serviceModal?.classList.remove('active');
  });

  // Click outside modal content to close
  window.addEventListener('click', (e) => {
    if (e.target === serviceModal) {
      serviceModal?.classList.remove('active');
    }
    if (e.target === bookingModal) {
      bookingModal?.classList.remove('active');
    }
    if (e.target === legalModal) {
      legalModal?.classList.remove('active');
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
    bookingModal?.classList.add('active');
  });

  closeBookingModalBtn?.addEventListener('click', () => {
    bookingModal?.classList.remove('active');
  });

  btnCloseSuccess?.addEventListener('click', () => {
    bookingModal?.classList.remove('active');
  });

  function openLegalModal(legalKey: string) {
    const details = legalData[legalKey];
    if (!details || !legalModalBody || !legalModal) return;

    const sectionsHtml = details.sections.map(section => `
      <section class="legal-section">
        <h4>${section.heading}</h4>
        <p>${section.body}</p>
      </section>
    `).join('');

    legalModalBody.innerHTML = `
      <span class="section-tag">PostyBridges Legal</span>
      <h3>${details.title}</h3>
      <p class="legal-updated">${details.updated}</p>
      <p class="modal-desc">${details.intro}</p>
      <div class="legal-sections">${sectionsHtml}</div>
      <p class="legal-note">This information is a practical customer summary, not a substitute for independent legal advice.</p>
    `;
    legalModal.classList.add('active');
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
    legalModal?.classList.remove('active');
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

  // ==========================================
  // Light / Dark Theme Toggle Logic
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
