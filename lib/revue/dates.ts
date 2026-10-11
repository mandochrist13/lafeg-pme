// Calculs de dates. Libreville est en UTC+1 toute l'année (pas d'heure d'été) :
// lundi 9 h à Libreville = lundi 08:00:00Z.

const HEURE_ENVOI_UTC = 8;
const JOUR = 24 * 60 * 60 * 1000;

/** Premier lundi 08:00:00Z strictement postérieur à `maintenant`. */
export function lundiSuivant(maintenant: Date): Date {
  const candidat = new Date(
    Date.UTC(maintenant.getUTCFullYear(), maintenant.getUTCMonth(), maintenant.getUTCDate(), HEURE_ENVOI_UTC)
  );
  const decalage = (1 - candidat.getUTCDay() + 7) % 7;
  candidat.setUTCDate(candidat.getUTCDate() + decalage);
  if (candidat.getTime() <= maintenant.getTime()) candidat.setUTCDate(candidat.getUTCDate() + 7);
  return candidat;
}

/**
 * Début de la fenêtre de téléversement : le lundi précédant l'envoi,
 * à 0 h heure de Libreville (dimanche 23:00Z).
 */
export function debutFenetre(lundi: Date): Date {
  return new Date(lundi.getTime() - 7 * JOUR - (HEURE_ENVOI_UTC + 1) * 60 * 60 * 1000);
}

const deux = (n: number) => String(n).padStart(2, "0");

/** « JJ/MM » (date à Libreville). */
export function jjmm(date: Date): string {
  const d = new Date(date.getTime() + 60 * 60 * 1000);
  return `${deux(d.getUTCDate())}/${deux(d.getUTCMonth() + 1)}`;
}

/** « JJ/MM/AAAA » (date à Libreville). */
export function jjmmaaaa(date: Date): string {
  const d = new Date(date.getTime() + 60 * 60 * 1000);
  return `${jjmm(date)}/${d.getUTCFullYear()}`;
}
