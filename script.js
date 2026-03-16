import * as THREE from "three";

const CONFIG = {
    laneWidth: 2.5,
    cameraOffset: {x: 0, y: 7, z: 10 },
    gravity: 0.015,
    jumpPower: 0.35,
    baseSpeed: 0.2,
    speedInc: 0.0001,
    floorLength: 400,
    fogDensity: 0.2
};

let state = {
    isPlaying: false,
    score: 0,
    speed: CONFIG.baseSpeed,
    lane: 0, // -1, 0, 1
    currentLaneX: 0,
    isJumping: false,
    jumpVel:0,
    playerY: 0,
    theme: null,
};

const elScore = document.getElementById("score");
const elScoreFinal = document.getElementById("final-score");
const uiScore = document.getElementById("score-display");
const uiStart = document.getElementById("start-screen");
const uiGameOver = document.getElementById("game-over-screen");


let scene,
    camera,
    renderer,
    player,
    floorGroups = [];
let decorationMeshType, obstacleMeshType;

const THEMES = [
    {
        name: "Candy",
        sky: 0xffd1c,
        ground: 0xff0f5,
        obstacle: 0xff6b6b,
        decor: 0x98fb98,
    },
    {
        name: "Neon",
        sky: 0x1a1a2e,
        ground: 0x16213e,
        obstacle: 0xe94560,
        decor: 0x0f3460
    },
    {
        name: "Sunset",
        sky: 0xff9a8b,
        ground: 0xff6a88,
        obstacle: 0x2c3e50,
        decor :0xf9ca24,
    },
    {
        name: "Mint",
        sky: 0xe0f7fa,
        ground:0xffffff,
        obstacle: 0x009688,
        decor: 0x80cb4,
    },
    {
        name: "Midnight",
        sky: 0x000000,
        ground: 0x000000,
        obstacle : 0xffff00,
        decor: 0x444444 
    }
] ;

function init () {
    
    scene = new THREE.Scene();


    camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        100
    );
    camera.position.set(
        CONFIG.cameraOffset.x,
        CONFIG.cameraOffset.y,
        CONFIG.cameraOffset.z
    );
    camera.lookAt(0, 0, -50);

    renderer = new THREE.webGLRenderer({alpha:true, antialias: true });
    renderer.setSize(window.innerHeight, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById("game-container").appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(10, 20, 10);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    renderer.render(scene, camera);

    window.addEventListener("resize", onWindowsResize, false);

    document.addEventListener("keydown", handleInput);

    document.getElementById("start-btn").addEventListener("click", startGame);
    document.getElementById("restart-btn").addEventListener("click", startGame);

}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function randomTheme(){
    return THEMES[Math.floor(Math.random() * THEMES.length)];
}

function createPlayer() {
    if (player) scene.remove(player);

    const group = new THREE.Group();

    const animalColors = [0xffffff, 0xaaaaaa, 0xffcc99, 0x333333];
    const color = animalColors[Math.floor(Math.random() * animalColors.length)];


    const mat = new THREE.MeshStandardMaterial({
        color: color,
        flatShading: true
    });

    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const eyeGeo = new THREE.BoxGeometry(0.15, 0.15, 0.05);

    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.25, 0.6, 0.5);
    group.add(rightEye);

    const earType = Math.floor(Math.random() * 3);
    const eatGeo = 
    earType === 0 
    ? new THREE.BoxGeometry(0.2, 0.5, 0.2) // Long (Bunny)
    : earType === 1
    ? new THREE.BoxGeometry(0.3, 0.3, 0.1) // Roundish (bear)
    : new THREE.ConeGeometry(0.2, 0.4, 4); // pointy (cat)

    const leftEar = new THREE.Mesh(eatGeo, mat);
    leftEar.position.set(-0.3, 1.1, 0);
    if (earType !== 2) leftEar.castShadow = true;
    group.add(leftEar);
    
}