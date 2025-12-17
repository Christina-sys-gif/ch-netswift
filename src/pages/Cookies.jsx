// src/pages/Cookies.jsx
export default function Cookies() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p><strong>Last updated:</strong> November 5, 2025</p>

          <h2>1. Do We Use Cookies?</h2>
          <p>
            Yes, but only essential cookies for basic functionality.
          </p>

          <h2>2. What Cookies Do We Use?</h2>
          <table className="w-full mt-4">
            <thead>
              <tr>
                <th className="text-left">Cookie</th>
                <th className="text-left">Purpose</th>
                <th className="text-left">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>i18next</code></td>
                <td>Remembers your language preference (EN/FR/ES)</td>
                <td>1 year</td>
              </tr>
              <tr>
                <td><code>darkMode</code></td>
                <td>Remembers your dark/light mode choice</td>
                <td>1 year</td>
              </tr>
            </tbody>
          </table>

          <h2>3. Third-Party Cookies</h2>
          <p>
            We **do not use** advertising, analytics, or tracking cookies.  
            Payment providers (e.g., Paystack) may set their own cookies — see their policies.
          </p>

          <h2>4. Managing Cookies</h2>
          <p>
            You can delete cookies via your browser settings.  
            Disabling essential cookies may break the site.
          </p>
        </div>
      </div>
    </div>
  );
}