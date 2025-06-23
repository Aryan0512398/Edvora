'use client';

import { motion } from 'framer-motion';

export default function FeatureCard({ icon: Icon, title, description }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg"
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#f3e8ff] text-[#9b2ddb] mb-4">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}
