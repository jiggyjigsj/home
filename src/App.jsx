import { useEffect, useState } from "react";
import About from "./components/About";
import AI from "./components/AI";
import Background from "./components/Background";
import CommandPalette from "./components/CommandPalette";
import Contact, { Footer } from "./components/Contact";
import Hero from "./components/Hero";
import Impact from "./components/Impact";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import ResumePage from "./components/ResumePage";
import ResumePrint from "./components/ResumePrint";
import Work from "./components/Work";
import { useReveal } from "./effects";
import { usePath } from "./router";

function Home() {
  useReveal([]);
  useEffect(() => {
    // Arriving from /resume with a hash (e.g. /#work): jump there once the page exists.
    if (window.location.hash) document.querySelector(window.location.hash)?.scrollIntoView();
  }, []);
  return (
    <main id="main">
      <Hero />
      <Impact />
      <About />
      <Work />
      <AI />
      <Projects />
      <Contact />
    </main>
  );
}

export default function App() {
  const path = usePath();
  const [paletteOpen, setPaletteOpen] = useState(false);

  if (path === "/resume/print") return <ResumePrint />;

  return (
    <>
      <Background />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      {path === "/resume" ? <ResumePage key="resume" /> : <Home key="home" />}
      <Footer onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
    </>
  );
}
