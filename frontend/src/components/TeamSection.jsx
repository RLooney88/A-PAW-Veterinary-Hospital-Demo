import React from "react";

const TEAM = [
  {
    name: "Dr. Karen Hamilton, DVM",
    role: "Veterinarian & Owner",
    img: "https://cdcssl.ibsrv.net/ibimg/smb/3000x1996_80/webmgr/02/s/r/Media_2021/088_AnnapolisVet.jpg.jpg.webp",
  },
  {
    name: "Leah Boback",
    role: "Clinic Manager",
    img: "https://cdcssl.ibsrv.net/ibimg/smb/3000x2740_80/webmgr/02/s/r/images/leah-headshot..jpg.webp",
  },
  {
    name: "Kaitlin J.",
    role: "Veterinary Assistant",
    img: "https://cdcssl.ibsrv.net/ibimg/smb/2250x3000_80/webmgr/02/s/r/employee.photos/Kaitlin.Jenkins..jpg.webp",
  },
  {
    name: "Lester L.",
    role: "Veterinary Assistant",
    img: "https://cdcssl.ibsrv.net/ibimg/smb/2250x3000_80/webmgr/02/s/r/employee.photos/Lester.Latino..jpg.webp",
  },
  {
    name: "Tanjii M.",
    role: "Client Services Coordinator",
    img: "https://cdcssl.ibsrv.net/ibimg/smb/3000x2245_80/webmgr/02/s/r/IMG_6359.jpg.webp",
  },
];

export default function TeamSection() {
  return (
    <section className="mt-24" data-testid="team-section">
      <div className="text-xs uppercase tracking-[0.22em] font-semibold text-clinic-forest">Our Team</div>
      <h2 className="font-display text-3xl sm:text-4xl font-bold text-clinic-navy mt-3 max-w-2xl">
        Meet the people your pet will actually love seeing.
      </h2>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {TEAM.map((m, i) => (
          <article
            key={m.name}
            className="group bg-white rounded-[1.5rem] border border-sand-300/60 overflow-hidden transition-transform duration-300 hover:-translate-y-1.5"
            data-testid={`team-card-${i}`}
          >
            <div className="aspect-[4/5] overflow-hidden bg-sand-200">
              <img
                src={m.img}
                alt={m.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <div className="font-display font-bold text-clinic-navy">{m.name}</div>
              <div className="text-xs uppercase tracking-widest text-clinic-forest font-semibold mt-1">{m.role}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
