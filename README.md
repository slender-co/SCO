# SCO - Company Website & Client Portal

This repository contains the website for Slender & Company and the client portal where clients can track the progress of their work through a proprietary tool.

## Project Structure

```
SCO/
├── index.html              # Main website homepage
├── assets/
│   ├── css/
│   │   └── styles.css     # Custom styles and animations
│   ├── js/
│   │   ├── ticker.js      # Hero section ticker functionality
│   │   └── services.js    # Services slider functionality
│   └── images/            # Image assets (to be added)
├── .gitignore
└── README.md
```

## Current Theme

The website is built using a custom theme designed with Aura.build. The theme includes:

- **Modern Design**: Dark theme with glassmorphism effects
- **Responsive Layout**: Mobile-first design that works on all devices
- **Interactive Elements**: 
  - Animated hero ticker with background image transitions
  - Services slider with auto-play and manual navigation
  - Smooth scroll animations

## Technologies Used

- **HTML5**: Semantic markup
- **Tailwind CSS**: Utility-first CSS framework (via CDN)
- **Lucide Icons**: Icon library
- **Google Fonts**: 
  - DM Serif Display (headings)
  - Courier Prime (monospace/rustic text)
  - Inter (body text)
  - Cutive Mono (monospace fallback)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/slender-co/SCO.git
   cd SCO
   ```

2. Open `index.html` in your browser or use a local development server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   ```

3. Navigate to `http://localhost:8000` in your browser

## Development Notes

- The theme is a starting point and will undergo significant customization
- All content, layout, and styling will be redesigned to match company branding
- Client portal functionality will be added in future iterations

## Future Enhancements

- [ ] Client portal with authentication
- [ ] Project tracking dashboard
- [ ] Proprietary project management tool integration
- [ ] Content management system
- [ ] Contact forms and lead capture
- [ ] Portfolio/project showcase pages

## License

© 2024 Slender & Company. All rights reserved.
