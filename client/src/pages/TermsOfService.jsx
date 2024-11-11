import React from "react";

const TermsOfService = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
          Terms of Service
        </h1>
        <p className="text-gray-700 mb-8">
          These terms and conditions outline the rules and regulations for using
          Learnify's website and services. By accessing or using our platform,
          you agree to abide by these terms.
        </p>
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">
          1. Acceptance of Terms
        </h2>
        <p className="text-gray-600 mb-4">
          By using our services, you accept and agree to these terms. If you do
          not agree, please refrain from using our services.
        </p>
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">
          2. User Accounts
        </h2>
        <p className="text-gray-600 mb-4">
          Users are responsible for maintaining the confidentiality of their
          account and password and for restricting access to their computer.
        </p>
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">
          3. Prohibited Activities
        </h2>
        <p className="text-gray-600 mb-4">
          Users are prohibited from any form of misuse or unauthorized access to
          Learnify’s resources and materials.
        </p>
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">
          4. Termination of Use
        </h2>
        <p className="text-gray-600 mb-4">
          Learnify reserves the right to suspend or terminate user accounts at
          its discretion for violations of these terms.
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
