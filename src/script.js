import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import getRandomMeshes from "./utils/get-random-meshes";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Scene background
const textureLoader = new THREE.TextureLoader();
const backgroundTexture = textureLoader.load("./static/whirl.jpg");
scene.background = backgroundTexture;

let randomMeshes;
let cubeDimensions;

// Get user input
const cubeForm = document.getElementById("cubeForm");
const explodeButton = document.getElementById("explode");

cubeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  cubeDimensions = {
    x: +cubeForm.x.value,
    y: +cubeForm.y.value,
    z: +cubeForm.z.value,
  };
  generateCube(cubeDimensions);
});

explodeButton.addEventListener("click", () => {
  explodeCube();
});

// Generate cube
const generateCube = (cubeDimensions) => {
  scene.clear();
  explodeButton.classList.remove('hidden-button')

  randomMeshes = getRandomMeshes(cubeDimensions);
  for (let mesh of randomMeshes) {
    if (mesh.material.map) {
      mesh.material.map.flipY = false;
    }
    scene.add(mesh);
  }

  // Sizes
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
  );
  camera.position.z = 12;
  scene.add(camera);

  // Controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  // Renderer
  const renderer = new THREE.WebGLRenderer({ canvas: canvas });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Animate
  const tick = () => {
    controls.update();

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
  };

  tick();
};

// explode cube
const explodeCube = () => {
  randomMeshes.forEach(({ position, rotation }) => {
    gsap.to(rotation, {
      duration: 4,
      ease: "power4.out",
      x: (Math.random() - 0.5) * Math.PI * 4,
      y: (Math.random() - 0.5) * Math.PI * 4,
    });
    gsap.to(position, {
      duration: 4,
      ease: "power4.out",
      x: (Math.random() - 0.5) * 65,
      y: (Math.random() - 0.5) * 65,
      z: (Math.random() - 0.5) * 65,
    });
  });
};
