"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut, Search, Bell } from "lucide-react";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import api from "@/lib/api";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setProfileLoading(true);
        const res = await api.user.getCurrentUser();

        if (res.status === 200) {
          const user = res.data.data.profile;
          setProfile(user);
        } else {
          setProfileError("Failed to load your profile. Please try again.");
        }
      } catch (err) {
        setProfileError(
          err?.response?.data?.msg ||
            "Failed to load your profile. Please try again."
        );
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);
      const logoutResponse = await api.auth.logout();
      if (logoutResponse.status === 200) {
        router.replace("/login");
      } else {
        setLogoutError("Failed to logout. Please try again.");
      }
    } catch (err) {
      setLogoutError(
        err?.response?.data?.msg || "Failed to logout. Please try again."
      );
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-4 lg:px-8 py-2 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center space-x-6">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <img src="/logo.svg" alt="Logo" className="w-7 h-7" />
          <span className="text-base font-medium text-gray-700 hidden sm:inline-block">
            Twist Digital
          </span>
        </Link>
        <div className="flex items-center space-x-1">
          <Link
            href="/dashboard"
            className={`px-4 py-1.5 rounded-md text-sm cursor-pointer font-medium transition ${
              pathname === "/dashboard"
                ? "bg-gray-100 text-gray-900"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/tasks"
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
              pathname === "/tasks"
                ? "bg-gray-100 text-gray-900"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Tasks
          </Link>
        </div>
      </div>

      {/* Center Search */}
      <div className="hidden lg:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full pl-9 pr-4 py-1.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden sm:flex items-center space-x-1">
            <kbd className="text-xs text-gray-400 border border-gray-200 rounded px-1.5 py-0.5 bg-white">
              ⌘
            </kbd>
            <kbd className="text-xs text-gray-400 border border-gray-200 rounded px-1.5 py-0.5 bg-white">
              K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-1 sm:space-x-2">
        <button className="p-2 rounded-md hover:bg-gray-100 transition text-gray-500 hover:text-gray-700 hidden sm:block">
          <Bell className="w-5 h-5" />
        </button>

        <div className="h-6 w-px bg-gray-200 mx-1 hidden sm:block"></div>

        <div className="flex items-center space-x-2">
          {/* Name + Role */}
          {profileLoading && !profile ? (
            <div className="hidden lg:flex flex-col items-end space-y-1">
              <div className="w-20 h-3 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-12 h-2 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ) : profile ? (
            <div className="hidden lg:block text-right">
              <div className="text-sm font-medium text-gray-700 truncate max-w-[120px]">
                {profile.firstName} {profile.lastName?.charAt(0)}.
              </div>
              <div className="text-xs text-gray-400 truncate max-w-[120px]">
                {profile.role}
              </div>
            </div>
          ) : (
            <div className="hidden lg:block text-right text-red-500 text-xs">
              {profileError || "Profile error"}
            </div>
          )}

          {/* Avatar */}
          {profileLoading && !profile ? (
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
          ) : profile ? (
            <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-medium text-sm cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-blue-500 transition">
                {profile.firstName?.charAt(0) || profile.email[0].toUpperCase()}
                {profile.lastName?.charAt(0)}
              </div>

              {isDropdownOpen && (
                <>
                  <div className="absolute top-full right-0 w-48 h-2" />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {profile.firstName} {profile.lastName}
                      </p>
                      <p className="text-xs text-gray-500">{profile.email}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {profile.role}
                      </p>
                    </div>
                    {/* <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Settings
                    </Link> */}
                    <button
                      onClick={handleLogout}
                      disabled={logoutLoading}
                      className={`w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center space-x-2 cursor-pointer ${
                        logoutLoading ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {logoutLoading && <Spinner size={4} color="red" />}
                      <span>
                        {logoutLoading ? "Logging out..." : "Log out"}
                      </span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-medium text-sm">
              U
            </div>
          )}
        </div>

        <button className="p-2 rounded-md hover:bg-gray-100 transition lg:hidden">
          <Search className="w-5 h-5 text-gray-500" />
        </button>
      </div>
    </nav>
  );
}
