"use client";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Brain, Youtube, CheckCircle } from "lucide-react";
import FeatureCard from "@/components/FeaturesCard";
import Footer from "@/components/Footer";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const images = ["./preview1.png", "./preview2.png", "./preview3.png"];
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const user=useUser()

  useEffect(() => {
    if (isHovered) {
      controls.stop();
    } else {
      controls.start({
        x: ["0%", "-100%"],
        transition: {
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        },
      });
    }
  }, [isHovered, controls]);

  const handleClick = (src) => {
    setSelectedImage(src);
    setOpen(true);
  };
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

  return (
    <>
      <Header />

      {/*  Hero Section */}
      <section className="bg-white py-24 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1e1e1e] mb-4">
          Learn Smarter with <span className="text-[#9b2ddb]">Edvora</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-8">
          AI-powered learning, personalized courses, and real progress tracking
          — all in one platform.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href={`${user  ? "/workspace/explore": "/sign-in"}`}>
            <Button className="bg-[#9b2ddb] cursor-pointer text-white px-6 py-2 rounded-xl">
              Explore Courses
            </Button>
          </Link>
          <Link href={`${user  ? "/workspace": "/sign-in"}`}>
            <Button
              variant="outline"
              className="text-[#9b2ddb] cursor-pointer border-[#9b2ddb] px-6 py-2 rounded-xl"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </section>
      {/* Features Card section */}
     <section id="features" className="bg-white py-20 px-4">
  <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1e1e1e]">
    What Makes <span className="text-[#9b2ddb]">Edvora</span> Special?
  </h2>
  <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
    {[ 
      {
        icon: Brain,
        title: "AI Course Creation",
        description: "Instantly create complete courses using powerful AI — fast and tailored your needs."
      },
      {
        icon: Youtube,
        title: "YouTube Integration",
        description: "Get relevant YouTube videos linked to each lesson so you learn from the best creators."
      },
      {
        icon: CheckCircle,
        title: "Track Course Completion",
        description: "Easily track your learning journey and see your progress through the dashboard."
      }
    ].map((feature, index) => (
      <motion.div
        key={index}
        custom={index}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <FeatureCard
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      </motion.div>
    ))}
  </div>
</section>

      {/* Reviews Section */}
      <section id="users" className="bg-[#f9f5ff] py-20 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1e1e1e]">
          Loved by Learners Like You 💜
        </h2>
        <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Priya Mehta",
              quote:
                "Edvora’s AI-generated courses helped me start learning data science in a super easy way. Love how simple it is!",
            },
            {
              name: "Rahul Verma",
              quote:
                "I never imagined I could get a full course from a YouTube video and finish it in days — Edvora nailed it!",
            },
            {
              name: "Sneha Kapoor",
              quote:
                "The progress tracking and smooth interface made my learning journey so motivating. Highly recommend!",
            },
          ].map((review, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              <p className="text-gray-700 italic mb-4">“{review.quote}”</p>
              <p className="font-semibold text-[#9b2ddb] text-right">
                — {review.name}
              </p>
            </div>
          ))}
        </div>
      </section>
      {/* Project Screenshots Section */}
      <section className="bg-white py-20 px-4 overflow-hidden">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1e1e1e]">
          Explore How Edvora Works 🚀
        </h2>

        <div
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div className="flex gap-6" animate={controls}>
            {[...images, ...images].map((src, index) => (
              <div
                key={index}
                onClick={() => handleClick(src)}
                className="w-[300px] aspect-video rounded-xl overflow-hidden border shadow-sm hover:shadow-xl transition-shadow duration-300 ease-in-out shrink-0 group cursor-pointer"
              >
                <img
                  src={src}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Full Image Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white">
            <DialogTitle className="sr-only">Image Preview</DialogTitle>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Full Preview"
                className="w-full h-auto object-contain"
              />
            )}
          </DialogContent>
        </Dialog>
      </section>
      {/* FAQ */}
      <section className="bg-[#f9f5ff] py-20 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1e1e1e]">
          Frequently Asked Questions ❓
        </h2>
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-[#9b2ddb]">
              How does AI generate the courses?
            </h3>
            <p className="text-gray-700 mt-2">
              We use advanced AI models that analyze topics and content to
              create structured course outlines and generate lessons.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#9b2ddb]">
              Can I customize the courses?
            </h3>
            <p className="text-gray-700 mt-2">
              Yes! Once generated, you can edit, reorder, and enhance each
              module before publishing.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#9b2ddb]">
              Is Edvora free to use?
            </h3>
            <p className="text-gray-700 mt-2">
              We offer a free plan with limited features. You can upgrade
              anytime to unlock premium tools.
            </p>
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="bg-gradient-to-r from-[#ede9fe] to-[#f3e8ff] py-16 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#4b0082]">
          Ready to revolutionize your learning?
        </h2>
        <p className="text-lg text-[#5a189a] mb-6">
          Join Edvora and start building AI-powered courses today.
        </p>
        <Link href={`${user  ? "/workspace/explore": "/sign-in"}`}>
          <Button className="bg-[#9b2ddb] hover:bg-[#8123ba] cursor-pointer text-white rounded-xl text-lg px-8 py-3 transition">
            Get Started for Free
          </Button>
        </Link>
      </section>

      <Footer />
    </>
  );
}
