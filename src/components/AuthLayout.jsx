import Image from "next/image";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gray-50">
      {/* LEFT SIDE — FORM */}
      <div className="flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">{children}</div>
      </div>

      {/* RIGHT SIDE — IMAGE + FEEDBACK */}
      <div className="relative hidden lg:block">
        <Image
          src="/preview.jpg"
          alt="Dashboard Preview"
          fill
          className="object-cover"
          priority
        />

        {/* Feedback Card */}
        <div className="absolute bottom-12 left-12 right-12">
          <div className="bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg max-w-md">
            <p className="text-sm text-gray-700 leading-relaxed">
              “This platform completely streamlined our workflow. The clarity
              and structure helped our team move faster with better visibility.”
            </p>
            <div className="mt-4">
              <p className="text-sm font-semibold text-gray-900">Alex Morgan</p>
              <p className="text-xs text-gray-500">Product Manager</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
