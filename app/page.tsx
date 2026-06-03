import { SpeedInsights } from '@vercel/speed-insights/next'

export default function HomePage() {
  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-content">
          <p className="section-tag">Next-Gen Vehicle Tech</p>
          <h1>PostyBridges Smart Auto Integrations</h1>
          <p>Premium GPS tracking, dash cams, speed governors, Android upgrades, and keyless start systems for modern vehicles.</p>
          <div className="hero-actions">
            <a href="#estimator" className="btn-primary">Book a Quote</a>
            <a href="#contact" className="btn-secondary">Contact HQ</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-glow hero-glow-left"></div>
          <div className="hero-glow hero-glow-right"></div>
        </div>
      </section>

      <section className="services-overview">
        <div className="services-grid">
          <div className="service-card">
            <span className="service-icon">GPS</span>
            <h3>Real-Time Tracking</h3>
            <p>Monitor your vehicle fleet with precise GPS mapping, geofences, and remote alerts.</p>
          </div>
          <div className="service-card">
            <span className="service-icon">CAM</span>
            <h3>Smart Dash Cams</h3>
            <p>Install dual-channel cameras with event recording, G-sensor capture, and cloud backups.</p>
          </div>
          <div className="service-card">
            <span className="service-icon">SPEED</span>
            <h3>Speed Governors</h3>
            <p>Limit top speed safely with certified electronic controllers for cargo and fleet vehicles.</p>
          </div>
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
              <div className="radio-grid">
                <div className="radio-card selected">
                  <input type="radio" name="vehicle-type" value="sedan" defaultChecked />
                  <h4>Sedan / Coupe</h4>
                  <p>GPS from ₦80,000</p>
                </div>
                <div className="radio-card">
                  <input type="radio" name="vehicle-type" value="suv" />
                  <h4>SUV / MPV</h4>
                  <p>GPS from ₦95,000</p>
                </div>
                <div className="radio-card">
                  <input type="radio" name="vehicle-type" value="luxury" />
                  <h4>Luxury / EV</h4>
                  <p>GPS from ₦150,000</p>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>2. Choose Tech Integrations</label>
              <div className="checklist-grid" id="services-checklist">
                <div className="checklist-item selected" data-service="tracking">
                  <div className="checklist-item-info">
                    <input type="checkbox" defaultChecked />
                    <div>
                      <h4>GPS Vehicle Tracking</h4>
                      <p>Includes micro tracker device &amp; platform app</p>
                    </div>
                  </div>
                  <div className="checklist-item-price">₦80,000 - ₦150,000</div>
                </div>

                <div className="checklist-item" data-service="speedlimit">
                  <div className="checklist-item-info">
                    <input type="checkbox" />
                    <div>
                      <h4>Speed Limit Installation</h4>
                      <p>Safety governor with electronic control unit calibration</p>
                    </div>
                  </div>
                  <div className="checklist-item-price">₦100,000 - ₦150,000</div>
                </div>

                <div className="checklist-item" data-service="dashcam">
                  <div className="checklist-item-info">
                    <input type="checkbox" />
                    <div>
                      <h4>Smart Dual Dash Cam</h4>
                      <p>1080p front/rear system + G-sensor configuration</p>
                    </div>
                  </div>
                  <div className="checklist-item-price">₦90,000</div>
                </div>

                <div className="checklist-item" data-service="android">
                  <div className="checklist-item-info">
                    <input type="checkbox" />
                    <div>
                      <h4>Android Infotainment Upgrade</h4>
                      <p>HD touchscreen panel + CarPlay/Android Auto</p>
                    </div>
                  </div>
                  <div className="checklist-item-price">₦70,000</div>
                </div>

                <div className="checklist-item" data-service="pushstart">
                  <div className="checklist-item-info">
                    <input type="checkbox" />
                    <div>
                      <h4>Smart Push-to-Start Button</h4>
                      <p>Keyless upgrade, receiver, and 2 keys</p>
                    </div>
                  </div>
                  <div className="checklist-item-price">₦160,000</div>
                </div>
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
              <span className="pricing-value" id="live-total">100,000</span>
              <span className="pricing-period">NGN</span>
            </div>

            <div className="discount-tag" id="discount-indicator" style={{ display: 'none' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                <line x1="7" y1="7" x2="7.01" y2="7"></line>
              </svg>
              <span id="discount-text">Installation discount applied</span>
            </div>

            <ul className="summary-list" id="estimator-summary-list">
              <li>
                <span>Vehicle Type</span>
                <span id="summary-vehicle">Sedan / Coupe</span>
              </li>
              <li>
                <span>Selected Services</span>
                <span id="summary-services-count">1 Upgrade</span>
              </li>
              <li>
                <span>Equipment &amp; Hardware</span>
                <span id="summary-hardware-price">₦80,000</span>
              </li>
              <li>
                <span>Installation &amp; Settings</span>
                <span id="summary-install-price">₦20,000</span>
              </li>
            </ul>

            <div className="estimator-actions">
              <button className="btn-primary" id="btn-submit-estimate">
                Submit Booking &amp; Lock Price
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
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
            <p style={{ marginBottom: 30 }}>At PostyBridges, we combine premium quality diagnostic hardware with clean, certified installation procedures. Your vehicle's electronics, wiring harness, and panel lines are respected, ensuring standard factory-finish styling.</p>

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
          <div className="testimonials-slider" id="testimonials-slider">
            <div className="testimonial-slide">
              <div className="testimonial-card">
                <div className="testimonial-rating">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                </div>
                <p className="testimonial-text">"Had an Android Infotainment display and a dual-channel dash cam installed in my Honda Accord. The fitment looks 100% factory-made—no wires showing, no dash rattles. Highly professional technicians!"</p>
                <div className="testimonial-author">
                  <div className="author-info">
                    <h4>Tunde Oladipo</h4>
                    <p>Honda Owner</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="testimonial-slide">
              <div className="testimonial-card">
                <div className="testimonial-rating">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                </div>
                <p className="testimonial-text">"PostyBridges handles tracking and speed governors for our entire fleet of 45 delivery trucks. The real-time mapping platform is extremely reliable and the geofence alerts save us money every day."</p>
                <div className="testimonial-author">
                  <div className="author-info">
                    <h4>Chinelo Obi</h4>
                    <p>Logistics Director, SwiftTrans</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="testimonial-slide">
              <div className="testimonial-card">
                <div className="testimonial-rating">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                </div>
                <p className="testimonial-text">"The key to push-to-start button upgrade is life changing. My older SUV feels brand new now. Passive keyless entry unlocks my doors as I walk up. The installation was incredibly clean."</p>
                <div className="testimonial-author">
                  <div className="author-info">
                    <h4>Alhaji Musa Bello</h4>
                    <p>SUV Owner</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="testimonial-controls">
            <button className="control-btn" id="prev-testimonial" aria-label="Previous testimonial">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            </button>
            <button className="control-btn" id="next-testimonial" aria-label="Next testimonial">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
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
          <div className="faq-item">
            <button className="faq-question">
              Will these electronic integrations void my car warranty?
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div className="faq-answer">
              <p>No. We utilize plug-and-play T-harness interfaces specifically designed for your vehicle's make and model. This avoids hacking or cutting factory wiring harnesses, maintaining your manufacturer's warranty safety standard guidelines.</p>
            </div>
          </div>

          <div className="faq-item">
            <button className="faq-question">
              How accurate are the PostyBridges GPS trackers?
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div className="faq-answer">
              <p>Our trackers feature high-sensitivity GLONASS and GPS dual band chips, providing location reporting accurate within 2.5 meters. Location coordinates update every 10 seconds on your active mobile dashboard.</p>
            </div>
          </div>

          <div className="faq-item">
            <button className="faq-question">
              Can the Push-to-Start button upgrade be installed on any car?
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div className="faq-answer">
              <p>Yes, we can upgrade almost any key-ignition vehicle manufactured after 2000 to a push-to-start smart entry system. Some high-end luxury models require specialized bypass modules, which our team configures in-house.</p>
            </div>
          </div>

          <div className="faq-item">
            <button className="faq-question">
              Do the speed limit governors affect car acceleration?
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div className="faq-answer">
              <p>No. The speed limiter only restricts maximum speed (e.g. 80 km/h or 100 km/h) by regulating throttle actuator inputs once the speed is reached. Normal acceleration up to that limit remains entirely unaffected.</p>
            </div>
          </div>
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
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div className="contact-card-text">
                <h3>Our Workshop</h3>
                <p>Plot 15, Admiralty Way<br />Lekki Phase 1, Lagos, Nigeria</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div className="contact-card-text">
                <h3>Phone &amp; Support</h3>
                <p><a href="tel:+2349020023287">+234 (0) 902 002 3287</a></p>
                <p><a href="tel:+2349034725266">+234 (0) 903 472 5266</a></p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Mon - Sat: 8:00 AM - 6:00 PM</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
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
                <textarea id="contact-message" name="message" className="input-field" placeholder="Describe the upgrades you are looking for..." required></textarea>
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
              <a href="#" className="social-btn" aria-label="Facebook"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
              <a href="#" className="social-btn social-btn-x" aria-label="X"><span aria-hidden="true">X</span></a>
              <a href="#" className="social-btn" aria-label="Instagram"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
              <a href="#" className="social-btn" aria-label="LinkedIn"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><a href="#" className="service-link-trigger" data-service="tracking">GPS Tracking</a></li>
              <li><a href="#" className="service-link-trigger" data-service="speedlimit">Speed Limiters</a></li>
              <li><a href="#" className="service-link-trigger" data-service="dashcam">Smart Dash Cams</a></li>
              <li><a href="#" className="service-link-trigger" data-service="android">Android Screens</a></li>
              <li><a href="#" className="service-link-trigger" data-service="pushstart">Push to Start</a></li>
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
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 12 }}>Lock your packages with our dynamic estimators.</p>
            <a href="#estimator" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>Launch Estimator</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 PostyBridges. All rights reserved. Professional vehicle integration engineers.</p>
          <div className="footer-bottom-links">
            <a href="#" className="legal-link" data-legal="privacy">Privacy Policy</a>
            <a href="#" className="legal-link" data-legal="terms">Terms of Service</a>
            <a href="#" className="legal-link" data-legal="warranty">Warranty Info</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
