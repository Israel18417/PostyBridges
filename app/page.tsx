"use client"

import { useEffect, useMemo, useState } from 'react'
import { SpeedInsights } from '@vercel/speed-insights/next'

interface ServiceDetails {
  id: string
  name: string
  tagline: string
  description: string
  installTime: string
  warranty: string
  features: { title: string; desc: string }[]
  specs: { label: string; value: string }[]
  prices: Record<string, number>
}

const serviceData: Record<string, ServiceDetails> = {
  tracking: {
    id: 'tracking',
    name: 'GPS Vehicle Tracking Upgrade',
    tagline: 'Military-Grade Real-Time Asset Tracking',
    description:
      'PostyBridges advanced vehicle tracking provides remote immobilizer switches, geo-fence notifications, and speed monitoring directly to your iOS or Android app. Ideal for personal security, anti-theft protection, and commercial logistics management.',
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
    description:
      'We install premium electronic speed governors that integrate directly with your car\'s Engine Control Unit (ECU) or mechanical throttle body. Highly recommended for commercial transport, corporate fleet compliance, and driver safety programs.',
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
    description:
      'High-end front and rear dash camera setups hardwired directly to your vehicle\'s fusebox for persistent 24/7 parking mode. Features intelligent loop-recording, night-vision cameras, and G-shock incident locking sensors.',
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
    description:
      'Upgrade your vehicle\'s console to a gorgeous high-definition capacitive IPS touchscreen system. Built-in Apple CarPlay & Android Auto allow you to control maps, music streams, calls, and messages using steering buttons or voice commands.',
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
    description:
      'Transform your traditional metal key tumbler ignition into a modern, proximity-sensing push button. Features high-security transponder keychains, security immobilizer lockups, and convenient remote engine starting options.',
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
}

const vehicleProfiles: Record<string, { label: string }> = {
  sedan: { label: 'Sedan / Coupe' },
  suv: { label: 'SUV / Truck' },
  luxury: { label: 'Luxury / EV' }
}

const legalData = {
  privacy: {
    title: 'Privacy Policy',
    updated: 'Last updated: May 2026',
    intro:
      'This policy explains how PostyBridges collects and uses customer information when you request a quote, contact our workshop, or install vehicle technology services in Nigeria.',
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
    intro:
      'These terms apply when you use the PostyBridges website, request a quote, book an installation, or purchase vehicle technology services from us in Nigeria.',
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
    intro:
      'This warranty summary explains how PostyBridges supports vehicle technology installations. Exact warranty periods may vary by product, brand, package, and invoice terms.',
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
}

const testimonials = [
  {
    quote:
      'Had an Android Infotainment display and a dual-channel dash cam installed in my Honda Accord. The fitment looks 100% factory-made—no wires showing, no dash rattles. Highly professional technicians!',
    author: 'Tunde Oladipo',
    role: 'Honda Owner'
  },
  {
    quote:
      'PostyBridges handles tracking and speed governors for our entire fleet of 45 delivery trucks. The real-time mapping platform is extremely reliable and the geofence alerts save us money every day.',
    author: 'Chinelo Obi',
    role: 'Logistics Director, SwiftTrans'
  },
  {
    quote:
      'The key to push-to-start button upgrade is life changing. My older SUV feels brand new now. Passive keyless entry unlocks my doors as I walk up. The installation was incredibly clean.',
    author: 'Alhaji Musa Bello',
    role: 'SUV Owner'
  }
]

const faqItems = [
  {
    question: 'Will these electronic integrations void my car warranty?',
    answer:
      'No. We utilize plug-and-play T-harness interfaces specifically designed for your vehicle\'s make and model. This avoids hacking or cutting factory wiring harnesses, maintaining your manufacturer\'s warranty safety standard guidelines.'
  },
  {
    question: 'How accurate are the PostyBridges GPS trackers?',
    answer:
      'Our trackers feature high-sensitivity GLONASS and GPS dual band chips, providing location reporting accurate within 2.5 meters. Location coordinates update every 10 seconds on your active mobile dashboard.'
  },
  {
    question: 'Can the Push-to-Start button upgrade be installed on any car?',
    answer:
      'Yes, we can upgrade almost any key-ignition vehicle manufactured after 2000 to a push-to-start smart entry system. Some high-end luxury models require specialized bypass modules, which our team configures in-house.'
  },
  {
    question: 'Do the speed limit governors affect car acceleration?',
    answer:
      'No. The speed limiter only restricts maximum speed (e.g. 80 km/h or 100 km/h) by regulating throttle actuator inputs once the speed is reached. Normal acceleration up to that limit remains entirely unaffected.'
  }
]

const installationFeePerService = 20000
const discountedInstallationFee = 40000

function formatNaira(value: number) {
  return `₦${Math.round(value).toLocaleString('en-NG')}`
}

function getServicePrice(details: ServiceDetails, vehicleType: string) {
  return details.prices[vehicleType] ?? details.prices.sedan ?? 0
}

function getServicePriceLabel(details: ServiceDetails) {
  const uniquePrices = [...new Set(Object.values(details.prices))].sort((a, b) => a - b)
  if (uniquePrices.length === 1) {
    return formatNaira(uniquePrices[0])
  }
  return `${formatNaira(uniquePrices[0])} - ${formatNaira(uniquePrices[uniquePrices.length - 1])}`
}

export default function HomePage() {
  const [selectedVehicle, setSelectedVehicle] = useState('sedan')
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set(['tracking']))
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [serviceModalKey, setServiceModalKey] = useState<string>('tracking')
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [bookingReference, setBookingReference] = useState('')
  const [legalModalKey, setLegalModalKey] = useState<keyof typeof legalData | null>(null)
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false)
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [activeSection, setActiveSection] = useState('hero')

  const selectedServicesArray = useMemo(() => Array.from(selectedServices), [selectedServices])

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('theme') as 'light' | 'dark' | null
    const initialTheme = savedTheme ?? 'dark'
    setTheme(initialTheme)
    document.documentElement.setAttribute('data-theme', initialTheme)
  }, [])

  useEffect(() => {
    const sectionIds = ['hero', 'services', 'estimator', 'why-us', 'faq', 'contact']
    const handleScroll = () => {
      const scrollPos = window.scrollY + 160
      for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId)
        if (!section) continue
        const top = section.offsetTop
        const height = section.offsetHeight
        if (scrollPos >= top && scrollPos < top + height) {
          setActiveSection(sectionId)
          return
        }
      }
      setActiveSection('hero')
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const totals = useMemo(() => {
    const subtotal = selectedServicesArray.reduce((sum, serviceKey) => {
      const details = serviceData[serviceKey]
      return details ? sum + getServicePrice(details, selectedVehicle) : sum
    }, 0)
    const standardInstallationFee = selectedServicesArray.length * installationFeePerService
    const installationFee = selectedServicesArray.length >= 3 ? discountedInstallationFee : standardInstallationFee
    const discountValue = standardInstallationFee - installationFee
    const finalTotal = subtotal + installationFee

    return {
      subtotal,
      installationFee,
      discountValue,
      finalTotal
    }
  }, [selectedVehicle, selectedServicesArray])

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const toggleServiceSelection = (serviceKey: string) => {
    setSelectedServices((previous) => {
      const next = new Set(previous)
      if (next.has(serviceKey)) {
        next.delete(serviceKey)
      } else {
        next.add(serviceKey)
      }
      return next
    })
  }

  const openServiceModal = (serviceKey: string) => {
    setServiceModalKey(serviceKey)
    setIsServiceModalOpen(true)
  }

  const selectServiceInEstimator = (serviceKey: string) => {
    setSelectedServices(new Set([serviceKey]))
    setIsServiceModalOpen(false)
    document.getElementById('estimator')?.scrollIntoView({ behavior: 'smooth' })
  }

  const submitBooking = () => {
    if (selectedServicesArray.length === 0) {
      window.alert('Please check at least one vehicle upgrade integration service to estimate.')
      return
    }
    setBookingReference(`#PB-${Math.floor(1000 + Math.random() * 9000)}`)
    setIsBookingModalOpen(true)
  }

  const openLegalModal = (legalKey: keyof typeof legalData) => {
    setLegalModalKey(legalKey)
    setIsLegalModalOpen(true)
  }

  const currentService = serviceModalKey ? serviceData[serviceModalKey] : null
  const currentLegal = legalModalKey ? legalData[legalModalKey] : null
  const vehicleLabel = vehicleProfiles[selectedVehicle]?.label ?? 'Sedan / Coupe'

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
    window.localStorage.setItem('theme', nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
  }

  return (
    <main>
      <header id="header" className={`site-header ${isMenuOpen ? 'open' : ''}`}>
        <div className="header-inner">
          <a href="#hero" className="logo">PostyBridges</a>
          <nav id="nav-links" className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            {[
              ['services', 'Services'],
              ['estimator', 'Estimator'],
              ['why-us', 'Why Us'],
              ['faq', 'FAQs'],
              ['contact', 'Contact']
            ].map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className={activeSection === id ? 'active' : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <button id="theme-toggle" type="button" className="theme-toggle" onClick={toggleTheme}>
              <span className="toggle-text">{theme === 'light' ? 'Dark mode' : 'Light mode'}</span>
            </button>
            <button
              id="btn-header-quote"
              type="button"
              className="btn-primary"
              onClick={() => document.getElementById('estimator')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Quote
            </button>
            <button
              id="hamburger-menu"
              type="button"
              className={`hamburger ${isMenuOpen ? 'open' : ''}`}
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label="Toggle navigation"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <section className="page-hero" id="hero">
        <div className="page-hero-content">
          <p className="section-tag">Next-Gen Vehicle Tech</p>
          <h1>PostyBridges Smart Auto Integrations</h1>
          <p>
            Premium GPS tracking, dash cams, speed governors, Android upgrades, and keyless start systems for modern vehicles.
          </p>
          <div className="hero-actions">
            <a id="btn-explore" href="#services" className="btn-secondary">Explore Services</a>
            <a id="btn-estimate" href="#estimator" className="btn-primary">Book a Quote</a>
            <a href="#contact" className="btn-tertiary">Contact HQ</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-glow hero-glow-left" />
          <div className="hero-glow hero-glow-right" />
        </div>
      </section>

      <section id="services" className="services-overview">
        <div className="services-grid">
          {Object.values(serviceData).map((service) => (
            <button
              key={service.id}
              type="button"
              className="service-card"
              onClick={() => openServiceModal(service.id)}
              data-service={service.id}
            >
              <div className="service-card-icon">{service.id.toUpperCase()}</div>
              <h3>{service.name}</h3>
              <p>{service.tagline}</p>
              <div className="service-card-footer">
                <span>{getServicePriceLabel(service)}</span>
                <span className="service-card-link">View details</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section id="estimator" className="estimator-section">
        <div className="estimator-layout">
          <div className="estimator-card">
            <span className="section-tag">Price Guide</span>
            <h2>Instant Installation Estimate</h2>
            <p>Select your vehicle type and services to see an immediate quote range.</p>

            <div className="form-group">
              <label>1. Choose Vehicle Type</label>
              <div className="radio-grid" id="vehicle-type-container">
                {Object.entries(vehicleProfiles).map(([key, profile]) => (
                  <button
                    key={key}
                    type="button"
                    className={`radio-card ${selectedVehicle === key ? 'selected' : ''}`}
                    onClick={() => setSelectedVehicle(key)}
                  >
                    <input type="radio" name="vehicle-type" value={key} checked={selectedVehicle === key} readOnly />
                    <h4>{profile.label}</h4>
                    <p>
                      GPS from{' '}
                      {key === 'sedan' ? '₦80,000' : key === 'suv' ? '₦95,000' : '₦150,000'}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>2. Choose Tech Integrations</label>
              <div className="checklist-grid" id="services-checklist">
                {Object.values(serviceData).map((service) => {
                  const selected = selectedServices.has(service.id)
                  return (
                    <button
                      key={service.id}
                      type="button"
                      className={`checklist-item ${selected ? 'selected' : ''}`}
                      data-service={service.id}
                      onClick={() => toggleServiceSelection(service.id)}
                    >
                      <div className="checklist-item-info">
                        <input type="checkbox" checked={selected} readOnly />
                        <div>
                          <h4>{service.name}</h4>
                          <p>{service.description}</p>
                        </div>
                      </div>
                      <div className="checklist-item-price">{formatNaira(getServicePrice(service, selectedVehicle))}</div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="estimator-board">
            <div className="estimator-board-header">
              <h3>Package Total Estimate</h3>
              <p>Calculated dynamic quote based on selections.</p>
            </div>

            <div className="pricing-panel">
              <span className="pricing-currency">₦</span>
              <span className="pricing-value">{totals.finalTotal.toLocaleString('en-NG')}</span>
              <span className="pricing-period">NGN</span>
            </div>

            <div className="discount-tag" style={{ display: totals.discountValue > 0 ? 'inline-flex' : 'none' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                <line x1="7" y1="7" x2="7.01" y2="7"></line>
              </svg>
              <span>{`Installation Discount: Save ${formatNaira(totals.discountValue)}`}</span>
            </div>

            <ul className="summary-list" id="estimator-summary-list">
              <li>
                <span>Vehicle Type</span>
                <span>{vehicleLabel}</span>
              </li>
              <li>
                <span>Selected Services</span>
                <span>{`${selectedServicesArray.length} Upgrade${selectedServicesArray.length !== 1 ? 's' : ''}`}</span>
              </li>
              <li>
                <span>Equipment &amp; Hardware</span>
                <span>{formatNaira(totals.subtotal)}</span>
              </li>
              <li>
                <span>Installation &amp; Settings</span>
                <span>{formatNaira(totals.installationFee)}</span>
              </li>
            </ul>

            <div className="estimator-actions">
              <button className="btn-primary" type="button" onClick={submitBooking}>
                Submit Booking &amp; Lock Price
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="why-us" className="why-us">
        <div className="why-layout">
          <div>
            <span className="section-tag">Our Excellence</span>
            <h2>Engineered for Premium Integration</h2>
            <p style={{ marginBottom: 30 }}>
              At PostyBridges, we combine premium quality diagnostic hardware with clean, certified installation procedures. Your vehicle's electronics, wiring harness, and panel lines are respected, ensuring standard factory-finish styling.
            </p>

            <div className="why-features">
              <div className="why-feature-item">
                <div className="why-feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  </svg>
                </div>
                <div className="why-feature-text">
                  <h3>Certified Auto Electricians</h3>
                  <p>All integrations are done by certified automotive engineering technicians with specialized experience.</p>
                </div>
              </div>

              <div className="why-feature-item">
                <div className="why-feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div className="why-feature-text">
                  <h3>Same-Day Fast Installation</h3>
                  <p>Standard installations (screens, buttons, trackers, dash cams) take less than 4 hours in our fully-equipped bays.</p>
                </div>
              </div>

              <div className="why-feature-item">
                <div className="why-feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <div className="why-feature-text">
                  <h3>2-Year Hardware Warranty</h3>
                  <p>We only install brand-certified systems, protected with comprehensive replacement warranties.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">5K<span>+</span></div>
              <div className="stat-label">Vehicles Configured</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">99.9<span>%</span></div>
              <div className="stat-label">GPS Active Time</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">12<span>+</span></div>
              <div className="stat-label">Years Auto Service</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">4.9<span>/5</span></div>
              <div className="stat-label">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="section-header">
          <span className="section-tag">Client Reviews</span>
          <h2>What Drivers Say</h2>
          <p>Read experiences from fleet operations directors, daily commuters, and vehicle enthusiasts.</p>
        </div>

        <div className="testimonials-container">
          <div className="testimonials-slider" id="testimonials-slider" style={{ transform: `translateX(-${testimonialIndex * 100}%)` }}>
            {testimonials.map((testimonial, index) => (
              <div className="testimonial-slide" key={index}>
                <div className="testimonial-card">
                  <div className="testimonial-rating">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <svg key={starIndex} xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <p className="testimonial-text">{testimonial.quote}</p>
                  <div className="testimonial-author">
                    <div className="author-info">
                      <h4>{testimonial.author}</h4>
                      <p>{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="testimonial-controls">
            <button type="button" className="control-btn" id="prev-testimonial" aria-label="Previous testimonial" onClick={() => setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <button type="button" className="control-btn" id="next-testimonial" aria-label="Next testimonial" onClick={() => setTestimonialIndex((prev) => (prev + 1) % testimonials.length)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <section id="faq" className="faq-section">
        <div className="section-header">
          <span className="section-tag">Got Questions?</span>
          <h2>Frequently Answered</h2>
          <p>Learn more about our integration procedures, vehicle compatibility, and service details.</p>
        </div>

        <div className="faq-list">
          {faqItems.map((item, index) => (
            <div key={index} className={`faq-item ${faqOpenIndex === index ? 'active' : ''}`}>
              <button className="faq-question" type="button" onClick={() => setFaqOpenIndex(faqOpenIndex === index ? null : index)}>
                {item.question}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-layout">
          <div className="contact-info">
            <div>
              <span className="section-tag">Get in Touch</span>
              <h2>Visit PostyBridges HQ</h2>
              <p>Drop by our professional integration facility, call us, or send an email. Our technical consultants are ready to assist you.</p>
            </div>

            <div className="contact-card">
              <div className="contact-card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="contact-card-text">
                <h3>Our Workshop</h3>
                <p>Plot 15, Admiralty Way<br />Lekki Phase 1, Lagos, Nigeria</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className="contact-card-text">
                <h3>Phone & Support</h3>
                <p><a href="tel:+2349020023287">+234 (0) 902 002 3287</a></p>
                <p><a href="tel:+2349034725266">+234 (0) 903 472 5266</a></p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Mon - Sat: 8:00 AM - 6:00 PM</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div className="contact-card-text">
                <h3>General Inquiries</h3>
                <p><a href="mailto:postybridges@gmail.com">postybridges@gmail.com</a></p>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <h3 style={{ marginBottom: 24, fontSize: '1.5rem' }}>Send Technical Message</h3>
            <form className="contact-form" id="contact-form-element" action="/api/contact" method="POST">
              <input type="text" name="website" autoComplete="off" tabIndex={-1} className="form-honeypot" aria-hidden="true" />
              <div className="form-group">
                <label htmlFor="contact-name">Full Name</label>
                <input type="text" id="contact-name" name="name" className="input-field" placeholder="John Doe" required />
              </div>
              <div className="form-group">
                <label htmlFor="contact-email">Email Address</label>
                <input type="email" id="contact-email" name="email" className="input-field" placeholder="john@example.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="contact-phone">Phone Number</label>
                <input type="tel" id="contact-phone" name="phone" className="input-field" placeholder="+234 (0) 803 123 4567" />
              </div>
              <div className="form-group">
                <label htmlFor="contact-vehicle">Vehicle Make &amp; Model</label>
                <input type="text" id="contact-vehicle" name="vehicle" className="input-field" placeholder="e.g. 2018 Toyota Camry" required />
              </div>
              <div className="form-group full-width">
                <label htmlFor="contact-message">Your Inquiry / Vehicle Specs</label>
                <textarea id="contact-message" name="message" className="input-field" placeholder="Describe the upgrades you are looking for..." required />
              </div>
              <div className="form-group full-width" style={{ marginBottom: 0 }}>
                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Send Message</button>
              </div>
              <div id="contact-form-status" className="form-status"></div>
            </form>
          </div>
        </div>
      </section>

      <section className="speed-insights-section">
        <div className="section-header">
          <span className="section-tag">Site Health</span>
          <h2>Live Performance Insights</h2>
          <p>Track how quickly this page loads with Vercel Speed Insights integrated into the homepage.</p>
        </div>
        <div className="speed-insights-widget">
          <SpeedInsights />
        </div>
      </section>

      <footer>
        <div className="footer-container">
          <div className="footer-brand">
            <a href="#" className="logo" style={{ marginBottom: 16 }}>
              <img src="/logo.jpg" alt="PostyBridges Logo" className="logo-img" />
            </a>
            <p>Next-gen electronic and smart vehicle system installation. Transforming security, convenience, and fleet dynamics.</p>
            <div className="social-links">
              <a href="#" className="social-btn" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" className="social-btn social-btn-x" aria-label="X">
                <span aria-hidden="true">X</span>
              </a>
              <a href="#" className="social-btn" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="social-btn" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              {Object.values(serviceData).map((service) => (
                <li key={service.id}>
                  <button type="button" className="service-link-trigger" onClick={() => openServiceModal(service.id)}>
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#why-us">Why Us</a></li>
              <li><a href="#testimonials-slider">Reviews</a></li>
              <li><a href="#faq">FAQs</a></li>
              <li><a href="#contact">Contact HQ</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Quick Quote</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 12 }}>
              Lock your packages with our dynamic estimators.
            </p>
            <a href="#estimator" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
              Launch Estimator
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 PostyBridges. All rights reserved. Professional vehicle integration engineers.</p>
          <div className="footer-bottom-links">
            <button type="button" className="legal-link" onClick={() => openLegalModal('privacy')}>
              Privacy Policy
            </button>
            <button type="button" className="legal-link" onClick={() => openLegalModal('terms')}>
              Terms of Service
            </button>
            <button type="button" className="legal-link" onClick={() => openLegalModal('warranty')}>
              Warranty Info
            </button>
          </div>
        </div>
      </footer>

      {isServiceModalOpen && currentService ? (
        <div className="modal-overlay active" id="service-modal" onClick={(event) => { if (event.target === event.currentTarget) setIsServiceModalOpen(false) }}>
          <div className="modal-content">
            <button type="button" className="close-modal" id="close-service-modal" aria-label="Close modal" onClick={() => setIsServiceModalOpen(false)}>
              &times;
            </button>
            <div className="modal-body" id="service-modal-body">
              <h3>{currentService.name}</h3>
              <div className="modal-subtitle">{currentService.tagline}</div>
              <p className="modal-desc">{currentService.description}</p>

              <h4 style={{ marginBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 8 }}>
                Core Features & Integrations
              </h4>
              <div className="modal-features">
                {currentService.features.map((feature) => (
                  <div className="modal-feature-item" key={feature.title}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <div>
                      <h4>{feature.title}</h4>
                      <p>{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="modal-details-grid">
                <div>
                  <h4 style={{ marginBottom: 12 }}>Technical Specs</h4>
                  {currentService.specs.map((spec) => (
                    <div key={spec.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.03)', fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>{spec.label}</span>
                      <span style={{ fontWeight: 500, color: '#fff' }}>{spec.value}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', padding: 20, borderRadius: 12 }}>
                  <h4 style={{ marginBottom: 12 }}>Service Profile</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Installation Duration:</span>
                    <span style={{ color: '#fff', fontWeight: 500 }}>{currentService.installTime}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Warranty Period:</span>
                    <span style={{ color: '#fff', fontWeight: 500 }}>{currentService.warranty}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Base Service Price:</span>
                    <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>{getServicePriceLabel(currentService)}</span>
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button className="btn-primary" type="button" onClick={() => selectServiceInEstimator(currentService.id)} style={{ width: '100%', justifyContent: 'center' }}>
                  Select This Upgrade in Cost Estimator
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {isBookingModalOpen ? (
        <div className="modal-overlay active" id="booking-modal" onClick={(event) => { if (event.target === event.currentTarget) setIsBookingModalOpen(false) }}>
          <div className="modal-content" style={{ maxWidth: 550 }}>
            <button type="button" className="close-modal" id="close-booking-modal" aria-label="Close modal" onClick={() => setIsBookingModalOpen(false)}>
              &times;
            </button>
            <div className="modal-body" style={{ textAlign: 'center' }}>
              <div className="success-icon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3>Booking Submitted!</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>
                Your custom quote estimate has been locked in. A technician will contact you in less than 2 hours to confirm vehicle specifications.
              </p>

              <div className="success-details">
                <h4>
                  Quote Reference: <span className="text-gradient-cyan" id="success-ref">{bookingReference}</span>
                </h4>
                <div className="success-detail-row">
                  <span>Vehicle Type</span>
                  <span>{vehicleLabel}</span>
                </div>
                <div className="success-detail-row">
                  <span>Services Selected</span>
                  <span>{`${selectedServicesArray.length} Upgrade${selectedServicesArray.length !== 1 ? 's' : ''}`}</span>
                </div>
                <div className="success-detail-row" style={{ borderTop: '1px dashed rgba(255,255,255,0.05)', paddingTop: 8, marginTop: 8, fontWeight: 'bold' }}>
                  <span>Locked Price</span>
                  <span className="text-gradient-cyan" id="success-total" style={{ fontSize: '1.1rem' }}>
                    {formatNaira(totals.finalTotal)}
                  </span>
                </div>
              </div>

              <div className="modal-actions" style={{ justifyContent: 'center' }}>
                <button type="button" className="btn-primary" id="btn-close-success" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setIsBookingModalOpen(false)}>
                  Done & Return
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {isLegalModalOpen && currentLegal ? (
        <div className="modal-overlay active" id="legal-modal" onClick={(event) => { if (event.target === event.currentTarget) setIsLegalModalOpen(false) }}>
          <div className="modal-content legal-modal-content">
            <button type="button" className="close-modal" id="close-legal-modal" aria-label="Close legal information" onClick={() => setIsLegalModalOpen(false)}>
              &times;
            </button>
            <div className="modal-body legal-modal-body" id="legal-modal-body">
              <span className="section-tag">PostyBridges Legal</span>
              <h3>{currentLegal.title}</h3>
              <p className="legal-updated">{currentLegal.updated}</p>
              <p className="modal-desc">{currentLegal.intro}</p>
              <div className="legal-sections">
                {currentLegal.sections.map((section) => (
                  <section className="legal-section" key={section.heading}>
                    <h4>{section.heading}</h4>
                    <p>{section.body}</p>
                  </section>
                ))}
              </div>
              <p className="legal-note">This information is a practical customer summary, not a substitute for independent legal advice.</p>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  )
}
