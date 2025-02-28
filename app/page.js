"use client";
import About from "./components/About";
import Features from "./components/Features";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Hero from "./components/Hero";


import NavBar from "./components/NavBar";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

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


  const Aboutref = useRef()
  const Heroref = useRef()
  const FAQref = useRef()
  const Featuresref = useRef()

  const scrollfunc = (ref) =>{
    ref.current?.scrollIntoView({behavior: "smooth"})
  }

  return (
    <div>
      <NavBar scrollfunc={scrollfunc} refs={{Aboutref,Heroref,FAQref,Featuresref}} />
      <Hero ref={Heroref} func={handleGetStarted}/>
      <About ref={Aboutref}/>
      <Features ref={Featuresref}/>
      <FAQ ref={FAQref}/>
      <Footer/>
    </div>
  );
}
