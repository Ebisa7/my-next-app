import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";

export default function ETNCoinGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (!gameStarted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const coins: Coin[] = [];
    const bombs: Bomb[] = [];
    const particles: Particle[] = [];
    const gravity = 6;

    const coinImage = new Image();
    coinImage.src = 'https://etn.ethio-tech.com/brand-assets/logos/coin_full.png';

    const bombImage = new Image();
    bombImage.src = 'https://etn.ethio-tech.com/brand-assets/logos/jebena1.png';

    interface Coin {
      x: number;
      y: number;
      size: number;
      tapped: boolean;
      collectAnimation: number;
    }

    interface Bomb {
      x: number;
      y: number;
      size: number;
      explode: boolean;
      explosionRadius: number;
    }

    interface Particle {
      x: number;
      y: number;
      radius: number;
      color: string;
      velocity: { x: number; y: number };
      alpha: number;
    }

    function createCoin() {
      const size = Math.random() * 40 + 10;
      const x = Math.random() * (canvas.width - size);
      coins.push({ x, y: -size, size, tapped: false, collectAnimation: 0 });
    }

    function createBomb() {
      const size = 50;
      const x = Math.random() * (canvas.width - size);
      bombs.push({ x, y: -size, size, explode: false, explosionRadius: 0 });
    }

    function createParticles(x: number, y: number, color: string, count: number) {
      for (let i = 0; i < count; i++) {
        particles.push({
          x,
          y,
          radius: Math.random() * 3,
          color,
          velocity: {
            x: (Math.random() - 0.5) * 5,
            y: (Math.random() - 0.5) * 5
          },
          alpha: 1
        });
      }
    }

    function gameLoop() {
      if (gameOver) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawCoins();
      drawBombs();
      drawParticles();
      requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
    const coinInterval = setInterval(createCoin, 500);
    const bombInterval = setInterval(createBomb, 1000);

    return () => {
      clearInterval(coinInterval);
      clearInterval(bombInterval);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [gameStarted, gameOver]);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setTimeLeft(60);
    setGameOver(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#133A2A] text-[#F2C94C]">
      {!gameStarted || gameOver ? (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">ETN Coin Game</h1>
          <Button onClick={startGame}>
            {gameOver ? 'Play Again' : 'Start Game'}
          </Button>
        </div>
      ) : (
        <canvas ref={canvasRef} className="w-full h-full" />
      )}
    </div>
  );
}
