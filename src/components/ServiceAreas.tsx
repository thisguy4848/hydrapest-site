import { MapPin, Phone } from "lucide-react";
import Link from "next/link";

const citySlugMap: Record<string, string> = {
  "Safford": "/pest-control-safford-az",
  "Thatcher": "/pest-control-thatcher-az",
  "Pima": "/pest-control-pima-az",
  "Fort Thomas": "/pest-control-fort-thomas-az",
  "Solomon": "/pest-control-solomon-az",
  "Show Low": "/pest-control-show-low-az",
  "Pinetop": "/pest-control-pinetop-lakeside-az",
  "Lakeside": "/pest-control-pinetop-lakeside-az",
  "Snowflake": "/pest-control-snowflake-az",
  "Taylor": "/pest-control-taylor-az",
  "Springerville": "/pest-control-springerville-az",
  "Sierra Vista": "/pest-control-sierra-vista-az",
  "Benson": "/pest-control-benson-az",
  "Willcox": "/pest-control-willcox-az",
  "Douglas": "/pest-control-douglas-az",
  "Tombstone": "/pest-control-tombstone-az",
  "Bisbee": "/pest-control-bisbee-az",
};

const offices = [
  {
    region: "Gila Valley",
    phone: "928-432-6200",
    address: "2158 N Reay Ln Suite 1, Thatcher, AZ 85552",
    mapQuery: "2158+N+Reay+Ln+Suite+1+Thatcher+AZ+85552",
    cities: [
      "Safford",
      "Thatcher",
      "Pima",
      "Central",
      "Fort Thomas",
      "Eden",
      "Solomon",
      "San Jose",
      "Swift Trail",
    ],
  },
  {
    region: "White Mountains",
    phone: "928-457-2481",
    address: "1080 N 16th St Suite 300, Show Low, AZ 85901",
    mapQuery: "1080+N+16th+St+Suite+300+Show+Low+AZ+85901",
    cities: [
      "Show Low",
      "Pinetop",
      "Lakeside",
      "Heber",
      "Overgaard",
      "Snowflake",
      "Taylor",
      "Springerville",
      "Eagar",
      "St Johns",
    ],
  },
  {
    region: "Sierra Vista",
    phone: "520-523-8818",
    address: "4148 Industry Dr Suite 1111, Sierra Vista, AZ 85650",
    mapQuery: "4148+Industry+Dr+Suite+1111+Sierra+Vista+AZ+85650",
    cities: [
      "Sierra Vista",
      "Benson",
      "Willcox",
      "Bowie",
      "Douglas",
      "Hereford",
      "Tombstone",
      "Bisbee",
    ],
  },
];

export default function ServiceAreas() {
  return (
    <section id="areas" className="py-20 sm:py-28 bg-hydra-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-hydra-teal font-semibold text-sm uppercase tracking-widest">
            Where We Serve
          </span>
          <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-hydra-dark mt-3">
            3 Offices Across Arizona
          </h2>
          <p className="mt-4 text-hydra-gray text-lg">
            Southeastern Arizona&apos;s most trusted pest control — from the
            desert floor to the mountain pines.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {offices.map((office) => (
            <div
              key={office.region}
              className="bg-white rounded-2xl p-8 border border-hydra-light hover:border-hydra-cyan/30 transition-all hover:shadow-xl hover:shadow-hydra-cyan/5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-hydra-dark flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-hydra-cyan" />
                </div>
                <h3 className="font-[var(--font-heading)] text-xl font-bold uppercase text-hydra-dark">
                  {office.region}
                </h3>
              </div>

              <p className="text-sm text-hydra-gray mb-1">{office.address}</p>
              <Link
                href={`tel:${office.phone.replace(/-/g, "")}`}
                className="inline-flex items-center gap-1.5 text-hydra-teal font-semibold text-sm mb-5"
              >
                <Phone className="w-3.5 h-3.5" />
                {office.phone}
              </Link>

              <div className="pt-4 border-t border-hydra-light">
                <p className="text-xs font-semibold uppercase tracking-wider text-hydra-gray mb-2">
                  Cities Served
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {office.cities.map((city) =>
                    citySlugMap[city] ? (
                      <Link
                        key={city}
                        href={citySlugMap[city]}
                        className="text-xs bg-hydra-light text-hydra-navy px-2.5 py-1 rounded-full hover:bg-hydra-cyan/20 hover:text-hydra-teal transition-colors"
                      >
                        {city}
                      </Link>
                    ) : (
                      <span
                        key={city}
                        className="text-xs bg-hydra-light text-hydra-navy px-2.5 py-1 rounded-full"
                      >
                        {city}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="mt-4">
                <iframe
                  src={`https://maps.google.com/maps?q=${office.mapQuery}&output=embed`}
                  className="w-full h-48 rounded-xl border border-hydra-light"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map of ${office.region} office`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
