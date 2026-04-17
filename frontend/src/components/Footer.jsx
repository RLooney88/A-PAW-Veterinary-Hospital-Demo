import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

const LOGO = "https://cdcssl.ibsrv.net/ibimg/smb/158x193_80/webmgr/02/s/r/58de6e5942c22_Logo2.png.webp";

export default function Footer() {
  return (
    <footer className="bg-clinic-navy text-sand-100 mt-20" data-testid="site-footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3">
            <img src={LOGO} alt="Annapolis Vet" className="h-12 w-auto bg-white rounded-xl p-1.5" />
            <div>
              <div className="font-display font-extrabold text-lg">Annapolis Veterinary</div>
              <div className="text-xs uppercase tracking-[0.18em] text-sand-200/80">&amp; Wellness</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-sand-100/75 leading-relaxed">
            A family-owned neighborhood clinic providing calm, compassionate veterinary care in Annapolis, MD.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a href="https://www.facebook.com/annapolisvet/" aria-label="Facebook" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors" data-testid="footer-facebook">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="https://www.instagram.com/annapolisvet/" aria-label="Instagram" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors" data-testid="footer-instagram">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://www.linkedin.com/company/annapolis-veterinary-&-wellness/" aria-label="LinkedIn" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors" data-testid="footer-linkedin">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display font-bold text-base mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-sand-100/80">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/services" className="hover:text-white">Services</Link></li>
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/appointment" className="hover:text-white">Request Visit</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-base mb-4">Hours</h4>
          <ul className="space-y-1 text-sm text-sand-100/80">
            <li>Monday &mdash; 8:00 &ndash; 4:00</li>
            <li>Tuesday &mdash; Closed</li>
            <li>Wednesday &mdash; 12:00 &ndash; 7:00</li>
            <li>Thursday &mdash; 8:00 &ndash; 4:00</li>
            <li>Friday &mdash; 8:00 &ndash; 3:00</li>
            <li>Saturday &mdash; 9:00 &ndash; 1:00</li>
            <li>Sunday &mdash; Closed</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-base mb-4">Find us</h4>
          <ul className="space-y-3 text-sm text-sand-100/80">
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
              <span>167 Jennifer Rd, Suite Q<br />Annapolis, MD 21401</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> <a href="tel:+14102246624" className="hover:text-white">(410) 224-6624</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> <a href="mailto:annapolisvet@gmail.com" className="hover:text-white">annapolisvet@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-sand-100/60">
          <div>© {new Date().getFullYear()} Annapolis Veterinary &amp; Wellness.</div>
          <Link to="/admin/login" className="hover:text-white" data-testid="footer-admin-link">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
