# Create a New Veterinary Demo Site

> **Template safety rule:** Do not customize client/practice sites directly in `Veterinary-Site-Template`. Always duplicate this repo first, rename the duplicate for the practice, and do client-specific edits in that duplicate. This repo should only receive reusable template improvements.
This template is intended for fast demo-site creation. Do not hand-edit practice-specific values throughout the app. Collect the business information, update `site.config.json`, then validate that the visible site reflects the config.

## Step 1 â€” Fetch the business information

Start from the practice's existing website and public profiles. Capture as much as possible, but demo sites can use fallback placeholders when information is missing.

Collect:

- Practice name and short/display name
- Logo and favicon/app icon candidates
- Brand colors from logo/site
  - light color
  - dark color
  - accent color
  - accent light color
- Phone number and tel link
- Email address
- Street address, city, state, ZIP
- Hours of operation
- Team members, roles, and bios if available
- Social links
  - Facebook
  - Instagram
  - LinkedIn
  - Google Business Profile
- Vendor/external links
  - online store
  - online pharmacy
  - online booking
  - online forms
- Services and species served if they differ from the template defaults

Recommended sources:

- Existing website header/footer/contact/about/team pages
- Existing website schema/JSON-LD and meta tags
- Google Business Profile
- Social profiles
- Online pharmacy/store buttons or external CNAME redirects

## Step 2 â€” Update the config

Edit the root config file:

```txt
site.config.json
```

Also copy the same config into the frontend import location until an apply script exists:

```txt
frontend/src/site/site.config.json
```

Replace assets under:

```txt
frontend/public/brand/
```

Important config areas:

- `practice`
- `brand.logo`
- `brand.colors`
- `contact`
- `hours`
- `links`
- `features`
- `team`

External store/pharmacy links are normal outbound links. Put them in `links.store` / `links.pharmacy` and set `features.storeLink` / `features.pharmacyLink` to `true`.

## Step 3 â€” Create and validate the site

From the frontend directory:

```bash
npm install
npm run build
```

Then inspect:

- Navbar logo/name/phone/vendor links
- Footer logo/name/contact/hours/vendor links
- Contact section address/phone/email/hours
- Chat widget short practice name and fallback phone
- Hero fallback call button
- Mobile navigation

Check for old practice-specific leftovers:

```bash
git grep -n "Your City\|annapolisvet\|000-000-0000\|167 Jennifer"
```

Some old references may remain in backend seeds/prompts until Phase 2. For Phase 1, the primary frontend shell should be config-driven.

