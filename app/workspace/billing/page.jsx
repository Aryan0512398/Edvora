"use client";

import { PricingTable } from "@clerk/nextjs";
import React from "react";
import { Sparkles } from "lucide-react";

const Billing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9f5ff] to-white px-4 py-16 flex items-center justify-center">
  <div className="max-w-5xl w-full bg-white border border-[#e4d5fa] shadow-2xl rounded-3xl p-10">
    <div className="text-center mb-12">
      <span className="inline-block bg-gradient-to-r from-[#9b2ddb] to-[#c084fc] text-white px-4 py-1 rounded-full text-sm">
        🌟 Premium Membership
      </span>
      <h1 className="text-4xl font-bold text-[#5b21b6] mt-4">
        Level Up Your Learning
      </h1>
      <p className="text-gray-600 mt-2">
        Get unlimited access to all courses, new features & personalized tools.
      </p>
    </div>

    <div className="bg-gradient-to-tr from-[#f3e8ff] via-white to-[#f5f3ff] p-6 rounded-2xl border border-[#e9ddfa]">
      <PricingTable />
    </div>
  </div>
</div>



  );
};

export default Billing;
