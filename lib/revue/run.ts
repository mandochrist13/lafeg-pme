// Tâche hebdomadaire : programme via Resend la campagne « ON A LU POUR VOUS »
// du lundi suivant (9 h, Libreville) à partir du modèle Resend publié.

import type { ConfigRevue } from "./config";
import { debutFenetre, jjmm, jjmmaaaa, lundiSuivant } from "./dates";
import { garantirDesinscription } from "./html";

export const PREFIXE_CAMPAGNE = "ON A LU POUR VOUS";

type ReponseResend<T> = { data: T; error: null } | { data: null; error: { message: string; name?: string } };

/** Sous-ensemble du client Resend utilisé (permet de le simuler dans les tests). */
export interface ClientResend {
  templates: {
    get(id: string): Promise<
      ReponseResend<{
        status: "draft" | "published";
        html: string | null;
        subject: string | null;
        from: string | null;
        reply_to: string[] | null;
      }>
    >;
  };
  broadcasts: {
    list(options?: { limit?: number; after?: string }): Promise<
      ReponseResend<{
        has_more: boolean;
        data: { id: string; name: string; status: string; scheduled_at: string | null }[];
      }>
    >;
    create(payload: Record<string, unknown>): Promise<ReponseResend<{ id: string }>>;
  };
  emails: {
    send(payload: { from: string; to: string[]; subject: string; html: string; text: string }): Promise<
      ReponseResend<{ id: string }>
    >;
  };
}

export type StatutRevue = "off" | "programmee" | "brouillon" | "doublon" | "pas-de-publication" | "erreur";

export interface ResultatRevue {
  statut: StatutRevue;
  lundi?: string;
  broadcastId?: string;
  message: string;
  avertissements: string[];
  compteRenduEnvoye: boolean;
}

export interface OptionsRevue {
  config: ConfigRevue;
  resend: ClientResend;
  maintenant?: Date;
  /**
   * Renvoie la date de la dernière publication « ON A LU POUR VOUS » téléversée
   * depuis `depuis`, ou null s'il n'y en a pas.
   */
  trouverPublication: (depuis: Date) => Promise<Date | null>;
}

class ErreurRevue extends Error {}

function verifier<T>(reponse: ReponseResend<T>, action: string): T {
  if (reponse.error) throw new ErreurRevue(`${action} : ${reponse.error.message}`);
  return reponse.data as T;
}

const echapper = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function executerRevue({
  config,
  resend,
  maintenant = new Date(),
  trouverPublication,
}: OptionsRevue): Promise<ResultatRevue> {
  if (config.mode === "off") {
    return { statut: "off", message: "REVUE_RESEND_MODE=off : aucune action.", avertissements: [], compteRenduEnvoye: false };
  }

  const lundi = lundiSuivant(maintenant);
  const nom = `${PREFIXE_CAMPAGNE} — ${jjmmaaaa(lundi)}`;
  const avertissements: string[] = [];
  let expediteurModele: string | undefined;

  let resultat: Omit<ResultatRevue, "compteRenduEnvoye">;
  try {
    // 1. Un document a-t-il été téléversé depuis le lundi précédent ?
    const depuis = debutFenetre(lundi);
    const publication = await trouverPublication(depuis);
    if (!publication) {
      resultat = {
        statut: "pas-de-publication",
        lundi: lundi.toISOString(),
        message: `Aucune publication « ON A LU POUR VOUS » téléversée sur le Guide depuis le lundi ${jjmm(depuis)} : rien n'a été programmé pour lundi ${jjmm(lundi)}.`,
        avertissements,
      };
    } else {
      // 2. Lecture du modèle Resend.
      const modele = verifier(await resend.templates.get(config.templateId), "Lecture du modèle Resend");
      expediteurModele = modele.from ?? undefined;
      if (modele.status !== "published") {
        throw new ErreurRevue(`Le modèle Resend ${config.templateId} n'est pas publié (statut : ${modele.status}).`);
      }
      if (!modele.html?.trim()) throw new ErreurRevue(`Le modèle Resend ${config.templateId} a un HTML vide.`);

      const from = config.from ?? modele.from ?? undefined;
      const subject = config.subject ?? modele.subject ?? undefined;
      const replyTo = config.replyTo ?? modele.reply_to ?? undefined;
      if (!from) throw new ErreurRevue("Aucun expéditeur : renseignez « from » dans le modèle ou REVUE_FROM.");
      if (!subject) throw new ErreurRevue("Aucun objet : renseignez « subject » dans le modèle ou REVUE_SUBJECT.");

      // 3. Lien de désinscription.
      const { html, avertissement } = garantirDesinscription(modele.html);
      if (avertissement) avertissements.push(avertissement);

      // 4. Pas de doublon.
      const doublon = await chercherDoublon(resend, config.mode, nom, lundi);
      if (doublon) {
        resultat = {
          statut: "doublon",
          lundi: lundi.toISOString(),
          broadcastId: doublon.id,
          message: `Une campagne « ${doublon.name} » existe déjà pour lundi ${jjmm(lundi)} : aucune nouvelle campagne créée.`,
          avertissements,
        };
      } else {
        // 5. Création de la campagne.
        const programmer = config.mode === "programmer";
        const cree = verifier(
          await resend.broadcasts.create({
            segmentId: config.segmentId,
            from,
            subject,
            ...(replyTo?.length ? { replyTo } : {}),
            html,
            name: nom,
            ...(programmer ? { send: true, scheduledAt: lundi.toISOString() } : { send: false }),
          }),
          "Création de la campagne Resend"
        );
        resultat = {
          statut: programmer ? "programmee" : "brouillon",
          lundi: lundi.toISOString(),
          broadcastId: cree.id,
          message: programmer
            ? `Campagne programmée pour lundi ${jjmm(lundi)} à 9 h`
            : `Campagne créée en brouillon pour lundi ${jjmm(lundi)} (mode brouillon : non programmée)`,
          avertissements,
        };
      }
    }
  } catch (e) {
    const detail = e instanceof Error ? e.message : String(e);
    resultat = {
      statut: "erreur",
      lundi: lundi.toISOString(),
      message: `Erreur : la campagne du lundi ${jjmm(lundi)} n'a pas été créée. ${detail}`,
      avertissements,
    };
  }

  let expediteur = config.alertesFrom ?? config.from ?? expediteurModele;
  if (!expediteur) {
    // Modèle pas encore lu (alerte « pas de publication » ou erreur précoce) : on y prend l'expéditeur.
    try {
      expediteur = (await resend.templates.get(config.templateId)).data?.from ?? undefined;
    } catch {
      // Sans expéditeur, le compte rendu est seulement journalisé.
    }
  }
  const compteRenduEnvoye = await envoyerCompteRendu(resend, config, resultat, expediteur);
  return { ...resultat, compteRenduEnvoye };
}

async function chercherDoublon(resend: ClientResend, mode: ConfigRevue["mode"], nom: string, lundi: Date) {
  let after: string | undefined;
  for (let page = 0; page < 20; page++) {
    const liste = verifier(await resend.broadcasts.list({ limit: 100, ...(after ? { after } : {}) }), "Liste des campagnes Resend");
    const trouve = liste.data.find((b) => {
      if (!b.name?.toUpperCase().startsWith(PREFIXE_CAMPAGNE)) return false;
      // En mode brouillon, tout brouillon du même nom suffit à éviter un doublon.
      if (mode === "brouillon") return b.name === nom;
      // En mode programmer, seules comptent les campagnes réellement programmées ou envoyées.
      if (b.status === "draft") return false;
      const memeHeure = b.scheduled_at ? new Date(b.scheduled_at).getTime() === lundi.getTime() : false;
      return memeHeure || b.name === nom;
    });
    if (trouve) return trouve;
    if (!liste.has_more || !liste.data.length) return null;
    after = liste.data[liste.data.length - 1].id;
  }
  return null;
}

async function envoyerCompteRendu(
  resend: ClientResend,
  config: ConfigRevue,
  r: Omit<ResultatRevue, "compteRenduEnvoye">,
  from: string | undefined
): Promise<boolean> {
  if (!config.alertes.length || !from) {
    console.error("[revue] Compte rendu non envoyé (REVUE_ALERTES ou expéditeur manquant) :", r.message);
    return false;
  }
  const lien = r.broadcastId ? `https://resend.com/broadcasts/${r.broadcastId}` : undefined;
  const jour = r.lundi ? jjmm(new Date(r.lundi)) : "";
  const sujet = {
    off: "",
    programmee: r.message,
    brouillon: `ON A LU POUR VOUS — brouillon créé pour lundi ${jour}`,
    doublon: `ON A LU POUR VOUS — campagne déjà existante pour lundi ${jour}`,
    "pas-de-publication": `ALERTE ON A LU POUR VOUS — aucun document téléversé, rien de programmé pour lundi ${jour}`,
    erreur: `ERREUR ON A LU POUR VOUS — campagne du lundi ${jour} non créée`,
  }[r.statut];

  const lignes = [r.message, ...(lien ? [`Lien : ${lien}`] : []), ...r.avertissements.map((a) => `Attention : ${a}`)];
  const html =
    `<p>${echapper(r.message)}</p>` +
    (lien ? `<p><a href="${lien}">${lien}</a></p>` : "") +
    (r.avertissements.length ? `<ul>${r.avertissements.map((a) => `<li>${echapper(a)}</li>`).join("")}</ul>` : "");

  try {
    const envoi = await resend.emails.send({ from, to: config.alertes, subject: sujet, html, text: lignes.join("\n") });
    if (envoi.error) {
      console.error("[revue] Échec de l'envoi du compte rendu :", envoi.error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.error("[revue] Échec de l'envoi du compte rendu :", e);
    return false;
  }
}
