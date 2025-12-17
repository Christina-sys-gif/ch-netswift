// src/pages/Privacy.jsx
export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p><strong>Last updated:</strong> November 5, 2025</p>

          <h2>1. Information We Collect</h2>
          <p>
            <strong>From customers:</strong>
            <ul>
              <li>Mobile number (required to deliver data)</li>
              <li>Transaction details (package, network, payment status)</li>
            </ul>
            <strong>From staff:</strong>
            <ul>
              <li>Email and password (stored as bcrypt hash)</li>
              <li>Browser/IP logs for security</li>
            </ul>
          </p>

          <h2>2. How We Use Your Data</h2>
          <p>
            We use your data only to:
            <ul>
              <li>Process and deliver data packages</li>
              <li>Prevent fraud and unauthorized access</li>
              <li>Respond to support requests</li>
            </ul>
            We **do not sell** your data to third parties.
          </p>

          <h2>3. Data Security</h2>
          <p>
            - Passwords are hashed using bcrypt.<br/>
            - Payment details are handled by secure third-party processors (we never see full card info).<br/>
            - Staff access is restricted and logged.
          </p>

          <h2>4. Data Retention</h2>
          <p>
            Transaction records are kept for 12 months for support and compliance.
            Staff accounts can be deleted on request.
          </p>

          <h2>5. Your Rights</h2>
          <p>
            You may request:
            <ul>
              <li>Access to your data</li>
              <li>Correction of inaccurate data</li>
              <li>Deletion of your transaction history</li>
            </ul>
            Email: <strong>support@chinterprise.com</strong>
          </p>

          <h2>6. Children</h2>
          <p>
            Our service is not intended for users under 18.
          </p>
        </div>
      </div>
    </div>
  );
}