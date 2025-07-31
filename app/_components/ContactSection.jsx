"use client";

import { useState } from "react";
import {
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid =
    formData.name.trim() &&
    formData.email.trim() &&
    formData.phone.trim() &&
    formData.message.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    console.log("Form Submitted", formData);
  };

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
          CONTACT US
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Have a story, question, or collaboration in mind? Drop us a message!
        </p>

        {/* Responsive container */}
        <div className="flex flex-col lg:flex-row md:flex-row items-start gap-8">
          {/* Contact Form */}
          <div className="flex-1 bg-white border rounded-lg shadow-sm p-6 md:p-8 w-full md:w-2/3">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your phone no."
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Your location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows="4"
                  name="message"
                  placeholder="Leave your message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={!isFormValid}
                className={`px-6 py-2 rounded-md font-medium transition 
                  ${
                    isFormValid
                      ? "bg-[#FF7B00] text-white hover:bg-[#FF7B00] active:bg-[#F26419]"
                      : "bg-gray-300 text-gray-700 cursor-not-allowed"
                  }`}
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Details (for md+ screens stacked) */}
          <div className="w-full lg:w-1/3 md:w-1/3 hidden md:block">
            <ContactDetails />
            <SocialMedia />
          </div>
        </div>

        {/* Contact Details for small screens - in two columns */}
        <div className="mt-8 md:hidden">
          <div className="grid grid-cols-2 gap-4">
            <ContactItem
              icon={<Mail className="w-5 h-5 text-white" />}
              label="yugaantargoa1958@gmail.com"
              link="mailto:yugaantargoa1958@gmail.com"
            />
            <ContactItem
              icon={<Phone className="w-5 h-5 text-white" />}
              label="79 7298 4399"
              link="tel:+917972984399"
            />
            <ContactItem
              icon={<MapPin className="w-5 h-5 text-white" />}
              label="Panaji, Goa"
            />
            <ContactItem
              icon={<Clock className="w-5 h-5 text-white" />}
              label="Mon-Fri: 9-6"
            />
          </div>

          {/* Social Media row for small screens */}
          <div className="flex justify-center gap-4 mt-6">
            <SocialMedia />
          </div>
        </div>
      </div>
    </section>
  );
}

/* Reusable components */
function ContactItem({ icon, label, link }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="bg-[#4A6604] p-2 rounded-md mb-2">{icon}</div>
      {link ? (
        <a href={link} className="text-gray-700 text-sm">
          {label}
        </a>
      ) : (
        <p className="text-gray-700 text-sm">{label}</p>
      )}
    </div>
  );
}

function ContactDetails() {
  return (
    <div className="space-y-6">
      <p className="text-gray-800 font-semibold mb-2">
        Want to reach out directly?
      </p>
      {/* Email */}
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-[#4A6604] p-2 rounded-md">
          <Mail className="w-5 h-5 text-white" />
        </div>
        <a href="mailto:yugaantargoa1958@gmail.com" className="text-gray-700">
          yugaantargoa1958@gmail.com
        </a>
      </div>
      {/* Phone */}
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-[#4A6604] p-2 rounded-md">
          <Phone className="w-5 h-5 text-white" />
        </div>
        <a href="tel:+917972984399" className="text-gray-700">
          79 7298 4399
        </a>
      </div>
      {/* Visit Us */}
      <div className="flex items-start gap-3 mb-3">
        <div className="bg-[#4A6604] p-2 rounded-md">
          <MapPin className="w-5 h-5 text-white" />
        </div>
        <div className="text-gray-700">
          YUGAANTAR Tourism Office
          <br />
          Panaji, Goa 403001
          <br />
          India
        </div>
      </div>
      {/* Office Hours */}
      <div className="flex items-start gap-3 mb-3">
        <div className="bg-[#4A6604] p-2 rounded-md">
          <Clock className="w-5 h-5 text-white" />
        </div>
        <div className="text-gray-700">
          <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
          <p>Saturday: 9:00 AM - 4:00 PM</p>
          <p>Sunday: Closed</p>
        </div>
      </div>
    </div>
  );
}
function SocialMedia() {
  return (
    <div className="flex gap-4 justify-center md:justify-start">
      {/* Facebook */}
      <a
        href="#"
        className="p-2 rounded-full border border-[#FF7B00] text-[#FF7B00] transition-colors duration-200
       hover:bg-[#FF7B00] hover:text-white active:bg-[#F26419]"
      >
        <Facebook className="w-5 h-5" />
      </a>

      {/* Instagram */}
      <a
        href="#"
        className="p-2 rounded-full border border-[#FF7B00] text-[#FF7B00] transition-colors duration-200
       hover:bg-[#FF7B00] hover:text-white active:bg-[#F26419]"
      >
        <Instagram className="w-5 h-5" />
      </a>

      {/* LinkedIn */}
      <a
        href="#"
        className="p-2 rounded-full border border-[#FF7B00] text-[#FF7B00] transition-colors duration-200
       hover:bg-[#FF7B00] hover:text-white active:bg-[#F26419]"
      >
        <Linkedin className="w-5 h-5" />
      </a>

      {/* YouTube */}
      <a
        href="#"
        className="p-2 rounded-full border border-[#FF7B00] text-[#FF7B00] transition-colors duration-200
       hover:bg-[#FF7B00] hover:text-white active:bg-[#F26419]"
      >
        <Youtube className="w-5 h-5" />
      </a>
    </div>
  );
}
