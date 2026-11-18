# THE WOFT website specification

## 1. Purpose

Build a responsive React website that explains THE WOFT's custom software and digital services, shows real example applications, and helps prospective clients request a quote. The site should turn the existing quotation poster into clear, browsable information; the poster itself can remain a downloadable reference.

**Primary audience:** Cambodian small businesses and organizations considering an internal system, online system, or digital menu. **Primary language:** Khmer, with English only if complete, reviewed translations are available.

**Main conversion:** a visitor reviews a relevant sample app and contacts THE WOFT with their requirements.

## 2. Source material and content rules

The current folder contains `THE_WOFT_Service_Quotation_Poster_10x16.png` and Kantumruy Pro font files. There is no existing React app, app screenshot, demo URL, logo file, or contact information in this folder.

The poster lists these indicative offers:

| Service | Starting price shown | Website description |
| --- | ---: | --- |
| Offline system | $350+ | A system for work that does not require a constant internet connection. Define device and synchronization requirements per quote. |
| Online system | $500+ | A browser-accessible system with online data and user access. Define hosting and ongoing costs per quote. |
| QR digital menu | $150 | A menu customers open by scanning a QR code. Define editing, ordering, and payment features per quote. |

The poster also mentions additional changes at **$10–$50**, a **50% deposit**, **30 days of bug-fix support**, and hosting/domain costs handled separately. Confirm the exact wording, scope, and current validity before publishing these as binding terms. Display prices as *starting prices* or *indicative prices* and link them to a request for a tailored quote. Do not imply that every feature is included in the base price.

## 3. Recommended information architecture

One landing page is sufficient for the first release. Each real sample app can have a shareable detail route, `/work/:slug`.

1. **Header:** THE WOFT name or approved logo; navigation to Services, Work, Process, FAQ, Contact; primary “Request a quote” action.
2. **Hero:** concise promise about building practical software for businesses; short supporting sentence; “See our work” and “Discuss your project” actions. Use a genuine product screenshot when available.
3. **Services:** three distinct cards for offline systems, online systems, and QR menus. Explain who each is for, typical outcomes, and indicative starting price. Avoid fixed feature lists until the packages are defined.
4. **Sample apps / work:** filterable gallery of actual projects or clearly labeled concepts. Lead with screenshots and business problems solved.
5. **How we work:** discovery, scope and quote, design/build, review, launch, support. Explain when the 50% deposit is due after terms are confirmed.
6. **Pricing and terms:** starting prices, custom quote explanation, revision policy, support window, and hosting/domain note. Keep the language consistent with the quotation.
7. **FAQ:** offline versus online, expected delivery time (only when a reliable range is available), ownership, maintenance, hosting, and what information to provide for a quote.
8. **Contact:** simple project inquiry form and verified direct contact methods. Show a success state and protect the form from spam once a delivery endpoint exists.
9. **Footer:** contact details, social links, copyright, and privacy notice if form data is collected.

## 4. Sample app feature

### Gallery

- Each card shows a cover image, app name, category, one-sentence problem/outcome, key features, and a “View details” action.
- Optional filters: **All**, **Offline systems**, **Online systems**, **QR menus**. Add filters only if there are enough real examples to make them useful.
- A “Live demo” action appears only when a working, public demo URL exists. If the demo uses sample data or has restricted actions, say so beside the link.
- If there are no publishable projects yet, use a small **Concept examples** section with explicit labels. Never present concepts or mockups as delivered client work.

### Detail page (`/work/:slug`)

- App title, category, project status (delivered product / internal product / concept), and concise summary.
- Screenshots with captions and mobile-friendly image viewing; video is optional.
- Business problem, solution, 3–6 verified features, supported devices, and outcome when it can be substantiated.
- Live demo and repository links only when approved for public use.
- Call to action: “Build something similar” with the app name prefilled in the inquiry form.
- Written client approval before publishing names, logos, private screens, or metrics.

### Suggested content model

```ts
type Project = {
  slug: string;
  title: string;
  category: 'offline' | 'online' | 'qr-menu';
  status: 'client-work' | 'internal' | 'concept';
  summary: string;
  problem?: string;
  solution?: string;
  features: string[];
  coverImage: string;
  screenshots: { src: string; alt: string; caption?: string }[];
  demoUrl?: string;
  technologies?: string[];
};
```

Store this content in a local data module for the first release. A CMS is only useful when nondevelopers need to update projects frequently.

## 5. UX and visual direction

- Build a clean visual system inspired by the poster's deep teal, aqua accents, white text, and strong typography. Preserve THE WOFT branding without turning the page into a tall poster image.
- Use the supplied Kantumruy Pro fonts for Khmer. Check glyphs, line height, and wrapping on narrow screens.
- Design mobile first, then verify tablet and desktop. Navigation, pricing cards, screenshot galleries, and the form must remain easy to use at 320 px width and above.
- Keep text readable, buttons easy to tap, and color contrast sufficient. Support keyboard navigation, visible focus, semantic headings, alt text, and reduced motion preferences.
- Optimize screenshots as modern compressed images with meaningful alt text; load below-the-fold images lazily. Avoid autoplay video.

## 6. React implementation outline

- **Stack:** React + TypeScript + Vite; React Router if project detail routes are included. Use plain CSS or a small styling system so the site remains easy to maintain.
- **Components:** `Header`, `Hero`, `ServiceCard`, `ProjectCard`, `ProjectGallery`, `ProjectDetail`, `ProcessSteps`, `PricingTerms`, `FAQ`, `InquiryForm`, `Footer`.
- **Content:** keep services, FAQ, and projects in typed data files. Keep contact destinations and public URLs in one configuration file.
- **Form:** validate required fields (name, contact method, project type, short requirements), communicate what happens next, and submit to a real endpoint. Do not display a fake success message if nothing was delivered.
- **SEO:** descriptive page titles and metadata, Open Graph image, indexable project detail pages, sitemap, and clear page headings. If client-side routing is used, configure host fallback for direct visits to detail URLs; prerendering can be added if search visibility becomes important.

## 7. First-release acceptance criteria

- Visitors can understand the three services and their indicative prices without reading the poster image.
- Every published sample app has an accurate status, at least one optimized screenshot, descriptive text, and a working detail route.
- Demo links are present only for live, approved demos; external links identify their destination and open safely.
- The inquiry form delivers a message to the configured destination and shows clear validation, loading, success, and error states.
- The site works at 320 px, common phone widths, tablet, and desktop with no horizontal overflow; keyboard and screen reader basics are usable.
- No placeholder testimonials, client claims, contact details, or invented project outcomes are published.

## 8. Inputs needed before implementation or publication

1. Names, screenshots, descriptions, status, and approved demo URLs for sample apps.
2. Verified business contact methods and the destination for form submissions.
3. Confirmation of current prices, inclusions, revision policy, deposit timing, warranty wording, and hosting/domain terms.
4. Approved logo/brand assets, if any, and a decision on Khmer-only versus fully bilingual content.

