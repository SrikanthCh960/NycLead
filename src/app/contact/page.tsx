import { Mail, MapPin, Phone } from "lucide-react";
import { CONTACT_EMAIL, CONTACT_LOCATION } from "@/lib/contact-config";
import { submitContactForm } from "./actions";

export const metadata = {
  title: "Contact – NYC GravityNet",
  description: "Get in touch with NYC GravityNet.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Get In Touch
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Contact Us
          </h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Have a project in mind? We'd love to hear about it. Send us a
            message and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Info panel */}
          <div className="space-y-8">
            <div className="bg-slate-50 rounded-2xl p-8 border border-black/5">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">
                Contact Information
              </h2>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <span className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-blue-600" />
                  </span>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-0.5">
                      Email
                    </p>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-slate-700 hover:text-blue-600 transition-colors text-sm font-medium"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-blue-600" />
                  </span>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-0.5">
                      Office
                    </p>
                    <span className="text-slate-700 text-sm font-medium">
                      {CONTACT_LOCATION}
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-blue-600" />
                  </span>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-0.5">
                      Phone
                    </p>
                    <span className="text-slate-700 text-sm font-medium">
                      +1 (212) 555-0100
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
              <h3 className="font-semibold text-lg mb-2">Office Hours</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                Monday – Friday: 9 AM – 6 PM EST
                <br />
                Saturday: 10 AM – 2 PM EST
                <br />
                Sunday: Closed
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <form
              action={submitContactForm}
              className="bg-slate-50 rounded-2xl p-8 lg:p-10 border border-black/5 space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-700 mb-1.5"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="John Smith"
                    className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700 mb-1.5"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="john@company.com"
                    className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-slate-700 mb-1.5"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (212) 555-0100"
                    className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-slate-700 mb-1.5"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Project inquiry"
                    className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder="Tell us about your project or how we can help..."
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-10 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl transition-colors duration-200 text-sm"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
