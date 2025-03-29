import { getSocket } from "@/lib/socketManager";
import Peer from "peerjs";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
const usePeer = () => {
  const socket = getSocket();
  const roomId = useParams().meetId;
  const [peer, setPeer] = useState<Peer | null>(null);
  const [myId, setMyId] = useState<string | undefined>(undefined);
  const isPeerSet = useRef(false);
  useEffect(() => {
    if (isPeerSet.current || !roomId || !socket) return;
    isPeerSet.current = true;
    (async function initPeer() {
      const myPeer = new (await import("peerjs")).default();
      setPeer(myPeer);

      myPeer.on("open", (id) => {
        setMyId(id);
        socket?.emit("join-room", roomId, id);
      });
    })();
  }, [roomId, socket]);

  return { peer, myId };
};

export default usePeer;
