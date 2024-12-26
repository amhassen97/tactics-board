import React, { useState, useRef, useEffect } from 'react';
interface Player {
  id: string;
  x: number;
  y: number;
  team: 'home' | 'away';
  color: string;
  number: number;
  type: 'active' | 'sub';
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
  const [players, setPlayers] = useState<Player[]>([
    // Home team (11 players in 4-4-2 formation)
    { id: 'home-1', x: 100, y: 120, team: 'home', color: '#ff0000', number: 1, type: 'active' }, // GK
    { id: 'home-2', x: 200, y: 180, team: 'home', color: '#ff0000', number: 2, type: 'active' }, // Defense
    { id: 'home-3', x: 200, y: 240, team: 'home', color: '#ff0000', number: 3, type: 'active' },
    { id: 'home-4', x: 200, y: 360, team: 'home', color: '#ff0000', number: 4, type: 'active' },
    { id: 'home-5', x: 200, y: 420, team: 'home', color: '#ff0000', number: 5, type: 'active' },
    { id: 'home-6', x: 300, y: 180, team: 'home', color: '#ff0000', number: 6, type: 'active' }, // Midfield
    { id: 'home-7', x: 300, y: 240, team: 'home', color: '#ff0000', number: 7, type: 'active' },
    { id: 'home-8', x: 300, y: 360, team: 'home', color: '#ff0000', number: 8, type: 'active' },
    { id: 'home-9', x: 300, y: 420, team: 'home', color: '#ff0000', number: 9, type: 'active' },
    { id: 'home-10', x: 350, y: 240, team: 'home', color: '#ff0000', number: 10, type: 'active' }, // Forward
    { id: 'home-11', x: 350, y: 360, team: 'home', color: '#ff0000', number: 11, type: 'active' },
    // Home subs
    { id: 'home-12', x: 30, y: 50, team: 'home', color: '#ff0000', number: 12, type: 'sub' },
    { id: 'home-13', x: 30, y: 90, team: 'home', color: '#ff0000', number: 13, type: 'sub' },
    { id: 'home-14', x: 30, y: 130, team: 'home', color: '#ff0000', number: 14, type: 'sub' },

    // Away team (11 players in 4-4-2 formation)
    { id: 'away-1', x: 700, y: 120, team: 'away', color: '#0000ff', number: 1, type: 'active' }, // GK
    { id: 'away-2', x: 600, y: 180, team: 'away', color: '#0000ff', number: 2, type: 'active' }, // Defense
    { id: 'away-3', x: 600, y: 240, team: 'away', color: '#0000ff', number: 3, type: 'active' },
    { id: 'away-4', x: 600, y: 360, team: 'away', color: '#0000ff', number: 4, type: 'active' },
    { id: 'away-5', x: 600, y: 420, team: 'away', color: '#0000ff', number: 5, type: 'active' },
    { id: 'away-6', x: 500, y: 180, team: 'away', color: '#0000ff', number: 6, type: 'active' }, // Midfield
    { id: 'away-7', x: 500, y: 240, team: 'away', color: '#0000ff', number: 7, type: 'active' },
    { id: 'away-8', x: 500, y: 360, team: 'away', color: '#0000ff', number: 8, type: 'active' },
    { id: 'away-9', x: 500, y: 420, team: 'away', color: '#0000ff', number: 9, type: 'active' },
    { id: 'away-10', x: 450, y: 240, team: 'away', color: '#0000ff', number: 10, type: 'active' }, // Forward
    { id: 'away-11', x: 450, y: 360, team: 'away', color: '#0000ff', number: 11, type: 'active' },
    // Away subs
    { id: 'away-12', x: 770, y: 50, team: 'away', color: '#0000ff', number: 12, type: 'sub' },
    { id: 'away-13', x: 770, y: 90, team: 'away', color: '#0000ff', number: 13, type: 'sub' },
    { id: 'away-14', x: 770, y: 130, team: 'away', color: '#0000ff', number: 14, type: 'sub' },
  ]);

  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [currentLine, setCurrentLine] = useState<Point[]>([]);
  const [currentTool, setCurrentTool] = useState<'move' | 'draw'>('move');
  const [lineColor, setLineColor] = useState('#000000');
  const [dimensions, setDimensions] = useState({ width: 1200, height: 900 });
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  const CANVAS_WIDTH = 1200;
  const CANVAS_HEIGHT = 900;
  const FIELD_MARGIN = 75;
  const FIELD_WIDTH = CANVAS_WIDTH - (FIELD_MARGIN * 2);
  const FIELD_HEIGHT = CANVAS_HEIGHT - (FIELD_MARGIN * 2);

  useEffect(() => {
    const updateDimensions = () => {
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      
      // Calculate maximum dimensions while maintaining 4:3 aspect ratio
      const maxHeight = viewportHeight - 160; // Account for padding and controls
      const maxWidth = viewportWidth - 32; // Account for padding
      
      let width = maxWidth;
      let height = width * (3/4); // Maintain 4:3 aspect ratio
      
      if (height > maxHeight) {
        height = maxHeight;
        width = height * (4/3);
      }
      
      setDimensions({ width, height });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Update canvas dimensions when dimensions state changes
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = dimensions.width;
      canvasRef.current.height = dimensions.height;
    }
  }, [dimensions]);

  useEffect(() => {
    drawBoard();
  }, [players, lines, currentLine]);

   // Update player positions based on new dimensions
   useEffect(() => {
    const scalePositions = (players: Player[]): Player[] => {
      return players.map(player => ({
        ...player,
        x: (player.x / 800) * CANVAS_WIDTH,
        y: (player.y / 600) * CANVAS_HEIGHT
      }));
    };

    setPlayers(scalePositions(players));
  }, []);

  const drawBoard = (): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const CANVAS_WIDTH = dimensions.width;
    const CANVAS_HEIGHT = dimensions.height;
    const FIELD_MARGIN = Math.min(75, CANVAS_WIDTH * 0.075);
    const FIELD_WIDTH = CANVAS_WIDTH - (FIELD_MARGIN * 2);
    const FIELD_HEIGHT = CANVAS_HEIGHT - (FIELD_MARGIN * 2);


    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw pitch
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(FIELD_MARGIN, FIELD_MARGIN, FIELD_WIDTH, FIELD_HEIGHT);

    // Center circle
    ctx.beginPath();
    ctx.arc(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 75, 0, Math.PI * 2);
    ctx.stroke();

    // Center line
    ctx.beginPath();
    ctx.moveTo(CANVAS_WIDTH / 2, FIELD_MARGIN);
    ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT - FIELD_MARGIN);
    ctx.stroke();

    // Penalty areas
    const penaltyAreaWidth = 225;
    const penaltyAreaHeight = 375;
    ctx.strokeRect(FIELD_MARGIN, (CANVAS_HEIGHT - penaltyAreaHeight) / 2, penaltyAreaWidth, penaltyAreaHeight);
    ctx.strokeRect(CANVAS_WIDTH - FIELD_MARGIN - penaltyAreaWidth, (CANVAS_HEIGHT - penaltyAreaHeight) / 2, penaltyAreaWidth, penaltyAreaHeight);

    // Goalposts
    const goalWidth = 15;
    const goalHeight = 75;
    ctx.lineWidth = 4;
    
    // Left goal
    ctx.beginPath();
    ctx.moveTo(FIELD_MARGIN, (CANVAS_HEIGHT - goalHeight) / 2);
    ctx.lineTo(FIELD_MARGIN + goalWidth, (CANVAS_HEIGHT - goalHeight) / 2);
    ctx.lineTo(FIELD_MARGIN + goalWidth, (CANVAS_HEIGHT + goalHeight) / 2);
    ctx.lineTo(FIELD_MARGIN, (CANVAS_HEIGHT + goalHeight) / 2);
    ctx.stroke();

    // Right goal
    ctx.beginPath();
    ctx.moveTo(CANVAS_WIDTH - FIELD_MARGIN, (CANVAS_HEIGHT - goalHeight) / 2);
    ctx.lineTo(CANVAS_WIDTH - FIELD_MARGIN - goalWidth, (CANVAS_HEIGHT - goalHeight) / 2);
    ctx.lineTo(CANVAS_WIDTH - FIELD_MARGIN - goalWidth, (CANVAS_HEIGHT + goalHeight) / 2);
    ctx.lineTo(CANVAS_WIDTH - FIELD_MARGIN, (CANVAS_HEIGHT + goalHeight) / 2);
    ctx.stroke();

    // Draw benches
    ctx.strokeStyle = '#888888';
    ctx.lineWidth = 2;
    ctx.strokeRect(15, 45, 60, 225);
    ctx.strokeRect(CANVAS_WIDTH - 75, 45, 60, 225);

    // Draw lines and current line
    lines.forEach(line => {
      ctx.beginPath();
      ctx.strokeStyle = line.color;
      ctx.lineWidth = 2;
      ctx.moveTo(line.points[0].x, line.points[0].y);
      line.points.forEach(point => {
        ctx.lineTo(point.x, point.y);
      });
      ctx.stroke();
    });

    if (currentLine.length > 0) {
      ctx.beginPath();
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 2;
      ctx.moveTo(currentLine[0].x, currentLine[0].y);
      currentLine.forEach(point => {
        ctx.lineTo(point.x, point.y);
      });
      ctx.stroke();
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!boardRef.current) return;

    const rect = boardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (currentTool === 'draw') {
      setIsDrawing(true);
      setCurrentLine([{ x, y }]);
    } else {
      const clickedPlayer = players.find(player => 
        Math.hypot(player.x - x, player.y - y) < 15
      );
      setSelectedPlayer(clickedPlayer ?? null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!isDrawing && !selectedPlayer || !boardRef.current) return;

    const rect = boardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isDrawing) {
      setCurrentLine([...currentLine, { x, y }]);
    } else if (selectedPlayer) {
      setPlayers(players.map(p => 
        p.id === selectedPlayer.id ? { ...p, x, y } : p
      ));
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

  const handlePlayerColorChange = (team: 'home' | 'away', color: string): void => {
    setPlayers(players.map(p => 
      p.team === team ? { ...p, color } : p
    ));
  };

  return (
    <div className="h-screen overflow-hidden bg-gray-900 p-4 flex flex-col">
      <div className="flex-none">
        <div className="flex flex-wrap gap-4 mb-4">
          <button
            className={`px-4 py-2 rounded ${currentTool === 'move' ? 'bg-blue-500' : 'bg-gray-500'} text-white`}
            onClick={() => setCurrentTool('move')}
          >
            Move Players
          </button>
          <button
            className={`px-4 py-2 rounded ${currentTool === 'draw' ? 'bg-blue-500' : 'bg-gray-500'} text-white`}
            onClick={() => setCurrentTool('draw')}
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
              value={players.find(p => p.team === 'home')?.color}
              onChange={(e) => handlePlayerColorChange('home', e.target.value)}
              className="w-16 h-8"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-2">Away Team Color</label>
            <input
              type="color"
              value={players.find(p => p.team === 'away')?.color}
              onChange={(e) => handlePlayerColorChange('away', e.target.value)}
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

      <div className="flex-1 flex items-center justify-center min-h-0">
        <div 
          ref={boardRef}
          className="relative bg-green-800 w-full h-full"
          style={{
            maxWidth: `${dimensions.width}px`,
            maxHeight: `${dimensions.height}px`,
            aspectRatio: '4/3'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full"
          />
          {players.map(player => (
            <div
              key={player.id}
              className={`absolute w-12 h-12 rounded-full flex items-center justify-center text-white text-lg cursor-move ${
                player.type === 'sub' ? 'opacity-75' : ''
              }`}
              style={{
                backgroundColor: player.color,
                left: player.x - 24,
                top: player.y - 24,
                transition: selectedPlayer?.id === player.id ? 'none' : 'all 0.2s'
              }}
            >
              {player.number}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TacticsBoard;