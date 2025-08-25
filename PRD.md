# Sri Sharada Press Website – Product Requirements Document (PRD)

## 1. Overview
A marketing and booking website for Sri Sharada Press. Visitors can learn about services, view portfolio/testimonials, and send booking or contact requests. The site is a static React + Vite app deployed on Vercel. All form submissions are handled client-side via Web3Forms; no serverless functions are used.

## 2. Goals
- Enable customers to quickly submit Booking and Contact requests.
- Showcase services, portfolio, testimonials, and business info.
- Provide reliable email delivery to `sspress.1912@gmail.com` via Web3Forms.
- Ensure fast, accessible, mobile-first experience.
- Deploy with zero backend maintenance (static site on Vercel).

## 3. Non‑Goals
- User authentication, dashboards, or CMS.
- On‑site payments or complex quoting engines.
- File storage beyond email attachments.

## 4. Users & Personas
- Prospective customers seeking printing services (mobile-first; quick contact).
- Returning customers needing a fast way to re-order or enquire.
- Business owner/operators checking inbound requests.

## 5. Success Metrics
- Form conversion rate (submissions / visits).
- Email delivery success (Web3Forms success responses).
- Site Core Web Vitals (LCP, CLS, INP) in green.

## 6. Scope and Features
### 6.1 Pages
- Home (`/`): Hero, service highlights, testimonials, CTA to Booking.
- Services (`/services`): Service list with descriptions.
- Booking (`/booking`): Form with optional file upload; toasts for feedback.
- Portfolio (`/portfolio`): Showcase work.
- Testimonials (`/testimonials`): Social proof.
- About (`/about`): Company information.
- Contact (`/contact`): Rich contact form with optional deadline, WhatsApp follow-up, file attachment, map and quick action links.
- 404 (`/404` or fallback): Not found page.

### 6.2 Forms
- Common requirements
  - Validation (client-side) with helpful error messages.
  - Single submission per click; visible progress/disabled state.
  - Success: toast notification and form reset.
  - Failure: toast shows provider error message.
  - Spam mitigation: hidden honeypot field (optional for contact), domain allow-list in Web3Forms.

- Booking form (`src/components/BookingForm.tsx`)
  - Fields: name, email, phone, service, dimensions (optional), quantity, preferred date (optional), additional info (optional), attachment (optional: PDF/PNG/JPG/SVG/TIFF; size limit enforced by UI), hidden `access_key`.
  - Submission: `multipart/form-data` to `https://api.web3forms.com/submit`.
  - Metadata: `from_name` = "Sri Sharada Press Website"; `subject` = `New Booking: <Service> — <Name>`.

- Contact form (`src/pages/Contact.tsx`)
  - Fields: name, email, phone (optional), subject, message, deadline (optional), allow WhatsApp (boolean), attachment (optional), honeypot `website`.
  - Hook: `useWeb3Submit` builds FormData and posts to Web3Forms.
  - Metadata: `from_name` = "Sri Sharada Press Website", dynamic subject.

### 6.3 Email Link Behavior
- Component `src/components/EmailLink.tsx`:
  - Mobile: opens system default mail app via `mailto:`.
  - Desktop: prompt to open Gmail, Outlook Web, or default mail app.
  - Fallback to copying address if navigation fails.

### 6.4 Quick Actions
- Call button (`tel:`), WhatsApp link, map link to Google Maps.

## 7. Architecture & Tech Stack
- Frontend: React 18, Vite 5, TypeScript, React Router, TanStack Query.
- UI: Tailwind CSS, shadcn/ui components, Lucide icons, Sonner toasts.
- Forms/Validation: React Hook Form + Zod.
- Email delivery: Web3Forms (no backend).
- Analytics: `@vercel/analytics` (optional).

## 8. Configuration & Environments
- Environment variables
  - `VITE_WEB3FORMS_KEY` (required): Web3Forms Access Key.
- Web3Forms Dashboard:
  - Configure Allowed Domains for production domain(s).
  - Set destination inbox (`sspress.1912@gmail.com`).
- Vercel Deployment (static):
  - Framework: Vite (auto-detect).
  - Build command: `vite build` (or `npm run build`).
  - Output directory: `dist`.
  - No serverless functions; no `vercel.json` required.

## 9. UX Requirements
- Mobile-first responsive layout.
- Clear CTAs on Home/Services to Booking and Contact.
- Accessible components: labels, focus states, ARIA attributes where appropriate.
- Feedback: loading states and toast notifications for all async actions.

## 10. Performance & Quality
- Optimize images (serve from `public/`, use appropriate sizes/formats).
- Code splitting via Vite defaults; avoid unnecessary large libraries.
- Lighthouse accessibility score ≥ 90; performance ≥ 90 on typical 4G.

## 11. File Upload Constraints
- Client-side limit (default 10 MB) in `FileUpload`.
- Accepted: `.pdf, .png, .jpg, .jpeg, .svg, .tiff` (configurable).
- Files transmitted only via Web3Forms email; no storage.

## 12. Error Handling
- Form errors surfaced via inline messages and toast.
- Network/API errors show provider message from Web3Forms when available.
- Graceful fallbacks for email link navigation (copy to clipboard).

## 13. Analytics & Logging
- Page view analytics via `@vercel/analytics`.
- No PII stored; only form submissions sent to email via Web3Forms.

## 14. Security & Privacy
- Public access key used for Web3Forms; server-side email handling by provider.
- No sensitive secrets in client bundle beyond Web3Forms public key.
- Follow privacy best practices; no tracking beyond analytics noted above.

## 15. Acceptance Criteria
- Vercel build succeeds; site served as static Vite app from `dist/`.
- Booking and Contact forms POST to Web3Forms with `multipart/form-data`, include `access_key`, and return success with toasts; forms reset on success.
- Emails are delivered to `sspress.1912@gmail.com` (as configured in Web3Forms dashboard), including attachments.
- Email links open Gmail/Outlook selection on desktop and default mail app on mobile.
- Single `<Toaster richColors closeButton />` mounted at app root.

## 16. Open Questions / Future Enhancements
- Add CMS for services/portfolio content management?
- Add image optimization pipeline and CDN configuration.
- Add reCAPTCHA or hCaptcha to further reduce spam (Web3Forms supports this).
- Add Thank You pages with conversion tracking.
