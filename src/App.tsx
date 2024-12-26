import React, { useState, useRef, useEffect } from "react";
interface Player {
  id: string;
  x: number;
  y: number;
  team: "home" | "away";
  color: string;
  number: number;
  type: "active" | "sub";
}

interface Line {
  points: Point[];
  color: string;
}

interface Point {
  x: number;
  y: number;
}

const TacticsBoard: React.FC = () => {
  // Initial dimensions
  const BASE_WIDTH = 800;
  const BASE_HEIGHT = 600;

  const [dimensions, setDimensions] = useState({
    width: BASE_WIDTH,
    height: BASE_HEIGHT,
  });

  const initialPlayers: Player[] = [
    // Home team (11 players in 4-4-2 formation)
    {
      id: "home-1",
      x: 0.125 * BASE_WIDTH,
      y: 0.5 * BASE_HEIGHT,
      team: "home",
      color: "#ff0000",
      number: 1,
      type: "active",
    }, // GK
    {
      id: "home-2",
      x: 0.25 * BASE_WIDTH,
      y: 0.15 * BASE_HEIGHT,
      team: "home",
      color: "#ff0000",
      number: 2,
      type: "active",
    }, // Defense
    {
      id: "home-3",
      x: 0.25 * BASE_WIDTH,
      y: 0.35 * BASE_HEIGHT,
      team: "home",
      color: "#ff0000",
      number: 3,
      type: "active",
    },
    {
      id: "home-4",
      x: 0.25 * BASE_WIDTH,
      y: 0.65 * BASE_HEIGHT,
      team: "home",
      color: "#ff0000",
      number: 4,
      type: "active",
    },
    {
      id: "home-5",
      x: 0.25 * BASE_WIDTH,
      y: 0.85 * BASE_HEIGHT,
      team: "home",
      color: "#ff0000",
      number: 5,
      type: "active",
    },
    {
      id: "home-6",
      x: 0.4 * BASE_WIDTH,
      y: 0.15 * BASE_HEIGHT,
      team: "home",
      color: "#ff0000",
      number: 6,
      type: "active",
    }, // Midfield
    {
      id: "home-7",
      x: 0.4 * BASE_WIDTH,
      y: 0.35 * BASE_HEIGHT,
      team: "home",
      color: "#ff0000",
      number: 7,
      type: "active",
    },
    {
      id: "home-8",
      x: 0.4 * BASE_WIDTH,
      y: 0.65 * BASE_HEIGHT,
      team: "home",
      color: "#ff0000",
      number: 8,
      type: "active",
    },
    {
      id: "home-9",
      x: 0.4 * BASE_WIDTH,
      y: 0.85 * BASE_HEIGHT,
      team: "home",
      color: "#ff0000",
      number: 9,
      type: "active",
    },
    {
      id: "home-10",
      x: 0.45 * BASE_WIDTH,
      y: 0.35 * BASE_HEIGHT,
      team: "home",
      color: "#ff0000",
      number: 10,
      type: "active",
    }, // Forward
    {
      id: "home-11",
      x: 0.45 * BASE_WIDTH,
      y: 0.65 * BASE_HEIGHT,
      team: "home",
      color: "#ff0000",
      number: 11,
      type: "active",
    },
    // Home subs
    {
      id: "home-12",
      x: 0.05 * BASE_WIDTH,
      y: 0.1 * BASE_HEIGHT,
      team: "home",
      color: "#ff0000",
      number: 12,
      type: "sub",
    },
    {
      id: "home-13",
      x: 0.05 * BASE_WIDTH,
      y: 0.2 * BASE_HEIGHT,
      team: "home",
      color: "#ff0000",
      number: 13,
      type: "sub",
    },
    {
      id: "home-14",
      x: 0.05 * BASE_WIDTH,
      y: 0.3 * BASE_HEIGHT,
      team: "home",
      color: "#ff0000",
      number: 14,
      type: "sub",
    },
    {
      id: "home-15",
      x: 0.05 * BASE_WIDTH,
      y: 0.4 * BASE_HEIGHT,
      team: "home",
      color: "#ff0000",
      number: 15,
      type: "sub",
    },
    {
      id: "home-16",
      x: 0.05 * BASE_WIDTH,
      y: 0.5 * BASE_HEIGHT,
      team: "home",
      color: "#ff0000",
      number: 16,
      type: "sub",
    },

    // Away team (11 players in 4-4-2 formation)
    {
      id: "away-1",
      x: 0.875 * BASE_WIDTH,
      y: 0.5 * BASE_HEIGHT,
      team: "away",
      color: "#0000ff",
      number: 1,
      type: "active",
    }, // GK
    {
      id: "away-2",
      x: 0.75 * BASE_WIDTH,
      y: 0.15 * BASE_HEIGHT,
      team: "away",
      color: "#0000ff",
      number: 2,
      type: "active",
    }, // Defense
    {
      id: "away-3",
      x: 0.75 * BASE_WIDTH,
      y: 0.35 * BASE_HEIGHT,
      team: "away",
      color: "#0000ff",
      number: 3,
      type: "active",
    },
    {
      id: "away-4",
      x: 0.75 * BASE_WIDTH,
      y: 0.65 * BASE_HEIGHT,
      team: "away",
      color: "#0000ff",
      number: 4,
      type: "active",
    },
    {
      id: "away-5",
      x: 0.75 * BASE_WIDTH,
      y: 0.85 * BASE_HEIGHT,
      team: "away",
      color: "#0000ff",
      number: 5,
      type: "active",
    },
    {
      id: "away-6",
      x: 0.6 * BASE_WIDTH,
      y: 0.15 * BASE_HEIGHT,
      team: "away",
      color: "#0000ff",
      number: 6,
      type: "active",
    }, // Midfield
    {
      id: "away-7",
      x: 0.6 * BASE_WIDTH,
      y: 0.35 * BASE_HEIGHT,
      team: "away",
      color: "#0000ff",
      number: 7,
      type: "active",
    },
    {
      id: "away-8",
      x: 0.6 * BASE_WIDTH,
      y: 0.65 * BASE_HEIGHT,
      team: "away",
      color: "#0000ff",
      number: 8,
      type: "active",
    },
    {
      id: "away-9",
      x: 0.6 * BASE_WIDTH,
      y: 0.85 * BASE_HEIGHT,
      team: "away",
      color: "#0000ff",
      number: 9,
      type: "active",
    },
    {
      id: "away-10",
      x: 0.55 * BASE_WIDTH,
      y: 0.35 * BASE_HEIGHT,
      team: "away",
      color: "#0000ff",
      number: 10,
      type: "active",
    }, // Forward
    {
      id: "away-11",
      x: 0.55 * BASE_WIDTH,
      y: 0.65 * BASE_HEIGHT,
      team: "away",
      color: "#0000ff",
      number: 11,
      type: "active",
    },
    // Away subs
    {
      id: "away-12",
      x: 0.95 * BASE_WIDTH,
      y: 0.1 * BASE_HEIGHT,
      team: "away",
      color: "#0000ff",
      number: 12,
      type: "sub",
    },
    {
      id: "away-13",
      x: 0.95 * BASE_WIDTH,
      y: 0.2 * BASE_HEIGHT,
      team: "away",
      color: "#0000ff",
      number: 13,
      type: "sub",
    },
    {
      id: "away-14",
      x: 0.95 * BASE_WIDTH,
      y: 0.3 * BASE_HEIGHT,
      team: "away",
      color: "#0000ff",
      number: 14,
      type: "sub",
    },
  ];

  const [players, setPlayers] = useState(initialPlayers);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [currentLine, setCurrentLine] = useState<Point[]>([]);
  const [currentTool, setCurrentTool] = useState<"move" | "draw">("move");
  const [lineColor, setLineColor] = useState("#000000");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  // Add player size calculation based on board dimensions
  const getPlayerSize = () => {
    const minDimension = Math.min(dimensions.width, dimensions.height);
    return Math.max(minDimension * 0.05, 24); // 6% of min dimension, minimum 24px
  };

  // Handle window resize
  useEffect(() => {
    const updateDimensions = () => {
      if (!boardRef.current) return;

      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      // Calculate maximum dimensions while maintaining 4:3 aspect ratio
      const maxHeight = viewportHeight - 180; // Account for padding and controls
      const maxWidth = viewportWidth - 32; // Account for padding

      let width = maxWidth;
      let height = width * (3 / 4); // Maintain 4:3 aspect ratio

      if (height > maxHeight) {
        height = maxHeight;
        width = height * (4 / 3);
      }

      setDimensions({ width, height });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Scale player positions when dimensions change
  useEffect(() => {
    const scalePositions = (players: Player[]): Player[] => {
      return players.map((player) => ({
        ...player,
        x: (player.x / BASE_WIDTH) * dimensions.width,
        y: (player.y / BASE_HEIGHT) * dimensions.height,
      }));
    };

    setPlayers(scalePositions(initialPlayers));
  }, [dimensions]);

  // Update canvas and redraw when necessary
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = dimensions.width;
      canvasRef.current.height = dimensions.height;
      drawBoard();
    }
  }, [dimensions, players, lines, currentLine]);

  const drawBoard = (): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const FIELD_MARGIN = Math.min(75, dimensions.width * 0.075);
    const FIELD_WIDTH = dimensions.width - FIELD_MARGIN * 2;
    const FIELD_HEIGHT = dimensions.height - FIELD_MARGIN * 2;

    // Clear canvas
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);

    // Draw pitch
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.strokeRect(FIELD_MARGIN, FIELD_MARGIN, FIELD_WIDTH, FIELD_HEIGHT);

    // Center circle
    const centerCircleRadius = Math.min(FIELD_HEIGHT * 0.15, FIELD_WIDTH * 0.1);
    ctx.beginPath();
    ctx.arc(
      dimensions.width / 2,
      dimensions.height / 2,
      centerCircleRadius,
      0,
      Math.PI * 2
    );
    ctx.stroke();

    // Center line
    ctx.beginPath();
    ctx.moveTo(dimensions.width / 2, FIELD_MARGIN);
    ctx.lineTo(dimensions.width / 2, dimensions.height - FIELD_MARGIN);
    ctx.stroke();

    // Penalty areas
    const penaltyAreaWidth = FIELD_WIDTH * 0.2;
    const penaltyAreaHeight = FIELD_HEIGHT * 0.5;
    ctx.strokeRect(
      FIELD_MARGIN,
      (dimensions.height - penaltyAreaHeight) / 2,
      penaltyAreaWidth,
      penaltyAreaHeight
    );
    ctx.strokeRect(
      dimensions.width - FIELD_MARGIN - penaltyAreaWidth,
      (dimensions.height - penaltyAreaHeight) / 2,
      penaltyAreaWidth,
      penaltyAreaHeight
    );

    // Goalposts
    const goalWidth = FIELD_WIDTH * 0.02;
    const goalHeight = FIELD_HEIGHT * 0.15;
    ctx.lineWidth = 4;

    // Left goal
    ctx.beginPath();
    ctx.moveTo(FIELD_MARGIN, (dimensions.height - goalHeight) / 2);
    ctx.lineTo(FIELD_MARGIN - goalWidth, (dimensions.height - goalHeight) / 2);
    ctx.lineTo(FIELD_MARGIN - goalWidth, (dimensions.height + goalHeight) / 2);
    ctx.lineTo(FIELD_MARGIN, (dimensions.height + goalHeight) / 2);
    ctx.stroke();

    // Right goal
    ctx.beginPath();
    ctx.moveTo(
      dimensions.width - FIELD_MARGIN,
      (dimensions.height - goalHeight) / 2
    );
    ctx.lineTo(
      dimensions.width - FIELD_MARGIN + goalWidth,
      (dimensions.height - goalHeight) / 2
    );
    ctx.lineTo(
      dimensions.width - FIELD_MARGIN + goalWidth,
      (dimensions.height + goalHeight) / 2
    );
    ctx.lineTo(
      dimensions.width - FIELD_MARGIN,
      (dimensions.height + goalHeight) / 2
    );
    ctx.stroke();

    // Draw benches
    ctx.strokeStyle = "#888888";
    ctx.lineWidth = 2;
    ctx.strokeRect(
      FIELD_MARGIN * 0.2,
      FIELD_MARGIN * 0.6,
      FIELD_MARGIN * 0.8,
      FIELD_HEIGHT * 0.38
    );
    ctx.strokeRect(
      dimensions.width - FIELD_MARGIN,
      FIELD_MARGIN * 0.6,
      FIELD_MARGIN * 0.8,
      FIELD_HEIGHT * 0.38
    );

    // Draw lines
    lines.forEach((line) => {
      ctx.beginPath();
      ctx.strokeStyle = line.color;
      ctx.lineWidth = 2;
      ctx.moveTo(line.points[0].x, line.points[0].y);
      line.points.forEach((point) => {
        ctx.lineTo(point.x, point.y);
      });
      ctx.stroke();
    });

    if (currentLine.length > 0) {
      ctx.beginPath();
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 2;
      ctx.moveTo(currentLine[0].x, currentLine[0].y);
      currentLine.forEach((point) => {
        ctx.lineTo(point.x, point.y);
      });
      ctx.stroke();
    }
  };

  // Add touch event handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
    if (!boardRef.current) return;

    const rect = boardRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    if (currentTool === "draw") {
      setIsDrawing(true);
      setCurrentLine([{ x, y }]);
    } else {
      const clickedPlayer = players.find(
        (player) => Math.hypot(player.x - x, player.y - y) < getPlayerSize() / 2
      );
      setSelectedPlayer(clickedPlayer ?? null);
    }

    // Prevent default to avoid scrolling while drawing/moving
    e.preventDefault();
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>): void => {
    if ((!isDrawing && !selectedPlayer) || !boardRef.current) return;

    const rect = boardRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    if (isDrawing) {
      setCurrentLine([...currentLine, { x, y }]);
    } else if (selectedPlayer) {
      setPlayers(
        players.map((p) => (p.id === selectedPlayer.id ? { ...p, x, y } : p))
      );
    }

    // Prevent default to avoid scrolling while drawing/moving
    e.preventDefault();
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>): void => {
    if (isDrawing) {
      setLines([...lines, { points: currentLine, color: lineColor }]);
      setCurrentLine([]);
    }
    setIsDrawing(false);
    setSelectedPlayer(null);

    // Prevent default to avoid any unwanted behavior
    e.preventDefault();
  };

  // Update the handleMouseDown function to use player size
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!boardRef.current) return;

    const rect = boardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (currentTool === "draw") {
      setIsDrawing(true);
      setCurrentLine([{ x, y }]);
    } else {
      const clickedPlayer = players.find(
        (player) => Math.hypot(player.x - x, player.y - y) < getPlayerSize() / 2
      );
      setSelectedPlayer(clickedPlayer ?? null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    if ((!isDrawing && !selectedPlayer) || !boardRef.current) return;

    const rect = boardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isDrawing) {
      setCurrentLine([...currentLine, { x, y }]);
    } else if (selectedPlayer) {
      setPlayers(
        players.map((p) => (p.id === selectedPlayer.id ? { ...p, x, y } : p))
      );
    }
  };

  const handleMouseUp = (): void => {
    if (isDrawing) {
      setLines([...lines, { points: currentLine, color: lineColor }]);
      setCurrentLine([]);
    }
    setIsDrawing(false);
    setSelectedPlayer(null);
  };

  const handlePlayerColorChange = (
    team: "home" | "away",
    color: string
  ): void => {
    setPlayers(players.map((p) => (p.team === team ? { ...p, color } : p)));
  };

  return (
    <div className="h-screen overflow-hidden bg-gray-900 p-4 flex flex-col w-full">
      <div className="flex-none">
        <div className="flex flex-wrap gap-4 mb-4">
          <button
            className={`px-4 py-2 rounded ${
              currentTool === "move" ? "bg-blue-500" : "bg-gray-500"
            } text-white`}
            onClick={() => setCurrentTool("move")}
          >
            Move Players
          </button>
          <button
            className={`px-4 py-2 rounded ${
              currentTool === "draw" ? "bg-blue-500" : "bg-gray-500"
            } text-white`}
            onClick={() => setCurrentTool("draw")}
          >
            Draw Lines
          </button>
          <button
            className="px-4 py-2 rounded bg-red-500 text-white"
            onClick={() => setLines([])}
          >
            Clear Lines
          </button>
        </div>

        <div className="flex flex-wrap gap-8 mb-4">
          <div className="flex flex-col">
            <label className="text-white mb-2">Home Team Color</label>
            <input
              type="color"
              value={players.find((p) => p.team === "home")?.color}
              onChange={(e) => handlePlayerColorChange("home", e.target.value)}
              className="w-16 h-8"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-2">Away Team Color</label>
            <input
              type="color"
              value={players.find((p) => p.team === "away")?.color}
              onChange={(e) => handlePlayerColorChange("away", e.target.value)}
              className="w-16 h-8"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-2">Line Color</label>
            <input
              type="color"
              value={lineColor}
              onChange={(e) => setLineColor(e.target.value)}
              className="w-16 h-8"
            />
          </div>
        </div>
      </div>

      {/* Pitch and canvas */}
      <div className="flex-1 flex items-center justify-center min-h-0 bg-red-600">
        <div
          ref={boardRef}
          className="relative bg-green-800 w-full h-full border-2 border-white-700 "
          style={{
            maxWidth: `${dimensions.width}px`,
            maxHeight: `${dimensions.height}px`,
            aspectRatio: "4/3",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full"
          />
          {players.map((player) => {
            const playerSize = getPlayerSize();
            return (
              <div
                key={player.id}
                className={`absolute rounded-full flex items-center justify-center text-white cursor-move ${
                  player.type === "sub" ? "opacity-75" : ""
                }`}
                style={{
                  backgroundColor: player.color,
                  width: `${playerSize}px`,
                  height: `${playerSize}px`,
                  left: player.x - playerSize / 2,
                  top: player.y - playerSize / 2,
                  fontSize: `${playerSize * 0.5}px`,
                  transition:
                    selectedPlayer?.id === player.id ? "none" : "all 0.2s",
                }}
              >
                {player.number}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TacticsBoard;
