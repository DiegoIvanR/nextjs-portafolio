const STRAPI_URL = "http://strapi-portafolio-production.up.railway.app";

// 1. Actualizamos la Interfaz (El contrato de datos)
export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string | null;
  // Nuevos campos (pueden ser null si no llenaste el link en Strapi)
  figmaLink: string | null;
  githubLink: string | null;
  webLink: string | null;
}

// 2. Data Transformer: Convierte el JSON sucio de Strapi en un objeto limpio
export function transformProject(data: any): Project {
  // Strapi v5 a veces devuelve la info directa o dentro de 'attributes'
  const attributes = data.attributes || data;
  const imgData = attributes.Cover_Image;

  // Lógica para Texto Enriquecido o texto simple
  const descText = Array.isArray(attributes.Description)
    ? attributes.Description[0]?.children[0]?.text
    : attributes.Description;

  return {
    id: data.id,
    title: attributes.Title,
    description: descText || "Sin descripción",
    imageUrl: imgData?.url ? `${STRAPI_URL}${imgData.url}` : null,

    // Mapeo de los links (Cuidado con las mayúsculas, deben coincidir con Strapi)
    figmaLink: attributes.Figma_link || null,
    githubLink: attributes.Github_link || null,
    webLink: attributes.Web_link || null,
  };
}
