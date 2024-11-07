import React from "react";
import { useGLTF } from "@react-three/drei";

// Preload the GLTF model before the component
useGLTF.preload('../../assets/nexbot_robot_character_concept.glb');

export default function Model(props) {
  const { nodes, materials } = useGLTF('../../assets/nexbot_robot_character_concept.glb');

  return (
    // This centers and frames the model
    <group {...props} dispose={null}>
      <mesh 
        geometry={nodes.Object_4.geometry} 
        material={materials['Scene_-_Root']} 
      />
    </group>
  );
}
