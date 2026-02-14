import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to streamline your workflow?
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Join thousands of teams already using TaskFlow to organize their work
          and boost productivity.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-medium shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
          >
            Get started for free
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-white transition font-medium"
          >
            Contact sales
          </Link>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          No credit card required. Free 14-day trial.
        </p>
      </div>
    </section>
  );
}
