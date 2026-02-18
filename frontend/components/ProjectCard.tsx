import { Project } from "../models/project";
import styles from "./ProjectCard.module.css";
import { Inter } from "next/font/google";
// Importamos los íconos de la librería que acabas de instalar
import { FaFigma, FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "400", "600"], // Agregué pesos extra por si acaso
});

export function ProjectCard({ project }: { project: Project }) {
  console.log(project);
  return (
    <article className={styles.card}>
      {/* Imagen */}
      {project.imageUrl && (
        <div className={styles.imageWrapper}>
          <img
            src={project.imageUrl}
            alt={project.title}
            className={styles.image}
          />
        </div>
      )}

      {/* Contenido */}
      <div className={styles.content}>
        <h2 className={styles.title}>{project.title}</h2>

        {/* Usamos inter.className para la fuente fina que pediste */}
        <p className={`${styles.description} ${inter.className}`}>
          {project.description}
        </p>

        {/* --- AQUÍ ESTÁN LOS NUEVOS LINKS --- */}
        <div className={styles.footer}>
          <div className={styles.icons}>
            {/* FIGMA: Solo se muestra si existe el link */}
            {project.figmaLink && (
              <a
                href={project.figmaLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.iconLink} ${styles.figma}`}
                aria-label="Ver diseño en Figma"
              >
                <FaFigma size={20} />
              </a>
            )}

            {/* GITHUB: Solo se muestra si existe el link */}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.iconLink} ${styles.github}`}
                aria-label="Ver código en GitHub"
              >
                <FaGithub size={20} />
              </a>
            )}
          </div>

          {/* DEMO: Botón de texto más llamativo */}
          {project.webLink && (
            <a
              href={project.webLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.demoLink}
            >
              Demo <FaExternalLinkAlt size={12} style={{ marginLeft: "6px" }} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
