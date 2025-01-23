import React from "react";
import { Link } from "react-router-dom";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import InstagramIcon from "@mui/icons-material/Instagram";
import { FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-200">
      <div className="footer-main flex flex-col sm:flex-row justify-between m-10">
        {/* Contact Section */}
        <div className="contacts flex flex-col flex-grow mb-8 sm:mb-0">
          <h1 className="font-bold mb-2">Our Contacts</h1>
          <div className="flex items-center mb-2 text-green-600">
            <WhatsAppIcon className="mr-2 text-green-600" />
            <Link to="https://wa.me/254707869120">0707869120</Link>
          </div>
          <h1>or</h1>
          <div className="flex items-center mb-2 text-green-600">
            <WhatsAppIcon className="mr-2 text-green-600" />
            <Link to="https://wa.me/254728999035" >0728999035</Link>
          </div>
          <div className="flex items-center text-blue-600">
            <AddIcCallIcon className="mr-2" />
            <Link to="tel:+254707869120">0707869120</Link>
          </div>
          <h1>or</h1>

          <div className="flex items-center text-blue-600">
            <AddIcCallIcon className="mr-2" />
            <Link to="tel:+254728999035">0728999035</Link>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="social flex flex-col flex-grow mb-8 sm:mb-0">
          <h1 className="font-bold mb-2">Our Social Media</h1>
          <div className="flex items-center mb-2 text-blue-600">
            <FacebookIcon className="mr-2" />
            <Link to="https://www.facebook.com/trendygadetskenya">
              Trendy Gadgets
            </Link>
          </div>
          <div className="flex items-center">
            <FaTiktok className="mr-2" />
            <Link to="https://vm.tiktok.com/ZMMnLGbW7/">Trendy Gadgets</Link>
          </div>
          <div className="flex items-center text-red-600">
            <InstagramIcon className="mr-2" />
            <Link to="https://www.instagram.com/trendygadgets588?igsh=YnM2YzZtcXZrZTk4">Trendy Gadgets</Link>
          </div>
        </div>

        {/* Location Section */}
        <div className="location flex flex-col flex-grow mb-8 sm:mb-0">
          <h1 className="font-bold mb-2">Our Location</h1>
          <p>
            Our shop is located Off Luthuli Avenue along Gaberone Road right
            opposite Nairobi Textile
          </p>
        </div>

        {/* Exact Location Section */}
        <div className="exact-location flex flex-col flex-grow">
          <h1 className="font-bold mb-2">Exact Location</h1>
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3988.8166719016544!2d36.827211!3d-1.28389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMcKwMTcnMDIuMCJTIDM2wrA0OSczOC4wIkU!5e0!3m2!1sen!2ske!4v1715204261940!5m2!1sen!2ske"
              width="200"
              height="100"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-4">
        <p className="text-center font-bold" title="Youtube Channel">
          &copy;{new Date().getFullYear()} Developed by{" "}
          <Link to={"https://collinm254.github.io/Portfolio1/"}>Collin</Link>{" "}
          and <Link to={""}>David</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

