// components/Disclaimer.tsx
"use client";

import React, { useState, useEffect } from "react";

export default function Disclaimer() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const agreed = localStorage.getItem("disclaimerAgreed");
    if (!agreed) setShow(true);
  }, []);

  const handleAgree = () => {
    localStorage.setItem("disclaimerAgreed", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-xl relative">
        <h3 className="text-xl font-bold mb-4">Disclaimer</h3>
        <p className="text-gray-700 mb-6 text-sm md:text-base">
          The Bar Council of India prohibits Lawyers and Law Firms from solicitation. 
          The content on this website is available for informational purposes only and should not be construed as advertisement, solicitation, legal advice, invitation, inducement or contract of any sort whatsoever. 
          In case of requirement, the user is encouraged to seek independent legal consultation.
          <br /><br />
          The website contains links to external resources solely for enhancing user experience. 
          We therefore are not liable for any consequences arising out of any action taken by the user based on information on the website.
        </p>
        <button
          onClick={handleAgree}
          className="absolute bottom-4 right-4 bg-purple-900 text-white px-4 py-2 rounded hover:bg-purple-800 transition"
        >
          Agree
        </button>
      </div>
    </div>
  );
}
