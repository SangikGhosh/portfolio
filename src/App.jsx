import { SmoothScrollProvider } from "./lib/smooth";
import { BlinkProvider } from "./lib/blink";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Statement from "./components/Statement";
import Work from "./components/work/Work";
import Archive from "./components/Archive";
import Belief from "./components/Belief";
import Capabilities from "./components/Capabilities";
import Numbers from "./components/Numbers";
import About from "./components/About";
import Journey from "./components/Journey";
import Words from "./components/Words";
import Footer from "./components/Footer";

/*
 * White, then the page closes its eyes into a black chapter (what I build, by the numbers),
 * opens them again onto who I am, and ends in black.
 */
export default function App() {
  return (
    <SmoothScrollProvider>
      <BlinkProvider>
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to work
        </a>
        <Preloader />
        <Cursor />
        <Header />
        <main>
          <Hero />
          <Statement />
          <Work />
          <Archive />
          <Belief />
          <div className="on-dark">
            <Capabilities />
            <Numbers />
          </div>
          <About />
          <Journey />
          <Words />
        </main>
        <Footer />
      </BlinkProvider>
    </SmoothScrollProvider>
  );
}
