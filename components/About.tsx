
import Image from "next/image";
import CubeSwiper from "./CubeSwiper";


const images = ["/about/f379a178-10db-4d41-9055-05cef71089f4.jpeg", "/about/d4e108a8-ded6-4f94-85a1-6274f81b4c18.jpeg", "/about/Trust, transparency & modern contract….jpeg", "/about/Illigal Law.jpeg"];

export const practiceAreas = [
    "Criminal matters (District and Session Court Gurgaon)",
    "Family law / Matrimonial and Divorce",
    "Real estate (Regulation and Development) Act RERA Gurgaon and Delhi",
    "Contract Management and Arbitration",
    "Commercial Court (Dispute related to Construction and Industry)",
    "Micro, Small and Medium Enterprises Act",
    "Negotiable Instrument Act (Sec. 138 NIA)",
    "Drafting of Contracts, Deeds and Will",
    "Property and Rent Disputes",
  ];
  
const missionPoints = [
    "Provide tailored legal solutions across corporate, real estate, and commercial sectors.",
    "Deliver exceptional client experience built on trust, transparency, and responsiveness.",
    "Champion innovative and practical approaches to complex legal challenges.",
    "Foster a collaborative and inclusive work culture for our team and partners.",
    "Maintain the highest standards of integrity, ethics, and professionalism in all engagements.",
    "Promote knowledge-sharing and continuous learning to stay ahead in evolving legal landscapes."]

    const founders = [
        {
          name: "Adv. Er. Attar Singh Kharb",
          role: "Founder",
          image: "/about/ATTAR-SINGH-copy-768x964.jpg",
          description: `Prior to setting up the legal firm, Er. Attar Singh Kharb served in Engineering Projects (India) Ltd., a Government of India enterprise. 
          He successfully managed construction of large and complex projects such as Housing, Corporate Offices, Institutional Buildings, Colleges and Hospitals, as well as utility projects including Water Supply, Sewage Disposal, and Roads in India and abroad.
          He completed his BE (Civil) from Thapar Institute of Engineering & Technology in 1972 and LL.B from MDU, Rohtak. He is enrolled as a practicing lawyer in Bar Council Of Punjab and Haryana, Chandigarh, and is a member of the District Bar Association, Gurugram.`,
        },
        {
          name: "Adv. Vinod Gahlot",
          role: "Co-Founder",
          image: "/about/VINOD-GAHLOT-e1550170635108-768x966.jpg",
          description: `He completed his Master of Social Work (MSW) and LL.B from Delhi University. 
          A dedicated social worker, he contributes extensively to the welfare of society, providing free consultancy for matrimonial disputes and related matters. 
          He is enrolled as an advocate in Bar Council of Delhi and a member of the District Bar Association, Gurugram, Haryana.`,
        },
      ];



export default function About() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        className="hero-section relative w-full flex items-center justify-center h-[300px] md:h-[500px] lg:h-[600px]"
        style={{
          backgroundImage: "url('/about/when heroes fall by giana darling.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <p className="relative text-white text-center text-3xl md:text-6xl font-bold leading-normal w-7/12">
          Advising businesses and institutions that power the economy
        </p>
      </section>

     
      {/* About Section */}
      <section className="about-section px-6 py-10 max-w-screen mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-1 items-center py-10">
          {/* Swiper for team images */}
    
          <CubeSwiper images={images}/>
          {/* About Text */}
          <div className="lg:w-6/12 md:px-6 flex flex-col items-center gap-6">
  <p className="text-2xl font-semibold text-center">
    Legal Samadhan is a premier law firm providing comprehensive legal solutions across corporate, commercial, real estate, and dispute resolution domains.
  </p>
  <p className="text-center">
    We partner with businesses, institutions, and individuals to deliver innovative, strategic, and practical legal advice. Our team combines deep expertise with a commitment to integrity, ensuring every client receives trusted guidance and impactful results.
  </p>
</div>


        </div>

        <section className="founder-section flex flex-col md:flex-row px-6 w-full justify-center items-start py-12 gap-10">
  {founders.map((founder, idx) => (
    <div key={idx} className="flex flex-col justify-center items-center w-full md:w-6/12 space-y-6">
      <Image 
        src={founder.image} 
        className="rounded-xl w-40 h-45 md:w-[300px] md:h-[360px]" 
        alt={founder.name} 
        width={300} 
        height={300} 
      />
      <p className="font-bold text-center text-md sm:text-2xl">{founder.name} ({founder.role})</p>
      <p className="text-center text-xs sm:text-md lg:text-lg  w-9/12">
        {founder.description}
      </p>
    </div>
  ))}
</section>

      </section>

      {/* Mission Section */}
      <section className="mission-section w-full lg:h-[1000px] lg:relative">
        <section className="text-white h-[400px] bg-purple-950 py-10 space-y-6 px-6">
          <p className="font-bold text-6xl">Our Vision</p>
          <div className="flex flex-col items-start text-xl sm:text-3xl">
          <p>To be the Preferred Legal Partner,</p>
      <p>Delivering Strategic and Innovative Solutions,</p>
      <p>Ensuring Excellence, Integrity & Lasting Impact.</p>
          </div>
        </section>

        <div className="w-full lg:absolute lg:py-10 flex flex-col items-end lg:bottom-0 lg:right-0">
          <Image
            src="/mission.jpg"
            width={600}
            height={400}
            alt="Mission"
            className="w-full lg:w-6/12"
          />
          <p className="text-6xl md:text-8xl px-2 w-full lg:w-6/12 font-bold">Our</p>
          <p className="text-6xl md:text-8xl px-2 w-full lg:w-6/12 font-bold text-purple-950">Mission</p>
          <ul className="list-disc text-[0.75rem] sm:text-sm md:py-6 px-2 list-inside space-y-3 md:text-lg marker:text-purple-950 text-black">
        {missionPoints.map((point, idx) => (
          <li key={idx}>{point}</li>
        ))}
      </ul>
        </div>
      </section>

      {/* Practice Areas Section */}
      <section
        className="practice-area relative w-full lg:flex"
        style={{
          backgroundImage: "url('/about/Law, Order and Justice.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100%",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <p className="lg:w-6/12 py-10 relative leading-normal text-white font-bold text-4xl sm:text-6xl flex justify-center items-center text-center">
          Core Practice Areas
        </p>
        <div className="lg:w-6/12 px-8 py-12 relative flex flex-col md:justify-center items-center lg:bg-gray-800 text-white">
          <ul className="list-disc list-inside space-y-4 text-sm sm:text-lg">
            {practiceAreas.map((area, idx) => (
              <li key={idx}>{area}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
