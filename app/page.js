"use client";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Hero from "./components/Hero";

import NavBar from "./components/NavBar";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {

  const { data: session } = useSession();
  const router = useRouter();

  const handleGetStarted = () => {
    if (session) {
      router.push("/dashboard");
    } else {
      signIn("google");
    }
  };

  return (
    <div>
      <NavBar/>
      <Hero func={handleGetStarted}/>
      <Features/>
      <Footer/>
    </div>
  );
}
