"use client";

import { useState } from "react";
import Link from "next/link"; 
import { HiMenu } from "react-icons/hi";
import { RiCloseFill } from "react-icons/ri";

interface NavLink {
  title: string;
  path: string;
}

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const navLinks: NavLink[] = [
    { title: "Practice", path: "/practice" },
    { title: "Team", path: "/team" },
    { title: "About", path: "/about" },
    { title: "Publications", path: "/publications" },
    { title: "News & Events", path: "/news-events" },
    { title: "Careers", path: "/careers" },
    { title: "Contacts", path: "/contacts" },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 py-4">
      <div className="flex items-center justify-between px-4 py-3 lg:px-10">
        {/* Logo / Brand Name */}
        <Link href="/" className="text-xl font-bold text-gray-800">
  <span className="text-purple-900">LEGAL</span>
  <span> SAMADHAN</span>
</Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-6 text-gray-700 font-medium">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.path}
              className="relative group overflow-hidden"
            >
              <span className="hover:text-purple-950 transition-colors">
                {link.title}
              </span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-purple-950 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-3xl text-purple-950"
          aria-label="Toggle menu"
        >
          {menuOpen ? <RiCloseFill /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Slide-in Nav */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-500 ease-in-out z-50 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col px-4 py-5 gap-4">
          {/* Close button inside menu */}
          <div
            className="self-end text-3xl mb-2 cursor-pointer text-purple-950"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <RiCloseFill />
          </div>

          {/* Mobile Nav Links */}
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.path}
              onClick={() => setMenuOpen(false)}
              className="text-gray-800 font-medium hover:text-pink-600"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
