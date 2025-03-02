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

  // Get user media (camera + mic)
  const getUserMediaStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      return stream;
    } catch (error) {
      console.error("Error accessing media devices:", error);
      return null;
    }
  };

  // Handle user joining the room
  const handleUserJoined = useCallback(
    async ({ email, id }: { email: string; id: string }) => {
      console.log(`User ${email} joined with ID: ${id}`);
      setRemoteSocketId(id);

      // If I'm the first user, I wait for the second user
      // If I'm the second user, I immediately initiate the call
      const stream = await getUserMediaStream();
      if (stream) {
        const offer = await peer.getOffer();
        socket?.emit("user:call", { to: id, offer });
      }
    },
    [socket]
  );

  // Handle incoming call
  const handleIncomingCall = useCallback(
    async ({ from, offer }: { from: string; offer: RTCSessionDescription }) => {
      setRemoteSocketId(from);
      console.log("Incoming call from:", from);

      const stream = await getUserMediaStream();
      if (stream) {
        const answer = await peer.getAnswer(offer);
        socket?.emit("call:accepted", { to: from, answer });
      }
    },
    [socket]
  );

  // Handle call accepted
  const handleCallAccepted = useCallback(async ({ from, answer }: { from: string; answer: RTCSessionDescription }) => {
    console.log("Call accepted by:", from);
    await peer.setLocalDescription(answer);
  }, []);

  // Send media streams automatically when WebRTC connection is established
  const sendStreams = useCallback(() => {
    if (myStream) {
      for (const track of myStream.getTracks()) {
        peer.peer?.addTrack(track, myStream);
      }
    }
  }, [myStream]);

  // Handle WebRTC "track" event to receive remote streams
  useEffect(() => {
    peer.peer?.addEventListener("track", (event) => {
      const remoteStream = event.streams[0];
      console.log("Receiving remote stream");
      setRemoteStream(remoteStream);
    });

    return () => {
      peer.peer?.removeEventListener("track", () => {});
    };
  }, []);

  // Handle negotiation needed event
  useEffect(() => {
    const handleNegotiationNeeded = async () => {
      if (!remoteSocketId) return;
      const offer = await peer.getOffer();
      socket?.emit("peer:nego:needed", { offer, to: remoteSocketId });
    };

    peer.peer?.addEventListener("negotiationneeded", handleNegotiationNeeded);
    return () => {
      peer.peer?.removeEventListener("negotiationneeded", handleNegotiationNeeded);
    };
  }, [remoteSocketId, socket]);

  // Handle incoming negotiation request
  const handleNegotiationIncoming = useCallback(
    async ({ from, offer }: { from: string; offer: RTCSessionDescription }) => {
      console.log("Negotiation needed with", from);
      const answer = await peer.getAnswer(offer);
      socket?.emit("peer:nego:done", { to: from, answer });
    },
    [socket]
  );

  // Handle final negotiation response
  const handleNegotiationFinal = useCallback(async ({ answer }: { answer: RTCSessionDescription }) => {
    await peer.setLocalDescription(answer);
  }, []);

  // Handle user disconnecting
  const handleUserLeft = useCallback(() => {
    console.log("User disconnected");
    setRemoteSocketId(null);
    setRemoteStream(null);
  }, []);

  // Register socket event listeners
  useEffect(() => {
    if (!socket) return;

    socket.on("user:joined", handleUserJoined);
    socket.on("incoming:call", handleIncomingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegotiationIncoming);
    socket.on("peer:nego:final", handleNegotiationFinal);
    socket.on("user:left", handleUserLeft);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incoming:call", handleIncomingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegotiationIncoming);
      socket.off("peer:nego:final", handleNegotiationFinal);
      socket.off("user:left", handleUserLeft);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncomingCall,
    handleCallAccepted,
    handleNegotiationIncoming,
    handleNegotiationFinal,
    handleUserLeft,
  ]);

  // Set video streams
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
      <h4 className="text-lg mb-4">{remoteSocketId ? "Connected" : "Waiting for someone to join..."}</h4>

      <div className="flex flex-col md:flex-row gap-4">
        {/* My Video Stream */}
        {myStream && (
          <div>
            <h2 className="text-xl mb-2">My Stream</h2>
            <video
              ref={myVideoRef}
              autoPlay
              playsInline
              muted
              className="bg-gray-100 rounded"
              style={{ width: "300px", height: "225px" }}
            />
          </div>
        )}

        {/* Remote Video Stream */}
        {remoteStream && (
          <div>
            <h2 className="text-xl mb-2">Remote Stream</h2>
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="bg-gray-100 rounded"
              style={{ width: "300px", height: "225px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingPage;
