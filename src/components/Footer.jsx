import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#features"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#updates"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Updates
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#about"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#blog"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#careers"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#docs"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="#support"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Support
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#privacy"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="#terms"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="#security"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} TaskFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
