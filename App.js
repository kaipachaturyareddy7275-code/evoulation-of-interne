import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe, Cpu, Wifi, Smartphone, Rocket } from "lucide-react";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

const INTERNET_ERAS = [
  {
    id: "hero",
    title: "The Spark",
    year: "1969",
    icon: <Cpu size={48} />,
    desc: 'ARPANET sends the first message: "LO". The foundation is laid.',
    color: "#00ff41",
  },
  {
    id: "intro",
    title: "The Web Born",
    year: "1990",
    icon: <Globe size={48} />,
    desc: "Tim Berners-Lee creates HTML. The world wide web goes live.",
    color: "#007bff",
  },
  {
    id: "exploration",
    title: "Social Rise",
    year: "2004",
    icon: <Wifi size={48} />,
    desc: "The era of connectivity begins. People become the content.",
    color: "#f09433",
  },
  {
    id: "insight",
    title: "Mobile First",
    year: "2010",
    icon: <Smartphone size={48} />,
    desc: "The internet leaves the desk and enters every pocket.",
    color: "#e4405f",
  },
  {
    id: "conclusion",
    title: "Future Web",
    year: "2026+",
    icon: <Rocket size={48} />,
    desc: "AI Agents and Decentralized networks define the next frontier.",
    color: "#7b2ff7",
  },
];

export default function App() {
  const component = useRef();
  const slider = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let panels = gsap.utils.toArray(".panel");
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: slider.current,
          pin: true,
          scrub: 1, // Smoothly links scroll to animation
          snap: 1 / (panels.length - 1), // Snaps to each section
          end: () => "+=" + slider.current.offsetWidth,
        },
      });
    }, component);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={component}>
      <div ref={slider} className="container">
        {INTERNET_ERAS.map((era) => (
          <section
            key={era.id}
            className="panel"
            style={{ "--accent": era.color }}
          >
            <div className="content-card">
              <span className="era-year">{era.year}</span>
              <div className="icon-wrapper">{era.icon}</div>
              <h1>{era.title}</h1>
              <p>{era.desc}</p>
              <div className="interactive-btn">Explore Artifacts</div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
