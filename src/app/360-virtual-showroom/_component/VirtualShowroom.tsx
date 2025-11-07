import React, { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Define props for the ShowroomScene component
interface ShowroomSceneProps {
    floorImage: string;
    wallImages: [string, string, string]; // Tuple for exactly 3 images
}

const ShowroomScene: React.FC<ShowroomSceneProps> = ({ floorImage, wallImages }) => {
    const floorTexture = useLoader(THREE.TextureLoader, floorImage);
    const wallTextures = useLoader(THREE.TextureLoader, wallImages);
    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 10, 7]} intensity={1} />

            {/* Floor */}
            <mesh rotation-x={-Math.PI / 2} position={[0, -2.5, 0]}>
                <planeGeometry args={[10, 10]} />
                <meshStandardMaterial map={floorTexture} />
            </mesh>

            {/* Front wall */}
            <mesh position={[0, 1.5, -5]}>
                <planeGeometry args={[10, 8]} />
                <meshStandardMaterial map={wallTextures[2]} />
            </mesh>

            {/* Left wall */}
            <mesh position={[-5, 1.5, 0]} rotation={[0, Math.PI / 2, 0]}>
                <planeGeometry args={[10, 8]} />
                <meshStandardMaterial map={wallTextures[0]} />
            </mesh>

            {/* Right wall */}
            <mesh position={[5, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
                <planeGeometry args={[10, 8]} />
                <meshStandardMaterial map={wallTextures[1]} />
            </mesh>

            {/* Back wall (reusing wall3) */}
            <mesh position={[0, 1.5, 5]} rotation={[0, Math.PI, 0]}>
                <planeGeometry args={[10, 8]} />
                <meshStandardMaterial map={wallTextures[2]} />
            </mesh>

            {/* Ceiling */}
            <mesh rotation-x={Math.PI / 2} position={[0, 5, 0]}>
                <planeGeometry args={[10, 10]} />
                <meshStandardMaterial color="#f5f5f5" />
            </mesh>

            {/* Orbit Controls */}
            <OrbitControls
                enablePan={false}
                minDistance={2}
                maxDistance={6}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI / 2}
            />
        </>
    );
};

// Define props for the VirtualShowroom360 component
interface VirtualShowroom360Props {
    floorImage: string;
    height: string;
    wallImages: [string, string, string] | any;
}

const VirtualShowroom360: React.FC<VirtualShowroom360Props> = ({ floorImage, height, wallImages }) => {
    return (
        <div className='mt-10 rounded-lg overflow-hidden' style={{ height: height, width: '100%' }}>
            <Canvas camera={{ position: [0, 1.5, 4], fov: 75 }}>
                <Suspense fallback={null}>
                    <ShowroomScene floorImage={floorImage} wallImages={wallImages} />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default VirtualShowroom360;
