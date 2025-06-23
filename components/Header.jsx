"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { SignedOut, UserButton, useUser } from "@clerk/nextjs";

export default function Header() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const name = e.target[0].value;
    const email = e.target[1].value;
    const message = e.target[2].value;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error("Failed");
      toast.success("✅ Message sent!");
      setDialogOpen(false);
    } catch {
      toast.error("❌ Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="w-full px-6 py-4 bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Edvora Logo"
            width={130}
            height={140}
            className="rounded-full"
          />
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex gap-6 text-xl font-medium text-gray-700">
          <Link href="/" className="hover:text-[#9b2ddb]">
            Home
          </Link>
          <Link href="#features" className="hover:text-[#9b2ddb] scroll-smooth">
            Features
          </Link>
          <Link href="#users" className="hover:text-[#9b2ddb] scroll-smooth">
            Users
          </Link>
          <Button
            onClick={() => setDialogOpen(true)}
            className="hover:text-white cursor-pointer"
          >
            Contact Us
          </Button>
        </nav>

        {/* Get Started Button */}
        <div className="flex gap-2 justify-between">
          {user ? (
            <Link href="/workspace">
              <Button className="bg-[#9b2ddb] cursor-pointer hover:bg-[#8123ba] text-white rounded-xl px-6 py-2">
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/sign-in">
              <Button className="bg-[#9b2ddb] cursor-pointer hover:bg-[#8123ba] text-white rounded-xl px-6 py-2">
                Get Started
              </Button>
            </Link>
          )}
         {user && <UserButton afterSignOutUrl="/"></UserButton>}
        </div>
      </div>

      {/* Contact Us Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#1e1e1e]">
              Send us a message
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Your Name" required />
            <Input type="email" placeholder="Your Email" required />
            <Textarea placeholder="Your Message..." rows={4} required />
            <Button
              type="submit"
              className="w-full bg-[#9b2ddb] text-white hover:bg-[#8123ba]"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </header>
  );
}
