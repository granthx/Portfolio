import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  projectEditorialCatalog,
  type ProjectEditorialData,
} from "../../data/project-editorial-data";
import { cn } from "../../lib/utils";

interface MangaProjectInfoOverlayProps {
  focused: boolean;
  activeIndex: number;
  onClose: () => void;
  className?: string;
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function MangaProjectInfoOverlay({
  focused,
  activeIndex,
  onClose,
  className,
}: MangaProjectInfoOverlayProps) {
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const centerFrameRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Tab state for compact/mobile viewports (< 1024px)
  const [mobileTab, setMobileTab] = useState<"left" | "right">("left");

  const project: ProjectEditorialData =
    projectEditorialCatalog[activeIndex] || projectEditorialCatalog[0];

  useEffect(() => {
    const left = leftPanelRef.current;
    const right = rightPanelRef.current;
    const frame = centerFrameRef.current;
    const closeBtn = closeBtnRef.current;
    const container = containerRef.current;

    if (!container || !left || !right) return;

    const reduced = prefersReducedMotion();

    if (focused) {
      // Make container visible
      gsap.set(container, { pointerEvents: "auto", display: "block" });

      if (reduced) {
        gsap.set([left, right, frame, closeBtn], {
          opacity: 1,
          y: 0,
          rotation: 0,
          scale: 1,
          boxShadow: "5px 6px 0px #051024",
        });
        return;
      }

      // Initialize initial states for signature Stamp Animation
      gsap.killTweensOf([left, right, frame, closeBtn]);

      // Left panel begins higher with slight tilt
      gsap.set(left, {
        y: -220,
        rotation: -4.8,
        scaleY: 1.08,
        scaleX: 0.94,
        opacity: 0,
        boxShadow: "0px 0px 0px rgba(5,16,36,0)",
        transformOrigin: "center top",
      });

      // Right panel begins higher with opposite tilt
      gsap.set(right, {
        y: -230,
        rotation: 4.5,
        scaleY: 1.08,
        scaleX: 0.94,
        opacity: 0,
        boxShadow: "0px 0px 0px rgba(5,16,36,0)",
        transformOrigin: "center top",
      });

      if (frame) {
        gsap.set(frame, { opacity: 0, scale: 0.96 });
      }
      if (closeBtn) {
        gsap.set(closeBtn, { opacity: 0, y: -25 });
      }

      const tl = gsap.timeline();

      // =========================================================================
      // --- 1. LEFT PANEL STAMP (Lands first with tactile, deliberate paste) ---
      // =========================================================================
      // Phase A: Deliberate downward plunge with gravitational acceleration
      tl.to(
        left,
        {
          y: 0,
          rotation: -0.8,
          opacity: 1,
          duration: 0.52,
          ease: "power2.in",
        },
        0.06
      );
      // Phase B: Heavy Impact Squash & Deep Inked Stamp Slam
      tl.to(
        left,
        {
          scaleY: 0.89,
          scaleX: 1.05,
          boxShadow: "8px 10px 0px #051024",
          duration: 0.16,
          ease: "power2.out",
        },
        0.58
      );
      // Phase C: Brief tactile compression hold / paper absorption
      tl.to(
        left,
        {
          scaleY: 0.95,
          scaleX: 1.02,
          duration: 0.10,
          ease: "sine.inOut",
        },
        0.74
      );
      // Phase D: Controlled Micro-Rebound as press pressure releases
      tl.to(
        left,
        {
          scaleY: 1.018,
          scaleX: 0.99,
          y: -4,
          rotation: -0.2,
          duration: 0.20,
          ease: "sine.out",
        },
        0.84
      );
      // Phase E: Settles flat on archival paper
      tl.to(
        left,
        {
          scaleY: 1.0,
          scaleX: 1.0,
          y: 0,
          rotation: -0.2,
          boxShadow: "5px 6px 0px #051024",
          duration: 0.20,
          ease: "power2.out",
        },
        1.04
      );

      // =========================================================================
      // --- 2. RIGHT PANEL STAMP (Sequentially staggered, lands ~400ms later) ---
      // =========================================================================
      // Begins descending right as the left panel hits its impact!
      // Phase A: Deliberate downward plunge
      tl.to(
        right,
        {
          y: 0,
          rotation: 0.8,
          opacity: 1,
          duration: 0.52,
          ease: "power2.in",
        },
        0.42
      );
      // Phase B: Heavy Impact Squash & Deep Inked Stamp Slam
      tl.to(
        right,
        {
          scaleY: 0.89,
          scaleX: 1.05,
          boxShadow: "8px 10px 0px #051024",
          duration: 0.16,
          ease: "power2.out",
        },
        0.94
      );
      // Phase C: Brief tactile compression hold / paper absorption
      tl.to(
        right,
        {
          scaleY: 0.95,
          scaleX: 1.02,
          duration: 0.10,
          ease: "sine.inOut",
        },
        1.10
      );
      // Phase D: Controlled Micro-Rebound as press pressure releases
      tl.to(
        right,
        {
          scaleY: 1.018,
          scaleX: 0.99,
          y: -4,
          rotation: 0.2,
          duration: 0.20,
          ease: "sine.out",
        },
        1.20
      );
      // Phase E: Settles flat on archival paper
      tl.to(
        right,
        {
          scaleY: 1.0,
          scaleX: 1.0,
          y: 0,
          rotation: 0.2,
          boxShadow: "5px 6px 0px #051024",
          duration: 0.20,
          ease: "power2.out",
        },
        1.40
      );

      // Frame & Close button appear smoothly alongside the stamps
      if (frame) {
        tl.to(
          frame,
          {
            opacity: 1,
            scale: 1,
            duration: 0.55,
            ease: "power2.out",
          },
          0.45
        );
      }
      if (closeBtn) {
        tl.to(
          closeBtn,
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: "back.out(1.7)",
          },
          0.55
        );
      }
    } else {
      // Exit animation: physical panels lift up slightly and fade out
      if (reduced) {
        gsap.set(container, { pointerEvents: "none", display: "none" });
        return;
      }

      gsap.killTweensOf([left, right, frame, closeBtn]);
      const exitTl = gsap.timeline({
        onComplete: () => {
          gsap.set(container, { pointerEvents: "none", display: "none" });
        },
      });

      exitTl.to([left, right], {
        y: -40,
        opacity: 0,
        scale: 0.97,
        duration: 0.26,
        stagger: 0.04,
        ease: "power2.in",
      });

      if (frame) {
        exitTl.to(frame, { opacity: 0, duration: 0.2, ease: "power2.in" }, 0);
      }
      if (closeBtn) {
        exitTl.to(closeBtn, { opacity: 0, y: -15, duration: 0.18 }, 0);
      }
    }
  }, [focused, activeIndex]);

  // Support ESC keyboard shortcut
  useEffect(() => {
    if (!focused) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [focused, onClose]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute inset-0 z-30 select-none overflow-hidden",
        className
      )}
      style={{ display: focused ? "block" : "none" }}
    >
      {/* SVG Texture Filters & Patterns (Halftone Screentone & Paper Grain) */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          {/* Manga Halftone Screentone Pattern */}
          <pattern
            id="manga-screentone"
            width="6"
            height="6"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="3" cy="3" r="0.9" fill="#0A0A0A" opacity="0.07" />
          </pattern>
          {/* Diagonal Comic Hatch Pattern */}
          <pattern
            id="manga-hatch"
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 8L8 0M-2 2L2 -2M6 10L10 6"
              stroke="#051024"
              strokeWidth="0.8"
              opacity="0.05"
            />
          </pattern>
        </defs>
      </svg>

      {/* TOP CLOSE BUTTON — BRUTALIST MANGA STAMP */}
      <button
        ref={closeBtnRef}
        type="button"
        onClick={onClose}
        aria-label="Close project editorial view"
        className="pointer-events-auto absolute right-4 sm:right-8 top-4 sm:top-6 z-50 flex items-center gap-2 bg-[#FAF6EF] text-[#0A0A0A] border-2 border-[#0A0A0A] px-3.5 py-1.5 font-['DM_Mono'] text-xs font-bold uppercase tracking-wider transition-all duration-150 hover:bg-[#0A0A0A] hover:text-[#FAF6EF] active:translate-x-[2px] active:translate-y-[2px]"
        style={{
          boxShadow: "3px 3px 0px #051024",
        }}
      >
        <span className="text-[#012CEB] font-mono">[</span>
        <span>ESC // CLOSE</span>
        <span className="text-[#D92626] font-bold">✕</span>
        <span className="text-[#012CEB] font-mono">]</span>
      </button>

      {/* MOBILE / TABLET TAB TOGGLE (Visible only on < 1024px) */}
      <div className="pointer-events-auto absolute top-4 left-4 z-50 flex lg:hidden items-center border-2 border-[#0A0A0A] bg-[#FAF6EF] p-0.5 shadow-[2px_2px_0px_#051024]">
        <button
          type="button"
          onClick={() => setMobileTab("left")}
          className={cn(
            "px-2.5 py-1 font-['DM_Mono'] text-[10px] font-bold uppercase tracking-wider transition-colors",
            mobileTab === "left"
              ? "bg-[#0A0A0A] text-[#FAF6EF]"
              : "text-[#0A0A0A] hover:bg-[#0A0A0A]/10"
          )}
        >
          01 // OVERVIEW
        </button>
        <button
          type="button"
          onClick={() => setMobileTab("right")}
          className={cn(
            "px-2.5 py-1 font-['DM_Mono'] text-[10px] font-bold uppercase tracking-wider transition-colors",
            mobileTab === "right"
              ? "bg-[#0A0A0A] text-[#FAF6EF]"
              : "text-[#0A0A0A] hover:bg-[#0A0A0A]/10"
          )}
        >
          02 // SPECS & LINKS
        </button>
      </div>

      {/* CENTER ARTWORK FRAMING — MANGA REGISTRATION ACCENTS */}
      <div
        ref={centerFrameRef}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        {/* Subtle bounding guide box matching center artwork aspect */}
        <div className="relative w-[90%] sm:w-[80%] md:w-[68%] lg:w-[52%] xl:w-[48%] h-[61.4%] max-w-[860px]">
          {/* Top-Left Registration Mark */}
          <div className="absolute -top-3 -left-3 font-mono text-sm leading-none font-bold text-[#051024]/40 select-none">
            ⌜
          </div>
          {/* Top-Right Registration Mark */}
          <div className="absolute -top-3 -right-3 font-mono text-sm leading-none font-bold text-[#051024]/40 select-none">
            ⌝
          </div>
          {/* Bottom-Left Registration Mark */}
          <div className="absolute -bottom-3 -left-3 font-mono text-sm leading-none font-bold text-[#051024]/40 select-none">
            ⌞
          </div>
          {/* Bottom-Right Registration Mark */}
          <div className="absolute -bottom-3 -right-3 font-mono text-sm leading-none font-bold text-[#051024]/40 select-none">
            ⌟
          </div>

          {/* Top Manuscript Plate Tag */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-2.5 py-0.5 bg-[#FAF6EF]/90 border border-[#0A0A0A]/30 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 bg-[#012CEB] rounded-full" />
            <span className="font-['DM_Mono'] text-[9.5px] uppercase tracking-[0.2em] font-bold text-[#051024]">
              {project.plateNumber}
            </span>
            <span className="w-1.5 h-1.5 bg-[#012CEB] rounded-full" />
          </div>

          {/* Bottom Focal Guide Line */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 font-['DM_Mono'] text-[9px] uppercase tracking-widest text-[#051024]/60">
            <span className="w-8 h-[1px] bg-[#0A0A0A]/20" />
            <span>CENTRAL VISUAL ANCHOR</span>
            <span className="w-8 h-[1px] bg-[#0A0A0A]/20" />
          </div>
        </div>
      </div>

      {/* =========================================================================
          LEFT INFORMATION PANEL — EDITORIAL MANUSCRIPT (PROBLEM, STORY & FEATURES)
         ========================================================================= */}
      <div
        className={cn(
          "pointer-events-none absolute z-40 flex items-center",
          "left-3 sm:left-5 lg:left-6 xl:left-8 2xl:left-12",
          "top-0 bottom-0",
          "w-[calc(100%-24px)] sm:w-[380px] lg:w-[315px] xl:w-[355px] 2xl:w-[385px]",
          mobileTab === "left" ? "flex" : "hidden lg:flex"
        )}
      >
        <div
          ref={leftPanelRef}
          className={cn(
            "pointer-events-auto w-full flex flex-col justify-between overflow-hidden",
            "bg-[#FAF6EF] text-[#0A0A0A] border-2 border-[#0A0A0A]",
            "h-[61.4%] min-h-[420px] max-h-[580px]"
          )}
        >
          {/* Paper Grain & Screentone Texture Layers */}
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-40"
            style={{ backgroundImage: "url(#manga-screentone)" }}
          />
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-20"
            style={{ backgroundImage: "url(#manga-hatch)" }}
          />

          {/* Scrollable Container with Custom Styled Inked Scrollbar */}
          <div className="relative z-10 flex flex-col p-3 sm:p-3.5 xl:p-4 overflow-y-auto flex-1 min-h-0 custom-manga-scrollbar">
            {/* Editorial Header Bar */}
            <div className="flex items-center justify-between pb-1.5 mb-2 border-b-2 border-[#0A0A0A]/20">
              <div className="flex items-center gap-2">
                <span className="font-['DM_Mono'] text-[9px] sm:text-[9.5px] font-bold uppercase tracking-[0.22em] text-[#012CEB]">
                  {project.chapter}
                </span>
              </div>

              {/* Red / Navy Inked Japanese Kanji Stamp */}
              <div
                className="inline-flex items-center justify-center px-1.5 py-0.5 border border-[#D92626] text-[#D92626] font-bold text-[9.5px] tracking-wider select-none"
                style={{
                  transform: "rotate(-3deg)",
                  boxShadow: "1px 1px 0px rgba(217,38,38,0.3)",
                }}
                title="Official Archival Seal"
              >
                <span className="font-serif mr-0.5">{project.kanjiSeal}</span>
                <span className="font-['DM_Mono'] text-[7.5px] font-black opacity-80">
                  {project.kanjiSealSub}
                </span>
              </div>
            </div>

            {/* Title Block with Bold Manga Typography */}
            <div className="mb-2">
              <h2 className="font-['Bebas_Neue'] text-3xl sm:text-4xl 2xl:text-[44px] tracking-wide leading-[0.95] text-[#0A0A0A] m-0">
                {project.title}
              </h2>
              <p className="font-['DM_Mono'] text-[10px] sm:text-[10.5px] font-bold tracking-tight text-[#051024]/80 uppercase mt-0.5 leading-snug">
                {project.subtitle}
              </p>
            </div>

            {/* Short Narrative Overview */}
            <div className="mb-2">
              <p className="font-['DM_Sans'] text-[11.5px] sm:text-[12px] leading-relaxed text-[#2D2D2D] font-normal">
                {project.shortDesc}
              </p>
            </div>

            {/* Section: The Problem It Solves */}
            <div className="mb-2.5">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-1.5 h-1.5 bg-[#012CEB] rotate-45" />
                <span className="font-['DM_Mono'] text-[9px] font-bold uppercase tracking-[0.18em] text-[#012CEB]">
                  // THE PROBLEM IT SOLVES
                </span>
              </div>
              <div className="relative pl-2.5 py-1 border-l-2 border-[#0A0A0A] bg-[#F4EFE6]/60">
                <p className="font-['DM_Sans'] text-[11px] sm:text-[11.5px] leading-snug text-[#333333] italic">
                  "{project.problem}"
                </p>
              </div>
            </div>

            {/* Section: Key Features / Capabilities */}
            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="w-1.5 h-1.5 bg-[#051024] rotate-45" />
                <span className="font-['DM_Mono'] text-[9px] font-bold uppercase tracking-[0.18em] text-[#051024]">
                  // KEY CAPABILITIES
                </span>
              </div>
              <div className="space-y-1.5">
                {project.keyFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 bg-[#F4EFE6]/70 border border-[#0A0A0A]/15 p-2 transition-transform duration-150 hover:border-[#0A0A0A]/50"
                  >
                    <span className="font-['DM_Mono'] text-[9px] font-bold text-[#012CEB] shrink-0 mt-0.5">
                      [{String(idx + 1).padStart(2, "0")}]
                    </span>
                    <div>
                      <span className="font-['DM_Mono'] text-[10px] font-bold tracking-wider uppercase text-[#0A0A0A] block">
                        {feat.label}
                      </span>
                      <span className="font-['DM_Sans'] text-[11px] leading-tight text-[#444] block mt-0.5">
                        {feat.detail}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Panel Footer Margin Strip */}
          <div className="relative z-10 px-4 py-1.5 bg-[#F4EFE6] border-t border-[#0A0A0A]/20 flex items-center justify-between font-['DM_Mono'] text-[8.5px] text-[#555] uppercase tracking-widest shrink-0">
            <span>MANUSCRIPT REF: 0{activeIndex + 1}</span>
            <span>EDITORIAL ARCHIVE</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          RIGHT INFORMATION PANEL — TECHNICAL BLUEPRINT & ACTION SPEC
         ========================================================================= */}
      <div
        className={cn(
          "pointer-events-none absolute z-40 flex items-center",
          "right-3 sm:right-5 lg:right-6 xl:right-8 2xl:left-auto 2xl:right-12",
          "top-0 bottom-0",
          "w-[calc(100%-24px)] sm:w-[380px] lg:w-[315px] xl:w-[355px] 2xl:w-[385px]",
          mobileTab === "right" ? "flex" : "hidden lg:flex"
        )}
      >
        <div
          ref={rightPanelRef}
          className={cn(
            "pointer-events-auto w-full flex flex-col justify-between overflow-hidden",
            "bg-[#FAF6EF] text-[#0A0A0A] border-2 border-[#0A0A0A]",
            "h-[61.4%] min-h-[420px] max-h-[580px]"
          )}
        >
          {/* Screentone & Blueprint Grid Background */}
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-40"
            style={{ backgroundImage: "url(#manga-screentone)" }}
          />

          {/* Scrollable Container with Custom Styled Inked Scrollbar */}
          <div className="relative z-10 flex flex-col p-3 sm:p-3.5 xl:p-4 overflow-y-auto flex-1 min-h-0 custom-manga-scrollbar">
            {/* Header Bar */}
            <div className="flex items-center justify-between pb-1.5 mb-2 border-b-2 border-[#0A0A0A]/20">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#012CEB] animate-pulse" />
                <span className="font-['DM_Mono'] text-[9px] sm:text-[9.5px] font-bold uppercase tracking-[0.2em] text-[#051024]">
                  SPECIFICATION SHEET
                </span>
              </div>

              {/* Kanji Blueprint Seal */}
              <div
                className="inline-flex items-center justify-center px-1.5 py-0.5 border border-[#051024] text-[#051024] font-bold text-[9.5px] tracking-wider select-none bg-[#F4EFE6]"
                style={{
                  transform: "rotate(2.5deg)",
                  boxShadow: "1px 1px 0px rgba(5,16,36,0.25)",
                }}
                title="Technical Blueprint Seal"
              >
                <span className="font-serif mr-0.5">仕様書</span>
                <span className="font-['DM_Mono'] text-[7.5px] font-black opacity-80">
                  PROD
                </span>
              </div>
            </div>

            {/* Section: Technology Stack Chips */}
            <div className="mb-2">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-1.5 h-1.5 bg-[#012CEB] rotate-45" />
                <span className="font-['DM_Mono'] text-[9px] font-bold uppercase tracking-[0.18em] text-[#012CEB]">
                  // CORE TECH STACK
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {project.stack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-[#F4EFE6] border border-[#0A0A0A] px-2 py-0.5 font-['DM_Mono'] text-[9px] font-bold text-[#0A0A0A] transition-colors duration-150 hover:bg-[#051024] hover:text-[#FAF6EF]"
                    style={{
                      boxShadow: "1px 1px 0px #051024",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Section: System Architecture Pipeline */}
            <div className="mb-2">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-1.5 h-1.5 bg-[#051024] rotate-45" />
                <span className="font-['DM_Mono'] text-[9px] font-bold uppercase tracking-[0.18em] text-[#051024]">
                  // ARCHITECTURAL PIPELINE
                </span>
              </div>
              <div className="space-y-1 border-l-2 border-[#0A0A0A]/30 ml-1.5 pl-2.5">
                {project.architecture.map((arch, idx) => (
                  <div key={idx} className="relative">
                    {/* Connecting Node Point */}
                    <span className="absolute -left-[15px] top-1.5 w-1.5 h-1.5 rounded-full bg-[#FAF6EF] border border-[#0A0A0A]" />
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-['DM_Mono'] text-[8.5px] font-bold text-[#012CEB]">
                        {arch.step}
                      </span>
                      <span className="font-['DM_Mono'] text-[9px] font-bold uppercase tracking-wider text-[#0A0A0A]">
                        {arch.title}
                      </span>
                    </div>
                    <p className="font-['DM_Sans'] text-[10px] sm:text-[10.5px] leading-tight text-[#444] m-0">
                      {arch.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section: Key Implementation Details */}
            <div className="mb-2 bg-[#F4EFE6]/70 border border-[#0A0A0A]/15 p-1.5 sm:p-2">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="font-['DM_Mono'] text-[8.5px] font-bold uppercase tracking-widest text-[#051024]">
                  // IMPLEMENTATION HIGHLIGHT
                </span>
              </div>
              <p className="font-['DM_Sans'] text-[10.5px] sm:text-[11px] leading-snug text-[#2E2E2E] m-0">
                {project.implementation}
              </p>
            </div>

            {/* Section: Results & Empirical Impact Metrics */}
            <div className="mb-2">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-1.5 h-1.5 bg-[#012CEB] rotate-45" />
                <span className="font-['DM_Mono'] text-[9px] font-bold uppercase tracking-[0.18em] text-[#012CEB]">
                  // EMPIRICAL RESULTS
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                {project.results.map((res, idx) => (
                  <div
                    key={idx}
                    className="bg-[#F4EFE6] border border-[#0A0A0A] p-1 text-center"
                    style={{ boxShadow: "1.5px 1.5px 0px #051024" }}
                  >
                    <div className="font-['Bebas_Neue'] text-lg sm:text-xl text-[#012CEB] leading-none tracking-wide">
                      {res.metric}
                    </div>
                    <div className="font-['DM_Mono'] text-[7.5px] uppercase tracking-tighter text-[#555] mt-0.5 leading-tight">
                      {res.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section: Action Links — GitHub & Live Demo (Pinned at bottom) */}
          <div className="relative z-10 p-2 sm:p-2.5 bg-[#F4EFE6] border-t-2 border-[#0A0A0A] flex flex-col sm:flex-row gap-1.5 shrink-0">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#0A0A0A] text-[#FAF6EF] border-2 border-[#0A0A0A] py-1.5 px-2 font-['DM_Mono'] text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider transition-all duration-150 hover:bg-[#1c2438] hover:border-[#051024] active:translate-x-[2px] active:translate-y-[2px]"
              style={{ boxShadow: "2px 2px 0px #051024" }}
            >
              <span>GITHUB REPO</span>
              <span className="text-[#FAF6EF] font-mono text-xs">↗</span>
            </a>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#FAF6EF] text-[#051024] border-2 border-[#051024] py-1.5 px-2.5 font-['DM_Mono'] text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider transition-all duration-150 hover:bg-[#051024] hover:text-[#FAF6EF] active:translate-x-[2px] active:translate-y-[2px]"
                style={{ boxShadow: "2px 2px 0px #051024" }}
              >
                <span>LIVE DEMO</span>
                <span className="text-[#012CEB] font-mono text-xs">↗</span>
              </a>
            )}
          </div>

          {/* Panel Footer Margin Strip */}
          <div className="relative z-10 px-4 py-1.5 bg-[#F4EFE6] border-t border-[#0A0A0A]/20 flex items-center justify-between font-['DM_Mono'] text-[8.5px] text-[#555] uppercase tracking-widest shrink-0">
            <span>DEPLOYED SPECIFICATION</span>
            <span>STATUS: STABLE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
