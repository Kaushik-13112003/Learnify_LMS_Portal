import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
          Privacy Policy
        </h1>
        <p className="text-gray-700 mb-8">
          Your privacy is important to us. This policy outlines how we collect,
          use, and protect your personal information.
        </p>
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">
          1. Information Collection
        </h2>
        <p className="text-gray-600 mb-4">
          We collect personal information provided by you when creating an
          account or using our services.
        </p>
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">
          2. Use of Information
        </h2>
        <p className="text-gray-600 mb-4">
          We use your information to provide and improve our services, including
          customer support and course recommendations.
        </p>
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">
          3. Sharing of Information
        </h2>
        <p className="text-gray-600 mb-4">
          Learnify does not share your personal data with third parties without
          consent, except as required by law.
        </p>
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">
          4. Security Measures
        </h2>
        <p className="text-gray-600 mb-4">
          We take appropriate measures to protect your information, but we
          cannot guarantee complete security of data transmitted online.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
