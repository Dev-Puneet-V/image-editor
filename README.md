# Image Editor App

## Features Overview

This is a simple image search and editing tool built using **React**, **Fiber.js**, and **Pixabay API**. It allows users to:

1. **Search for Images**

   - Users can type image keywords (like “mountain”, “cat”, etc.).
   - App uses a **debounced API call** to Pixabay to fetch and display matching images.

2. **Add Captions / Edit Images**

   - Each image has an “**Add Caption**” button.
   - On click, a **canvas modal** opens using **Fiber.js**.
   - Users can:
     - Add multiple text layers
     - Add shapes (circle, rectangle, polygon, etc.)
     - Customize colors and opacity
     - Move/Resize elements
     - Undo/Redo with **Edit History**

3. **Download Final Image**
   - Final output can be downloaded as PNG.

---

## Technologies Used

- **React** – Frontend UI
- **Pixabay API** – Image Search
- **Fiber.js** – Canvas editor
- **Debounce** – Optimized API calls
- **Tailwind CSS**- For styling

---

## Starting the code

- `npm i`
- `npm run dev`
- go to `http://localhost:5173/`

## How to Use

1. **Search** for any image (e.g., “nature”, “cars”, “coffee”)
2. Click “**Add Caption**” on any image
3. Use the tools in the modal to add:
   - Text
   - Shapes
   - Colors
   - History navigation
4. **Download** your edited image as PNG

---

## Links

- [Codesandbox](https://codesandbox.io/p/github/Dev-Puneet-V/image-editor/main)
- [Architecture](https://excalidraw.com/#json=i-IdIGQXFbh8vOzpQ8B7X,LMshbovogOEDDPE5bpZHxQ)
- [Working link](https://image-editor-ivory-five.vercel.app/)
- [Setup and demo](https://www.loom.com/share/ed2d6cf4ed88407d949fae31e5503b49?sid=ec8b90b0-75c8-4d7f-a12b-1d8250e01f8b)
