import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Zap, ArrowRight } from "lucide-react";
import { AVATARS } from "@/constants/constants";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
              <Zap className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-600">
                Trusted by 10,000+ teams
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Streamline Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
                Task Management
              </span>
            </h1>

            <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
              The professional platform that helps teams organize, track, and
              manage work efficiently. Simple enough for anyone, powerful enough
              for enterprise.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/register"
                className="group px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-medium shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
              >
                Start for free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </Link>

              <Link
                href="/login"
                className="px-6 py-3 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition font-medium inline-flex items-center justify-center"
              >
                Already have an account?
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                {AVATARS.map((avatar, index) => (
                  <Image
                    key={index}
                    src={avatar.src}
                    alt={avatar.alt}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  />
                ))}
                <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-white text-xs font-medium">
                  +2k
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">4.9/5</span> from
                2,000+ reviews
              </div>
            </div>
          </div>

          {/* Right Preview - Dashboard Mockup */}
          <div className="relative">
            <div className="relative rounded-2xl shadow-2xl bg-white border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
              </div>
              <div className="p-6">
                <Image
                  src="/dashboard.png"
                  alt="Task Management Dashboard"
                  width={600}
                  height={400}
                  className="rounded-lg object-cover w-full h-auto"
                  priority
                />
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Tasks completed</p>
                  <p className="text-2xl font-bold">1,234</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
