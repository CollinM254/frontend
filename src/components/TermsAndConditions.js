import React from "react";
import { Link } from "react-router-dom";

const TermsAndConditions = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
      <p className="mb-4">
        These terms and conditions govern your use of the <strong>Trendy Gadgets</strong> website
        (<a href="https://www.trendygadgetske.com" className="text-blue-500">trendygadgetske.com</a>) and the purchase of
        products from Trendy Gadgets. By accessing or using our website, you agree to be bound by these terms and conditions.
      </p>
      <h2 className="text-xl font-semibold mt-4">1. Agreement to Terms:</h2>
      <p className="mb-4">By using this website, you agree to abide by these terms. If you do not agree, please refrain from using our services.</p>
      <h2 className="text-xl font-semibold mt-4">2. Products and Services:</h2>
      <p className="mb-4">Trendy Gadgets offers electronic products for sale. While we strive for accuracy in product descriptions and pricing, we do not guarantee their completeness or accuracy. Prices are subject to change without notice.</p>
      <h2 className="text-xl font-semibold mt-4">3. Ordering and Payment:</h2>
      <p className="mb-4">All orders must be placed with accurate information. Full payment is required at checkout using available payment methods. We reserve the right to refuse or cancel any order at our discretion.</p>
      <h2 className="text-xl font-semibold mt-4">4. Shipping and Delivery:</h2>
      <p className="mb-4">We strive for timely delivery, but we are not responsible for shipping delays beyond our control. Shipping costs vary based on location and shipping method.</p>
      <h2 className="text-xl font-semibold mt-4">5. Returns and Exchanges:</h2>
      <p className="mb-4">Refer to our <Link to={'/returnpolicy' } className="text-blue-500">Refund and Return Policy</Link> for details on returns and exchanges.</p>
      <h2 className="text-xl font-semibold mt-4">6. Privacy Policy:</h2>
      <p className="mb-4">Your privacy matters. Please review our <Link to={'/returnpolicy' } className="text-blue-500">Privacy Policy</Link> to understand how we handle your data.</p>
      <h2 className="text-xl font-semibold mt-4">7. Intellectual Property:</h2>
      <p className="mb-4">All website content, including text, images, logos, and trademarks, is the property of Trendy Gadgets and protected by intellectual property laws. Unauthorized use is prohibited.</p>
      <h2 className="text-xl font-semibold mt-4">8. Limitation of Liability:</h2>
      <p className="mb-4">Trendy Gadgets is not liable for indirect, incidental, or consequential damages arising from website usage or product purchases.</p>
      <h2 className="text-xl font-semibold mt-4">9. Governing Law:</h2>
      <p className="mb-4">These terms are governed by the laws of Kenya, with disputes subject to the jurisdiction of Kenyan courts.</p>
      <h2 className="text-xl font-semibold mt-4">10. Contact Information:</h2>
      <p className="mb-4">
        <strong>Trendy Gadgets</strong><br />
        Contact: <strong>+254707869120</strong><br />
        Email: <a href="mailto:info@trendygadgetske.com" className="text-blue-500">info@trendygadgetske.com</a><br />
        Location 1: Our shop is located Off Luthuli Avenue along Gaberone Road right opposite Nairobi Textile<br />
        Location 2: Our shop is located Off Luthuli Avenue along Gaberone Road right opposite Nairobi Textile
      </p>
      <p className="mb-4">By using this website and purchasing products, you acknowledge and agree to these terms. Trendy Gadgets reserves the right to modify these terms without prior notice.</p>
      <p className="font-semibold">Sincerely,</p>
      <p className="font-semibold">Trendy Gadgets Team</p>
    </div>
  );
};

export default TermsAndConditions;
