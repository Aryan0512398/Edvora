import ContactDialog from "@/components/ContactDialog";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer  className="bg-white border-t py-3 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Left: Contact Button */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Let’s connect</h3>
          <p className="text-gray-600 mb-4">
            Got questions or suggestions? We'd love to hear from you.
          </p>
          <ContactDialog />
        </div>

        {/* Right: Social + Copyright */}
        <div className="text-center md:text-right flex flex-col gap-4">
          <div className="flex justify-center md:justify-end gap-4">
            <Link
              href="https://github.com/Aryan0512398"
              target="_blank"
              className="text-gray-600 hover:text-[#9b2ddb] transition"
            >
              <Github className="w-6 h-6" />
            </Link>
            <Link href={"https://www.linkedin.com/in/aryan-gupta-b1407a2b5/"}
              target="_blank"
              className="text-gray-600 hover:text-[#9b2ddb] transition"
            >
              <Linkedin className="w-6 h-6" />
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            © 2025 <span className="font-medium text-[#9b2ddb]">Edvora</span>. Built with ❤️ by Aryan Gupta.
          </p>
        </div>
      </div>
    </footer>
  );
}
