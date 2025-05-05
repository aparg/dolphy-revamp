"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

const WalkScore = ({ projectName, address }) => {
  const iframeRef = useRef(null);

  const formatAddress = (addr) => {
    if (!addr) return "";
    return addr.replace(/\s+/g, "-").toLowerCase();
  };

  useEffect(() => {
    const handleIframeLoad = () => {
      try {
        setTimeout(() => {
          if (iframeRef.current) {
            window.dispatchEvent(new Event("resize"));
          }
        }, 100);
      } catch (error) {
        console.error("Error in WalkScore iframe load:", error);
      }
    };

    if (iframeRef.current) {
      iframeRef.current.onload = handleIframeLoad;
    }

    return () => {
      if (iframeRef.current) {
        iframeRef.current.onload = null;
      }
    };
  }, []);

  if (!address || !projectName) {
    return null;
  }

  const formattedAddress = formatAddress(address);

  return (
    <div className="pb-6 mb-8">
      <div className="mb-10 flex items-center gap-2">
        <Image src="/walking.png" alt="Walking icon" height={44} width={44} />
        <h2 className="text-[1rem] font-[700]">Walk Score for {projectName}</h2>
      </div>

      <div className="rounded-lg overflow-hidden">
        <iframe
          ref={iframeRef}
          height="500"
          width="100%"
          title="Walk Score"
          className="w-full"
          style={{ border: "none" }}
          src={`https://www.walkscore.com/serve-walkscore-tile.php?wsid=&s=${formattedAddress}&o=h&c=f&h=500&fh=0&w=737`}
        />
      </div>
    </div>
  );
};

export default WalkScore;
