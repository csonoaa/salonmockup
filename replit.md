# Bella Afro Beauty Salon Website

## Overview

This is a static website for Bella Afro Beauty Salon, a hair braiding and styling business. The site serves as a digital presence showcasing services, portfolio work, pricing, and booking information. Built as a single-page application with smooth scrolling navigation, the website emphasizes visual appeal and user engagement through a clean, modern design that incorporates Burkina Faso flag colors as a cultural theme.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Single-page application (SPA)** using vanilla HTML, CSS, and JavaScript
- **Mobile-first responsive design** built with Bootstrap 5 framework
- **Component-based layout** with distinct sections: home, services, gallery, work standards, pricing, and booking
- **Smooth scrolling navigation** with fixed navbar and scroll spy functionality
- **CSS custom properties** for consistent theming using Burkina Faso flag colors (red, green, yellow)

### Design System
- **Typography hierarchy** using Google Fonts (Playfair Display for headings, Open Sans for body text)
- **Color scheme** based on Burkina Faso flag colors as CSS custom properties
- **Icon system** using Font Awesome 6.4.0 for consistent iconography
- **Animation system** for scroll-triggered animations and interactive elements

### User Interface Patterns
- **Fixed navigation** with scroll spy for section highlighting
- **Form validation** for appointment booking with required field checking
- **Responsive grid system** using Bootstrap's 12-column layout
- **Progressive enhancement** with JavaScript adding interactive features to a functional HTML base

### Performance Considerations
- **CDN delivery** for external dependencies (Bootstrap, Font Awesome, Google Fonts)
- **Minimal JavaScript footprint** with vanilla JS for core functionality
- **Optimized CSS** with custom properties for theme consistency
- **Semantic HTML structure** for accessibility and SEO optimization

## External Dependencies

### Frontend Frameworks & Libraries
- **Bootstrap 5.3.0** - CSS framework for responsive design and components
- **Font Awesome 6.4.0** - Icon library for UI elements
- **Google Fonts** - Typography (Playfair Display, Open Sans)

### CDN Services
- **Bootstrap CDN** - Framework delivery
- **Cloudflare CDN** - Font Awesome icon delivery
- **Google Fonts API** - Web font delivery

### Form Handling
- **HTML5 form validation** - Client-side validation for booking forms
- **JavaScript form processing** - Enhanced validation and user experience
- **Date validation** - Minimum date setting for appointment booking

Note: The current implementation appears to be a static frontend. Integration with backend services for form submission, database storage, or booking management systems would require additional architectural decisions.