import React, { useEffect, useRef } from "react";

function loadYT() {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player) return resolve(window.YT);
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    window.onYouTubeIframeAPIReady = () => resolve(window.YT);
    document.head.appendChild(tag);
  });
}

export default function HeroYouTube({
  videoId,
  start = 74,   // <-- change these two numbers if you want a different slice
  end = 88,
  grayscale = true
}) {
  const mountRef = useRef(null);

  useEffect(() => {
    let player, poll, mounted = true;

    loadYT().then((YT) => {
      if (!mounted) return;

      player = new YT.Player(mountRef.current, {
        videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          // loop requires 'playlist' to be set to the same id
          loop: 1,
          playlist: videoId,
          start,
          end,
        },
        events: {
          onReady: (e) => {
            e.target.mute();
            e.target.playVideo();

            // Make the iframe "cover" the container
            const iframe = e.target.getIframe();
            Object.assign(iframe.style, {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "177.78%", // 16:9 cover width
              height: "100%",
              pointerEvents: "none",
            });

            // Hard-loop the segment
            if (end != null) {
              poll = setInterval(() => {
                try {
                  const t = e.target.getCurrentTime();
                  if (t >= end - 0.25) e.target.seekTo(start, true);
                } catch {}
              }, 200);
            }
          },
        },
      });
    });

    return () => {
      mounted = false;
      clearInterval(poll);
      try { player && player.destroy(); } catch {}
    };
  }, [videoId, start, end]);

  return (
    <div className={`absolute inset-0 ${grayscale ? "filter grayscale" : ""}`}>
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
}
