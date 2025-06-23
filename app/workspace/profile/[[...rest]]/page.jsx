"use client";

import { UserProfile } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";
import React from "react";

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9f5ff] to-white px-4 py-16 overflow-x-hidden">
      <div className="max-w-6xl mx-auto bg-white border border-[#e4d5fa] shadow-2xl rounded-3xl p-6 md:p-10 overflow-x-auto">
        {/* Header */}
        <div className="text-center mb-12 px-2">
          <span className="inline-block bg-gradient-to-r from-[#9b2ddb] to-[#c084fc] text-white px-4 py-1 rounded-full text-sm">
            <Sparkles className="inline w-4 h-4 mr-1" /> Manage Profile
          </span>
          <h1 className="text-4xl font-bold text-[#5b21b6] mt-4">
            Personalize Your Learning Experience
          </h1>
          <p className="text-gray-600 mt-2">
            Update your account details, secure your profile, and manage preferences.
          </p>
        </div>

        {/* Container for Clerk Profile */}
        <div className="w-full overflow-x-auto hide-scrollbar">
          <div className="max-w-[700px]">
            <UserProfile 
              routing="hash"
              appearance={{
                elements: {
                  card: "bg-white border-none shadow-none",
                  headerTitle: "text-[#5b21b6] text-2xl font-bold",
                  headerSubtitle: "text-gray-500",
                  profileSectionTitle: "text-[#6b21a8] font-semibold",
                  formFieldLabel: "text-gray-600",
                  formFieldInput: "bg-white border border-gray-300 focus:ring-[#9b2ddb]",
                },
                variables: {
                  colorPrimary: "#9b2ddb",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
