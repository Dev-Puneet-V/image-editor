import { useEffect, useRef } from "react";
import * as fabric from "fabric";
import {
  PencilSquareIcon,
  CircleStackIcon,
  RectangleGroupIcon,
  StarIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

const Canva = ({ imageUrl, onClose }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = document.getElementById("canvas-wrapper");

    const canvasWidth = container.offsetWidth;
    const canvasHeight = container.offsetHeight;

    const canvas = new fabric.Canvas("fabric-canvas", {
      width: canvasWidth,
      height: canvasHeight,
    });

    canvasRef.current = canvas;

    const loadImage = async () => {
      try {
        const img = await fabric.Image.fromURL(imageUrl, {
          crossOrigin: "anonymous",
        });

        // Make image fill the canvas (cover)
        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        const scale = Math.max(scaleX, scaleY);

        img.scale(scale);
        img.set({
          left: 0,
          top: 0,
          originX: "left",
          originY: "top",
          selectable: false,
          evented: false,
        });

        canvas.add(img);
        img.sendToBack();
        canvas.requestRenderAll();
      } catch (err) {
        console.error("Image load error:", err);
      }
    };

    if (imageUrl) {
      loadImage();
    }

    return () => canvas.dispose();
  }, [imageUrl]);

  const addText = () => {
    const text = new fabric.IText("Edit me", {
      left: 100,
      top: 100,
      fill: "#000",
      fontSize: 24,
    });
    canvasRef.current.add(text).setActiveObject(text);
  };

  const addShape = (type) => {
    let shape;
    const options = {
      left: 150,
      top: 150,
      fill: "rgba(0,0,255,0.5)",
      width: 100,
      height: 100,
    };
    switch (type) {
      case "circle":
        shape = new fabric.Circle({ ...options, radius: 50 });
        break;
      case "rectangle":
        shape = new fabric.Rect(options);
        break;
      case "triangle":
        shape = new fabric.Triangle(options);
        break;
      case "polygon":
        shape = new fabric.Polygon(
          [
            { x: 100, y: 0 },
            { x: 200, y: 50 },
            { x: 150, y: 100 },
            { x: 50, y: 100 },
            { x: 0, y: 50 },
          ],
          {
            fill: "rgba(0,0,255,0.5)",
            left: 100,
            top: 100,
          }
        );
        break;
      default:
        return;
    }
    canvasRef.current.add(shape).setActiveObject(shape);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-xl shadow-xl w-[95vw] max-w-6xl h-[85vh] flex flex-col relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-red-500 hover:text-red-700"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {/* Toolbar */}
        <div className="flex gap-2 flex-wrap mb-3">
          <button
            onClick={addText}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded flex items-center gap-2 text-sm"
          >
            <PencilSquareIcon className="h-5 w-5" />
            Text
          </button>
          <button
            onClick={() => addShape("circle")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded flex items-center gap-2 text-sm"
          >
            <CircleStackIcon className="h-5 w-5" />
            Circle
          </button>
          <button
            onClick={() => addShape("rectangle")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded flex items-center gap-2 text-sm"
          >
            <RectangleGroupIcon className="h-5 w-5" />
            Rectangle
          </button>
          <button
            onClick={() => addShape("triangle")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded flex items-center gap-2 text-sm"
          >
            ▲ Triangle
          </button>
          <button
            onClick={() => addShape("polygon")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded flex items-center gap-2 text-sm"
          >
            <StarIcon className="h-5 w-5" />
            Polygon
          </button>
        </div>
        <button
          onClick={() => {
            const dataURL = canvasRef.current.toDataURL({
              format: "png",
              quality: 1,
            });

            const link = document.createElement("a");
            link.download = "canvas.png";
            link.href = dataURL;
            link.click();
          }}
          className="text-black bg-slate-300 hover:bg-green-700 px-3 py-1.5 rounded flex items-center gap-2 text-sm w-[150px] m-1"
        >
          ⬇️ Download
        </button>
        {/* Canvas Container */}
        <div
          id="canvas-wrapper"
          className="flex-1 w-full h-full border rounded overflow-hidden"
        >
          <canvas id="fabric-canvas" className="w-full h-full block" />
        </div>
      </div>
    </div>
  );
};

export default Canva;
