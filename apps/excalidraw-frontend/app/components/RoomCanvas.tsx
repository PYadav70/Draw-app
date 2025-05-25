"use client";

import { WS_URL } from "@/config";
import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5MTgyNmYyMi0yMmM2LTQ2M2ItYTQ4Yi0yZGM2NjAyYzYzMjQiLCJpYXQiOjE3NDgxMTczOTh9.vIMjS4tL9z1VWcessUw3Q7Oyfr1BtFZasANnjXB1mRA";

export function RoomCanvas({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    // if (!roomId) return;

    const ws = new WebSocket(`${WS_URL}?token=${TOKEN}`);

    ws.onopen = () => {
      console.log("WebSocket connected");
      setSocket(ws);

      const data = JSON.stringify({
        type: "join_room",
        roomId,
      });

      console.log("Joining room with:", data);
      ws.send(data);
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.close();
    };
  }, []);

  if (!socket) {
    return <div>Connecting to server...</div>;
  }

  return (
    <div>
      <Canvas roomId={roomId} socket={socket} />
    </div>
  );
}
