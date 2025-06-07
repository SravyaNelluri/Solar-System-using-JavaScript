// Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 100;

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#solarSystem") });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Load Stars Background
const loader = new THREE.TextureLoader();
loader.load("https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/cube/space/px.jpg", function (texture) {
  const starGeometry = new THREE.SphereGeometry(300, 64, 64);
  const starMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.BackSide
  });
  const starSphere = new THREE.Mesh(starGeometry, starMaterial);
  scene.add(starSphere);
});

// Sun
const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Light
const light = new THREE.PointLight(0xffffff, 2, 500);
light.position.set(0, 0, 0);
scene.add(light);

// Planets: size, color, distance, speed
const planetData = [
  { size: 1,   color: 0xb1b1b1, distance: 10, speed: 0.02 },  // Mercury
  { size: 1.2, color: 0xc8b560, distance: 15, speed: 0.015 }, // Venus
  { size: 1.3, color: 0x2e62d4, distance: 20, speed: 0.012 }, // Earth
  { size: 1.1, color: 0xb22222, distance: 25, speed: 0.01 },  // Mars
  { size: 2,   color: 0xd2b48c, distance: 32, speed: 0.008 }, // Jupiter
  { size: 1.7, color: 0xf5deb3, distance: 40, speed: 0.006 }, // Saturn
  { size: 1.4, color: 0xafeeee, distance: 48, speed: 0.004 }  // Uranus
];

const planets = [];
const angles = [];

planetData.forEach((planet) => {
  const geometry = new THREE.SphereGeometry(planet.size, 32, 32);
  const material = new THREE.MeshPhongMaterial({ color: planet.color });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  planets.push({ mesh, ...planet });
  angles.push(Math.random() * Math.PI * 2);
});

// Animation
function animate() {
  requestAnimationFrame(animate);

  planets.forEach((planet, i) => {
    angles[i] += planet.speed;
    planet.mesh.position.x = planet.distance * Math.cos(angles[i]);
    planet.mesh.position.z = planet.distance * Math.sin(angles[i]);
  });

  renderer.render(scene, camera);
}
animate();

// Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

