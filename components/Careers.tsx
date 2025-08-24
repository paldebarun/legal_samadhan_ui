"use client";

import BannerComponent from "./Banner";
import Heading from "./Heading";
import { useState } from "react";
import ManagementProfessionalMenu from "./ManagementProfessionalMenu";
import LegalProfessionalMenu from "./LegalProfessionalMenu";
import InternshipMenu from "./InternshipMenu";

const categories = [
  "Legal Professionals",
  "Management Professionals",
  "Internship",
];

export default function CareerComponent() {
  const [category, setCategory] = useState<string>("Legal Professionals");

  return (
    <div className="w-full">
      <BannerComponent
        image="/careers/832a2286-53fc-4af3-8471-5ff18f1b76af.jpeg"
        text="Want to work with us ?"
      />
      <Heading first_text="Join" second_text="us now" />

      <div className="w-full">
        <div className="w-9/12 mx-auto px-6 py-10 flex justify-between text-3xl font-semibold hover:cursor-pointer">
          {categories.map((cat, index) => (
            <div
              key={index}
              onClick={() => setCategory(cat)}
              className={`${
                category === cat
                  ? "text-black border-b-4 border-purple-900"
                  : "text-slate-500 border-b-0"
              } transition-all duration-200`}
            >
              {cat}
            </div>
          ))}
        </div>
        {/* Menu Section */}
        <div className="w-full px-6 py-6">
          {category === "Legal Professionals" && <LegalProfessionalMenu />}
          {category === "Management Professionals" && (
            <ManagementProfessionalMenu />
          )}
          {category === "Internship" && <InternshipMenu />}
        </div>
      </div>
    </div>
  );
}
