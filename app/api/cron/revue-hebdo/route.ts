import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { lireConfig } from "@/lib/revue/config";
import { executerRevue, type ClientResend } from "@/lib/revue/run";
import { trouverPublication } from "@/lib/revue/publication";

export const dynamic = "force-dynamic";

// Appelée par Vercel Cron le dimanche à 17:00 UTC (18 h à Libreville), voir vercel.json.
// Vercel envoie automatiquement « Authorization: Bearer $CRON_SECRET ».
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { config, erreurs } = lireConfig();
  if (config.mode === "off") {
    return NextResponse.json({ statut: "off", message: "REVUE_RESEND_MODE=off : aucune action." });
  }
  if (erreurs.length) {
    console.error("[revue] Configuration incomplète :", erreurs);
    return NextResponse.json({ statut: "erreur", erreurs }, { status: 500 });
  }

  const resultat = await executerRevue({
    config,
    resend: new Resend(config.apiKey) as unknown as ClientResend,
    trouverPublication,
  });
  console.log("[revue]", JSON.stringify(resultat));
  return NextResponse.json(resultat, { status: resultat.statut === "erreur" ? 500 : 200 });
}
