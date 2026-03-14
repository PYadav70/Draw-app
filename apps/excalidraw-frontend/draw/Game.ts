import { Tool } from "@/app/components/Canvas";
import { getExistingShapes } from "./http";

type Shape =
  | { type: "rect"; x: number; y: number; width: number; height: number }
  | { type: "circle"; centerX: number; centerY: number; radius: number }
  | { type: "line"; startX: number; startY: number; endX: number; endY: number }
  | { type: "arrow"; startX: number; startY: number; endX: number; endY: number }
  | { type: "pencil"; points: { x: number; y: number }[] };

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private existingShapes: Shape[] = [];

  private history: Shape[][] = [];
  private redoStack: Shape[][] = [];

  private roomId: string;
  private socket: WebSocket;

  private clicked = false;
  private startX = 0;
  private startY = 0;

  private selectedTool: Tool = "circle";

  private selectedShapeIndex: number | null = null;
  private offsetX = 0;
  private offsetY = 0;

  private pencilPoints: { x: number; y: number }[] = [];

  private scale = 1;

  private isPanning = false;
  private panStartX = 0;
  private panStartY = 0;

  constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;

    this.roomId = roomId;
    this.socket = socket;

    this.init();
    this.initHandlers();
    this.initMouseHandlers();

    window.addEventListener("keydown", this.handleKeyDown);

    this.canvas.addEventListener("wheel", this.handleZoom);
  }

  setTool(tool: Tool) {
    this.selectedTool = tool;
  }

  destroy() {
    this.canvas.removeEventListener("mousedown", this.mouseDownHandler);
    this.canvas.removeEventListener("mouseup", this.mouseUpHandler);
    this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
  }

  private handleKeyDown = (e: KeyboardEvent) => {

    if (e.key === "Delete" && this.selectedShapeIndex !== null) {
      this.saveHistory();
      this.existingShapes.splice(this.selectedShapeIndex, 1);
      this.selectedShapeIndex = null;
      this.clearCanvas();
    }

    if (e.ctrlKey && e.key === "z") {
      if (this.history.length > 0) {
        const prev = this.history.pop()!;
        this.redoStack.push([...this.existingShapes]);
        this.existingShapes = prev;
        this.clearCanvas();
      }
    }

    if (e.ctrlKey && e.key === "y") {
      if (this.redoStack.length > 0) {
        const next = this.redoStack.pop()!;
        this.history.push([...this.existingShapes]);
        this.existingShapes = next;
        this.clearCanvas();
      }
    }

    if (e.code === "Space") {
      this.isPanning = true;
    }
  };

  private handleZoom = (e: WheelEvent) => {
    e.preventDefault();

    const zoom = e.deltaY > 0 ? 0.9 : 1.1;

    this.scale *= zoom;

    this.ctx.setTransform(this.scale, 0, 0, this.scale, 0, 0);

    this.clearCanvas();
  };

  private saveHistory() {
    const snapshot = JSON.parse(JSON.stringify(this.existingShapes));
    this.history.push(snapshot);
    this.redoStack = [];
  }

  async init() {
    this.existingShapes = await getExistingShapes(this.roomId);
    this.clearCanvas();
  }

  initHandlers() {
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === "chat") {
        const parsed = JSON.parse(message.message);
        this.existingShapes.push(parsed.shape);
        this.clearCanvas();
      }
    };
  }

  private getMousePos(e: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();

    return {
      x: (e.clientX - rect.left) / this.scale,
      y: (e.clientY - rect.top) / this.scale
    };
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.strokeStyle = "white";

    this.existingShapes.forEach((shape) => {

      if (shape.type === "rect") {
        this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      }

      else if (shape.type === "circle") {
        this.ctx.beginPath();
        this.ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2);
        this.ctx.stroke();
      }

      else if (shape.type === "line") {
        this.ctx.beginPath();
        this.ctx.moveTo(shape.startX, shape.startY);
        this.ctx.lineTo(shape.endX, shape.endY);
        this.ctx.stroke();
      }

      else if (shape.type === "arrow") {

        this.ctx.beginPath();
        this.ctx.moveTo(shape.startX, shape.startY);
        this.ctx.lineTo(shape.endX, shape.endY);
        this.ctx.stroke();

        const angle = Math.atan2(shape.endY - shape.startY, shape.endX - shape.startX);
        const head = 15;

        this.ctx.beginPath();
        this.ctx.moveTo(shape.endX, shape.endY);
        this.ctx.lineTo(
          shape.endX - head * Math.cos(angle - Math.PI / 6),
          shape.endY - head * Math.sin(angle - Math.PI / 6)
        );

        this.ctx.moveTo(shape.endX, shape.endY);
        this.ctx.lineTo(
          shape.endX - head * Math.cos(angle + Math.PI / 6),
          shape.endY - head * Math.sin(angle + Math.PI / 6)
        );

        this.ctx.stroke();
      }

      else if (shape.type === "pencil") {

        this.ctx.beginPath();

        for (let i = 0; i < shape.points.length - 1; i++) {

          const p1 = shape.points[i];
          const p2 = shape.points[i + 1];

          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
        }

        this.ctx.stroke();
      }

    });
  }

  mouseDownHandler = (e: MouseEvent) => {

    if (this.isPanning) {
      this.panStartX = e.clientX;
      this.panStartY = e.clientY;
      return;
    }

    const pos = this.getMousePos(e);

    this.clicked = true;
    this.startX = pos.x;
    this.startY = pos.y;

    if (this.selectedTool === "pencil") {
      this.pencilPoints = [{ x: pos.x, y: pos.y }];
    }

    if (this.selectedTool === "select") {

      for (let i = this.existingShapes.length - 1; i >= 0; i--) {

        const shape = this.existingShapes[i];

        if (shape.type === "rect") {

          if (
            pos.x >= shape.x &&
            pos.x <= shape.x + shape.width &&
            pos.y >= shape.y &&
            pos.y <= shape.y + shape.height
          ) {

            this.selectedShapeIndex = i;
            this.offsetX = pos.x - shape.x;
            this.offsetY = pos.y - shape.y;

            break;
          }
        }
      }
    }
  };

  mouseUpHandler = (e: MouseEvent) => {

    if (this.selectedTool === "select") {
      this.selectedShapeIndex = null;
      this.clicked = false;
      return;
    }

    const pos = this.getMousePos(e);

    this.clicked = false;

    const width = pos.x - this.startX;
    const height = pos.y - this.startY;

    let shape: Shape | null = null;

    if (this.selectedTool === "rect") {
      shape = { type: "rect", x: this.startX, y: this.startY, width, height };
    }

    else if (this.selectedTool === "circle") {

      const radius = Math.max(width, height) / 2;

      shape = {
        type: "circle",
        centerX: this.startX + radius,
        centerY: this.startY + radius,
        radius
      };
    }

    else if (this.selectedTool === "line") {
      shape = { type: "line", startX: this.startX, startY: this.startY, endX: pos.x, endY: pos.y };
    }

    else if (this.selectedTool === "arrow") {
      shape = { type: "arrow", startX: this.startX, startY: this.startY, endX: pos.x, endY: pos.y };
    }

    else if (this.selectedTool === "pencil") {
      shape = { type: "pencil", points: this.pencilPoints };
    }

    if (!shape) return;

    this.saveHistory();

    this.existingShapes.push(shape);

    this.socket.send(JSON.stringify({
      type: "chat",
      message: JSON.stringify({ shape }),
      roomId: Number(this.roomId)
    }));

    this.clearCanvas();
  };

  mouseMoveHandler = (e: MouseEvent) => {

    if (this.isPanning) {

      const dx = e.clientX - this.panStartX;
      const dy = e.clientY - this.panStartY;

      this.ctx.translate(dx, dy);

      this.panStartX = e.clientX;
      this.panStartY = e.clientY;

      this.clearCanvas();

      return;
    }

    const pos = this.getMousePos(e);

    if (this.selectedTool === "select" && this.clicked && this.selectedShapeIndex !== null) {

      const shape = this.existingShapes[this.selectedShapeIndex];

      if (shape.type === "rect") {

        shape.x = pos.x - this.offsetX;
        shape.y = pos.y - this.offsetY;

      }

      this.clearCanvas();
      return;
    }

    if (!this.clicked) return;

    const width = pos.x - this.startX;
    const height = pos.y - this.startY;

    this.clearCanvas();

    if (this.selectedTool === "rect") {

      this.ctx.strokeRect(this.startX, this.startY, width, height);

    }

    else if (this.selectedTool === "circle") {

      const radius = Math.max(width, height) / 2;

      this.ctx.beginPath();
      this.ctx.arc(this.startX + radius, this.startY + radius, radius, 0, Math.PI * 2);
      this.ctx.stroke();

    }

    else if (this.selectedTool === "line") {

      this.ctx.beginPath();
      this.ctx.moveTo(this.startX, this.startY);
      this.ctx.lineTo(pos.x, pos.y);
      this.ctx.stroke();

    }

    else if (this.selectedTool === "arrow") {

      const endX = pos.x;
      const endY = pos.y;

      this.ctx.beginPath();
      this.ctx.moveTo(this.startX, this.startY);
      this.ctx.lineTo(endX, endY);
      this.ctx.stroke();

    }

    else if (this.selectedTool === "pencil") {

      this.pencilPoints.push({
        x: pos.x,
        y: pos.y
      });

      this.ctx.beginPath();

      for (let i = 0; i < this.pencilPoints.length - 1; i++) {

        const p1 = this.pencilPoints[i];
        const p2 = this.pencilPoints[i + 1];

        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);

      }

      this.ctx.stroke();

    }
  };

  initMouseHandlers() {

    this.canvas.addEventListener("mousedown", this.mouseDownHandler);
    this.canvas.addEventListener("mouseup", this.mouseUpHandler);
    this.canvas.addEventListener("mousemove", this.mouseMoveHandler);

  }
}