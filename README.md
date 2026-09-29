# IEEE EPI SB PWA
`npm i && npm run dev` · build: `npm run build` (must be served over HTTPS for install/offline).

## Content to replace (all in `src/data/content.ts` + `public/`)
- Chapter logos → `public/images/chapters/{ras,cs,cis,ias,wie}.png`, plus names/descriptions/missions
- Event photos → `public/images/events/<event-id>/`, list them in `photos`, plus dates/descriptions
- Officer photos → `public/images/officers/*.webp` (see file names in `officers`), plus names/bios
- Social links (`SOCIALS`), IEEE + EPI SB logos → `public/images/branding/ieee-logo.png`
- App icons: `public/icons/icon-192.png` / `icon-512.png` are blue placeholders — replace before launch
- `ABOUT_SB` text; IEEE Day date is in `NEXT_EVENT`
