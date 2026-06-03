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
