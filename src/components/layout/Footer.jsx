import { Link } from "react-router-dom"
import {
  Linkedin, Instagram, Facebook, Twitter, Youtube,
  MapPin, Phone, Printer, Mail, User, MessageCircle,
} from "lucide-react"

/* ─── Data ─────────────────────────────────────────────────────────────── */

const socials = [
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com" },
]

const chinaOffice = [
  { 
  icon: MapPin, 
  text: "ROOM 2nd FLR, C# BLDG NO.17#, YINCHANG AREA, BEIHUAN LIANGSHI ROAD, SHISHI CITY, FUJIAN P.R. CHINA. P.C: 362700" 
},
  { icon: Phone, text: "+86 0595-88568700", href: "tel:+86 0595-88568700" },
  { icon: Printer, text: "+86-0595-88569700" },
  { icon: Mail, text: "shenzhen@mayaexports.com", href: "mailto:shenzhen@mayaexports.com" },
]

const chinaTeam = [
  {
    name: "Mr. Mike (Sonu)",
    title: "Director – China Operations",
    email: "sonu@mayaexportsltd.com",
    phone: "+86 13506082700",
    whatsapp: "8613800001111",
  },
  {
    name: "Ms. Jenny (roshni)",
    title: "Senior Sourcing Manager",
    email: "roshni@mayaexportsltd.com",
    phone: "+86 135 0608 2700",
    whatsapp: "8613506082700",
  },
]

const hkOffice = [
  {
  icon: MapPin,
  text: "KENSINGTON PLAZA, 98 PARKES STREET, JORDAN, KOWLOON, HONG KONG."
},
  { icon: Phone, text: "+852 685880690", href: "tel:+852 685880690" },
  { icon: Printer, text: "+852 685880690" },
  { icon: Mail, text: "sonu@mayaexportsltd.com", href: "mailto:sonu@mayaexportsltd.com" },
]

/* ─── ContactRow helper ─────────────────────────────────────────────────── */
function ContactRow({ icon: Icon, text, href }) {
  const inner = (
    <span className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-300/75 transition-colors duration-200 hover:text-sky-300">
      <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-400" />
      <span>{text}</span>
    </span>
  )
  return href ? <a href={href} className="block">{inner}</a> : <div>{inner}</div>
}

/* ─── Footer ────────────────────────────────────────────────────────────── */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-[#040c18] text-white min-h-screen flex flex-col">

      {/* ══ WORLD MAP — high visibility ══ */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Map at full size, centered, clearly visible */}
        <img
          src="/images/worldmap4.png"
          alt=""
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-auto w-full -translate-x-1/2 -translate-y-1/2 object-contain"
          style={{ opacity: 0.38, filter: "brightness(1.2) saturate(0.25) contrast(1.2)" }}
        />
        {/* Only very thin edge fades — keep centre fully open */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#040c18] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#040c18] to-transparent" />
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#040c18] to-transparent" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#040c18] to-transparent" />
      </div>

      {/* ══ Decorative glows ══ */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/8 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-blue-600/8 blur-3xl" />

      {/* ══ Top accent bar ══ */}
      <div className="relative z-10 h-[3px] w-full bg-gradient-to-r from-transparent via-sky-500 to-transparent opacity-60" />

      {/* ══ Top wave ══ */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 leading-none">
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="w-full" style={{ height: 48 }}>
          <path d="M0,24 C360,48 720,0 1080,24 C1260,36 1380,12 1440,24 L1440,0 L0,0 Z" fill="rgba(255,255,255,0.025)" />
        </svg>
      </div>

      {/* ══ CONTENT ══ */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 flex-col px-6 lg:px-10">

        {/* ── ZONE 1: LOGO + DESCRIPTION + SOCIALS — grows to fill top third ── */}
        <div className="flex flex-1 flex-col items-center justify-center pt-28 pb-10 text-center">

          {/* Logo */}
          <Link to="/" className="relative inline-block">
            <div className="absolute inset-0 -m-6 rounded-3xl bg-white/5 blur-2xl" />
            <img
              src="/images/logo.png"
              alt="Maya Exports Limited"
              className="relative h-48 w-auto md:h-56"
              style={{ filter: "drop-shadow(0 4px 24px rgba(255,255,255,0.22))" }}
            />
          </Link>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-slate-400">
            Maya Exports Limited — Your trusted global partner for premium quality exports with 25+ years of excellence.
            Established in 2000, Maya Exports has been at the forefront of export industry, blending traditional sourcing with modern quality standards to deliver premium products worldwide.
          </p>

          {/* Social icons */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-700/60 bg-slate-800/60 text-slate-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-500/50 hover:bg-sky-500/10 hover:text-sky-400"
              >
                <s.icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="h-px shrink-0 bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />

        {/* ── ZONE 2: THREE-COLUMN OFFICES — grows to fill middle third ── */}
        <div className="grid flex-1 grid-cols-1 content-center gap-10 py-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-0">

          {/* China Office */}
          <div className="lg:border-r lg:border-slate-700/40 lg:pr-10">
            <h4 className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-sky-400">
              <span className="h-px w-5 bg-sky-400" />
              China Office
            </h4>
            <div className="space-y-4">
              {chinaOffice.map((row, i) => (
                <ContactRow key={i} icon={row.icon} text={row.text} href={row.href} />
              ))}
            </div>
          </div>

          {/* China Team */}
          <div className="lg:border-r lg:border-slate-700/40 lg:px-10">
            <h4 className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-sky-400">
              <span className="h-px w-5 bg-sky-400" />
              China Team
            </h4>
            <div className="space-y-7">
              {chinaTeam.map((p) => (
                <div key={p.name} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-3.5 w-3.5 shrink-0 text-sky-400" />
                    <span className="text-sm font-medium text-white">{p.name}</span>
                  </div>
                  <p className="ml-6 text-[11px] text-slate-500">{p.title}</p>
                  <a
                    href={`mailto:${p.email}`}
                    className="flex items-center gap-2 text-xs text-slate-400 transition-colors hover:text-sky-300"
                  >
                    <Mail className="h-3.5 w-3.5 shrink-0 text-sky-400" />
                    {p.email}
                  </a>
                  <a
                    href={`https://wa.me/${p.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-slate-400 transition-colors hover:text-sky-300"
                  >
                    <MessageCircle className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    {p.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Hong Kong Office */}
          <div className="lg:pl-10">
            <h4 className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-sky-400">
              <span className="h-px w-5 bg-sky-400" />
              Hong Kong Office
            </h4>
            <div className="space-y-4">
              {hkOffice.map((row, i) => (
                <ContactRow key={i} icon={row.icon} text={row.text} href={row.href} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="h-px shrink-0 bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

        {/* ── ZONE 3: COPYRIGHT — sits at the bottom ── */}
        <div className="flex shrink-0 flex-col items-center justify-between gap-3 py-8 text-sm text-slate-500 md:flex-row">
          <p>© {year} Maya Exports Limited. All Rights Reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="transition-colors hover:text-sky-400">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-sky-400">Terms of Trade</a>
            <a href="#" className="transition-colors hover:text-sky-400">Cookie Policy</a>
          </div>
        </div>

      </div>

      {/* ══ Bottom accent bar ══ */}
      <div className="relative z-10 h-[2px] w-full bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />

    </footer>
  )
}
