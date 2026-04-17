import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Phone, X } from "lucide-react";
import IntentChip from "./IntentChip";

const LOGO = "https://cdcssl.ibsrv.net/ibimg/smb/158x193_80/webmgr/02/s/r/58de6e5942c22_Logo2.png.webp";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/appointment", label: "Request Visit" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-40 bg-sand-50/90 backdrop-blur-md border-b border-sand-300/60"
      data-testid="site-navbar"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 shrink-0" data-testid="nav-logo-link">
            <img src={LOGO} alt="Annapolis Veterinary & Wellness" className="h-12 w-auto" />
            <div className="hidden sm:block leading-tight">
              <div className="font-display font-extrabold text-[17px] text-clinic-navy">
                Annapolis Veterinary
              </div>
              <div className="text-[12px] uppercase tracking-[0.18em] text-clinic-forest font-semibold">
                &amp; Wellness
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                className={({ isActive }) =>
                  `text-sm font-semibold transition-colors ${
                    isActive ? "text-clinic-forest" : "text-clinic-ink hover:text-clinic-forest"
                  }`
                }
                data-testid={`nav-link-${n.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <IntentChip data-testid="navbar-intent-chip" />
            <a
              href="tel:+14102246624"
              className="hidden md:inline-flex items-center gap-2 rounded-full bg-clinic-navy px-5 py-3 text-white font-semibold text-sm hover:bg-clinic-navy-hover transition-colors"
              data-testid="nav-call-btn"
            >
              <Phone className="h-4 w-4" />
              (410) 224-6624
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              className="lg:hidden p-2 rounded-full hover:bg-sand-200"
              aria-label="Toggle menu"
              data-testid="nav-menu-toggle"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="lg:hidden pb-6 flex flex-col gap-2" data-testid="nav-mobile-menu">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-2 px-3 rounded-lg font-semibold text-clinic-ink hover:bg-sand-200"
              >
                {n.label}
              </NavLink>
            ))}
            <a
              href="tel:+14102246624"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-clinic-navy px-5 py-3 text-white font-semibold"
            >
              <Phone className="h-4 w-4" /> (410) 224-6624
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
