// Préfixe un chemin interne avec le « base path » du site :
// « / » sur OVH, « /Via_citadina » sur GitHub Pages.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function url(chemin: string): string {
  return base + (chemin.startsWith('/') ? chemin : `/${chemin}`);
}
