import React, { useEffect, useMemo, useState } from "react";
import { adminApi } from "../../lib/api";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../../components/ui/sheet";
import { Activity, Mail, Phone } from "lucide-react";

const STATUSES = ["new", "contacted", "closed"];

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(null);
  const [filter, setFilter] = useState("all");

  const load = async () => {
    setLoading(true);
    const { data } = await adminApi.get("/admin/leads");
    setLeads(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(
    () => (filter === "all" ? leads : leads.filter((l) => l.status === filter)),
    [leads, filter]
  );

  const updateStatus = async (lead, status) => {
    await adminApi.patch(`/admin/leads/${lead.id}`, { status });
    await load();
    if (open && open.id === lead.id) setOpen({ ...open, status });
  };

  return (
    <div data-testid="admin-leads">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] font-semibold text-clinic-forest">Inbox</div>
          <h1 className="font-display text-3xl font-extrabold text-clinic-navy mt-2">Leads</h1>
          <p className="text-clinic-mist text-sm mt-1">Each submission includes the visitor&rsquo;s browsing-intent summary.</p>
        </div>
        <div className="flex gap-1 bg-white border border-sand-300/60 rounded-full p-1">
          {["all", ...STATUSES].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-1.5 text-xs rounded-full font-semibold capitalize ${
                filter === s ? "bg-clinic-navy text-white" : "text-clinic-mist hover:text-clinic-navy"
              }`}
              data-testid={`leads-filter-${s}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-white rounded-2xl border border-sand-300/60 overflow-hidden">
        <table className="w-full text-sm" data-testid="leads-table">
          <thead className="bg-sand-100 text-xs uppercase tracking-widest text-clinic-mist">
            <tr>
              <th className="text-left px-5 py-3 font-semibold">Name</th>
              <th className="text-left px-5 py-3 font-semibold">Contact</th>
              <th className="text-left px-5 py-3 font-semibold">Pet / Service</th>
              <th className="text-left px-5 py-3 font-semibold">Inferred intent</th>
              <th className="text-left px-5 py-3 font-semibold">Status</th>
              <th className="text-left px-5 py-3 font-semibold">When</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="px-5 py-10 text-center text-clinic-mist">Loading…</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={6} className="px-5 py-10 text-center text-clinic-mist">No leads yet.</td></tr>
            ) : (
              filtered.map((l) => (
                <tr
                  key={l.id}
                  onClick={() => setOpen(l)}
                  className="border-t border-sand-300/50 cursor-pointer hover:bg-sand-100/60"
                  data-testid={`lead-row-${l.id}`}
                >
                  <td className="px-5 py-4 font-semibold text-clinic-navy">{l.name}</td>
                  <td className="px-5 py-4 text-clinic-mist">
                    <div>{l.email}</div>
                    {l.phone && <div className="text-xs">{l.phone}</div>}
                  </td>
                  <td className="px-5 py-4 text-clinic-mist">
                    <div className="text-clinic-navy font-semibold">{l.pet_name || "-"} <span className="font-normal text-clinic-mist">({l.pet_type || "?"})</span></div>
                    <div className="text-xs">{l.service_interest || "-"}</div>
                  </td>
                  <td className="px-5 py-4">
                    {l.intent_summary?.parent_intent ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-clinic-sage px-3 py-1 text-[11px] font-bold text-clinic-forest uppercase tracking-widest">
                        {l.intent_summary.parent_intent}
                        {l.intent_summary.sub_intent && <> · {l.intent_summary.sub_intent}</>}
                      </span>
                    ) : (
                      <span className="text-clinic-mist text-xs">unknown</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={l.status} />
                  </td>
                  <td className="px-5 py-4 text-clinic-mist text-xs whitespace-nowrap">
                    {new Date(l.created_at).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Sheet open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto">
          {open && (
            <div data-testid="lead-detail-panel">
              <SheetHeader>
                <SheetTitle className="font-display text-2xl">{open.name}</SheetTitle>
              </SheetHeader>
              <div className="mt-2 flex flex-wrap gap-3 text-sm">
                <a href={`mailto:${open.email}`} className="inline-flex items-center gap-1.5 text-clinic-forest font-semibold">
                  <Mail className="h-3.5 w-3.5" /> {open.email}
                </a>
                {open.phone && (
                  <a href={`tel:${open.phone}`} className="inline-flex items-center gap-1.5 text-clinic-forest font-semibold">
                    <Phone className="h-3.5 w-3.5" /> {open.phone}
                  </a>
                )}
              </div>

              <div className="mt-6 grid gap-4 text-sm">
                <Kv k="Pet" v={`${open.pet_name || "-"} (${open.pet_type || "?"})`} />
                <Kv k="Service of interest" v={open.service_interest || "-"} />
                <Kv k="Preferred time" v={open.preferred_time || "-"} />
                <Kv k="Source page" v={open.source_page || "-"} />
                <Kv k="Comment" v={open.comment || "-"} multiline />
              </div>

              <div className="mt-8">
                <div className="text-xs uppercase tracking-[0.22em] font-semibold text-clinic-forest">Status</div>
                <div className="flex gap-2 mt-2">
                  {STATUSES.map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(open, s)}
                      className={`rounded-full px-4 py-1.5 text-xs font-semibold capitalize ${
                        open.status === s ? "bg-clinic-navy text-white" : "bg-sand-100 text-clinic-navy hover:bg-sand-200"
                      }`}
                      data-testid={`lead-status-${s}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <div className="text-xs uppercase tracking-[0.22em] font-semibold text-clinic-forest">Intent summary</div>
                <div className="bg-sand-100 rounded-xl p-4 mt-2 text-xs space-y-1">
                  <div><b>Parent:</b> {open.intent_summary?.parent_intent || "unknown"}</div>
                  <div><b>Sub:</b> {open.intent_summary?.sub_intent || "unknown"}</div>
                  <div><b>Page views:</b> {open.intent_summary?.page_views ?? 0}</div>
                  <div><b>Intent scores:</b> {JSON.stringify(open.intent_summary?.intent_scores || {})}</div>
                  <div><b>Sub scores:</b> {JSON.stringify(open.intent_summary?.sub_intent_scores || {})}</div>
                  <div><b>First referrer:</b> {open.intent_summary?.first_referrer || "-"}</div>
                </div>
              </div>

              <div className="mt-8">
                <div className="text-xs uppercase tracking-[0.22em] font-semibold text-clinic-forest flex items-center gap-2">
                  <Activity className="h-3.5 w-3.5" /> Signal trail
                </div>
                <ol className="mt-3 space-y-2">
                  {(open.signal_trail || []).slice(-20).map((e, i) => (
                    <li key={i} className="text-xs bg-white border border-sand-300/60 rounded-lg px-3 py-2 flex items-center justify-between">
                      <span className="font-semibold text-clinic-navy">{e.signal_type}</span>
                      <span className="text-clinic-mist">{e.label || e.page_path || e.intent || "-"}</span>
                    </li>
                  ))}
                  {(open.signal_trail || []).length === 0 && (
                    <li className="text-xs text-clinic-mist">No signals captured.</li>
                  )}
                </ol>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function StatusBadge({ status }) {
  const tone = status === "new"
    ? "bg-clinic-amber/20 text-clinic-navy"
    : status === "contacted"
    ? "bg-clinic-sage text-clinic-forest"
    : "bg-sand-200 text-clinic-mist";
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest ${tone}`}>
      {status}
    </span>
  );
}

function Kv({ k, v, multiline = false }) {
  return (
    <div className="grid grid-cols-[140px_1fr] gap-3 items-start">
      <div className="text-xs uppercase tracking-widest font-bold text-clinic-forest">{k}</div>
      <div className={`text-clinic-navy ${multiline ? "whitespace-pre-wrap" : ""}`}>{v}</div>
    </div>
  );
}
