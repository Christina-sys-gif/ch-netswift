// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-6 mt-auto">
      <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} CH Interprise. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <a href="/terms" className="hover:underline">Terms of Service</a>
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
          <a href="/cookies" className="hover:underline">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}