# Formspree Setup Instructions

## How to Set Up Formspree for Your Contact Form

1. **Create a Formspree Account**
   - Go to https://formspree.io/
   - Sign up for a free account (or log in if you already have one)

2. **Create a New Form**
   - Click "New Form" in your dashboard
   - Give it a name (e.g., "Portfolio Contact Form")
   - Copy the form endpoint URL (it will look like: `https://formspree.io/f/YOUR_FORM_ID`)

3. **Update Your Contact Form**
   - Open `contact.html`
   - Find the form tag: `<form id="contact-form" class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" novalidate>`
   - Replace `YOUR_FORM_ID` with your actual Formspree form ID

4. **Update JavaScript (if needed)**
   - The JavaScript in `app.js` will automatically use the form action attribute
   - No additional changes needed in the JavaScript

5. **Test Your Form**
   - Submit a test message through your contact form
   - Check your Formspree dashboard to see if the message was received
   - Check your email (Formspree will send you notifications by default)

## Free Tier Limits
- 50 submissions per month
- Email notifications
- Basic spam protection

## Upgrade Options
If you need more submissions or advanced features, Formspree offers paid plans.

## Alternative Options
If you prefer not to use Formspree, you can:
- Use EmailJS (https://www.emailjs.com/)
- Set up a backend service (Node.js, PHP, etc.)
- Use Netlify Forms (if hosting on Netlify)
- Use other form services like FormSubmit, Getform, etc.
