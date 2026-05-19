import React, { useState, useMemo } from 'react';
import { StudyDay } from '@/types/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ZoomIn, ZoomOut, Clock, Target, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ConceptMapProps {
  plan: StudyDay[];
  onSelectDay: (dayNumber: number) => void;
}

export function ConceptMap({ plan, onSelectDay }: ConceptMapProps) {
  const [zoom, setZoom] = useState(1);
  const [selectedDay, setSelectedDay] = useState<StudyDay | null>(null);

  if (!plan || plan.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-muted-foreground">
        No study plan available to visualize.
      </div>
    );
  }

  const currentDay = useMemo(() => {
    return plan.find(day => !day.completed) || plan[plan.length - 1];
  }, [plan]);

  const nodeWidth = 200;
  const nodeHeight = 90;
  const gapX = 120;
  const startX = 60;
  const startY = 150;

  const nodes = plan.map((day, i) => ({
    ...day,
    x: startX + i * (nodeWidth + gapX),
    y: startY,
  }));

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return '#10b981';
      case 'Medium': return '#f59e0b';
      case 'Hard': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const svgWidth = startX + plan.length * (nodeWidth + gapX);

  return (
    <div className="relative border rounded-xl bg-muted/30 overflow-hidden h-[450px]">
      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <Button size="icon" variant="secondary" onClick={() => setZoom(prev => Math.min(2, prev + 0.1))}>
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="secondary" onClick={() => setZoom(prev => Math.max(0.5, prev - 0.1))}>
          <ZoomOut className="h-4 w-4" />
        </Button>
      </div>

      <div className="w-full h-full overflow-auto p-8">
        <div 
          style={{ 
            width: `${svgWidth * zoom}px`,
            height: '100%',
            transform: `scale(${zoom})`,
            transformOrigin: 'top left',
            transition: 'transform 0.2s ease-out'
          }}
          className="relative"
        >
          <svg width={svgWidth} height={400} className="overflow-visible">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                refX="0" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
              </marker>
            </defs>

            {/* Arrows */}
            {nodes.map((node, i) => {
              if (i === nodes.length - 1) return null;
              const next = nodes[i + 1];
              return (
                <line 
                  key={`arrow-${i}`}
                  x1={node.x + nodeWidth} 
                  y1={node.y + nodeHeight / 2} 
                  x2={next.x - 10} 
                  y2={next.y + nodeHeight / 2} 
                  stroke="#94a3b8" 
                  strokeWidth="2" 
                  markerEnd="url(#arrowhead)" 
                />
              );
            })}

            {/* Nodes */}
            {nodes.map((node) => {
              const isActive = node.dayNumber === currentDay.dayNumber;
              const isCompleted = node.completed;
              
              return (
                <g 
                  key={node.dayNumber} 
                  className="cursor-pointer group"
                  onClick={() => setSelectedDay(node)}
                >
                  {/* Glow effect for active node */}
                  {isActive && (
                    <rect
                      x={node.x - 4}
                      y={node.y - 4}
                      width={nodeWidth + 8}
                      height={nodeHeight + 8}
                      rx={14}
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="3"
                      className="animate-pulse"
                      style={{ filter: 'blur(4px)' }}
                    />
                  )}
                  
                  <rect
                    x={node.x}
                    y={node.y}
                    width={nodeWidth}
                    height={nodeHeight}
                    rx={12}
                    fill="hsl(var(--card))"
                    stroke={isActive ? 'hsl(var(--primary))' : 'hsl(var(--border))'}
                    strokeWidth="2"
                    className="transition-all group-hover:shadow-md"
                  />
                  
                  {/* Status indicator line */}
                  <rect
                    x={node.x}
                    y={node.y}
                    width={nodeWidth}
                    height={6}
                    rx={3}
                    fill={getDifficultyColor(node.difficulty)}
                  />

                  <text 
                    x={node.x + 12} 
                    y={node.y + 30} 
                    fill="hsl(var(--muted-foreground))"
                    className="text-[10px] font-bold uppercase tracking-wider"
                  >
                    Day {node.dayNumber}
                  </text>
                  
                  <text
                    x={node.x + 12}
                    y={node.y + 50}
                    fill="hsl(var(--foreground))"
                    className="text-xs font-semibold leading-tight"
                  >
                    {node.topics[0]}
                  </text>

                  {/* Completed checkmark */}
                  {isCompleted && (
                    <text
                      x={node.x + nodeWidth - 22}
                      y={node.y + 22}
                      fill="#10b981"
                      fontSize="14"
                    >
                      &#10003;
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Popup Overlay */}
      <AnimatePresence>
        {selectedDay && (
          <div className="absolute inset-0 flex items-center justify-center p-4 bg-background/20 backdrop-blur-sm z-20">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <Card className="w-full max-w-sm shadow-2xl border-primary/20">
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge variant="secondary" className="mb-1">Day {selectedDay.dayNumber}</Badge>
                      <h3 className="text-lg font-bold leading-tight">{selectedDay.topics[0]}</h3>
                    </div>
                    <Badge style={{ backgroundColor: getDifficultyColor(selectedDay.difficulty), color: 'white' }}>
                      {selectedDay.difficulty}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{selectedDay.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Target className="h-4 w-4" />
                      <span>{selectedDay.difficulty} Level</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      className="flex-1" 
                      onClick={() => {
                        onSelectDay(selectedDay.dayNumber);
                        setSelectedDay(null);
                      }}
                    >
                      Start this topic
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="ghost" onClick={() => setSelectedDay(null)}>Close</Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
