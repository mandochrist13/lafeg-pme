// Logique de pagination partagée par les listes paginées côté client.

/** Nombre total de pages pour `total` éléments affichés `parPage` par page (au moins 1). */
export function nombreDePages(total: number, parPage: number): number {
  if (parPage <= 0) return 1;
  return Math.max(1, Math.ceil(total / parPage));
}

/** Tranche correspondant à une page, en ramenant la page dans les bornes. */
export function trancheDePage<T>(
  elements: T[],
  page: number,
  parPage: number
): { page: number; debut: number; elements: T[]; totalPages: number } {
  const totalPages = nombreDePages(elements.length, parPage);
  const pageCourante = Math.min(Math.max(page, 1), totalPages);
  const debut = (pageCourante - 1) * parPage;
  return {
    page: pageCourante,
    debut,
    elements: elements.slice(debut, debut + parPage),
    totalPages,
  };
}

/**
 * Numéros de page à afficher : début, fin et une fenêtre autour de la page
 * courante, avec des points de suspension quand il y a des trous.
 */
export function numerosDePage(courante: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = new Set<number>([1, total, courante]);
  if (courante - 1 > 1) pages.add(courante - 1);
  if (courante + 1 < total) pages.add(courante + 1);
  if (courante <= 3) {
    pages.add(2);
    pages.add(3);
    pages.add(4);
  }
  if (courante >= total - 2) {
    pages.add(total - 1);
    pages.add(total - 2);
    pages.add(total - 3);
  }

  const triees = [...pages].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  const resultat: (number | "...")[] = [];
  triees.forEach((n, i) => {
    if (i > 0 && n - triees[i - 1] > 1) resultat.push("...");
    resultat.push(n);
  });
  return resultat;
}
