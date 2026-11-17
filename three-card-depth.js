import * as THREE from "./three.module.min.js";

(() => {
  "use strict";

  const CARD_SELECTOR = [
    ".panel", ".stat", ".card", ".feature", ".hero-art", ".achievement",
    ".section-card", ".terminal-window", ".terminal", ".strategy-card",
    ".corp-card", ".world-kpi", ".world-panel", ".mission", ".eventcard",
    ".callout", ".modal", ".palette", ".assetportfolio", ".assetcatalog",
    ".strategy-kpi", ".exec-kpi", ".world-toolbar", ".world-rival",
    ".world-empty", ".exec-log"
  ].join(",");

  const body = document.body;
  if (!body) return;

  const canvas = document.createElement("canvas");
  canvas.id = "threeCardCanvas";
  canvas.setAttribute("aria-hidden", "true");
  canvas.tabIndex = -1;
  canvas.style.cssText = "position:fixed;inset:0;width:100vw;height:100vh;max-width:none;pointer-events:none;z-index:0";
  body.prepend(canvas);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "low-power"
    });
  } catch (error) {
    canvas.remove();
    body.classList.add("three-card-fallback");
    document.querySelectorAll(CARD_SELECTOR).forEach(element => element.classList.add("three-depth-card"));
    return;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.22;

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(
    0, window.innerWidth, window.innerHeight, 0, 0.1, 3000
  );
  camera.position.set(0, 0, 1500);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.AmbientLight(0xdce5ff, 1.55));

  const keyLight = new THREE.DirectionalLight(0xe0e8ff, 1.8);
  keyLight.position.set(-260, 420, 520);
  scene.add(keyLight);

  const edgeLight = new THREE.DirectionalLight(0x617bb8, 0.48);
  edgeLight.position.set(300, -180, 260);
  scene.add(edgeLight);

  const unitGeometry = new THREE.BoxGeometry(1, 1, 1);
  const edgeGeometry = new THREE.EdgesGeometry(unitGeometry, 18);
  const faceMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x182033, metalness: 0.08, roughness: 0.28,
    transparent: true, opacity: 0.66, depthWrite: false,
    clearcoat: 0.9, clearcoatRoughness: 0.22, reflectivity: 0.42
  });
  const sideMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x263655, metalness: 0.18, roughness: 0.32,
    transparent: true, opacity: 0.88, depthWrite: false,
    clearcoat: 0.72, clearcoatRoughness: 0.26
  });
  const topMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x34476c, metalness: 0.12, roughness: 0.26,
    transparent: true, opacity: 0.78, depthWrite: false,
    clearcoat: 1, clearcoatRoughness: 0.18
  });
  const backMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x0d1422, metalness: 0.05, roughness: 0.42,
    transparent: true, opacity: 0.44, depthWrite: false,
    clearcoat: 0.55, clearcoatRoughness: 0.34
  });
  const materials = [
    sideMaterial, sideMaterial, topMaterial, sideMaterial, faceMaterial, backMaterial
  ];
  const edgeMaterial = new THREE.LineBasicMaterial({
    color: 0x8398c4,
    transparent: true,
    opacity: 0.82,
    depthWrite: false
  });

  const entries = new Map();
  const pointer = { x: -10000, y: -10000, active: false };
  let frame = 0;

  function nestingDepth(element) {
    let depth = 0;
    for (let parent = element.parentElement; parent; parent = parent.parentElement) {
      if (parent.matches && parent.matches(CARD_SELECTOR)) depth++;
    }
    return Math.min(depth, 4);
  }

  function addCard(element) {
    const mesh = new THREE.Mesh(unitGeometry, materials);
    mesh.frustumCulled = false;
    mesh.castShadow = false;
    mesh.receiveShadow = false;

    const edge = new THREE.LineSegments(edgeGeometry, edgeMaterial);
    edge.frustumCulled = false;
    edge.renderOrder = 2;
    edge.position.z = 0.02;

    scene.add(mesh, edge);
    element.classList.add("three-depth-card");
    const phase = (entries.size % 11) * 0.57;
    element.style.setProperty("--card-phase", `${(phase * -1.1).toFixed(2)}s`);
    const entry = { mesh, edge, phase };
    entries.set(element, entry);
    if (resizeObserver) resizeObserver.observe(element);
    return entry;
  }

  function syncCards(timestamp = performance.now()) {
    const visibleElements = new Set(document.querySelectorAll(CARD_SELECTOR));

    for (const [element, entry] of entries) {
      if (!element.isConnected || !visibleElements.has(element)) {
        scene.remove(entry.mesh, entry.edge);
        entries.delete(element);
        continue;
      }

      const rect = element.getBoundingClientRect();
      const visible = rect.width > 1 && rect.height > 1 &&
        rect.bottom > 0 && rect.top < window.innerHeight &&
        rect.right > 0 && rect.left < window.innerWidth;
      entry.mesh.visible = visible;
      entry.edge.visible = visible;
      if (!visible) continue;

      const width = rect.width;
      const height = rect.height;
      const depth = nestingDepth(element) * 18;
      const phase = entry.phase;
      const hovering = !motionPreference.matches && pointer.active && pointer.x >= rect.left && pointer.x <= rect.right &&
        pointer.y >= rect.top && pointer.y <= rect.bottom;
      entry.mesh.position.set(rect.left + width / 2, window.innerHeight - rect.top - height / 2, depth);
      entry.mesh.scale.set(width, height, 22);
      entry.edge.position.copy(entry.mesh.position);
      entry.edge.position.z += 0.025;
      entry.edge.scale.copy(entry.mesh.scale);

      if (hovering) {
        const nx = (pointer.x - (rect.left + width / 2)) / Math.max(1, width / 2);
        const ny = (pointer.y - (rect.top + height / 2)) / Math.max(1, height / 2);
        entry.mesh.rotation.x = -ny * 0.13;
        entry.mesh.rotation.y = nx * 0.13;
        entry.mesh.position.z += 4.5;
      } else {
        const motion = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1;
        entry.mesh.position.z += Math.sin(timestamp * 0.00115 + phase) * 2.2 * motion;
        entry.mesh.rotation.x = Math.sin(timestamp * 0.00082 + phase) * 0.022 * motion;
        entry.mesh.rotation.y = Math.cos(timestamp * 0.00072 + phase) * 0.032 * motion;
        entry.mesh.rotation.z = Math.sin(timestamp * 0.00064 + phase) * 0.004 * motion;
      }
      entry.edge.rotation.copy(entry.mesh.rotation);
    }

    for (const element of visibleElements) {
      if (!entries.has(element)) {
        const rect = element.getBoundingClientRect();
        if (rect.width > 1 && rect.height > 1) addCard(element);
      }
    }
  }

  function render(timestamp = performance.now()) {
    frame = 0;
    syncCards(timestamp);
    renderer.render(scene, camera);
    if (!document.hidden && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      frame = requestAnimationFrame(render);
    }
  }

  function scheduleRender() {
    if (!frame) frame = requestAnimationFrame(render);
  }

  function resize() {
    const width = Math.max(1, window.innerWidth);
    const height = Math.max(1, window.innerHeight);
    renderer.setSize(width, height, false);
    camera.left = 0;
    camera.right = width;
    camera.top = height;
    camera.bottom = 0;
    camera.updateProjectionMatrix();
    scheduleRender();
  }

  const resizeObserver = typeof ResizeObserver === "undefined"
    ? null
    : new ResizeObserver(scheduleRender);

  const mutationObserver = new MutationObserver(scheduleRender);
  mutationObserver.observe(body, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ["class", "style", "hidden"]
  });

  window.addEventListener("resize", resize, { passive: true });
  document.addEventListener("visibilitychange", () => { if (!document.hidden) scheduleRender(); });
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  motionPreference.addEventListener?.("change", scheduleRender);
  window.addEventListener("orientationchange", resize, { passive: true });
  window.addEventListener("scroll", scheduleRender, { passive: true, capture: true });

  document.addEventListener("pointermove", event => {
    if (event.pointerType === "touch") return;
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.active = true;
    scheduleRender();
  }, { passive: true });

  document.addEventListener("pointerleave", () => {
    pointer.active = false;
    scheduleRender();
  });

  canvas.addEventListener("webglcontextlost", event => {
    event.preventDefault();
    body.classList.remove("three-card-ready");
  });

  body.classList.add("three-card-ready");
  scheduleRender();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(scheduleRender).catch(() => {});
  }
})();
