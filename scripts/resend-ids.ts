// Liste les segments et les modèles Resend avec leurs identifiants.
// Usage : pnpm resend:ids  (lit RESEND_API_KEY dans .env.local ou .env)
import { config as chargerEnv } from "dotenv";
import { Resend } from "resend";

chargerEnv({ path: [".env.local", ".env"], quiet: true });

async function main() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY manquante (.env.local, .env ou variable d'environnement).");
    process.exit(1);
  }
  const resend = new Resend(apiKey);

  const segments = await resend.segments.list({ limit: 100 });
  if (segments.error) throw new Error(`Segments : ${segments.error.message}`);
  console.log("\nSegments (RESEND_SEGMENT_ID)");
  console.table(segments.data.data.map((s) => ({ id: s.id, nom: s.name })));

  const modeles = await resend.templates.list({ limit: 100 });
  if (modeles.error) throw new Error(`Modèles : ${modeles.error.message}`);
  console.log("\nModèles (RESEND_TEMPLATE_ID)");
  console.table(modeles.data.data.map((t) => ({ id: t.id, nom: t.name, statut: t.status, alias: t.alias ?? "" })));
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
