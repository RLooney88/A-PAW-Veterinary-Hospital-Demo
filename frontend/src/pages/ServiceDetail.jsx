import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, Phone, PawPrint } from "lucide-react";
import { ALL_SERVICES } from "../data/services";
import InlineCTA from "../components/InlineCTA";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = ALL_SERVICES[slug];

  if (!service) return <Navigate to="/services" replace />;

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-12 pt-12" data-testid={`service-detail-${slug}`}>
      <Link to="/services" className="inline-flex items-center gap-2 text-sm font-bold text-clinic-forest hover:text-clinic-navy mb-8">
        <ArrowLeft className="h-4 w-4" /> Back to services
      </Link>

      {/* Hero */}
      <div className="rounded-2xl overflow-hidden bg-sand-200 h-64 sm:h-80 mb-8">
        <img
          src={service.image}
          alt={service.title}
          className="h-full w-full object-cover"
          style={service.detailObjectPosition ? { objectPosition: service.detailObjectPosition } : undefined}
        />
      </div>

      <div className="text-xs uppercase tracking-[0.22em] font-semibold text-clinic-red">{service.animalLabel}</div>
      <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-clinic-navy mt-2 leading-[1.08]">
        {service.title}
      </h1>
      <p className="mt-4 text-lg text-clinic-mist leading-relaxed">
        {service.detail || service.summary}
      </p>

      {/* CTA */}
      <div className="mt-10 bg-clinic-peach rounded-2xl border border-clinic-peachDeep/60 p-8">
        <h2 className="font-display font-bold text-xl text-clinic-navy">
          Questions about {service.title.toLowerCase()}?
        </h2>
        <p className="text-sm text-clinic-mist mt-2">
          We are happy to talk through what your pet needs. Give us a call or request an appointment.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to="/appointment"
            className="inline-flex items-center gap-2 bg-clinic-red hover:bg-clinic-red-hover text-white rounded-full px-6 py-3 font-semibold shadow-lg shadow-clinic-red/20 transition-transform hover:-translate-y-0.5"
          >
            <PawPrint className="h-4 w-4" /> Request a visit
          </Link>
          <a
            href="tel:+14102246624"
            className="inline-flex items-center gap-2 bg-white border border-sand-300 text-clinic-navy rounded-full px-6 py-3 font-semibold hover:border-clinic-navy/30 transition-colors"
          >
            <Phone className="h-4 w-4" /> Call (410) 224-6624
          </a>
        </div>
      </div>

      <InlineCTA />
    </div>
  );
}
