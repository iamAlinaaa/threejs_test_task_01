import * as THREE from "three";
const textureLoader = new THREE.TextureLoader();

// Geometries
const geometries = [
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.CylinderGeometry(0.5, 0.5, 1, 32),
];

// Textures
const fireTexture = textureLoader.load("./fire.jpg");
const waterTexture = textureLoader.load("./water.jpg");
const groundTexture = textureLoader.load("./ground.jpg");
const airTexture = textureLoader.load("./air.jpg");

fireTexture.colorSpace = THREE.SRGBColorSpace;
waterTexture.colorSpace = THREE.SRGBColorSpace;
groundTexture.colorSpace = THREE.SRGBColorSpace;
airTexture.colorSpace = THREE.SRGBColorSpace;

const textures = [fireTexture, waterTexture, groundTexture, airTexture];

const chooseRandomGeometry = () => {
  let randomIndex = Math.floor(Math.random() * geometries.length);
  return geometries[randomIndex];
};

const chooseRandomTexture = () => {
  let randomIndex = Math.floor(Math.random() * textures.length);
  return textures[randomIndex];
};

const getRandomMeshes = (cubeDimensions) => {
  let amountOfMeshes = Object.values(cubeDimensions).reduce(
    (sum, current) => +sum * +current
  );
  let randomMeshes = [];
  let meshPositions = { x: 0, y: 0, z: 0 };

  for (let i = 0; i < amountOfMeshes; i++) {
    const material = new THREE.MeshBasicMaterial({
      map: chooseRandomTexture(),
    });
    const mesh = new THREE.Mesh(chooseRandomGeometry(), material);

    mesh.position.set(
      meshPositions.x - (cubeDimensions.x - 1) / 2,
      meshPositions.y - (cubeDimensions.y - 1) / 2,
      meshPositions.z - (cubeDimensions.z - 1) / 2
    );

    randomMeshes.push(mesh);

    if (++meshPositions.x === cubeDimensions.x) {
      meshPositions.x = 0;
      if (++meshPositions.y === cubeDimensions.y) {
        meshPositions.y = 0;
        if (++meshPositions.z === cubeDimensions.z) {
          break;
        }
      }
    }
  }
  return randomMeshes;
};

export default getRandomMeshes;
