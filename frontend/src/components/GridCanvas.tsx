// import React, { useEffect, useRef, useState } from 'react';
//
// const GridCanvas = () => {
//   const canvasRef = useRef(null);
//   const [width, setWidth] = useState(0);
//   const [height, setHeight] = useState(0);
//   const [ctx, setCtx] = useState(null);
//   const [buffer, setBuffer] = useState(null);
//   const [isBufferDirty, setIsBufferDirty] = useState(false);
//   const [isDisplayDirty, setIsDisplayDirty] = useState(false);
//
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (canvas) {
//       const context = canvas.getContext('2d');
//
//       if (context) {
//         setWidth(canvas.width);
//         setHeight(canvas.height);
//         setCtx(context);
//
//         // Initialize the buffer
//         const buffer = new ArrayBuffer(canvas.width * canvas.height * 4);
//         setBuffer(buffer);
//
//         // Add other initializations here
//
//         // Helper functions
//         const getIndexFromCoords = (x, y) => {
//           return y * width + x;
//         };
//
//         const setBufferState = (i, color) => {
//           const bufferView = new Uint32Array(buffer);
//           bufferView[i] = color;
//           setIsBufferDirty(true);
//         };
//
//         const drawBufferToDisplay = () => {
//           if (isBufferDirty) {
//             const imageData = new ImageData(new Uint8ClampedArray(buffer), width, height);
//             context.putImageData(imageData, 0, 0);
//             setIsBufferDirty(false);
//           }
//         };
//
//         // You can use these functions to draw on the canvas
//         // For example:
//         const x = 10;
//         const y = 10;
//         const color = 0xFF0000FF; // AGBR color
//         const i = getIndexFromCoords(x, y);
//         setBufferState(i, color);
//         drawBufferToDisplay();
//       }
//     }
//   }, []);
//
//   // You can add other canvas manipulation functions here
//
//   return (
//     <canvas
//       ref={canvasRef}
//       width={1000} // Set your canvas width
//       height={1000} // Set your canvas height
//       style={{ border: '1px solid black' }} // Add your styles
//     ></canvas>
//   );
// };
//
// export default GridCanvas;
