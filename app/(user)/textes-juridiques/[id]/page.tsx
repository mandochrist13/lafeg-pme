// pages/mes-livres/index.tsx
import Link from "next/link";

const livres = [
  { id: "livre1", titre: "Titre du Livre 1", chemin: "sant-" },
  { id: "livre2", titre: "Titre du Livre 2", chemin: "sa-" },
];

export default function MesLivres() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📚 Mes livres</h1>
      <ul className="space-y-2">
        {livres.map((livre) => (
          <li key={livre.id}>
            <Link
              href={`/flowpapper/${livre.chemin}/index.html`}
              target="_blank"
              className="text-blue-600 underline hover:text-blue-800"
            >
              {livre.titre}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
