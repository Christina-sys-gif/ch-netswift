// src/pages/Terms.jsx
export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p><strong>Last updated:</strong> November 5, 2025</p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By using CH Interprise ("the Service"), you agree to these Terms of Service. 
            If you do not agree, please do not use our platform.
          </p>

          <h2>2. Service Description</h2>
          <p>
            CH Interprise provides a platform to purchase mobile data packages 
            from Ghanaian telecom providers (MTN, AirtelTigo, Telecel). 
            We act as a reseller — all data is delivered by the respective network.
          </p>

          <h2>3. Payment & Delivery</h2>
          <p>
            - Payment is processed securely via approved payment providers (e.g., Paystack, Flutterwave).<br/>
            - After successful payment, data is disbursed manually by CH Interprise staff.<br/>
            - Delivery may take up to 5 minutes. If not received, contact support.
          </p>

          <h2>4. User Responsibilities</h2>
          <p>
            - You must provide a valid Ghanaian mobile number.<br/>
            - You may not abuse, automate, or resell our service.<br/>
            - You are responsible for ensuring your device supports the data package.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            CH Interprise is not liable for:
            <ul>
              <li>Network outages or delivery failures by MTN/AirtelTigo/Telecel</li>
              <li>Incorrect phone numbers provided by you</li>
              <li>Third-party payment processing errors</li>
            </ul>
          </p>

          <h2>6. Changes to Terms</h2>
          <p>
            We may update these terms. Continued use after changes implies acceptance.
          </p>

          <h2>7. Contact</h2>
          <p>
            Questions? Contact us at: <strong>support@chinterprise.com</strong>
          </p>
        </div>
      </div>
    </div>
  );
}