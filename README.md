# 🏠 Dream Home Designer

**Dream Home Designer** is an interactive web-based 3D interior design application. It allows users to visualize, arrange, and customize furniture in a virtual living room environment using simple "drag-and-drop" interactions similar to simulation games like *The Sims*.

Built with **Three.js** and **Vite**.

### ✨ Features

### 1. 3D Environment 
```
* **Realistic Scene:** A complete room setup with textured flooring and walls.
* **Lighting:** Combination of Ambient and Directional lighting for realistic shadows and depth.
* **Camera Controls:** Fully interactive camera (OrbitControls) allowing users to zoom, pan, and rotate around the room.
```

### 2. Interaction & Customization (R2)
```
* **Direct Drag & Drop:** Intuitive interaction system. Click and drag any furniture item to move it across the floor.
* **Grid Snapping (Bonus):** Furniture automatically snaps to a **0.5m grid**, ensuring perfect alignment and layout precision.
* **Asset Library:** A categorized sidebar containing various 3D models:
    * 🪑 Chairs (Office, Lounge, Modern...)
    * 🛋️ Tables (Desk, Dining, Pool Table...)
    * 🌿 Plants (Houseplant, Alien Plant, Shelf Plants...)
* **Properties Panel:**
    * **Rotate:** Rotate objects by 90 degrees.
    * **Color:** Change the material color of furniture dynamically.
    * **Delete:** Remove objects from the scene.
```

### 3. Application Logic (R3)
```
* **Smart Selection:** Logic to differentiate between "Clicking to Select" and "Dragging to Move/Rotate Camera".
* **Visual Feedback:** Selected items are highlighted with a blue bounding box.
* **Asset Management:** System to load GLB/GLTF models asynchronously with error handling (Auto-fix for NaN position errors).
```
---

## 🛠️ Technology Stack
```
* **Core:** JavaScript (ES6+)
* **3D Engine:** [Three.js](https://threejs.org/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Styling:** CSS3 (Custom UI, no external CSS framework)
* **3D Format:** GLB / GLTF
```
---

## 🚀 Installation & Setup
```

Follow these steps to run the project locally:

1.  **Clone the repository:**
    ```bash
    git clone (https://github.com/longmai2005/3D-Challenge-2.git)
    cd dream-home-3d
    ```

2.  **Install dependencies:**
    Make sure you have Node.js installed.
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open in Browser:**
    Open the link shown in the terminal (usually `http://localhost:5173`).
```

## 🎮 Controls & User Guide
```
| Action | Control |
| :--- | :--- |
| **Select Item** | Left Click on an object |
| **Move Item** | Left Click + Drag (on the object) |
| **Rotate Camera** | Left Click + Drag (on empty space) |
| **Pan Camera** | Right Click + Drag |
| **Zoom** | Mouse Wheel |
| **Rotate Object** | Click "ROTATE" button in the right panel |
| **Change Color** | Use the Color Picker in the right panel |
| **Delete Object** | Click "DELETE" button or Trash icon |

```
## 📂 Project Structure
```
dream-home-3d/
├── public/
│   ├── models/       # 3D assets (.glb files)
│   └── textures/     # Floor and Wall textures (.jpg)
├── src/
│   ├── main.js       # Main application logic (Scene, Interaction, Catalog)
│   └── style.css     # UI Styling
├── index.html        # Main entry point
├── package.json      # Dependencies
└── README.md         # Project documentation

```


## 🌟 Highlights (Bonus Features)

* **Grid Snapping System:** Implemented a custom logic in the `pointermove` event to round coordinates to the nearest `0.5` factor, allowing for precise furniture placement.
* **Direct Dragging:** Instead of using complex Gizmos (arrows), a `Raycaster` + `Plane` intersection math is used to calculate the drag position on the floor, providing a seamless User Experience.
* **Robust Error Handling:** The loader automatically detects if a model has invalid bounding box data (NaN) and resets its position to prevent the "disappearing model" bug.

---

## 📜 Credits

* **Three.js:** mrdoob and contributors.
* **3D Models:** Sourced from free community assets (Credits to respective creators).
* **Textures:** Unsplash / AmbientCG.

---



