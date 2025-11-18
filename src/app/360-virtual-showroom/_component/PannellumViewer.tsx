"use client";

import React, { useEffect, useRef } from 'react';

interface PannellumViewerProps {
    floorImage: string;
    height: string;
}

const PannellumViewer: React.FC<PannellumViewerProps> = ({ floorImage, height }) => {
    const viewerRef = useRef<HTMLDivElement>(null);
    const pannellumInstanceRef = useRef<any>(null);

    useEffect(() => {
        // Dynamically load Pannellum CSS
        if (!document.getElementById('pannellum-css')) {
            const link = document.createElement('link');
            link.id = 'pannellum-css';
            link.rel = 'stylesheet';
            link.href = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css';
            document.head.appendChild(link);
        }

        // Dynamically load Pannellum JS
        const loadPannellum = () => {
            if ((window as any).pannellum && viewerRef.current) {
                // Destroy previous instance if exists
                if (pannellumInstanceRef.current) {
                    pannellumInstanceRef.current.destroy();
                }

                // Create new viewer
                pannellumInstanceRef.current = (window as any).pannellum.viewer(viewerRef.current, {
                    type: 'equirectangular',
                    panorama: floorImage,
                    autoLoad: true,
                    showControls: true,
                    showFullscreenCtrl: true,
                    showZoomCtrl: true,
                    mouseZoom: true,
                    draggable: true,
                    crossOrigin: 'anonymous',
                    hfov: 100,
                    pitch: 0,
                    yaw: 0,
                });
            }
        };

        if (!(window as any).pannellum) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js';
            script.async = true;
            script.onload = loadPannellum;
            document.body.appendChild(script);
        } else {
            loadPannellum();
        }

        // Cleanup
        return () => {
            if (pannellumInstanceRef.current) {
                pannellumInstanceRef.current.destroy();
            }
        };
    }, [floorImage]);

    return (
        <div className='mt-10 rounded-lg overflow-hidden' style={{ height: height, width: '100%' }}>
            <div ref={viewerRef} style={{ width: '100%', height: '100%' }} />
        </div>
    );
};

export default PannellumViewer;
