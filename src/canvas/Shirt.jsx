import React from 'react'
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';

import state from '../store';

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/cup.glb');

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  useFrame((state, delta) => easing.dampC(materials['Material.001'].color, snap.color, 0.25, delta));

  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
      <mesh
        castShadow
        geometry={nodes.Cup.geometry}
        material={materials['Material.001']}
        material-roughness={1}
        scale={[0.4, 0.4, 0.4]}
        dispose={null}
      >
        {snap.isLogoTexture && (
          <Decal 
            position={[0, 0, 0.4]}
            rotation={[0, 0, 0]}
            scale={1.5}
            map={logoTexture}
            // map-anisotropy={16}
             depthTest={false}
             depthWrite={true}
          />
        )} 
      </mesh>
    </group>
  )
}

export default Shirt