import { useEffect, useRef } from 'react';

interface Flower {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  imageIndex: number;
}

const flowerImages = [
  '/images/flower-small.png',
  '/images/flower-corner.png',
  '/images/flower-bouquet.png',
];

export default function FloatingFlowers() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const flowersRef = useRef<Flower[]>([]);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Load images
    const imageUrls = flowerImages;
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    imageUrls.forEach((url, i) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedImages[i] = img;
        loadedCount++;
        if (loadedCount === imageUrls.length) {
          imagesRef.current = loadedImages;
          initFlowers();
          animate();
        }
      };
      img.onerror = () => {
        loadedCount++;
      };
    });

    const initFlowers = () => {
      const flowers: Flower[] = [];
      for (let i = 0; i < 15; i++) {
        flowers.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height - canvas.height,
          size: 20 + Math.random() * 40,
          speedY: 0.3 + Math.random() * 0.8,
          speedX: (Math.random() - 0.5) * 0.5,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 2,
          opacity: 0.15 + Math.random() * 0.25,
          imageIndex: Math.floor(Math.random() * 3),
        });
      }
      flowersRef.current = flowers;
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      flowersRef.current.forEach((flower) => {
        flower.y += flower.speedY;
        flower.x += flower.speedX + Math.sin(flower.y * 0.01) * 0.3;
        flower.rotation += flower.rotationSpeed;

        if (flower.y > canvas.height + 50) {
          flower.y = -50;
          flower.x = Math.random() * canvas.width;
        }

        if (flower.x < -50) flower.x = canvas.width + 50;
        if (flower.x > canvas.width + 50) flower.x = -50;

        const img = imagesRef.current[flower.imageIndex];
        if (img) {
          ctx.save();
          ctx.globalAlpha = flower.opacity;
          ctx.translate(flower.x, flower.y);
          ctx.rotate((flower.rotation * Math.PI) / 180);
          ctx.drawImage(
            img,
            -flower.size / 2,
            -flower.size / 2,
            flower.size,
            flower.size
          );
          ctx.restore();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
}
