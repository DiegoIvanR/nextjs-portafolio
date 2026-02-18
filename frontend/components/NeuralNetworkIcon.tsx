import { useMemo } from "react";
import styles from "./NeuralNetworkIcon.module.css";

export function NeuralNetworkIcon() {
  const WIDTH = 1200;
  const HEIGHT = 800;

  const { staticPath, layers, nodes } = useMemo(() => {
    // 1. Generate Nodes
    const generateNodes = (count: number, cx: number) => {
      return Array.from({ length: count }).map((_, i) => ({
        cx,
        cy: (HEIGHT / (count + 1)) * (i + 1),
        key: `node-${cx}-${i}`,
      }));
    };

    const l1 = generateNodes(3, 120); // Input
    const l2 = generateNodes(5, 400); // Hidden 1
    const l3 = generateNodes(4, 680); // Hidden 2
    const l4 = generateNodes(2, 960); // Output

    const allNodes = [...l1, ...l2, ...l3, ...l4];

    // 2. Helper to generate path strings
    const generatePathData = (layerA: typeof l1, layerB: typeof l1) => {
      let d = "";
      layerA.forEach((nodeA) => {
        layerB.forEach((nodeB) => {
          d += `M ${nodeA.cx} ${nodeA.cy} L ${nodeB.cx} ${nodeB.cy} `;
        });
      });
      return d;
    };

    // 3. Create Layer Data
    // We create separate path strings for each "stage" of the network
    const connectionL1 = generatePathData(l1, l2);
    const connectionL2 = generatePathData(l2, l3);
    const connectionL3 = generatePathData(l3, l4);

    // This combines them all for the faint background
    const fullStaticPath = connectionL1 + connectionL2 + connectionL3;

    return {
      staticPath: fullStaticPath,
      layers: [connectionL1, connectionL2, connectionL3],
      nodes: allNodes,
    };
  }, []);

  return (
    <div className={styles.container}>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svg}
      >
        <defs>
          <linearGradient
            id="neural-gradient"
            x1="0"
            y1="0"
            x2={WIDTH}
            y2={HEIGHT}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#64ffda" />
            <stop offset="0.5" stopColor="#64ffda" />
            <stop offset="1" stopColor="#64ffda" />
          </linearGradient>
        </defs>

        {/* LAYER 1: Static Background (One single path for max performance) */}
        <path
          d={staticPath}
          stroke="url(#neural-gradient)"
          strokeOpacity="0.15"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* LAYER 2: Active Layers (Animated Sequentially) */}
        {layers.map((pathData, index) => (
          <path
            key={`layer-${index}`}
            d={pathData}
            stroke="url(#neural-gradient)"
            strokeOpacity="1"
            strokeWidth="1.5"
            strokeLinecap="round"
            className={styles.activeLayer}
            style={{
              // This creates the stagger effect:
              // Layer 0 starts at 0s
              // Layer 1 starts at 0.6s
              // Layer 2 starts at 1.2s
              animationDelay: `${index * 1.2}s`,
            }}
          />
        ))}

        {/* LAYER 3: Nodes */}
        {nodes.map((node) => (
          <circle
            key={node.key}
            cx={node.cx}
            cy={node.cy}
            r="8"
            fill="#64ffda"
            className={styles.node}
          />
        ))}
      </svg>
    </div>
  );
}
