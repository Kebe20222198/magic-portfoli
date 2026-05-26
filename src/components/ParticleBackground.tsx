"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "next-themes";

export default function ParticleBackground() {
  const [init, setInit] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const isDark = resolvedTheme === "dark";

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: { enable: false },
          onHover: { enable: false },
        },
      },
      particles: {
        color: {
          value: isDark ? "#ffffff" : "#4a5568",
        },
        links: {
          enable: false, // Removed links to make it look like stars/snow
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "out",
          },
          random: true,
          speed: 0.3,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            width: 1000,
            height: 1000
          },
          value: 60, // Sparse particles
        },
        opacity: {
          value: isDark ? { min: 0.2, max: 0.8 } : { min: 0.1, max: 0.4 },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 2.5 },
        },
      },
      detectRetina: true,
    }),
    [isDark],
  );

  if (init && isDark) {
    return (
      <Particles
        id="tsparticles"
        options={options}
        className="fixed inset-0 z-0 pointer-events-none"
      />
    );
  }

  return null;
}
