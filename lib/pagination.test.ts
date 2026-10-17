import { describe, expect, it } from "vitest";
import { nombreDePages, numerosDePage, trancheDePage } from "./pagination";

// Jeu de données représentatif : les 31 actualités du Guide.
const articles = Array.from({ length: 31 }, (_, i) => `article-${i + 1}`);
const PAR_PAGE = 9;

describe("nombreDePages", () => {
  it("arrondit au supérieur", () => {
    expect(nombreDePages(31, 9)).toBe(4);
    expect(nombreDePages(27, 9)).toBe(3);
    expect(nombreDePages(28, 9)).toBe(4);
  });

  it("renvoie toujours au moins une page, même sans élément", () => {
    expect(nombreDePages(0, 9)).toBe(1);
  });
});

describe("trancheDePage", () => {
  it("découpe les 31 actualités en 4 pages sans perte ni doublon", () => {
    const vues: string[] = [];
    for (let p = 1; p <= 4; p++) {
      vues.push(...trancheDePage(articles, p, PAR_PAGE).elements);
    }
    expect(vues).toEqual(articles);
    expect(new Set(vues).size).toBe(31);
  });

  it("donne 9 articles par page et le reste sur la dernière", () => {
    expect(trancheDePage(articles, 1, PAR_PAGE).elements).toHaveLength(9);
    expect(trancheDePage(articles, 3, PAR_PAGE).elements).toHaveLength(9);
    expect(trancheDePage(articles, 4, PAR_PAGE).elements).toHaveLength(4);
  });

  it("la page 2 commence bien après la page 1 (actualités précédentes)", () => {
    const p1 = trancheDePage(articles, 1, PAR_PAGE);
    const p2 = trancheDePage(articles, 2, PAR_PAGE);
    expect(p1.elements[0]).toBe("article-1");
    expect(p2.elements[0]).toBe("article-10");
    expect(p2.debut).toBe(9);
  });

  it("ramène une page hors bornes dans l'intervalle valide", () => {
    expect(trancheDePage(articles, 99, PAR_PAGE).page).toBe(4);
    expect(trancheDePage(articles, 0, PAR_PAGE).page).toBe(1);
    expect(trancheDePage(articles, -3, PAR_PAGE).page).toBe(1);
  });

  it("gère une liste filtrée vide", () => {
    const r = trancheDePage([], 1, PAR_PAGE);
    expect(r.elements).toEqual([]);
    expect(r.totalPages).toBe(1);
    expect(r.page).toBe(1);
  });
});

describe("numerosDePage", () => {
  it("affiche toutes les pages quand il y en a peu", () => {
    expect(numerosDePage(1, 4)).toEqual([1, 2, 3, 4]);
    expect(numerosDePage(3, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("insère des points de suspension sur un grand nombre de pages", () => {
    expect(numerosDePage(1, 20)).toEqual([1, 2, 3, 4, "...", 20]);
    expect(numerosDePage(10, 20)).toEqual([1, "...", 9, 10, 11, "...", 20]);
    expect(numerosDePage(20, 20)).toEqual([1, "...", 17, 18, 19, 20]);
  });

  it("contient toujours la page courante, la première et la dernière", () => {
    for (const courante of [1, 2, 7, 13, 19, 20]) {
      const pages = numerosDePage(courante, 20);
      expect(pages).toContain(courante);
      expect(pages).toContain(1);
      expect(pages).toContain(20);
    }
  });

  it("ne produit ni doublon ni numéro hors bornes", () => {
    for (const total of [8, 12, 25]) {
      for (let courante = 1; courante <= total; courante++) {
        const pages = numerosDePage(courante, total);
        const nombres = pages.filter((n): n is number => typeof n === "number");
        expect(new Set(nombres).size).toBe(nombres.length);
        expect(Math.min(...nombres)).toBeGreaterThanOrEqual(1);
        expect(Math.max(...nombres)).toBeLessThanOrEqual(total);
        expect([...nombres].sort((a, b) => a - b)).toEqual(nombres);
      }
    }
  });
});
