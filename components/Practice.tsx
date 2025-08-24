"use client";

import { useState } from "react";
import BannerComponent from "./Banner";
import Heading from "./Heading";

const practice_areas_data = [
    {
      heading: "CRIMINAL MATTERS (DISTRICT AND SESSION COURT GURGAON)",
      points: [
        "Offenses against women and child (kidnapping, Rape, stalking, domestic violence, dowry etc.",
        "Protection of child from sexual offenses (POCSO).",
        "Cyber crime.",
        "Narcotic drugs and psychotrophic substances (NDPS).",
        "Assault on person.",
      ],
    },
    {
      heading: "FAMILY LAW / MATRIMONIAL AND DIVORCE",
      points: [
        "Advising and representing clients in divorce and separation proceedings.",
        "Handling child custody, maintenance, and alimony disputes.",
        "Drafting matrimonial agreements and settlements.",
        "Representation in domestic violence and protection order cases.",
        "Mediation and resolution for amicable settlements.",
      ],
    },
    {
      heading: "REAL ESTATE (REGULATION AND DEVELOPMENT) ACT RERA GURGAON AND DELHI",
      points: [
        "Conducting title due diligence for residential and commercial properties.",
        "Advising on property development, purchase, and sale agreements.",
        "Representation before RERA authorities and regulatory bodies.",
        "Drafting and reviewing lease, sale, and development agreements.",
        "Advising on compliance with local municipal and RERA regulations.",
      ],
    },
    {
      heading: "CONTRACT MANAGEMENT AND ARBITRATION",
      points: [
        "Drafting, reviewing, and negotiating commercial contracts.",
        "Advising on dispute resolution and risk mitigation clauses.",
        "Representation in arbitration proceedings under domestic and international rules.",
        "Advising clients on contract enforcement and breach consequences.",
        "Conducting contract compliance audits for corporate clients.",
      ],
    },
    {
      heading: "COMMERCIAL COURT (DISPUTES RELATED TO CONSTRUCTION AND INDUSTRY)",
      points: [
        "Handling construction contract disputes and claims.",
        "Advising on industry-specific regulatory compliance issues.",
        "Representation in commercial litigation before specialized courts.",
        "Drafting and reviewing agreements for industrial projects.",
        "Assisting in settlement negotiations and dispute resolution.",
      ],
    },
    {
      heading: "MICRO, SMALL AND MEDIUM ENTERPRISES ACT",
      points: [
        "Advising MSMEs on compliance with applicable laws and regulations.",
        "Assistance with registration, licensing, and regulatory approvals.",
        "Representation in disputes related to business operations and trade.",
        "Guidance on government incentives, schemes, and funding options.",
        "Drafting agreements, MOUs, and partnership contracts for MSMEs.",
      ],
    },
    {
      heading: "NEGOTIABLE INSTRUMENT ACT (SEC. 138 NIA)",
      points: [
        "Advising clients on cheque bounce and dishonor cases under Section 138.",
        "Representation in criminal proceedings arising from dishonored instruments.",
        "Drafting notices, complaints, and legal documentation related to NIA.",
        "Settlement and compromise negotiation support.",
        "Assisting in recovery proceedings for financial claims.",
      ],
    },
    {
      heading: "DRAFTING OF CONTRACTS, DEEDS AND WILL",
      points: [
        "Drafting and reviewing contracts, agreements, and MOUs.",
        "Preparing deeds for sale, lease, mortgage, and gift transactions.",
        "Drafting wills and succession planning documents.",
        "Ensuring compliance with statutory and regulatory provisions.",
        "Advising clients on risk management and enforceability.",
      ],
    },
    {
      heading: "PROPERTY AND RENT DISPUTES",
      points: [
        "Advising on tenancy, lease agreements, and property rights.",
        "Representation in rent recovery and eviction proceedings.",
        "Handling disputes related to property ownership and transfers.",
        "Drafting settlement agreements for amicable resolution.",
        "Assisting clients with landlord-tenant negotiations and litigation.",
      ],
    },
  ];
  

export default function PracticeComponent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleDrawer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}

      <BannerComponent image="/practice/43c2ff63-d807-4338-b54c-6923ae9ac384.jpeg" text="Delivering Legal Excellence with Integrity and Insight" />

      {/* Section Heading */}

      <Heading first_text="Core"  second_text="Practice Areas"/>

      {/* Practice Areas Accordion */}
      <section className="practice_areas_list md:py-10 px-4 w-full md:w-11/12 mx-auto">
        {practice_areas_data.map((area, index) => (
          <div
            key={index}
            className="border-b border-gray-300 py-4 flex flex-col"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-sm sm:text-lg md:text-2xl font-semibold text-gray-600">
                {area.heading}
              </h3>
              <button
                onClick={() => toggleDrawer(index)}
                className="text-purple-950 text-2xl hover:cursor-pointer font-bold focus:outline-none"
              >
                {openIndex === index ? "−" : "+"}
              </button>
            </div>

            <div
              className={`transition-all duration-500 overflow-hidden ${
                openIndex === index ? "max-h-96 mt-3" : "max-h-0"
              }`}
            >
              <ul className="list-disc list-inside text-xs md:text-lg text-gray-600 space-y-2 pl-5">
                {area.points.map((point, i) => (
                  <li key={i} className="marker:text-purple-950">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
