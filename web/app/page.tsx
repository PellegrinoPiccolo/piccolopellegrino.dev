import Hero from "@/components/home/Hero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <div className="w-full bg-page">
      <div className="container">
        <Hero />
      </div>
    </div>
  );
}
