import React, {useEffect, useRef, useState} from 'react';
import {Container, Graphics, Stage} from '@pixi/react';
import * as PIXI from 'pixi.js';
import Viewport from './Viewport';
import {useSocketStore} from "../store/socketStore.ts";

const GridComponent: React.FC = () => {
    const viewportRef = useRef<any | null>(null);
    const [isViewportReady, setViewportReady] = useState(false);

    const gridSize = 1000;
    const cellSize = 10;
    const borderSize = 0.5; // Adjust the border size as needed
    const gridRows = gridSize / cellSize;
    const gridCols = gridSize / cellSize;

    const gridColors = useSocketStore((state) => state.grid);

    useEffect(() => {
        if (viewportRef.current) {
            setViewportReady(true);
        }
    }, [viewportRef.current]);

    const renderGrid = (graphics: PIXI.Graphics) => {
        if (!isViewportReady) {
            return null; // or some loading state/rendering
        }
        if (gridColors.length === 0) {
            return null;
        }
        const zoom = viewportRef.current.scale.x;
        const interval = cellSize * zoom;

        for (let i = 0; i < gridRows; i++) {
            for (let j = 0; j < gridCols; j++) {
                const x = i * interval;
                const y = j * interval;

                graphics.lineStyle(borderSize, 0x000000, 1); // Set the border color and size
                graphics.beginFill(gridColors[j][i]);
                graphics.drawRect(x, y, interval, interval);
                graphics.endFill();
            }
        }
        graphics.position.x = (innerWidth / 2) - (graphics.width / 2);
        graphics.position.y = (innerHeight / 2) - (graphics.height / 2);
    };

    return (
        <Stage width={innerWidth} height={800} options={{backgroundColor: 0xffffff}}>
            <Viewport ref={viewportRef} width={innerWidth} height={800}>
                <Container>
                    <Graphics draw={renderGrid}/>
                </Container>
            </Viewport>
        </Stage>
    );
};

export default GridComponent;
