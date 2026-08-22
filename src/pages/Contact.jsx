import { useState } from "react"
import { MapPin, Mail, Phone, Clock, Linkedin, Instagram, Facebook, CheckCircle2 } from "lucide-react"
import PageHero from "../components/common/PageHero.jsx"
import Container from "../components/common/Container.jsx"
import Reveal from "../components/common/Reveal.jsx"

const initialForm = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  country: "",
  interest: "",
  quantity: "",
  message: "",
}

const interests = [
  "Shirts",
  "T-Shirts",
  "Polo Shirts",
  "Trousers",
  "Jackets",
  "Casual Wear",
  "Formal Wear",
  "Other",
]

const contactInfo = [
  {
    icon: MapPin,
    label: "Office Address",
    value: "Unit 14, Export House, Textile District, Mumbai 400001, India",
  },
  { icon: Mail, label: "Email", value: "trade@globalthreads.com", href: "mailto:trade@globalthreads.com" },
  { icon: Phone, label: "Phone", value: "+91 22 0000 0000", href: "tel:+912200000000" },
  { icon: Clock, label: "Business Hours", value: "Mon – Sat, 9:00 AM – 6:00 PM IST" },
]

const socials = [
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
]

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!form.fullName.trim()) next.fullName = "Please enter your full name."
    if (!form.email.trim()) {
      next.email = "Please enter your email."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Please enter a valid email address."
    }
    if (!form.country.trim()) next.country = "Please enter your country."
    if (!form.message.trim()) next.message = "Please enter a short message."
    return next
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = validate()
    if (Object.keys(next).length) {
      setErrors(next)
      return
    }
    // Dummy submission — no backend at this stage.
    setSubmitted(true)
    setForm(initialForm)
  }

  const fieldClass = (name) =>
    `w-full border bg-transparent px-4 py-3 text-sm text-charcoal outline-none transition-colors placeholder:text-stone-400 focus:border-charcoal ${
      errors[name] ? "border-red-400" : "border-charcoal/20"
    }`

  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Let's Build a Global Partnership"
        subtitle="Share your sourcing and export requirements — our team will respond with a tailored proposal."
        image="/images/hero-contact.png"
      />

      <section className="bg-ivory py-24 md:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            {/* Left — info */}
            <Reveal>
              <div>
                <span className="eyebrow">Contact Details</span>
                <h2 className="mt-4 font-serif text-3xl font-medium text-charcoal md:text-4xl">
                  Reach Our Trade Desk
                </h2>
                <p className="mt-4 leading-relaxed text-stone-500">
                  Whether you&apos;re developing a new range or scaling an existing
                  programme, we&apos;re ready to help you source and export with
                  confidence.
                </p>

                <ul className="mt-10 space-y-7">
                  {contactInfo.map((info) => (
                    <li key={info.label} className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-charcoal/15 text-bronze">
                        <info.icon className="h-5 w-5" strokeWidth={1.5} />
                      </span>
                      <div>
                        <div className="text-xs font-medium uppercase tracking-widest text-stone-500">
                          {info.label}
                        </div>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="mt-1 block text-sm text-charcoal transition-colors hover:text-bronze"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <div className="mt-1 max-w-xs text-sm text-charcoal">{info.value}</div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 flex gap-3">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="flex h-11 w-11 items-center justify-center border border-charcoal/15 text-charcoal/70 transition-colors hover:border-bronze hover:text-bronze"
                    >
                      <social.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Right — form */}
            <Reveal delay={0.1}>
              <div className="border border-charcoal/10 bg-stone-50 p-6 md:p-10">
                {submitted ? (
                  <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                    <CheckCircle2 className="h-14 w-14 text-bronze" strokeWidth={1.4} />
                    <h3 className="mt-6 font-serif text-3xl font-medium text-charcoal">
                      Enquiry Received
                    </h3>
                    <p className="mt-3 max-w-sm text-stone-500">
                      Thank you for reaching out. Our trade desk will review your
                      requirements and respond shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-8 text-xs font-medium uppercase tracking-widest text-charcoal underline underline-offset-4 hover:text-bronze"
                    >
                      Send Another Enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Full Name" required error={errors.fullName}>
                        <input
                          name="fullName"
                          value={form.fullName}
                          onChange={handleChange}
                          placeholder="Jane Doe"
                          className={fieldClass("fullName")}
                        />
                      </Field>
                      <Field label="Company Name">
                        <input
                          name="company"
                          value={form.company}
                          onChange={handleChange}
                          placeholder="Your company"
                          className={fieldClass("company")}
                        />
                      </Field>
                      <Field label="Email" required error={errors.email}>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@company.com"
                          className={fieldClass("email")}
                        />
                      </Field>
                      <Field label="Phone">
                        <input
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+1 555 000 0000"
                          className={fieldClass("phone")}
                        />
                      </Field>
                      <Field label="Country" required error={errors.country}>
                        <input
                          name="country"
                          value={form.country}
                          onChange={handleChange}
                          placeholder="Country"
                          className={fieldClass("country")}
                        />
                      </Field>
                      <Field label="Product Interest">
                        <select
                          name="interest"
                          value={form.interest}
                          onChange={handleChange}
                          className={`${fieldClass("interest")} appearance-none`}
                        >
                          <option value="">Select a category</option>
                          {interests.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Quantity / MOQ" className="sm:col-span-2">
                        <input
                          name="quantity"
                          value={form.quantity}
                          onChange={handleChange}
                          placeholder="e.g. 5,000 pieces"
                          className={fieldClass("quantity")}
                        />
                      </Field>
                      <Field label="Message" required error={errors.message} className="sm:col-span-2">
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          rows={4}
                          placeholder="Tell us about your sourcing requirements..."
                          className={`${fieldClass("message")} resize-none`}
                        />
                      </Field>
                    </div>

                    <button
                      type="submit"
                      className="mt-8 inline-flex w-full items-center justify-center gap-2 bg-charcoal px-7 py-4 text-xs font-medium uppercase tracking-widest text-ivory transition-colors duration-300 hover:bg-bronze-dark sm:w-auto"
                    >
                      Send Enquiry
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  )
}

function Field({ label, required, error, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-xs font-medium uppercase tracking-widest text-charcoal/60">
        {label}
        {required && <span className="text-bronze"> *</span>}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-red-500">{error}</span>}
    </label>
  )
}
