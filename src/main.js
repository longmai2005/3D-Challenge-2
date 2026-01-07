import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const AUDIO = {
    spawn: new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'),   
    select: new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'),  
    rotate: new Audio('https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3'),  
    delete: new Audio('https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3'),  
    save: new Audio('https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3'),    
    drag: new Audio('https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3')     
};

// Hàm phát âm thanh chung (có reset để bấm liên tục được)
function playSound(name) {
    if (AUDIO[name]) {
        AUDIO[name].currentTime = 0; 
        AUDIO[name].volume = 0.5;    
        AUDIO[name].play().catch(e => console.warn("Chưa tương tác với web nên chưa phát tiếng"));
    }
}

// --- 1. DATA CATALOG ---
const CATALOG = {
    "Chairs": [
        { name: "Cabin Chair", file: "/models/Cabin chair.glb", img: "https://cdn-icons-png.flaticon.com/512/1663/1663955.png" },
        { name: "Executive Chair", file: "/models/Executive Chair.glb", img: "https://cdn-icons-png.flaticon.com/512/4604/4604712.png" },
        { name: "Desk Chair", file: "/models/Desk Chair.glb", img: "https://cdn-icons-png.flaticon.com/512/2663/2663548.png" },
        { name: "Simple Chair", file: "/models/chair.glb", img: "https://cdn-icons-png.flaticon.com/512/2432/2432682.png" },
        { name: "Lounge Chair", file: "/models/chair2.glb", img: "https://cdn-icons-png.flaticon.com/512/2663/2663529.png" }, 
        { name: "Modern Chair", file: "/models/Chair3.glb", img: "https://cdn-icons-png.flaticon.com/512/2663/2663529.png" }, 
    ],
    "Tables": [
        { name: "Office Desk", file: "/models/Desk.glb", img: "https://cdn-icons-png.flaticon.com/512/3115/3115166.png" },
        { name: "Standing Desk", file: "/models/Standing Desk.glb", img: "https://cdn-icons-png.flaticon.com/512/2558/2558063.png" },
        { name: "Pool Table", file: "/models/Pool Table.glb", img: "https://cdn-icons-png.flaticon.com/512/632/632534.png" },
        { name: "Folding Table", file: "/models/Folding Table.glb", img: "https://cdn-icons-png.flaticon.com/512/10756/10756056.png" },
        { name: "Dining Table", file: "/models/table.glb", img: "https://cdn-icons-png.flaticon.com/512/1663/1663941.png" },
        { name: "Side Table", file: "/models/Side table.glb", img: "https://cdn-icons-png.flaticon.com/512/4240/4240890.png" },
        { name: "Small Table", file: "/models/Small Table.glb", img: "https://cdn-icons-png.flaticon.com/512/751/751656.png" },
        { name: "Large Table", file: "/models/Table (1).glb", img: "https://cdn-icons-png.flaticon.com/512/1663/1663941.png" }
    ],
    "Plants": [
        { name: "House Plant", file: "/models/Houseplant.glb", img: "https://cdn-icons-png.flaticon.com/512/1892/1892751.png" },
        { name: "Pot Plant", file: "/models/Pot Plant.glb", img: "https://cdn-icons-png.flaticon.com/512/3079/3079174.png" },
        { name: "Alien Plant", file: "/models/Alien Plants.glb", img: "https://cdn-icons-png.flaticon.com/512/4462/4462272.png" },
        { name: "Shelf Plants", file: "/models/Plants - Assorted shelf plants.glb", img: "https://cdn-icons-png.flaticon.com/512/9027/9027961.png" },
        { name: "Small Plant", file: "/models/plant1.glb", img: "https://cdn-icons-png.flaticon.com/512/2921/2921820.png" },
        { name: "Coffee Plant", file: "/models/Coffee plant.glb", img: "https://cdn-icons-png.flaticon.com/512/10696/10696772.png" },
        { name: "Fiddle Leaf", file: "/models/Fiddle-leaf Plant.glb", img: "https://cdn-icons-png.flaticon.com/512/628/628283.png" }
    ]
};

// --- 2. SETUP SCENE ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf5f5f5);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(5, 8, 8); 

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// --- 3. MÔI TRƯỜNG ---
const textureLoader = new THREE.TextureLoader();
// Sàn
const floorTex = textureLoader.load('/textures/floor.jpg', (t) => { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(4, 4); });
const floor = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.8 }));
floor.rotation.x = -Math.PI/2;
floor.receiveShadow = true;
scene.add(floor);

// Grid Helper (Lưới sàn)
const gridHelper = new THREE.GridHelper(10, 20, 0x888888, 0xcccccc);
scene.add(gridHelper);

// Tường
const wallTex = textureLoader.load('/textures/wall.jpg', (t) => { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(2, 1); });
const wallMat = new THREE.MeshStandardMaterial({ map: wallTex, color: 0xffffff });
const backWall = new THREE.Mesh(new THREE.BoxGeometry(10, 5, 0.2), wallMat);
backWall.position.set(0, 2.5, -5);
backWall.receiveShadow = true;
scene.add(backWall);
const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.2, 5, 10), wallMat);
leftWall.position.set(-5, 2.5, 0);
leftWall.receiveShadow = true;
scene.add(leftWall);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
dirLight.position.set(5, 12, 8);
dirLight.castShadow = true;
scene.add(dirLight);

// --- 4. HỆ THỐNG ĐIỀU KHIỂN ---
const furnitureArr = [];
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableDamping = true;

const selectionBox = new THREE.BoxHelper();
selectionBox.material.color.set(0x3498db);
selectionBox.visible = false;
scene.add(selectionBox);

// --- 5. KÉO THẢ (DRAG & DROP) + SNAP TO GRID ---
const dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0); 
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const intersectPoint = new THREE.Vector3();
const dragOffset = new THREE.Vector3();

let isDragging = false;
let currentObject = null;
const GRID_SIZE = 0.5;

// CLICK (Pointer Down)
renderer.domElement.addEventListener('pointerdown', (event) => {
    if (event.target.closest('#sidebar') || event.target.closest('#properties-panel') || event.target.closest('#top-actions')) return;

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(furnitureArr, true);

    if (intersects.length > 0) {
        let selected = intersects[0].object;
        while(selected.parent && selected.parent.type !== 'Scene') selected = selected.parent;

        isDragging = true;
        currentObject = selected;
        orbit.enabled = false;

        playSound('select');

        if (raycaster.ray.intersectPlane(dragPlane, intersectPoint)) {
            dragOffset.copy(intersectPoint).sub(currentObject.position);
        }
        selectItem(currentObject);
    } else {
        deselectItem();
    }
});

// MOVE (Pointer Move)
renderer.domElement.addEventListener('pointermove', (event) => {
    if (!isDragging || !currentObject) return;

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    if (raycaster.ray.intersectPlane(dragPlane, intersectPoint)) {
        let rawX = intersectPoint.x - dragOffset.x;
        let rawZ = intersectPoint.z - dragOffset.z;

        const newX = Math.round(rawX / GRID_SIZE) * GRID_SIZE;
        const newZ = Math.round(rawZ / GRID_SIZE) * GRID_SIZE;

        if(currentObject.position.x !== newX || currentObject.position.z !== newZ) {
            currentObject.position.x = newX;
            currentObject.position.z = newZ;
            selectionBox.update();
        }
    }
});

// RELEASE (Pointer Up)
renderer.domElement.addEventListener('pointerup', () => {
    isDragging = false;
    orbit.enabled = true;
});

// --- 6. LOAD MODEL ---
const loader = new GLTFLoader();

function spawnFurniture(path, name) {
    loader.load(path, (gltf) => {
        const model = gltf.scene;
        model.traverse(c => { if(c.isMesh) { c.castShadow=true; c.receiveShadow=true; }});
        
        model.position.set(0, 0, 0); 
        const box = new THREE.Box3().setFromObject(model);
        if (isFinite(box.min.y)) {
            model.position.y -= box.min.y;
        } else {
            model.position.set(0, 0, 0);
        }

        model.userData.name = name;
        scene.add(model);
        furnitureArr.push(model);
        
        playSound('spawn');
        
        selectItem(model);

    }, undefined, (err) => {
        console.error("Lỗi:", err);
        alert(`Lỗi file: ${path}`);
    });
}

// --- UI HELPERS ---
function selectItem(obj) {
    selectionBox.setFromObject(obj);
    selectionBox.visible = true;
    document.getElementById('properties-panel').classList.add('active');
    document.getElementById('item-name-display').innerText = obj.userData.name || "Item";
}

function deselectItem() {
    selectionBox.visible = false;
    currentObject = null;
    document.getElementById('properties-panel').classList.remove('active');
}

// --- RENDER UI ---
function renderCatalog() {
    const container = document.getElementById('catalog-list');
    if(!container) return;
    container.innerHTML = '';
    
    for (const [categoryName, items] of Object.entries(CATALOG)) {
        const title = document.createElement('div');
        title.className = 'category-title';
        title.innerText = categoryName;
        container.appendChild(title);
        
        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'item-card';
            card.innerHTML = `<img src="${item.img}"><span>${item.name}</span>`;
            card.onclick = () => spawnFurniture(item.file, item.name);
            container.appendChild(card);
        });
    }
}
renderCatalog();

// --- BUTTONS ---
const startBtn = document.getElementById('start-btn');
if(startBtn) startBtn.addEventListener('click', () => {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('app-ui').classList.remove('hidden');
    playSound('select');
});

const closeBtn = document.getElementById('btn-close');
if(closeBtn) closeBtn.onclick = deselectItem;

const rotateBtn = document.getElementById('btn-rotate');
if(rotateBtn) rotateBtn.onclick = () => { 
    if(currentObject) { 
        currentObject.rotation.y += Math.PI/2; 
        selectionBox.update(); 
        playSound('rotate'); // Âm thanh xoay
    }
};

const deleteBtn = document.getElementById('btn-delete');
if(deleteBtn) deleteBtn.onclick = () => {
    if(currentObject) {
        selectionBox.visible = false;
        scene.remove(currentObject);
        furnitureArr.splice(furnitureArr.indexOf(currentObject), 1);
        playSound('delete'); // Âm thanh xóa
        deselectItem();
    }
};

const colorPicker = document.getElementById('color-picker');
if(colorPicker) colorPicker.addEventListener('input', (e) => {
    if(currentObject) currentObject.traverse(c => { if(c.isMesh) c.material.color.set(e.target.value); });
});

const clearBtn = document.getElementById('btn-clear');
if(clearBtn) clearBtn.addEventListener('click', () => {
    if(confirm('Xóa hết?')) {
        furnitureArr.forEach(o => scene.remove(o));
        furnitureArr.length = 0;
        playSound('delete');
        deselectItem();
    }
});
const saveBtn = document.getElementById('btn-save');
if(saveBtn) saveBtn.addEventListener('click', () => {
    playSound('save'); // Âm thanh lưu
    alert('Đã lưu!');
});

// --- LOOP ---
function animate() {
    requestAnimationFrame(animate);
    orbit.update();
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});