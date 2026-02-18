import { transformProject, Project } from "../models/project";

const API_URL =
  "https://strapi-portafolio-production.up.railway.app/api/projects?populate=*";
export async function getProjects(): Promise<Project[]> {
  const res = await fetch(API_URL, { cache: "no-store" });

  if (!res.ok) throw new Error("Error al conectar con Strapi");

  const json = await res.json();

  // We use the Model to clean every item in the array
  return json.data.map(transformProject);
}
