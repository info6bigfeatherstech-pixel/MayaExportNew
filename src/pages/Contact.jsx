import { useState, useMemo } from "react"
import { MapPin, Mail, Phone, Clock, Linkedin, Instagram, Facebook, CheckCircle2 } from "lucide-react"

// Third-party packages
import Select from "react-select"
import countryList from "react-select-country-list"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"

// Aapke custom components
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
  subject: "",
  message: "",
}

const interests = [
  "Garments",
  "Footwear",
  "Fabrics",
  "Home Textile",
  "Electronics & Appliances",
  "Others",
]

const contactInfo = [
  {
    icon: MapPin,
    label: "Office Address",
    value: "ROOM 2nd FLR, C# BLDG NO.17#, YINCHANG AREA, BEIHUAN LIANGSHI ROAD, SHISHI CITY, FUJIAN P.R. CHINA. P.C: 362700"
  },
  { icon: Mail, label: "Email", value: "shenzhen@mayaexports.com", href: "shenzhen@mayaexports.com" },
  { icon: Phone, label: "Phone", value: "+86-0595-88569700", href: "tel:+86-0595-88569700" },
  { icon: Clock, label: "Business Hours", value: "Mon – Sat, 9:00 AM – 6:00 PM IST" },
]

const socials = [
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/" },
  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/" },
]

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  // Memoize country data so it computes only once
  const countryOptions = useMemo(() => countryList().getData(), [])

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
    if (!form.country) next.country = "Please select your country."
    if (!form.message.trim()) next.message = "Please enter a short message."
    return next
  }

  const handleSubmit = async (e) => {
  e.preventDefault()

  const next = validate()

  if (Object.keys(next).length) {
    setErrors(next)
    return
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: "9c5ffe33-9904-415c-8ae6-d6ebda66fb14",

        subject: `New Maya Exports Enquiry - ${form.fullName}`,

        fullName: form.fullName,
        company: form.company,
        email: form.email,
        phone: form.phone,
        country: form.country,
        interest: form.interest,
        subject: form.subject,
        message: form.message,
      }),
    })

    const result = await response.json()

    if (!result.success) {
      throw new Error(result.message || "Failed to send enquiry")
    }

    setSubmitted(true)
    setForm(initialForm)
    setErrors({})
  } catch (error) {
    console.error("Web3Forms Error:", error)
    alert("Unable to send enquiry. Please try again.")
  }
}

  const fieldClass = (name) =>
    `w-full border bg-transparent px-4 py-3 text-sm text-charcoal outline-none transition-colors placeholder:text-stone-400 focus:border-charcoal ${errors[name] ? "border-red-400" : "border-charcoal/20"
    }`

  // React-Select custom label (FlagCDN se real image ke liye)
  const formatOptionLabel = ({ value, label }) => (
    <div className="flex items-center gap-2.5 text-sm text-charcoal">
      <img
        src={`https://flagcdn.com/w20/${value.toLowerCase()}.png`}
        alt={label}
        className="h-auto w-5 rounded-[2px] shadow-sm"
      />
      <span>{label}</span>
    </div>
  )
  

  // React-Select styles matching your Tailwind Theme
  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: '46px',
      backgroundColor: 'transparent',
      borderColor: errors.country ? '#f87171' : (state.isFocused ? '#333333' : 'rgba(51, 51, 51, 0.2)'),
      boxShadow: 'none',
      borderRadius: '0',
      cursor: 'pointer',
      '&:hover': {
        borderColor: '#333333'
      }
    }),
    valueContainer: (base) => ({
      ...base,
      padding: '0 16px',
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: '#fafaf9',
      borderRadius: '0',
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      zIndex: 50
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? '#e7e5e4' : 'transparent',
      color: '#333333',
      cursor: 'pointer',
      padding: '10px 16px',
      '&:active': {
        backgroundColor: '#d6d3d1'
      }
    })
  }

  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Let's Build a Global Partnership"
        subtitle="Share your sourcing and export requirements — our team will respond with a tailored proposal."
        image="/images/customertalking.png"
      />

      <section className="bg-ivory py-24 md:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            {/* Left — info */}
            <Reveal>
              <div>
                <span className="eyebrow">Contact Details</span>
                <h2 className="mt-4 font-serif text-3xl font-medium text-charcoal md:text-4xl lg:text-[2.65rem] lg:leading-[1.15]">
                  Reach Our Trade Desk
                </h2>
                <p className="mt-4 text-base leading-relaxed text-stone-500 md:text-[17px]">
                  Expanding globally starts with the right trade partner. From product sourcing and cross-border logistics to customs compliance, we bridge the gap between international buyers and suppliers. Connect with our trade experts today to scale your business.
                </p>

                <ul className="mt-10 space-y-7">
                  {contactInfo.map((info) => (
                    <li key={info.label} className="flex items-start gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-charcoal/15 text-bronze">
                        <info.icon className="h-5 w-5" strokeWidth={1.5} />
                      </span>
                      <div>
                        <div className="text-xs font-medium uppercase tracking-widest text-stone-500">
                          {info.label}
                        </div>
                        {info.href ? (
                          <a href={info.href} className="mt-1 block text-base text-charcoal transition-colors hover:text-bronze">
                            {info.value}
                          </a>
                        ) : (
                          <div className="mt-1 max-w-sm text-base leading-relaxed text-charcoal">{info.value}</div>
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
                      className="flex h-12 w-12 items-center justify-center border border-charcoal/15 text-charcoal/70 transition-colors hover:border-bronze hover:text-bronze"
                    >
                      <social.icon className="h-5 w-5" />
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

                      {/* REACT-PHONE-INPUT-2 */}
                      <Field label="Phone" error={errors.phone}>
                        <PhoneInput
                          country={'in'}
                          value={form.phone}
                          onChange={(phone) => setForm(prev => ({ ...prev, phone }))}
                          containerClass={`border transition-colors focus-within:border-charcoal ${errors.phone ? "border-red-400" : "border-charcoal/20"
                            }`}
                          inputStyle={{
                            width: '100%',
                            height: '46px',
                            background: 'transparent',
                            border: 'none',
                            borderRadius: '0',
                            fontSize: '14px',
                            color: '#333333',
                            paddingLeft: '48px'
                          }}
                          buttonStyle={{
                            background: 'transparent',
                            border: 'none',
                            borderRight: '1px solid rgba(51, 51, 51, 0.2)',
                            borderRadius: '0',
                            padding: '0 4px'
                          }}
                          dropdownStyle={{
                            background: '#fafaf9',
                            color: '#333333',
                            borderRadius: '0'
                          }}
                        />
                      </Field>

                      {/* REACT-SELECT */}
                      <Field label="Country" required error={errors.country}>
                        <Select
                          options={countryOptions}
                          value={countryOptions.find(op => op.value === form.country) || null}
                          onChange={(selectedOption) => {
                            setForm(prev => ({ ...prev, country: selectedOption.value }))
                            setErrors(prev => ({ ...prev, country: undefined }))
                          }}
                          formatOptionLabel={formatOptionLabel}
                          styles={customSelectStyles}
                          placeholder="Select a country..."
                          isSearchable
                          instanceId="country-select"
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

                      <Field label="Subject" className="sm:col-span-2">
                        <input
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          placeholder="What is this about?"
                          className={fieldClass("subject")}
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