import { getSocket } from "@/lib/socketManager";
import React, { useCallback, useEffect, useRef, useState } from "react";
import peer from "@/services/peer";

const MeetingPage: React.FC = () => {
  const socket = getSocket();
  const [remoteSocketId, setRemoteSocketId] = useState<string | null>(null);
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  // handlingUserJoined
  const handleUserJoined = useCallback(({ email, id }: { email: string; id: string }) => {
    console.log(`User ${email} joined with ID: ${id}`);
    setRemoteSocketId(id);
  }, []);

  // handlerCallUser
  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    const offer = await peer.getOffer();
    socket?.emit("user:call", { to: remoteSocketId, offer });

    setMyStream(stream);
  }, [remoteSocketId, socket]);

  // Handle incoming call
  const handleIncomingCall = useCallback(
    async ({ from, offer }: { from: string; offer: RTCSessionDescription }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      setMyStream(stream);
      console.log("Incoming call", from, offer);
      const ans = await peer.getAnswer(offer);
      socket?.emit("call:acceped", { to: from, ans });
    },
    [socket]
  );
  const sendStreams = useCallback(() => {
    if (myStream) {
      for (const track of myStream.getTracks()) {
        peer?.peer?.addTrack(track, myStream);
      }
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }: { from: string; ans: RTCSessionDescription }) => {
      peer.setLocalDescription(ans);
      console.log("call accepted", from, ans);
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegotiationIncoming = useCallback(
    async ({ from, offer }: { from: string; offer: RTCSessionDescription }) => {
      const ans = await peer.getAnswer(offer);
      socket?.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  useEffect(() => {
    peer.peer?.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACK!");
      setRemoteStream(remoteStream[0]);
    });
  });

  const handleNegotiationFinal = useCallback(async ({ ans }: { from: string; ans: RTCSessionDescription }) => {
    await peer.setLocalDescription(ans);
  }, []);

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket?.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer?.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer?.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);
  // Effect for socket event listeners
  useEffect(() => {
    if (!socket) return;

    socket.on("user:joined", handleUserJoined);
    socket.on("incoming:call", handleIncomingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegotiationIncoming);
    socket.on("peer:nego:final", handleNegotiationFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incoming:call", handleIncomingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegotiationIncoming);
      socket.off("peer:nego:final", handleNegotiationFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncomingCall,
    handleCallAccepted,
    handleNegotiationIncoming,
    handleNegotiationFinal,
  ]);

  // Effect to set video stream when myStream changes
  useEffect(() => {
    if (myStream && myVideoRef.current) {
      myVideoRef.current.srcObject = myStream;
    }
  }, [myStream]);

  useEffect(() => {
    if (remoteStream && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to the meeting</h1>
      <h4 className="text-lg mb-4">{remoteSocketId ? "Connected" : "No one in room"}</h4>

      <div className="flex gap-2 mb-4">
        {remoteSocketId && (
          <button
            onClick={handleCallUser}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            CALL
          </button>
        )}

        {myStream && (
          <button
            onClick={sendStreams}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Send Stream
          </button>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* My Video Stream */}
        {myStream && (
          <div className="mb-4">
            <h2 className="text-xl mb-2">My Stream</h2>
            <video
              ref={myVideoRef}
              autoPlay
              playsInline
              muted
              className="bg-gray-100 rounded"
              style={{
                width: "300px",
                height: "225px",
              }}
            />
          </div>
        )}

        {/* Remote Video Stream */}
        {remoteStream && (
          <div className="mb-4">
            <h2 className="text-xl mb-2">Remote Stream</h2>
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="bg-gray-100 rounded"
              style={{
                width: "300px",
                height: "225px",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingPage;
