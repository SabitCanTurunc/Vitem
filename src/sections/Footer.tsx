import Link from "next/link";
import { MapPin, Phone, Mail, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-vitem-950 text-vitem-300">
      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl text-white tracking-wide">Vitem</span>
            </Link>
            <p className="mt-4 text-sm text-vitem-400 leading-relaxed max-w-xs">
              Premium interior design and furniture manufacturing, crafted with precision in Hatay, Turkey.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-vitem-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-vitem-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-white font-medium mb-5">
              Collections
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/collections/kitchens" className="text-sm text-vitem-400 hover:text-white transition-colors">
                  Kitchens
                </Link>
              </li>
              <li>
                <Link href="/collections/doors" className="text-sm text-vitem-400 hover:text-white transition-colors">
                  Doors
                </Link>
              </li>
              <li>
                <Link href="/collections/wardrobes" className="text-sm text-vitem-400 hover:text-white transition-colors">
                  Wardrobes
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-white font-medium mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-vitem-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-sm text-vitem-400 hover:text-white transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-vitem-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-white font-medium mb-5">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-vitem-400">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Hatay, Turkey</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-vitem-400">
                <Phone className="w-4 h-4 shrink-0" />
                <a href="tel:+903261234567" className="hover:text-white transition-colors">
                  +90 326 123 45 67
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-vitem-400">
                <Mail className="w-4 h-4 shrink-0" />
                <a href="mailto:info@vitem.com.tr" className="hover:text-white transition-colors">
                  info@vitem.com.tr
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-vitem-800">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-vitem-500">
            &copy; {new Date().getFullYear()} Vitem. All rights reserved.
          </p>
          <p className="text-xs text-vitem-500">
            vitem.com.tr
          </p>
        </div>
      </div>
    </footer>
  );
}
