# Site Workbook: Carney Animal Hospital

## 1. Source Website
- Source: https://carneyanimalhospital.com
- Scraped: 2026-06-07T16:01:09Z
- Existing site platform/manager: ViziSites (footer)

## 2. Practice Identity
- Practice name: Carney Animal Hospital
- Short name: Carney Animal Hospital
- Demo site id: carney-animal-hospital
- Positioning: full-service community veterinary hospital in Parkville, MD, serving pets and their families since 1952.
- Tagline used: Trusted veterinary care in Parkville since 1952.

## 3. Contact, Address, and Hours
- Address: 9011 Harford Rd, Parkville, MD 21234
- Phone: (410) 665-5255
- Email: carneyanimalhospital@yahoo.com
- Hours:
  - Monday: 9:00 AM – 6:00 PM
  - Tuesday: 9:00 AM – 6:00 PM
  - Wednesday: 8:00 AM – 6:00 PM
  - Thursday: 8:00 AM – 6:00 PM
  - Friday: 9:00 AM – 6:00 PM
  - Saturday: 8:00 AM – 1:00 PM
  - Sunday: Closed
- Holiday closure note from source: Christmas, New Years, Memorial Day, Fourth of July, Thanksgiving, Labor Day.

## 4. Team
- Dr. Andrew Jendrek, DVM — veterinarian. Source copy welcomes clients to the Carney Animal Hospital family and emphasizes healthy pets and happy parents.
- No complete staff roster or staff photos were found in first-pass scrape.

## 5. About Us / Practice Story
Carney Animal Hospital states that healthy pets and happy parents are its number one focus. The practice has served the Parkville/Baltimore area since 1952 and presents itself as a trustworthy full-service veterinary hospital for checkups, vaccinations, dental health, spays/neuters, procedures, and broader pet wellness needs.

## 6. Services and Animal Types
Confirmed source services:
- Laser Surgery
- Ultrasound
- Dental Care
- Preventative Care
- Spay and Neuter
- Vaccinations
- Checkups and wellness checks
- Emergency guidance / urgent stabilization content

Animal-type content found: dogs, cats, puppies, kittens; general references to pets/animals. Small-animal-specific proof is weak and should use general fallback copy unless confirmed.

## 7. Brand Assets
- Logo: https://carneyanimalhospital.com/wp-content/uploads/2023/06/carneyah-logo.png
- Favicon/source mark: https://carneyanimalhospital.com/wp-content/uploads/2023/06/favicon-1.png
- Primary source color: #87302B
- Secondary/accent colors seen in CSS: #E0928F, #16132A, #F4F4F4, #FFFFFF
- Font stack retained from template: Cabinet Grotesk + Manrope.

## 8. Reviews and Smart Site Proof Categories
Current-site public testimonials found:
- General/default: “Been going here for 2 decades and the care is top notch!” — Gina
- General/default: “Have been with them for years. Always very happy with their service.” — Anna M.
- Dogs: “Dr Andrew is always kind to our dogs. Willing to work with you to give your pet its best life.” — Teena H.
- Cats/general fallback: “Dr. Andrew is the best!” — Kimberly M.
- Small animals: no strong explicit small-animal review found; use Anna M. general fallback until better source reviews are gathered.

## 9. SEO Foundation, Favicons, and App Icons
- Title: Veterinarian in Parkville, MD | Carney Animal Hospital
- Meta description: Full-service veterinary hospital in Parkville, MD offering wellness exams, vaccinations, dental care, laser surgery, ultrasound, and spay/neuter care.
- Canonical/demo URL: https://cah.RCLintegrated.com
- Schema type: VeterinaryCare
- Local keywords: veterinarian Parkville MD, animal hospital Parkville, pet dental care, laser surgery, ultrasound, spay and neuter, pet vaccinations.
- Favicons/app icons generated from source favicon mark and placed in frontend/public.

## 10. Template Mapping
- `site.config.json` and `frontend/src/site/site.config.json`: replaced generic practice identity/contact/hours/team/brand data.
- `frontend/public/index.html`: replaced SEO metadata, canonical, OG/Twitter metadata, and VeterinaryCare JSON-LD.
- `frontend/public/manifest.json`: replaced app name/theme details.
- `frontend/public/brand/carneyah-logo.png`: downloaded source logo.
- `frontend/public/favicon.ico`, `logo192.png`, `logo512.png`, `apple-touch-icon.png`: generated from Carney favicon source.
- `backend/seeds/smart_site_template.json`: replaced generic placeholders and seeded Carney-specific hero/proof copy.

## 11. Placeholder Domain
- Business acronym: CAH
- Placeholder domain: cah.RCLintegrated.com
- Railway status: not configured yet
- Cloudflare DNS status: not configured yet

## 12. Nova Site Editor Readiness
- Demo default: disabled
- Recommended demo env var: EDIT_REQUEST_ENABLED=false
- Finalized-site recommendation: enable Nova Site Editor only after client-specific content/assets are approved.

## 13. Open Questions
- Confirm permission to reuse current-site logo/favicon and any current-site imagery in outbound demo/prospecting materials.
- Confirm whether the live demo should keep external appointment link to current site or use template-native appointment/contact flow.
- Need Google Business Profile reviews if stronger categorized dog/cat/small-animal proof is desired.
