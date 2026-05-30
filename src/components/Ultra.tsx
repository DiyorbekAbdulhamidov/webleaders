'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function WebleadersUltra() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('web');

  useEffect(() => {
    if (!canvasRef.current) return;

    // --- THREE.JS SEHRGARLIK BOSHQARMASI ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 15);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasRef.current.appendChild(renderer.domElement);

    // 1. Kiber-Landshaft (Digital Grid Terrain)
    const gridRows = 60;
    const gridCols = 60;
    const gridGeometry = new THREE.PlaneGeometry(30, 30, gridRows, gridCols);
    gridGeometry.rotateX(-Math.PI / 2);

    // Landshaftni toshqin to'lqin shakliga keltirish
    const positionAttr = gridGeometry.attributes.position;
    for (let i = 0; i < positionAttr.count; i++) {
      const x = positionAttr.getX(i);
      const z = positionAttr.getZ(i);
      const y = Math.sin(x * 0.5) * Math.cos(z * 0.5) * 0.4;
      positionAttr.setY(i, y);
    }
    gridGeometry.computeVertexNormals();

    const gridMaterial = new THREE.MeshBasicMaterial({
      color: 0x052e16,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const terrain = new THREE.Mesh(gridGeometry, gridMaterial);
    terrain.position.y = -2;
    scene.add(terrain);

    // 2. Webleaders Matrix Kod Zarralari (Vortex + Rain Effect)
    const particleCount = 25000;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const coreColor = new THREE.Color('#22c55e'); // Yorqin yashil
    const edgeColor = new THREE.Color('#022c22'); // To'q yashil

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Girdob va kod yomg'iri aralashmasi geometriyasi
      const u = Math.random();
      const radius = Math.pow(u, 2) * 12;
      const spinAngle = radius * 1.8;
      const layerAngle = (i % 6) / 6 * Math.PI * 2;

      positions[i3] = Math.cos(layerAngle + spinAngle) * radius;
      positions[i3 + 1] = (Math.random() - 0.5) * 8 + Math.sin(radius) * 0.5;
      positions[i3 + 2] = Math.sin(layerAngle + spinAngle) * radius;

      // Ranglarni gradient qilish
      const mixedColor = coreColor.clone().lerp(edgeColor, radius / 12);
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.025,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const codeVortex = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(codeVortex);

    // Interaktivlik (Sichqoncha koordinatalari)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) - 0.5;
      mouseY = (event.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Animatsiya Tsikli (Loop)
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Landshaftni to'lqinlantirish (Jonli Matrix effekti)
      const positionsTerrain = terrain.geometry.attributes.position;
      for (let i = 0; i < positionsTerrain.count; i++) {
        const x = positionsTerrain.getX(i);
        const z = positionsTerrain.getZ(i);
        const y = Math.sin(x * 0.3 + elapsedTime * 1.5) * Math.cos(z * 0.3 + elapsedTime * 1.2) * 0.3;
        positionsTerrain.setY(i, y - 2);
      }
      terrain.geometry.attributes.position.needsUpdate = true;

      // Girdobni aylantirish
      codeVortex.rotation.y = elapsedTime * 0.05;

      // Sichqonchaga silliq bog'lanish (Lerp Interfeys)
      targetX = mouseX * 2.5;
      targetY = mouseY * 1.5;
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (-targetY + 5 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // O'lchamlarni moslashtirish
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize);

    // Tozalash (Cleanup)
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
      if (canvasRef.current && renderer.domElement) {
        canvasRef.current.removeChild(renderer.domElement);
      }
      gridGeometry.dispose();
      gridMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#000000] text-white font-sans overflow-x-hidden selection:bg-green-500/30">

      {/* 3D Koinot Qavati */}
      <div ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />

      {/* Matrix Matrix Glamour Overlay */}
      <div className="fixed inset-0 z-1 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />

      {/* --- WEB INTERFEYS QAVATI --- */}
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-between">

        {/* HEADER */}
        <header className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group">
            <img src="/public/logo.png" alt="Webleaders Logo" className="h-8 w-auto object-contain group-hover:scale-105 transition-transform duration-300" onError={(e) => { e.currentTarget.style.display = 'none' }} />
            <span className="text-base tracking-[0.4em] font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-green-400 to-green-500">
              WEBLEADERS
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-10 text-xs tracking-[0.25em] font-medium text-gray-400">
            <a href="#imkoniyatlar" className="hover:text-green-400 transition-colors duration-300">IMKONIYATLAR</a>
            <a href="#ishlar" className="hover:text-green-400 transition-colors duration-300">BIZNING ISHLAR</a>
            <a href="#sarmoya" className="hover:text-green-400 transition-colors duration-300">SARMOYA</a>
            <a href="#aloqa" className="hover:text-green-400 transition-colors duration-300">ALOQA</a>
          </nav>

          <button className="text-[10px] tracking-[0.3em] font-bold uppercase border border-green-500/30 bg-green-950/10 px-6 py-3 rounded-md hover:bg-green-500 hover:text-black hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] transition-all duration-500 cursor-pointer">
            START →
          </button>
        </header>

        {/* HERO SECTION (Original Matnlar bilan Mukammallashtirilgan) */}
        <main className="w-full max-w-5xl mx-auto px-6 text-center my-auto pt-12 pb-20 flex flex-col items-center">

          {/* Badge */}
          <div className="mb-6 px-4 py-1.5 border border-green-500/20 bg-green-950/20 text-green-400 text-[9px] tracking-[0.4em] rounded-full uppercase font-semibold animate-pulse">
            ● WEBLEADERS — RAQAMLI EVOLYUTSIYA
          </div>

          {/* Sarlavha (1:1 Skrinshotdagi kabi haybatli va ulug'vor) */}
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight leading-[1.05] mb-8 select-none">
            Shunchaki Sayt Emas.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-green-500 drop-shadow-[0_0_40px_rgba(34,197,94,0.15)]">
              Biznesingiz Dvigateli.
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-xs sm:text-sm tracking-[0.15em] text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            Hamma chiroyli rasm chizishi mumkin. Biz esa siz uxlayotganingizda ham pul ishlaydigan, raqobatchilarni ortda qoldiradigan mukammal va avtomatlashgan raqamli tizim quramiz.
          </p>

          {/* Tugmalar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
            <button className="w-full sm:w-auto px-10 py-4 bg-white text-black text-xs font-bold tracking-[0.2em] rounded-md hover:bg-green-500 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] transition-all duration-300 uppercase cursor-pointer">
              Loyiha Boshlash ↗
            </button>
            <button className="w-full sm:w-auto px-10 py-4 border border-gray-800 bg-black/40 text-gray-300 text-xs font-semibold tracking-[0.2em] rounded-md hover:border-green-500/40 hover:text-white transition-all duration-300 uppercase cursor-pointer">
              ▷ Nimalar Qildik?
            </button>
          </div>
        </main>

        {/* ULTRA-MODERN KIBER XIZMATLAR TABLITSA QISMI (Inson hayoliga kelmagan qism) */}
        <section className="w-full max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-6 z-20">
          <div className="p-8 border border-white/5 bg-black/60 backdrop-blur-md rounded-xl hover:border-green-500/20 transition-all duration-500 group">
            <div className="text-green-500 text-xl font-mono mb-4">01 // ARCHITECTURE</div>
            <h3 className="text-lg font-bold tracking-widest mb-2 uppercase">Kvant Saytlar</h3>
            <p className="text-xs text-gray-500 leading-relaxed font-light group-hover:text-gray-300 transition-colors duration-300">
              Eng yuqori tezlik va cheksiz yuklanishlarga bardosh beruvchi, kiber-himoyalangan Next.js arxitekturasi.
            </p>
          </div>

          <div className="p-8 border border-white/5 bg-black/60 backdrop-blur-md rounded-xl hover:border-green-500/20 transition-all duration-500 group">
            <div className="text-green-500 text-xl font-mono mb-4">02 // INTEGRATION</div>
            <h3 className="text-lg font-bold tracking-widest mb-2 uppercase">Avtomatizatsiya</h3>
            <p className="text-xs text-gray-500 leading-relaxed font-light group-hover:text-gray-300 transition-colors duration-300">
              Inson omilisiz ishlovchi CRM, ERP va barcha buxgalteriya hamda savdo tizimlarini yagona miyaga birlashtirish.
            </p>
          </div>

          <div className="p-8 border border-white/5 bg-black/60 backdrop-blur-md rounded-xl hover:border-green-500/20 transition-all duration-500 group">
            <div className="text-green-500 text-xl font-mono mb-4">03 // INTELLIGENCE</div>
            <h3 className="text-lg font-bold tracking-widest mb-2 uppercase">AI Ekotizim</h3>
            <p className="text-xs text-gray-500 leading-relaxed font-light group-hover:text-gray-300 transition-colors duration-300">
              Mijozlar bilan 24/7 rejimida real vaqtda audio va matn orqali gaplashib, sotuv qiluvchi sun'iy intellekt agentlari.
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="w-full border-t border-white/5 bg-black/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img src="/public/logo.png" alt="Webleaders Logo" className="h-6 w-auto object-contain" onError={(e) => { e.currentTarget.style.display = 'none' }} />
              <span className="text-xs tracking-[0.3em] font-black text-gray-400">
                WEBLEADERS © {new Date().getFullYear()}
              </span>
            </div>
            <div className="text-[10px] tracking-[0.2em] text-gray-600 font-mono">
              SYSTEM STATUS: <span className="text-green-500 animate-pulse">ONLINE [SECURE]</span>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}