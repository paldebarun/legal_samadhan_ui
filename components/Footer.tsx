import { FaLinkedin } from "react-icons/fa";

const offices = [
  {
    place: "REGD. OFFICE",
    addressLines: [
      "605 A, Beverly Park - I",
      "DLF Phase 2",
      "M.G. Road",
      "Gurugram",
      "HARYANA",
    ],
    tel: ["+91-9891000814", "+91-9810608763"],
  },
  {
    place: "COURT OFFICE",
    addressLines: [
      "Chamber NO. 64",
      "Shaheed Sukhdev Singh Block",
      "( Gate No. 1) Disst. Court",
      "Gurugram",
      "HARYANA",
    ],
    tel: ["+91-9891000814", "+91-9810608763"],
  },
];

const Footer = () => {
  return (
    <div className="w-full relative bg-purple-950 lg:flex items-start text-white px-6 py-10 space-y-6">
      {/* Header */}
      <section className="header mb-10">
        <p className="text-4xl sm:text-6xl font-semibold">Contact Info</p>
      </section>

      {/* Offices */}
      <section className="offices py-6 flex lg:justify-end my-10 flex-wrap gap-6 w-full">
        {offices.map(({ place, addressLines, tel }, idx) => (
          <div key={idx} className="w-full sm:w-1/2 md:w-1/4">
            <h3 className="font-bold text-xs md:text-lg mb-2">{place}</h3>
            <address className="not-italic mb-2 text-xs md:text-lg">
              {addressLines.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
              {/* Phone numbers */}
              {tel.map((number, i) => (
                <div key={i}>
                  <a href={`tel:${number}`} className="hover:underline">
                    {number}
                  </a>
                </div>
              ))}
            </address>
          </div>
        ))}
      </section>
      <div className="w-full lg:hidden h-[50px] sm:h-[100px]">

      </div>
      {/* Footer copyright */}
      <section className="absolute bottom-1 text-xs md:text-lg left-2 ">
        © All right reserved Legal Samadhan LLP
      </section>

      {/* Social media & email */}
      <section className="social_media flex-col flex md:flex-row items-end absolute bottom-2 right-2 sm:right-10 gap-3">
        <a
          href="https://www.linkedin.com/company/legalsamadhan"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300"
        >
          <FaLinkedin className="text-2xl" />
        </a>
        <a
          href="mailto:info@legalsamadhan.co.in"
          className="underline text-xs hidden sm:flex sm:text-xs md:text-sm lg:text-lg hover:text-gray-300"
        >
          info@legalsamadhan.co.in
        </a>
      </section>
    </div>
  );
};

export default Footer;
