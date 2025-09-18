import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title="privcy policy">
      <div className="row contactus">
        {/* Left Image Section */}
        <div className="col-md-6">
          <img
            src="/images/contactus.jpeg"
            alt="Privacy Policy"
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </div>

        {/* Right Content Section */}
        <div className="col-md-6">
          <h2>Privacy Policy</h2>
          <p>
            We value your privacy and are committed to protecting your personal
            information. This policy explains how we collect, use, and safeguard
            your data.
          </p>
          <h4>1. Information We Collect</h4>
          <p>
            We may collect information such as your name, email, phone number,
            and usage details when you interact with our platform.
          </p>
          <h4>2. How We Use Your Information</h4>
          <p>
            Your information is used to improve our services, respond to
            inquiries, and ensure a better user experience.
          </p>
          <h4>3. Data Security</h4>
          <p>
            We implement industry-standard security measures to protect your
            data from unauthorized access or disclosure.
          </p>
          <h4>4. Contact Us</h4>
          <p>
            If you have any questions about our privacy policy, please contact
            us at <strong>support@example.com</strong>.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
