import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Sky } from "three/examples/jsm/Addons.js";
import GUI from "lil-gui";

//gui
const gui = new GUI();

//scene
const scene = new THREE.Scene();
const house = new THREE.Group();

//light
const ambientLight = new THREE.AmbientLight("#86cdff", 0.275);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight("#86cdff", 1.5);
directionalLight.position.set(3, 2, -8);
scene.add(directionalLight);

//door light
const doorLight = new THREE.PointLight("#ff7d46", 5);
doorLight.position.set(0, 2.2, 2.5);
house.add(doorLight);

//ghosts

const ghost1 = new THREE.PointLight("#8800ff", 6);
const ghost2 = new THREE.PointLight("#ff0088", 6);
const ghost3 = new THREE.PointLight("#ff0000", 6);
scene.add(ghost1, ghost2, ghost3);

/**
//texture
*/

//texture loader
const textureLoader = new THREE.TextureLoader();

//floor texture
const floorAlphaTexture = textureLoader.load("/floor/alpha.jpg");
const floorARMTexture = textureLoader.load(
  "/floor/aerial_rocks_02_1k/aerial_rocks_02_arm_1k.jpg"
);
const floorColorTexture = textureLoader.load(
  "/floor/aerial_rocks_02_1k/aerial_rocks_02_diff_1k.jpg"
);
const floorNormalTexture = textureLoader.load(
  "/floor/aerial_rocks_02_1k/aerial_rocks_02_nor_gl_1k.jpg"
);
const floorDisplacementTexture = textureLoader.load(
  "/floor/aerial_rocks_02_1k/aerial_rocks_02_disp_1k.jpg"
);

floorColorTexture.colorSpace = THREE.SRGBColorSpace;
floorColorTexture.repeat.set(8, 8);
floorColorTexture.wrapS = THREE.RepeatWrapping;
floorColorTexture.wrapT = THREE.RepeatWrapping;

floorARMTexture.repeat.set(8, 8);
floorARMTexture.wrapS = THREE.RepeatWrapping;
floorARMTexture.wrapT = THREE.RepeatWrapping;

floorDisplacementTexture.repeat.set(8, 8);
floorDisplacementTexture.wrapT = THREE.RepeatWrapping;
floorDisplacementTexture.wrapS = THREE.RepeatWrapping;

floorNormalTexture.repeat.set(8, 8);
floorNormalTexture.wrapS = THREE.RepeatWrapping;
floorNormalTexture.wrapT = THREE.RepeatWrapping;

//wall texture
const wallARMTexture = textureLoader.load(
  "/wall/broken_brick_wall_1k/broken_brick_wall_arm_1k.jpg"
);
const wallColorTexture = textureLoader.load(
  "/wall/broken_brick_wall_1k/broken_brick_wall_diff_1k.jpg"
);
const wallNormalTexture = textureLoader.load(
  "/wall/broken_brick_wall_1k/broken_brick_wall_nor_gl_1k.jpg"
);

wallColorTexture.colorSpace = THREE.SRGBColorSpace;

//roof texture
const roofARMTexture = textureLoader.load(
  "/roof/roof_slates_02_1k/roof_slates_02_arm_1k.jpg"
);
const roofColorTexture = textureLoader.load(
  "/roof/roof_slates_02_1k/roof_slates_02_diff_1k.jpg"
);
const roofNormalTexture = textureLoader.load(
  "/roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.jpg"
);

roofColorTexture.colorSpace = THREE.SRGBColorSpace;

roofARMTexture.repeat.set(3, 1);
roofColorTexture.repeat.set(3, 1);
roofNormalTexture.repeat.set(3, 1);

roofARMTexture.wrapS = THREE.RepeatWrapping;
roofColorTexture.wrapS = THREE.RepeatWrapping;
roofNormalTexture.wrapS = THREE.RepeatWrapping;

//bushes texture

const bushesARMTexture = textureLoader.load(
  "/bushes/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.jpg"
);
const bushesColorTexture = textureLoader.load(
  "/bushes/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.jpg"
);
const bushesNormalTexture = textureLoader.load(
  "/bushes/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.jpg"
);

bushesColorTexture.colorSpace = THREE.SRGBColorSpace;

bushesARMTexture.repeat.set(2, 1);
bushesColorTexture.repeat.set(2, 1);
bushesNormalTexture.repeat.set(2, 1);

bushesARMTexture.wrapS = THREE.RepeatWrapping;
bushesColorTexture.wrapS = THREE.RepeatWrapping;
bushesNormalTexture.wrapS = THREE.RepeatWrapping;

//grave texture
const graveARMTexture = textureLoader.load(
  "/grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.jpg"
);
const graveColorTexture = textureLoader.load(
  "/grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.jpg"
);
const graveNormalTexture = textureLoader.load(
  "/grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.jpg"
);

graveColorTexture.colorSpace = THREE.SRGBColorSpace;

graveARMTexture.repeat.set(0.3, 0.4);
graveColorTexture.repeat.set(0.3, 0.4);
graveNormalTexture.repeat.set(0.3, 0.4);

//door texture

const doorColorTexture = textureLoader.load("/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/door/alpha.jpg");
const doorAOTexture = textureLoader.load("/door/ambientOcclusion.jpg");
const doorHeightTexture = textureLoader.load("/door/height.jpg");
const doormetalnessTexture = textureLoader.load("/door/metalness.jpg");
const doorNormalTexture = textureLoader.load("/door/normal.jpg");
const doorRoughnessTexture = textureLoader.load("/door/roughness.jpg");

doorColorTexture.colorSpace = THREE.SRGBColorSpace;

//floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 100, 100),
  new THREE.MeshStandardMaterial({
    transparent: true,
    alphaMap: floorAlphaTexture,
    map: floorColorTexture,
    aoMap: floorARMTexture,
    roughnessMap: floorARMTexture,
    metalnessMap: floorARMTexture,
    normalMap: floorNormalTexture,
    displacementMap: floorDisplacementTexture,
    displacementScale: 0.4,
    displacementBias: -0.2,
  })
);

gui
  .add(floor.material, "displacementScale")
  .min(0)
  .max(1)
  .step(0.001)
  .name("FloorDisplacementScale");

gui
  .add(floor.material, "displacementBias")
  .min(-1)
  .max(1)
  .step(0.001)
  .name("FloorDisplacementBias");

floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

//house
scene.add(house);

//walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    transparent: true,
    aoMap: wallARMTexture,
    roughnessMap: wallARMTexture,
    metalnessMap: wallARMTexture,
    normalMap: wallNormalTexture,
    map: wallColorTexture,
  })
);
walls.position.y += 1.25;
house.add(walls);

//roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1.5, 4),
  new THREE.MeshStandardMaterial({
    transparent: true,
    aoMap: roofARMTexture,
    metalnessMap: roofARMTexture,
    roughnessMap: roofARMTexture,
    map: roofColorTexture,
    normalMap: roofNormalTexture,
  })
);
roof.position.y = 2.5 + 0.75;
roof.rotation.y = Math.PI * 0.25;
house.add(roof);

//door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    aoMap: doorAOTexture,
    roughnessMap: doorRoughnessTexture,
    metalnessMap: doormetalnessTexture,
    normalMap: doorNormalTexture,
    alphaMap: doorAlphaTexture,
    transparent: true,
    displacementMap: doorHeightTexture,
    displacementScale: 0.15,
    displacementBias: -0.04,
  })
);
door.position.z = 2 + 0.01;
door.position.y = 1;
house.add(door);

//bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({
  map: bushesColorTexture,
  aoMap: bushesARMTexture,
  roughnessMap: bushesARMTexture,
  metalnessMap: bushesARMTexture,
  normalMap: bushesNormalTexture,
  color: "#ccffcc",
});

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);
bush1.rotation.x = -0.75;

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);
bush2.rotation.x = -0.75;

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);
bush3.rotation.x = -0.75;

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);
bush4.rotation.x = -0.75;

house.add(bush1, bush2, bush3, bush4);

//graves
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({
  map: graveColorTexture,
  aoMap: graveARMTexture,
  roughnessMap: graveARMTexture,
  metalnessMap: graveARMTexture,
  normalMap: graveNormalTexture,
});

const graves = new THREE.Group();
scene.add(graves);

for (let i = 0; i < 30; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 3 + Math.random() * 4;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.position.x = x;
  grave.position.y = Math.random() * 0.4;
  grave.position.z = z;

  grave.rotation.x = (Math.random() - 0.5) * 0.4;
  grave.rotation.y = (Math.random() - 0.5) * 0.4;
  grave.rotation.z = (Math.random() - 0.5) * 0.4;

  graves.add(grave);
}

//camera
const canvas = document.querySelector(".webgl");
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.1,
  100
);
camera.position.y = 4;
camera.position.x = 2;
camera.position.z = 5;

scene.add(camera);

//renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(size.width, size.height);
renderer.render(scene, camera);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

directionalLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

roof.castShadow = true;
walls.castShadow = true;
walls.receiveShadow = true;
floor.receiveShadow = true;

for (const grave of graves.children) {
  grave.castShadow = true;
  grave.receiveShadow = true;
}

directionalLight.shadow.mapSize.width = 256;
directionalLight.shadow.mapSize.height = 256;
directionalLight.shadow.camera.top = 8;
directionalLight.shadow.camera.right = 8;
directionalLight.shadow.camera.bottom = -8;
directionalLight.shadow.camera.left = -8;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 20;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 10;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 10;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 10;

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//SKY

const sky = new Sky();
sky.scale.set(100,100,100)
scene.add(sky);

sky.material.uniforms["turbidity"].value = 10;
sky.material.uniforms["rayleigh"].value = 3;
sky.material.uniforms["mieCoefficient"].value = 0.1;
sky.material.uniforms["mieDirectionalG"].value = 0.95;
sky.material.uniforms["turbidity"].value = 10;
sky.material.uniforms["sunPosition"].value.set(0.3,-0.038,-0.95)

//fog

scene.fog = new THREE.FogExp2('#09343f',0.1)

const timer = new THREE.Timer();
const tick = () => {
  timer.update();
  const elapsedTime = timer.getElapsed();

  //ghost angle
  const ghost1Angle = elapsedTime * 0.5;
  ghost1.position.x = Math.sin(ghost1Angle) * 5;
  ghost1.position.z = Math.cos(ghost1Angle) * 5;
  ghost1.position.y =
    Math.sin(ghost1Angle) *
    Math.sin(ghost1Angle * 2.34) *
    Math.sin(ghost1Angle * 3.45);

  const ghost2Angle = -elapsedTime * 0.38;
  ghost2.position.x = Math.sin(ghost2Angle) * 4;
  ghost2.position.z = Math.cos(ghost2Angle) * 4;
  ghost2.position.y =
    Math.sin(ghost2Angle) *
    Math.sin(ghost2Angle * 2.34) *
    Math.sin(ghost2Angle * 3.45);

  const ghost3Angle = elapsedTime * 0.23;
  ghost3.position.x = Math.sin(ghost3Angle) * 6;
  ghost3.position.z = Math.cos(ghost3Angle) * 6;
  ghost3.position.y =
    Math.sin(ghost3Angle) *
    Math.sin(ghost3Angle * 2.34) *
    Math.sin(ghost3Angle * 3.45);

  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};
tick();
