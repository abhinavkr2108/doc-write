import Features from "@/components/Features";
import LandingPage from "@/components/LandingPage";
import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <React.Fragment>
      <LandingPage />
      <Features />
    </React.Fragment>
  );
}
