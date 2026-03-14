import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import { Circle, Pencil, RectangleHorizontalIcon, Move, ArrowRight, Slash } from "lucide-react";
import { Game } from "@/draw/Game";

export type Tool =
  | "circle"
  | "rect"
  | "pencil"
  | "line"
  | "arrow"
  | "select";

export function Canvas({
  roomId,
  socket
}: {
  socket: WebSocket;
  roomId: string;
}) {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [game, setGame] = useState<Game>();

  const [selectedTool, setSelectedTool] = useState<Tool>("circle");

  useEffect(() => {
    game?.setTool(selectedTool);
  }, [selectedTool, game]);

  useEffect(() => {

    if (canvasRef.current) {

      const g = new Game(canvasRef.current, roomId, socket);

      setGame(g);

      return () => {
        g.destroy();
      };
    }

  }, [canvasRef]);

  return (
    <div
      style={{
        height: "100vh",
        overflow: "hidden"
      }}
    >
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />

      <Topbar
        setSelectedTool={setSelectedTool}
        selectedTool={selectedTool}
      />
    </div>
  );
}

function Topbar({
  selectedTool,
  setSelectedTool
}: {
  selectedTool: Tool;
  setSelectedTool: (s: Tool) => void;
}) {

  return (
    <div
      style={{
        position: "fixed",
        top: 10,
        left: 10
      }}
    >
      <div className="flex gap-2">

        {/* Select Tool */}
        <IconButton
          onClick={() => {
            setSelectedTool("select");
          }}
          activated={selectedTool === "select"}
          icon={<Move />}
        />

        {/* Pencil */}
        <IconButton
          onClick={() => {
            setSelectedTool("pencil");
          }}
          activated={selectedTool === "pencil"}
          icon={<Pencil />}
        />

        {/* Rectangle */}
        <IconButton
          onClick={() => {
            setSelectedTool("rect");
          }}
          activated={selectedTool === "rect"}
          icon={<RectangleHorizontalIcon />}
        />

        {/* Circle */}
        <IconButton
          onClick={() => {
            setSelectedTool("circle");
          }}
          activated={selectedTool === "circle"}
          icon={<Circle />}
        />

        {/* Line */}
        <IconButton
          onClick={() => {
            setSelectedTool("line");
          }}
          activated={selectedTool === "line"}
          icon={<Slash />}
        />

        {/* Arrow */}
        <IconButton
          onClick={() => {
            setSelectedTool("arrow");
          }}
          activated={selectedTool === "arrow"}
          icon={<ArrowRight />}
        />

      </div>
    </div>
  );
}