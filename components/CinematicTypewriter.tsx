"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks/useMediaQuery";

interface CinematicTypewriterProps {
  /** Array of phrases/sentences to type in sequence */
  phrases: string[];
  /** Typing speed in ms per character (default: 65ms) */
  typingSpeed?: number;
  /** Pause in ms after completing a phrase before moving to next (default: 1800ms) */
  pauseDuration?: number;
  /** Whether to loop back to the first phrase after completion (default: false) */
  loop?: boolean;
  /** Custom CSS classes for visual container */
  className?: string;
  /** Whether to show blinking cursor while typing (default: true) */
  showCursor?: boolean;
  /** Triggered once the entire sequence has completed */
  onComplete?: () => void;
}

/**
 * CinematicTypewriter
 *
 * Implements an institutional, calm real-time typing animation:
 * - Human-like cadenced typing (slight pauses at punctuation marks).
 * - Blinking cursor that disappears smoothly upon completion.
 * - Reduced motion support (instantly displays final text).
 * - Strict SEO & Accessibility: Entire text remains available in rendered HTML
 *   via an sr-only span while the visual animation runs aria-hidden.
 */
export function CinematicTypewriter({
  phrases,
  typingSpeed = 65,
  pauseDuration = 1800,
  loop = false,
  className = "",
  showCursor = true,
  onComplete,
}: CinematicTypewriterProps) {
  const reducedMotion = usePrefersReducedMotion();
  const fullText = phrases.join(" ");

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (reducedMotion) {
      setDisplayedText(phrases[phrases.length - 1] || "");
      setIsCompleted(true);
      setIsTyping(false);
      return;
    }

    if (phrases.length === 0) return;

    let charIndex = 0;
    let phraseIdx = 0;
    let currentTarget = phrases[0];

    const typeNextChar = () => {
      if (phraseIdx >= phrases.length) {
        setIsCompleted(true);
        setIsTyping(false);
        if (onComplete) onComplete();
        if (loop) {
          timerRef.current = setTimeout(() => {
            phraseIdx = 0;
            charIndex = 0;
            currentTarget = phrases[0];
            setCurrentPhraseIndex(0);
            setDisplayedText("");
            setIsTyping(true);
            setIsCompleted(false);
            typeNextChar();
          }, pauseDuration);
        }
        return;
      }

      currentTarget = phrases[phraseIdx];

      if (charIndex <= currentTarget.length) {
        setDisplayedText(currentTarget.slice(0, charIndex));
        charIndex++;

        // Natural typing rhythm: slightly slower at punctuation
        const lastChar = currentTarget[charIndex - 2];
        const isPunctuation =
          lastChar === "।" ||
          lastChar === "." ||
          lastChar === "," ||
          lastChar === "—" ||
          lastChar === "…";
        const delay = isPunctuation ? typingSpeed * 3 : typingSpeed + (Math.random() * 20 - 10);

        timerRef.current = setTimeout(typeNextChar, delay);
      } else {
        // Phrase finished. Pause before next phrase.
        if (phraseIdx < phrases.length - 1) {
          timerRef.current = setTimeout(() => {
            phraseIdx++;
            setCurrentPhraseIndex(phraseIdx);
            charIndex = 0;
            setDisplayedText("");
            typeNextChar();
          }, pauseDuration);
        } else {
          // Final phrase completed
          setIsCompleted(true);
          setIsTyping(false);
          if (onComplete) onComplete();
          if (loop) {
            timerRef.current = setTimeout(() => {
              phraseIdx = 0;
              charIndex = 0;
              currentTarget = phrases[0];
              setCurrentPhraseIndex(0);
              setDisplayedText("");
              setIsTyping(true);
              setIsCompleted(false);
              typeNextChar();
            }, pauseDuration);
          }
        }
      }
    };

    timerRef.current = setTimeout(typeNextChar, 350);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [phrases, typingSpeed, pauseDuration, loop, reducedMotion, onComplete]);

  if (reducedMotion) {
    return (
      <span className={className}>
        {phrases[phrases.length - 1]}
      </span>
    );
  }

  return (
    <span className={`inline-block ${className}`}>
      {/* Search Engines & Screen Readers get complete accessible text */}
      <span className="sr-only">{fullText}</span>

      {/* Visual Animation Layer */}
      <span aria-hidden="true" className="inline-block">
        {displayedText}
        {showCursor && (!isCompleted || isTyping) && (
          <span className="typewriter-cursor text-[#B18A58]" />
        )}
      </span>
    </span>
  );
}

