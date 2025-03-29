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
        setState(stream);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return { stream: state };
};

export default useMediaStream;
