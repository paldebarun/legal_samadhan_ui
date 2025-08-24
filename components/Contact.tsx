"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import toast from "react-hot-toast";
import axios from "axios"
import { messages_url } from "@/utils/config";


const cards_slider = [
  {
    image: "/br_ambedkar_image.jpeg",
    quotes: "Justice is the constant and perpetual wish to render everyone his due.",
    author: "B.R. Ambedkar",
  },
  {
    image: "/nehru.jpeg",
    quotes: "Where there is no equality before law, freedom becomes meaningless.",
    author: "Jawaharlal Nehru",
  },
  {
    image: "/br_ambedkar_image.jpeg",
    quotes: "The Constitution is not a mere lawyers’ document; it is a vehicle of life.",
    author: "B.R. Ambedkar",
  },
  {
    image: "/vr_krishna_iyer.jpeg",
    quotes: "Power must be coupled with responsibility, else it corrupts.",
    author: "Justice V.R. Krishna Iyer",
  },
];

export default function ContactComponent() {
  // form state
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [agreement, setAgreement] = useState(false);

  // submit handler
  // submit handler
const handleSubmit = async () => {
  // basic validation before sending
  if (!fullname || !email || !subject || !message) {
    toast.error("Please fill in all required fields.");
    return;
  }
  if (!agreement) {
    toast.error("You must agree to Terms & Conditions.");
    return;
  }

  const toastId = toast.loading("Submitting...");

  const payload = {
    fullname,
    email,
    subject,
    message,
    agreement,
  };

  try {
    const res = await axios.post(messages_url, payload, {
      headers: { "Content-Type": "application/json" },
    });

    if (res.status === 201 || res.status === 200) {
      toast.success("Submitted successfully!", { id: toastId });

      // reset form
      setFullname("");
      setEmail("");
      setSubject("");
      setMessage("");
      setAgreement(false);
    } else {
      toast.error("Submission failed. Please try again.", { id: toastId });
    }
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong while submitting the form.", {
      id: toastId,
    });
  }
};


  return (
    <div className="w-full">
      <div className="w-full flex justify-center items-center py-10 px-6">
        {/* Contact Form */}
        <div className="contact-form w-full lg:w-5/12">
          <p className="text-4xl md:text-6xl lg:text-7xl font-bold">Any Query ?</p>
          <p className="text-4xl md:text-6xl lg:text-7xl font-bold text-purple-950">
            Let Us know
          </p>

          <div className="flex flex-col space-y-6 my-9">
            <input
              type="text"
              placeholder="Full name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="text-2xl sm:text-4xl focus:outline-none border-b-2 px-3 py-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-2xl sm:text-4xl focus:outline-none border-b-2 px-3 py-2"
            />
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="text-2xl sm:text-4xl focus:outline-none border-b-2 px-3 py-2"
            />
            <textarea
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="text-2xl sm:text-4xl focus:outline-none border-b-2 px-3"
            />

            <div className="flex gap-1 sm:gap-5 items-center">
              <input
                type="checkbox"
                checked={agreement}
                onChange={(e) => setAgreement(e.target.checked)}
                className="hover:cursor-pointer"
              />
              <div className="flex gap-1 font-semibold text-xs sm:text-md">
                <p>I Agree to the</p>
                <span className="text-purple-900">Terms & Conditions</span>
                <p>and</p>
                <span className="text-purple-900">Privacy Policy</span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="p-2 md:p-3 bg-purple-900 w-4/12 sm:w-3/12 lg:w-4/12 hover:cursor-pointer hover:bg-purple-950 text-white text-sm sm:text-xl lg::text-3xl rounded-full"
            >
              Submit
            </button>
          </div>
        </div>

        {/* Swiper Cards */}
        <div className="lg:block hidden w-6/12">
          <Swiper
            effect={"cards"}
            grabCursor
            modules={[EffectCards]}
            className="mySwiper w-[300px] h-[400px] lg:w-[350px] lg:h-[450px] xl:w-[450px] xl:h-[550px] mx-auto"
          >
            {cards_slider.map((card, index) => (
              <SwiperSlide
                key={index}
                className="relative rounded-xl shadow-lg overflow-hidden flex items-end"
              >
                <Image
                  src={card.image}
                  alt={card.author}
                  fill
                  className="object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-black/50"></div>

                {/* Quote & Author */}
                <div className="relative z-10 p-6 text-white">
                  <p className="text-lg sm:text-xl font-medium italic mb-3">
                    “{card.quotes}”
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-amber-400">
                    — {card.author}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
