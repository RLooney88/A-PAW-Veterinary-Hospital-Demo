import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
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
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const overHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // When we're on the hero page and not scrolled, use transparent mode
  const transparent = overHero && !scrolled && !open;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        transparent
          ? "bg-transparent border-b border-transparent"
          : "bg-sand-50/90 backdrop-blur-md border-b border-sand-300/60"
      }`}
      data-testid="site-navbar"
      data-transparent={transparent ? "true" : "false"}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 shrink-0" data-testid="nav-logo-link">
            <img
              src={LOGO}
              alt="Annapolis Veterinary & Wellness"
              className={`h-12 w-auto rounded-xl transition-all ${transparent ? "bg-white/90 p-1" : ""}`}
            />
            <div className="hidden sm:block leading-tight">
              <div
                className={`font-display font-extrabold text-[17px] transition-colors ${
                  transparent ? "text-sand-50" : "text-clinic-navy"
                }`}
              >
                Annapolis Veterinary
              </div>
              <div
                className={`text-[12px] uppercase tracking-[0.18em] font-semibold transition-colors ${
                  transparent ? "text-clinic-amber" : "text-clinic-forest"
                }`}
              >
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
                    transparent
                      ? isActive
                        ? "text-clinic-amber"
                        : "text-sand-50/90 hover:text-clinic-amber"
                      : isActive
                      ? "text-clinic-forest"
                      : "text-clinic-ink hover:text-clinic-forest"
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
              className={`hidden md:inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold text-sm transition-colors ${
                transparent
                  ? "bg-clinic-clay hover:bg-clinic-clay-hover text-white"
                  : "bg-clinic-navy hover:bg-clinic-navy-hover text-white"
              }`}
              data-testid="nav-call-btn"
            >
              <Phone className="h-4 w-4" />
              (410) 224-6624
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              className={`lg:hidden p-2 rounded-full transition-colors ${
                transparent ? "text-sand-50 hover:bg-white/10" : "hover:bg-sand-200"
              }`}
              aria-label="Toggle menu"
              data-testid="nav-menu-toggle"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="lg:hidden pb-6 flex flex-col gap-2 bg-sand-50 rounded-b-2xl" data-testid="nav-mobile-menu">
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
