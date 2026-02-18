"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { ProjectCard } from "./ProjectCard";
import styles from "@/app/page.module.css";
import skeletonStyles from "./ProjectSkeleton.module.css";
import { Project } from "../models/project";
interface ProjectTabsProps {
  initialProjects: Project[];
}

export default function ProjectTabs({ initialProjects }: ProjectTabsProps) {
  // Use the data passed from the server
  const [projects] = useState(initialProjects || []);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: "start", loop: false },
    [WheelGesturesPlugin()]
  );

  // Re-init Embla when the component mounts with the data
  useEffect(() => {
    if (emblaApi) emblaApi.reInit();
  }, [emblaApi, projects]);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>React Projects</h1>
      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.embla__container}>
          {projects.map((project) => (
            <div className={styles.embla__slide} key={project.id}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
