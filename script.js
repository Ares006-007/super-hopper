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
    {name: "Midnight",
        sky: 0x000000,
        ground: 0x000000,
        onst
    }
] 
 
