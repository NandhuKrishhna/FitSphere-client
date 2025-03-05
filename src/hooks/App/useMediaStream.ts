import { useEffect, useRef, useState } from "react";
const useMediaStream = () => {
  const [state, setState] = useState<MediaStream | undefined>(undefined);
  const isStreamSet = useRef(false);
  useEffect(() => {
    if (isStreamSet.current) return;
    isStreamSet.current = true;
    (async function initstream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        console.log("setting your stream");
        setState(stream);
      } catch (error) {
        console.log("Error in media stream", error);
      }
    })();
  }, []);

  return { stream: state };
};

export default useMediaStream;
