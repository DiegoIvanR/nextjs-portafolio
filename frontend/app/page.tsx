// app/page.tsx (NO "use client" here!)
import { getProjects } from "../services/projectService";
import { NeuralNetworkIcon } from "@/components/NeuralNetworkIcon";
import styles from "./page.module.css";
import { Inter, Sometype_Mono } from "next/font/google";
import ProjectTabs from "@/components/ProjectTab";

const inter = Inter({ subsets: ["latin"], weight: ["200"] });
const sometype = Sometype_Mono({ subsets: ["latin"], weight: ["700"] });

// Server Components CAN be async
export default async function Home() {
  const projects = await getProjects();

  return (
    <main className={`${styles.main} ${sometype.className}`}>
      <div className={styles.container}>
        <div className={styles.doubleColumn}>
          <div className={styles.header}>
            <h1 className={styles.presentation}>Hi, I am</h1>
            <h1 className={styles.name}>Diego Rodriguez</h1>
            <p className={`${styles.aboutMe} ${inter.className}`}>
              CS @ ITESM with a deep interest in Computer Vision and Machine
              Learning. I like building scalable full-stack applications and
              high-accuracy AI models to solve real-world challenges.
            </p>
          </div>
          <div className={styles.svgContainer}>
            <NeuralNetworkIcon />
          </div>
        </div>

        {/* We pass the data into the client component here */}
        <ProjectTabs initialProjects={projects} />
      </div>
    </main>
  );
}
