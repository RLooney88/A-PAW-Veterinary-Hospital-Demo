import React, { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, Phone } from "lucide-react";
import { api } from "../lib/api";
import { useSurface } from "../hooks/useSurface";
import { useSmartSite } from "../context/SmartSiteContext";

const PET_TYPES = [
  { value: "dogs", label: "Dog" },
  { value: "cats", label: "Cat" },
  { value: "critters", label: "Other" },
];

const SERVICE_OPTIONS = [
  "Wellness Exam",
  "Vaccinations",
  "Dental Care",
  "Surgery / Spay-Neuter",
  "Laser Therapy",
  "PRP / Regenerative",
  "Parasite Prevention",
  "Microchipping",
  "Senior Care",
  "Urgent Concern",
  "Other",
];

export default function Appointment() {
  const { content } = useSurface("appointment_intro");
  const { sessionToken, parentIntent, subIntent, track } = useSmartSite();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    pet_name: "",
    pet_type: parentIntent || "",
    service_interest: "",
    preferred_time: "",
    comment: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("Name and email are required.");
      return;
    }
    setLoading(true);
    try {
      await track({ signalType: "form_start", label: "appointment" });
      await api.post("/leads", {
        ...form,
        session_token: sessionToken,
        source_page: "/appointment",
      });
      setSubmitted(true);
      toast.success("We got it! We'll be in touch shortly.");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please call us at (410) 224-6624.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center" data-testid="appointment-success">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-clinic-sage text-clinic-forest mb-6">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="font-display text-4xl font-extrabold text-clinic-navy">Thank you!</h1>
        <p className="mt-4 text-clinic-mist text-lg">
          Your request is in. We&rsquo;ll reach out shortly to confirm a time that works. For urgent concerns, please call{" "}
          <a href="tel:+14102246624" className="font-bold text-clinic-navy underline">(410) 224-6624</a>.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 grid gap-10 lg:grid-cols-12" data-testid="appointment-page">
      <div className="lg:col-span-5">
        {content?.eyebrow && (
          <div className="text-xs uppercase tracking-[0.22em] font-semibold text-clinic-forest">
            {content.eyebrow}
          </div>
        )}
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-clinic-navy mt-3 leading-[1.04]">
          {content?.headline || "Let's get your pet on the schedule."}
        </h1>
        <p className="mt-6 text-clinic-mist text-lg max-w-md">
          {content?.subheadline || "Tell us a little about your pet and we'll follow up to confirm a time."}
        </p>
        {content?.reassurance && (
          <div className="mt-8 bg-clinic-sage/50 rounded-2xl p-5 text-sm text-clinic-navy">
            {content.reassurance}
          </div>
        )}
        <a
          href="tel:+14102246624"
          className="mt-6 inline-flex items-center gap-2 text-clinic-navy font-bold"
        >
          <Phone className="h-4 w-4" /> (410) 224-6624
        </a>
      </div>

      <form
        onSubmit={onSubmit}
        className="lg:col-span-7 bg-white rounded-[2rem] p-8 lg:p-12 border border-sand-300/70 space-y-5"
        data-testid="appointment-form"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Your name *" testid="field-name">
            <input required value={form.name} onChange={update("name")} className={inputCls} />
          </Field>
          <Field label="Email *" testid="field-email">
            <input type="email" required value={form.email} onChange={update("email")} className={inputCls} />
          </Field>
          <Field label="Phone" testid="field-phone">
            <input value={form.phone} onChange={update("phone")} className={inputCls} />
          </Field>
          <Field label="Pet's name" testid="field-pet-name">
            <input value={form.pet_name} onChange={update("pet_name")} className={inputCls} />
          </Field>
          <Field label="Pet type" testid="field-pet-type">
            <select value={form.pet_type} onChange={update("pet_type")} className={inputCls} data-testid="pet-type-select">
              <option value="">Select…</option>
              {PET_TYPES.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </Field>
          <Field label="Preferred time" testid="field-time">
            <input value={form.preferred_time} onChange={update("preferred_time")} placeholder="e.g. Weekday mornings" className={inputCls} />
          </Field>
        </div>
        <Field label="Reason for visit" testid="field-service">
          <select value={form.service_interest} onChange={update("service_interest")} className={inputCls}>
            <option value="">Select…</option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </Field>
        <Field label="Notes" testid="field-comment">
          <textarea
            value={form.comment}
            onChange={update("comment")}
            rows={4}
            placeholder="Anything we should know? symptoms, timing, medications…"
            className={inputCls}
          />
        </Field>

        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-clinic-mist">
            {parentIntent ? (
              <>Pre-filled based on your interest in <strong className="text-clinic-navy">{parentIntent}</strong>
                {subIntent ? <> · <strong className="text-clinic-navy">{subIntent}</strong></> : null}.</>
            ) : (
              "We'll never share your info."
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-clinic-red hover:bg-clinic-red-hover text-white rounded-full px-7 py-3 font-semibold disabled:opacity-60"
            data-testid="appointment-submit-btn"
          >
            {loading ? "Sending…" : "Request appointment"}
          </button>
        </div>
      </form>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-sand-300 bg-sand-50 px-4 py-3 text-sm text-clinic-navy placeholder:text-clinic-mist/60 focus:outline-none focus:border-clinic-forest focus:ring-2 focus:ring-clinic-forest/20";

function Field({ label, children, testid }) {
  return (
    <label className="block" data-testid={testid}>
      <span className="block text-xs uppercase tracking-[0.16em] font-bold text-clinic-navy mb-1.5">{label}</span>
      {children}
    </label>
  );
}
