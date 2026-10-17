// Configuration de l'envoi hebdomadaire « ON A LU POUR VOUS » (variables d'environnement).

export type ModeRevue = "off" | "brouillon" | "programmer";

export interface ConfigRevue {
  mode: ModeRevue;
  apiKey: string;
  segmentId: string;
  templateId: string;
  alertes: string[];
  from?: string;
  replyTo?: string[];
  alertesFrom?: string;
  /** Numéro du premier volume, quand aucune campagne numérotée n'existe encore. */
  volumeDepart: number;
}

const VOLUME_DEPART_DEFAUT = 33;

const MODES: ModeRevue[] = ["off", "brouillon", "programmer"];

function liste(valeur: string | undefined): string[] {
  return (valeur ?? "")
    .split(/[,;]/)
    .map((v) => v.trim())
    .filter(Boolean);
}

function texte(valeur: string | undefined): string | undefined {
  const v = valeur?.trim();
  return v ? v : undefined;
}

/**
 * Lit la configuration. Renvoie aussi la liste des problèmes détectés
 * (variables obligatoires absentes, mode inconnu).
 */
export function lireConfig(env: Record<string, string | undefined> = process.env): {
  config: ConfigRevue;
  erreurs: string[];
} {
  const erreurs: string[] = [];
  const modeBrut = (texte(env.REVUE_RESEND_MODE) ?? "off").toLowerCase();
  let mode: ModeRevue = "off";
  if (MODES.includes(modeBrut as ModeRevue)) {
    mode = modeBrut as ModeRevue;
  } else {
    erreurs.push(`REVUE_RESEND_MODE invalide (« ${modeBrut} ») : attendu off, brouillon ou programmer.`);
  }

  const config: ConfigRevue = {
    mode,
    apiKey: texte(env.RESEND_API_KEY) ?? "",
    segmentId: texte(env.RESEND_SEGMENT_ID) ?? "",
    templateId: texte(env.RESEND_TEMPLATE_ID) ?? "",
    alertes: liste(env.REVUE_ALERTES),
    from: texte(env.REVUE_FROM),
    replyTo: liste(env.REVUE_REPLY_TO).length ? liste(env.REVUE_REPLY_TO) : undefined,
    alertesFrom: texte(env.REVUE_ALERTES_FROM),
    volumeDepart: VOLUME_DEPART_DEFAUT,
  };

  const depart = texte(env.REVUE_VOLUME_DEPART);
  if (depart !== undefined) {
    if (/^\d+$/.test(depart)) config.volumeDepart = Number(depart);
    else erreurs.push(`REVUE_VOLUME_DEPART invalide (« ${depart} ») : attendu un nombre entier.`);
  }

  if (!config.apiKey) erreurs.push("RESEND_API_KEY manquante.");
  if (!config.segmentId) erreurs.push("RESEND_SEGMENT_ID manquant.");
  if (!config.templateId) erreurs.push("RESEND_TEMPLATE_ID manquant.");
  if (!config.alertes.length) erreurs.push("REVUE_ALERTES manquante.");

  return { config, erreurs };
}
