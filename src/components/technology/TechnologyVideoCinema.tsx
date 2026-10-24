import React, { useEffect, useRef, useState } from "react";
import "./TechnologyVideoCinema.css";

export interface TechnologyVideoCinemaProps {
  /** An existing local /videos/*.mp4 file or an approved CDN video URL. */
  videoSrc?: string;
  /** Existing thumbnail/poster image, e.g. /images/technology/india-gate.webp. */
  posterSrc?: string;
  /** Set an accurate duration if known. Omit for an unknown duration. */
  durationLabel?: string;
  /** Section heading */
  heading?: string;
  /** Section subtitle description */
  subtitle?: string;
}

export const TechnologyVideoCinema: React.FC<TechnologyVideoCinemaProps> = ({
  videoSrc = "/videos/kiyoki-anion-technology.mp4",
  posterSrc = "/images/technology/india-gate.webp",
  durationLabel = "03:15",
  heading = "Advanced Variable Anion Technology Explained",
  subtitle = "Watch how Kiyoki's advanced anion technology works to neutralize harmful particles, freshen your air and create a healthier living environment.",
}) => {
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const closeCinema = () => {
    videoRef.current?.pause();
    setExpanded(false);
    // Restores keyboard access to the control that launched the video.
    requestAnimationFrame(() => playButtonRef.current?.focus());
  };

  const openCinema = async () => {
    const video = videoRef.current;
    if (!video) return;

    setError(null);
    setExpanded(true);

    try {
      // Called directly from a user click so browsers permit playback with sound.
      await video.play();
    } catch (err) {
      console.warn("Unmuted autoplay rejected or interrupted, attempting muted playback:", err);
      try {
        video.muted = true;
        await video.play();
      } catch {
        video.pause();
        setExpanded(false);
        setError("Unable to play the video. Check that videoSrc points to a valid file.");
      }
    }
  };

  useEffect(() => {
    if (!expanded) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCinema();
    };

    window.addEventListener("keydown", onKeyDown);
    // The close button becomes available after the expanded state renders.
    requestAnimationFrame(() => closeButtonRef.current?.focus());
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [expanded]);

  return (
    <section
      id="technology-video"
      className={`kiyoki-cinema${expanded ? " kiyoki-cinema--expanded" : ""}`}
      aria-label="Advanced Variable Anion Technology video"
    >
      <div className="kiyoki-cinema__intro" aria-hidden={expanded}>
        <h2>{heading}</h2>
        <p>{subtitle}</p>
      </div>

      <div
        className="kiyoki-cinema__frame"
        onClick={!expanded ? () => void openCinema() : undefined}
        style={{ cursor: !expanded ? "pointer" : "default" }}
      >
        <video
          ref={videoRef}
          className="kiyoki-cinema__video"
          src={videoSrc}
          poster={posterSrc}
          preload="metadata"
          playsInline
          controls={expanded}
          onEnded={closeCinema}
          aria-label="KIYOKI technology demonstration"
        />

        <div className="kiyoki-cinema__poster-shade" aria-hidden="true" />

        <button
          ref={playButtonRef}
          type="button"
          className="kiyoki-cinema__play"
          aria-label="Play technology video and expand it"
          aria-expanded={expanded}
          tabIndex={expanded ? -1 : 0}
          onClick={(e) => {
            e.stopPropagation();
            void openCinema();
          }}
        >
          <span className="kiyoki-cinema__play-circle" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              width="30"
              height="30"
              style={{ marginLeft: "3px" }}
            >
              <path d="M7.5 4.8a1 1 0 0 1 1.51-.86l11.1 7.2a1 1 0 0 1 0 1.72l-11.1 7.2a1 1 0 0 1-1.51-.86V4.8Z" />
            </svg>
          </span>
          <span className="kiyoki-cinema__play-label">Watch the video</span>
          {durationLabel && (
            <span className="kiyoki-cinema__duration">{durationLabel}</span>
          )}
        </button>

        <button
          ref={closeButtonRef}
          type="button"
          className="kiyoki-cinema__close"
          aria-label="Close expanded video"
          tabIndex={expanded ? 0 : -1}
          onClick={(e) => {
            e.stopPropagation();
            closeCinema();
          }}
        >
          <span aria-hidden="true">✕</span>
          <span>Close</span>
        </button>
      </div>

      {error && (
        <p role="alert" className="kiyoki-cinema__error">
          {error}
        </p>
      )}
    </section>
  );
};

export default TechnologyVideoCinema;
