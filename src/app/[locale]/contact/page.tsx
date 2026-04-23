"use client";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";
import Footer from "@/sections/Footer";
import { useState } from "react";
import { submitContactForm } from "../../../../api/actions/contactActions";

export default function Contact() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleAction(formData: FormData) {
    setFormStatus("submitting");
    const res = await submitContactForm(formData);
    if (res?.success) {
      setFormStatus("success");
    } else {
      setFormStatus("error");
    }
  }

  return (
    <main>
      {/* Header */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-20 bg-white border-b border-vitem-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[11px] tracking-[0.25em] uppercase text-vitem-500 font-medium block mb-4">
              Get in Touch
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-light text-vitem-900 tracking-tight">
              Contact Us
            </h1>
            <p className="mt-6 text-base sm:text-lg text-vitem-600 max-w-2xl leading-relaxed font-light">
              We would love to hear about your project. Reach out to our team for consultations, inquiries, or showroom visits.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Info Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-4 space-y-12"
            >
              <div>
                <h3 className="text-xl font-sans font-light text-vitem-900 mb-6 border-b border-vitem-200 pb-4">
                  Headquarters & Factory
                </h3>
                <div className="space-y-4 text-sm text-vitem-600">
                  <p className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 shrink-0 text-vitem-400" />
                    <span>Ürgen Paşa Mah. 75. Yıl Bulvarı<br/>Hatay, Turkey</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Phone className="w-5 h-5 shrink-0 text-vitem-400" />
                    <a href="tel:+903262218801" className="hover:text-vitem-900 transition-colors">+90 326 221 88 01</a>
                  </p>
                  <p className="flex items-center gap-3">
                    <Mail className="w-5 h-5 shrink-0 text-vitem-400" />
                    <a href="mailto:info@vitem.com.tr" className="hover:text-vitem-900 transition-colors">info@vitem.com.tr</a>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-sans font-light text-vitem-900 mb-6 border-b border-vitem-200 pb-4">
                  Opening Hours
                </h3>
                <div className="space-y-3 text-sm text-vitem-600">
                  <div className="flex justify-between">
                    <span className="font-medium text-vitem-800">Mon - Fri</span>
                    <span>09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-vitem-800">Saturday</span>
                    <span>09:00 - 15:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-vitem-800">Sunday</span>
                    <span className="text-vitem-400">Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-8 bg-vitem-50 p-8 sm:p-12 lg:p-16 border border-vitem-200"
            >
              <h2 className="text-3xl font-serif font-light text-vitem-900 mb-8">Send an Inquiry</h2>
              
              {formStatus === "success" ? (
                <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
                  <CheckCircle className="w-16 h-16 text-green-600 mb-2" />
                  <h3 className="text-2xl font-serif text-vitem-900">Message Received</h3>
                  <p className="text-vitem-600">Thank you for your inquiry. A member of our team will contact you shortly.</p>
                  <button onClick={() => setFormStatus("idle")} className="mt-8 text-xs tracking-widest uppercase border-b border-vitem-300 pb-1 hover:border-vitem-900 transition-colors">
                    Send another message
                  </button>
                </div>
              ) : (
                <form action={handleAction} className="space-y-8">
                  <input type="hidden" name="formType" value="contact" />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs uppercase tracking-widest text-vitem-500">Full Name</label>
                      <input required type="text" id="name" name="name" className="w-full bg-transparent border-b border-vitem-300 py-3 focus:outline-none focus:border-vitem-900 transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs uppercase tracking-widest text-vitem-500">Email Address</label>
                      <input required type="email" id="email" name="email" className="w-full bg-transparent border-b border-vitem-300 py-3 focus:outline-none focus:border-vitem-900 transition-colors" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-xs uppercase tracking-widest text-vitem-500">Phone Number (Optional)</label>
                    <input type="tel" id="phone" name="phone" className="w-full bg-transparent border-b border-vitem-300 py-3 focus:outline-none focus:border-vitem-900 transition-colors" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs uppercase tracking-widest text-vitem-500">Your Message</label>
                    <textarea required id="message" name="message" rows={4} className="w-full bg-transparent border-b border-vitem-300 py-3 focus:outline-none focus:border-vitem-900 transition-colors resize-none"></textarea>
                  </div>

                  {formStatus === "error" && (
                     <p className="text-red-500 text-sm">Something went wrong. Please try again later.</p>
                  )}

                  <button 
                    type="submit" 
                    disabled={formStatus === "submitting"}
                    className="bg-vitem-900 text-white px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-vitem-800 transition-colors disabled:opacity-50"
                  >
                    {formStatus === "submitting" ? "Sending..." : "Submit Inquiry"}
                  </button>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
