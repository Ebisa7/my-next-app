"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ETNCoinGame;
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
function ETNCoinGame() {
    var canvasRef = (0, react_1.useRef)(null);
    var _a = (0, react_1.useState)(0), score = _a[0], setScore = _a[1];
    var _b = (0, react_1.useState)(60), timeLeft = _b[0], setTimeLeft = _b[1];
    var _c = (0, react_1.useState)(false), gameOver = _c[0], setGameOver = _c[1];
    var _d = (0, react_1.useState)(false), gameStarted = _d[0], setGameStarted = _d[1];
    (0, react_1.useEffect)(function () {
        if (!gameStarted)
            return;
        var canvas = canvasRef.current;
        if (!canvas)
            return;
        var ctx = canvas.getContext('2d');
        if (!ctx)
            return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        var coins = [];
        var bombs = [];
        var particles = [];
        var gravity = 6;
        var coinImage = new Image();
        coinImage.src = 'https://etn.ethio-tech.com/brand-assets/logos/coin_full.png';
        var bombImage = new Image();
        bombImage.src = 'https://etn.ethio-tech.com/brand-assets/logos/jebena1.png';
        function createCoin() {
            var size = Math.random() * 40 + 10;
            var x = Math.random() * (canvas.width - size);
            coins.push({ x: x, y: -size, size: size, tapped: false, collectAnimation: 0 });
        }
        function createBomb() {
            var size = 50;
            var x = Math.random() * (canvas.width - size);
            bombs.push({ x: x, y: -size, size: size, explode: false, explosionRadius: 0 });
        }
        function createParticles(x, y, color, count) {
            for (var i = 0; i < count; i++) {
                particles.push({
                    x: x,
                    y: y,
                    radius: Math.random() * 3,
                    color: color,
                    velocity: {
                        x: (Math.random() - 0.5) * 5,
                        y: (Math.random() - 0.5) * 5
                    },
                    alpha: 1
                });
            }
        }
        function gameLoop() {
            if (gameOver)
                return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawCoins();
            drawBombs();
            drawParticles();
            requestAnimationFrame(gameLoop);
        }
        requestAnimationFrame(gameLoop);
        var coinInterval = setInterval(createCoin, 500);
        var bombInterval = setInterval(createBomb, 1000);
        return function () {
            clearInterval(coinInterval);
            clearInterval(bombInterval);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        };
    }, [gameStarted, gameOver]);
    var startGame = function () {
        setGameStarted(true);
        setScore(0);
        setTimeLeft(60);
        setGameOver(false);
    };
    return (react_1.default.createElement("div", { className: "flex flex-col items-center justify-center min-h-screen bg-[#133A2A] text-[#F2C94C]" }, !gameStarted || gameOver ? (react_1.default.createElement("div", { className: "text-center" },
        react_1.default.createElement("h1", { className: "text-4xl font-bold mb-4" }, "ETN Coin Game"),
        react_1.default.createElement(button_1.Button, { onClick: startGame }, gameOver ? 'Play Again' : 'Start Game'))) : (react_1.default.createElement("canvas", { ref: canvasRef, className: "w-full h-full" }))));
}
