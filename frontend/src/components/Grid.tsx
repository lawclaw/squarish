// import React, { useRef, useEffect, useState } from 'react';
//
// interface GridCanvasProps {
//   grid: (string | undefined)[][];
// }
//
// const GridCanvas: React.FC<GridCanvasProps> = ({ grid }) => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [scale, setScale] = useState<number>(1);
//   const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
//   const [currentColor, setCurrentColor] = useState<string | undefined>(undefined);
//
//   const cellSize = 20;
//
//   const gridWidth = grid[0].length * cellSize;
//   const gridHeight = grid.length * cellSize;
//
//   const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//
//     // Calculate the position of the click relative to the canvas
//     const clickX = e.nativeEvent.offsetX / scale + position.x;
//     const clickY = e.nativeEvent.offsetY / scale + position.y;
//
//     // Calculate the row and column for the clicked square
//     const row = Math.floor(clickY / (cellSize * scale));
//     const column = Math.floor(clickX / (cellSize * scale));
//
//     if (row >= 0 && row < grid.length && column >= 0 && column < grid[0].length) {
//       const color = grid[row][column];
//       setCurrentColor(color || 'white'); // Default to white if color is not defined
//       console.log(`Color of square at row ${row}, column ${column}: ${color || 'white'}`);
//     } else {
//       setCurrentColor('white');
//       console.log(`Clicked outside the grid: White`);
//     }
//   };
//
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//
//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;
//
//     // Clear the canvas
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//
//     // Draw grid cells with colors
//     grid.forEach((row, rowIndex) => {
//       row.forEach((cellColor, columnIndex) => {
//         const cellX = columnIndex * cellSize * scale - position.x;
//         const cellY = rowIndex * cellSize * scale - position.y;
//
//         ctx.fillStyle = cellColor || 'white'; // Default to white if color is not defined
//         ctx.fillRect(cellX, cellY, cellSize * scale, cellSize * scale);
//       });
//     });
//
//     // Set the stroke style for grid lines
//     ctx.strokeStyle = 'gray';
//
//     // Draw horizontal grid lines
//     for (let y = -position.y % (cellSize * scale); y < canvas.height; y += cellSize * scale) {
//       ctx.beginPath();
//       ctx.moveTo(0, y);
//       ctx.lineTo(canvas.width, y);
//       ctx.stroke();
//     }
//
//     // Draw vertical grid lines
//     for (let x = -position.x % (cellSize * scale); x < canvas.width; x += cellSize * scale) {
//       ctx.beginPath();
//       ctx.moveTo(x, 0);
//       ctx.lineTo(x, canvas.height);
//       ctx.stroke();
//     }
//   }, [position, scale, grid]);
//
//   const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
//     const scaleBy = 1.05;
//     const newScale = e.deltaY > 0 ? scale / scaleBy : scale * scaleBy;
//
//     // Ensure the scale remains within a certain range (e.g., between 0.1 and 10)
//     const clampedScale = Math.min(10, Math.max(0.1, newScale));
//
//     setScale(clampedScale);
//   };
//
//   const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     if (e.buttons === 1) {
//       // Calculate the new position while considering boundaries
//       const newX = Math.min(
//         0,
//         Math.max(-gridWidth * scale + window.innerWidth, position.x - e.movementX / scale)
//       );
//       const newY = Math.min(
//         0,
//         Math.max(-gridHeight * scale + window.innerHeight, position.y - e.movementY / scale)
//       );
//
//       setPosition({ x: newX, y: newY });
//     }
//   };
//
//   return (
//     <div>
//       <canvas
//         ref={canvasRef}
//         width={window.innerWidth}
//         height={window.innerHeight}
//         style={{
//           border: '1px solid black',
//           cursor: 'grab',
//           transform: `scale(${scale})`,
//           transformOrigin: 'top left',
//         }}
//         onWheel={handleWheel}
//         onMouseMove={handleMouseMove}
//         onClick={handleClick}
//       />
//     </div>
//   );
// };
//
// export default GridCanvas;
