# PropTax – Online Property Tax Self-Assessment and Payment Portal

## Project Overview

PropTax is a frontend-only academic prototype designed for the Software Engineering and Project Management case study on online property tax self-assessment and payment. The application demonstrates a realistic municipal citizen portal for property search, self-assessment, sample tax calculation, online payment simulation, receipt generation, payment history, objection workflow, and support information.

## Problem Statement

The city has a large population and a wide property base, with tax collection still handled mainly through ward offices. Property owners often struggle with the tax rate tables and manual paper-based assessment process. PropTax is designed to simplify property lookup, tax estimation, digital payment, and legal objection tracking using a citizen-friendly portal.

## Features

- Citizen login page with demo authentication
- Dashboard with summary cards and quick actions
- Property search by ID, owner, ward, or address
- Property details page with assessment information
- Step-by-step self-assessment form with validation
- Sample tax calculator using prototype rate values
- Payment simulation with confirmation modal and loading state
- Digital receipt display and print/download support
- Payment history with filtering and status badges
- Objection submission and tracking workflow
- Help and support FAQ page
- Responsive navigation for desktop and mobile
- Persistent localStorage-based state for demo workflow

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- LocalStorage for demo data persistence

## Project Structure

```text
proptax-portal/
├── index.html
├── dashboard.html
├── property-search.html
├── property-details.html
├── self-assessment.html
├── tax-calculator.html
├── payment.html
├── payment-success.html
├── receipt.html
├── payment-history.html
├── objections.html
├── help.html
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   ├── data.js
│   ├── calculator.js
│   ├── payment.js
│   └── objections.js
├── assets/
│   └── logo/
├── README.md
└── index.html
```

## UI Prototype

This is a frontend prototype for academic demonstration. It focuses on realistic UI and interaction flow rather than backend integration or real government systems.

## Demo Limitations

- No real authentication or payment gateway
- No backend API or database
- Tax values are sample / prototype only, not official municipal rates
- Property records are local dummy data only
- The portal is intended for demonstration and academic evaluation

## How to Run Locally

1. Open the project folder in VS Code.
2. Right-click on `index.html` and select Open with Live Server or use a simple static server.
3. Alternatively, open the file directly in a browser.

For a local server:

```bash
cd proptax-portal
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000/
```

## Screenshots

Placeholder for screenshots and viva/demo captures.

## Academic Case Study Information

Case Study No. 141 – PropTax

This prototype is meant to demonstrate how a digital citizen tax portal could improve self-assessment, transparency, and payment convenience for a municipal property-tax system.

## Footer Note

PropTax Prototype • Academic Case Study • Demo Data
