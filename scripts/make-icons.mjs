// Generates PWA icons from the EPI SB logo. Run: npm run icons
import sharp from 'sharp'
const src = 'public/images/branding/epi-sb-logo.png'
for (const n of [192, 512]) {
  const pad = Math.round(n * 0.2) // keeps the logo inside the maskable safe zone
  const logo = await sharp(src).resize(n - pad * 2, n - pad * 2, { fit: 'contain', background: '#ffffff' }).flatten({ background: '#ffffff' }).toBuffer()
  await sharp({ create: { width: n, height: n, channels: 3, background: '#ffffff' } })
    .composite([{ input: logo, left: pad, top: pad }]).png().toFile(`public/icons/icon-${n}.png`)
  console.log('icon', n)
}
