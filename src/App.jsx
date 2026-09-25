import { SmoothScrollProvider } from "./lib/smooth";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Work from "./components/work/Work";
import Quote from "./components/Quote";
import ChapterTransition from "./components/ChapterTransition";
import About from "./components/night/About";
import Practice from "./components/night/Practice";
import Journey from "./components/night/Journey";
import Toolbox from "./components/night/Toolbox";
import Contact from "./components/night/Contact";

export default function App() {
  return (
    <SmoothScrollProvider>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to work
      </a>
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Work />
        <Quote />
        <ChapterTransition />
        <div className="night">
          <About />
          <Practice />
          <Journey />
          <Toolbox />
          <Contact />
        </div>
      </main>
    </SmoothScrollProvider>
  );
}
