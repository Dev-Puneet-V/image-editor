import { useEffect, useRef, useState } from "react";
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
  const [selectedColor, setSelectedColor] = useState("#00ff00");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const logHistory = (action) => {
    setHistory((prev) => [
      ...prev,
      { action, timestamp: new Date().toLocaleString() },
    ]);
  };
  useEffect(() => {
    const container = document.getElementById("canvas-wrapper");

    const canvas = new fabric.Canvas("fabric-canvas", {
      width: container.offsetWidth,
      height: container.offsetHeight,
    });

    canvasRef.current = canvas;

    const loadImage = async () => {
      try {
        const img = await fabric.Image.fromURL(imageUrl, {
          crossOrigin: "anonymous",
        });

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
      } catch (err) {
        console.error("Image load error:", err);
      }
    };

    if (imageUrl) loadImage();

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

    canvasRef.current.requestRenderAll(); // Forces re-render
    logHistory("Add text: " + text);
  };

  const addShape = (type) => {
    const baseOptions = {
      left: 150,
      top: 150,
      fill: "rgba(0,0,0,0)",
      stroke: "blue",
      strokeWidth: 2,
      width: 100,
      height: 100,
    };

    let shape;
    switch (type) {
      case "circle":
        shape = new fabric.Circle({ ...baseOptions, radius: 50 });
        logHistory("Added Circle");

        break;
      case "rectangle":
        shape = new fabric.Rect(baseOptions);
        logHistory("Added Rectangle");

        break;
      case "triangle":
        shape = new fabric.Triangle(baseOptions);
        logHistory("Added Triangle");

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
            ...baseOptions,
            left: 100,
            top: 100,
          }
        );
        logHistory("Added Polygon");

        break;
      default:
        return;
    }

    canvasRef.current.add(shape);
    canvasRef.current.setActiveObject(shape);
    canvasRef.current.requestRenderAll(); // Forces re-render
  };

  const applyFill = () => {
    const obj = canvasRef.current.getActiveObject();
    if (obj) {
      obj.set("fill", selectedColor);
      canvasRef.current.requestRenderAll(); // Forces re-render
      const objType = obj.type || "object";
      logHistory(`Applied fill color ${selectedColor} to ${objType}`);
    }
  };

  const applyStroke = () => {
    const obj = canvasRef.current.getActiveObject();
    if (obj) {
      obj.set({
        stroke: selectedColor,
        strokeWidth: 2,
      });
      canvasRef.current.requestRenderAll(); // Forces re-render

      const objType = obj.type || "object";
      logHistory(`Applied Stroke color ${selectedColor} to ${objType}`);
    }
  };

  const downloadImage = () => {
    const dataURL = canvasRef.current.toDataURL({
      format: "png",
      quality: 1,
    });
    const link = document.createElement("a");
    link.download = "canvas.png";
    link.href = dataURL;
    link.click();
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

        <div className="flex gap-2 flex-wrap mb-3 items-center">
          <button onClick={addText} className="btn">
            <PencilSquareIcon className="h-5 w-5" />
            Text
          </button>
          <button onClick={() => addShape("circle")} className="btn">
            <CircleStackIcon className="h-5 w-5" />
            Circle
          </button>
          <button onClick={() => addShape("rectangle")} className="btn">
            <RectangleGroupIcon className="h-5 w-5" />
            Rectangle
          </button>
          <button onClick={() => addShape("triangle")} className="btn">
            ▲ Triangle
          </button>
          <button onClick={() => addShape("polygon")} className="btn">
            <StarIcon className="h-5 w-5" />
            Polygon
          </button>

          <input
            type="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-10 h-10 border-none rounded-[50%] overflow-hidden cursor-pointer"
            title="Choose color"
          />

          <button
            onClick={applyFill}
            className="btn bg-green-600 hover:bg-green-700"
          >
            Apply Fill
          </button>
          <button
            onClick={applyStroke}
            className="btn bg-yellow-600 hover:bg-yellow-700"
          >
            Apply Stroke
          </button>
          <button
            onClick={() => setShowHistory(true)}
            className="btn bg-indigo-600 hover:bg-indigo-700"
          >
            📜 History
          </button>
          <button
            onClick={downloadImage}
            className="btn bg-slate-600 hover:bg-slate-700"
          >
            ⬇️ Download
          </button>
        </div>

        <div
          id="canvas-wrapper"
          className="flex-1 w-full h-full border rounded overflow-hidden"
        >
          <canvas id="fabric-canvas" className="w-full h-full block" />
        </div>
      </div>
      {showHistory && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90vw] max-w-md shadow-lg relative">
            <button
              onClick={() => setShowHistory(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-semibold mb-4">History</h2>
            {history.length === 0 ? (
              <p className="text-gray-500">No history yet.</p>
            ) : (
              <ul className="space-y-2 max-h-64 overflow-y-auto text-sm">
                {history.map((entry, index) => (
                  <li key={index} className="text-gray-800">
                    • {entry?.action}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Canva;
