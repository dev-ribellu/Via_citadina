import { fr } from './fr';

export const langues = { fr } as const;
export type Langue = keyof typeof langues;

export function useTraductions(langue: Langue = 'fr') {
  return langues[langue];
}
