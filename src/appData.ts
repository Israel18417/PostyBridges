export interface ServiceDetails {
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

export const serviceData: Record<string, ServiceDetails> = {
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

export type LegalData = Record<string, {
  title: string;
  updated: string;
  intro: string;
  sections: { heading: string; body: string }[];
}>;

export const legalData: LegalData = {
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
