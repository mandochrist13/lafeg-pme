import { describe, expect, it, vi } from "vitest";
import { lireConfig, type ConfigRevue } from "./config";
import { debutFenetre, lundiSuivant } from "./dates";
import { aLienDesinscription, garantirDesinscription } from "./html";
import { executerRevue, type ClientResend } from "./run";

// Dimanche 11/10/2026 à 18 h, heure de Libreville.
const DIMANCHE_18H = new Date("2026-10-11T17:00:00Z");
const LUNDI = "2026-10-12T08:00:00.000Z";

const HTML_OK =
  '<html><body><h1>On a lu pour vous</h1><a href="{{{RESEND_UNSUBSCRIBE_URL}}}">Se désinscrire</a></body></html>';

const config = (surcharge: Partial<ConfigRevue> = {}): ConfigRevue => ({
  mode: "programmer",
  apiKey: "re_test",
  segmentId: "seg_123",
  templateId: "tpl_123",
  alertes: ["alertes@lafeg.ga"],
  ...surcharge,
});

function resendSimule(options: {
  modele?: Partial<{ status: "draft" | "published"; html: string | null; subject: string | null; from: string | null; reply_to: string[] | null }>;
  campagnes?: { id: string; name: string; status: string; scheduled_at: string | null }[];
  erreurCreation?: string;
} = {}) {
  const resend = {
    templates: {
      get: vi.fn(async (_id: string) => ({
        data: {
          status: "published" as const,
          html: HTML_OK,
          subject: "ON A LU POUR VOUS",
          from: "FEG <revue@lafeg.ga>",
          reply_to: ["contact@lafeg.ga"],
          ...options.modele,
        },
        error: null,
      })),
    },
    broadcasts: {
      list: vi.fn(async (_options?: { limit?: number; after?: string }) => ({ data: { has_more: false, data: options.campagnes ?? [] }, error: null })),
      create: vi.fn(async (_payload: Record<string, unknown>) =>
        options.erreurCreation
          ? { data: null, error: { message: options.erreurCreation, name: "validation_error" } }
          : { data: { id: "bc_42" }, error: null }
      ),
    },
    emails: {
      send: vi.fn(async (_payload: { from: string; to: string[]; subject: string; html: string; text: string }) => ({
        data: { id: "em_1" },
        error: null,
      })),
    },
  };
  return resend satisfies ClientResend;
}

const publicationTrouvee = async () => new Date("2026-10-08T10:00:00Z");

describe("dates", () => {
  it("calcule le lundi suivant 08:00Z depuis le dimanche 18 h (Libreville)", () => {
    expect(lundiSuivant(DIMANCHE_18H).toISOString()).toBe(LUNDI);
  });

  it("gère le décalage du cron (dimanche 23:30 Libreville = 22:30Z) et le changement de mois", () => {
    expect(lundiSuivant(new Date("2026-10-11T22:30:00Z")).toISOString()).toBe(LUNDI);
    expect(lundiSuivant(new Date("2026-11-29T17:00:00Z")).toISOString()).toBe("2026-11-30T08:00:00.000Z");
    expect(lundiSuivant(new Date("2026-12-27T17:00:00Z")).toISOString()).toBe("2026-12-28T08:00:00.000Z");
  });

  it("un lundi après 9 h, vise le lundi de la semaine suivante", () => {
    expect(lundiSuivant(new Date("2026-10-12T08:00:00Z")).toISOString()).toBe("2026-10-19T08:00:00.000Z");
  });

  it("la fenêtre de téléversement commence le lundi précédent à 0 h Libreville", () => {
    expect(debutFenetre(new Date(LUNDI)).toISOString()).toBe("2026-10-04T23:00:00.000Z");
  });
});

describe("lien de désinscription", () => {
  it("accepte un href {{{RESEND_UNSUBSCRIBE_URL}}}", () => {
    expect(aLienDesinscription(HTML_OK)).toBe(true);
    expect(garantirDesinscription(HTML_OK).avertissement).toBeUndefined();
  });

  it("ajoute un pied si le lien manque", () => {
    const r = garantirDesinscription("<html><body><p>Bonjour</p></body></html>");
    expect(aLienDesinscription(r.html)).toBe(true);
    expect(r.html).toMatch(/Se désinscrire<\/a><\/div><\/body>/);
    expect(r.avertissement).toMatch(/ne contient pas/);
  });

  it("ajoute un pied si Resend a transformé la variable en <span data-type=\"variable\">", () => {
    const html =
      '<p><a href="https://x"><span data-type="variable" data-id="RESEND_UNSUBSCRIBE_URL">RESEND_UNSUBSCRIBE_URL</span></a></p>';
    const r = garantirDesinscription(html);
    expect(aLienDesinscription(r.html)).toBe(true);
    expect(r.avertissement).toMatch(/span data-type/);
  });
});

describe("config", () => {
  it("signale les variables obligatoires manquantes et le mode invalide", () => {
    const { erreurs } = lireConfig({ REVUE_RESEND_MODE: "envoyer" });
    expect(erreurs).toHaveLength(5);
  });

  it("lit les listes et les valeurs facultatives", () => {
    const { config: c, erreurs } = lireConfig({
      RESEND_API_KEY: "k",
      RESEND_SEGMENT_ID: "s",
      RESEND_TEMPLATE_ID: "t",
      REVUE_ALERTES: "a@x.ga, b@x.ga",
      REVUE_RESEND_MODE: "Brouillon",
      REVUE_REPLY_TO: "r@x.ga",
    });
    expect(erreurs).toEqual([]);
    expect(c.mode).toBe("brouillon");
    expect(c.alertes).toEqual(["a@x.ga", "b@x.ga"]);
    expect(c.replyTo).toEqual(["r@x.ga"]);
    expect(c.from).toBeUndefined();
  });
});

describe("executerRevue", () => {
  it("programme la campagne pour le lundi 08:00Z et envoie le compte rendu", async () => {
    const resend = resendSimule();
    const r = await executerRevue({ config: config(), resend, maintenant: DIMANCHE_18H, trouverPublication: publicationTrouvee });

    expect(r.statut).toBe("programmee");
    expect(resend.templates.get).toHaveBeenCalledWith("tpl_123");
    expect(resend.broadcasts.create).toHaveBeenCalledWith({
      segmentId: "seg_123",
      from: "FEG <revue@lafeg.ga>",
      subject: "ON A LU POUR VOUS",
      replyTo: ["contact@lafeg.ga"],
      html: HTML_OK,
      name: "ON A LU POUR VOUS — 12/10/2026",
      send: true,
      scheduledAt: LUNDI,
    });
    const mail = resend.emails.send.mock.calls[0][0];
    expect(mail.to).toEqual(["alertes@lafeg.ga"]);
    expect(mail.subject).toBe("Campagne programmée pour lundi 12/10 à 9 h");
    expect(mail.html).toContain("https://resend.com/broadcasts/bc_42");
    expect(r.compteRenduEnvoye).toBe(true);
  });

  it("applique REVUE_FROM, REVUE_REPLY_TO et REVUE_SUBJECT", async () => {
    const resend = resendSimule();
    await executerRevue({
      config: config({ from: "Autre <a@lafeg.ga>", replyTo: ["b@lafeg.ga"], subject: "Revue" }),
      resend,
      maintenant: DIMANCHE_18H,
      trouverPublication: publicationTrouvee,
    });
    expect(resend.broadcasts.create.mock.calls[0][0]).toMatchObject({
      from: "Autre <a@lafeg.ga>",
      replyTo: ["b@lafeg.ga"],
      subject: "Revue",
    });
  });

  it("ne crée pas de doublon si une campagne est déjà programmée pour ce lundi", async () => {
    const resend = resendSimule({
      campagnes: [{ id: "bc_old", name: "ON A LU POUR VOUS — 12/10/2026", status: "queued", scheduled_at: "2026-10-12 08:00:00+00" }],
    });
    const r = await executerRevue({ config: config(), resend, maintenant: DIMANCHE_18H, trouverPublication: publicationTrouvee });
    expect(r.statut).toBe("doublon");
    expect(r.broadcastId).toBe("bc_old");
    expect(resend.broadcasts.create).not.toHaveBeenCalled();
    expect(resend.emails.send).toHaveBeenCalledOnce();
  });

  it("ignore un brouillon de test et les campagnes d'autres lundis en mode programmer", async () => {
    const resend = resendSimule({
      campagnes: [
        { id: "bc_draft", name: "ON A LU POUR VOUS — 12/10/2026", status: "draft", scheduled_at: null },
        { id: "bc_prev", name: "ON A LU POUR VOUS — 05/10/2026", status: "sent", scheduled_at: "2026-10-05T08:00:00Z" },
      ],
    });
    const r = await executerRevue({ config: config(), resend, maintenant: DIMANCHE_18H, trouverPublication: publicationTrouvee });
    expect(r.statut).toBe("programmee");
  });

  it("refuse un modèle non publié", async () => {
    const resend = resendSimule({ modele: { status: "draft" } });
    const r = await executerRevue({ config: config(), resend, maintenant: DIMANCHE_18H, trouverPublication: publicationTrouvee });
    expect(r.statut).toBe("erreur");
    expect(r.message).toMatch(/n'est pas publié/);
    expect(resend.broadcasts.create).not.toHaveBeenCalled();
    expect(resend.emails.send.mock.calls[0][0].subject).toMatch(/^ERREUR/);
  });

  it("refuse un modèle au HTML vide", async () => {
    const resend = resendSimule({ modele: { html: "  " } });
    const r = await executerRevue({ config: config(), resend, maintenant: DIMANCHE_18H, trouverPublication: publicationTrouvee });
    expect(r.statut).toBe("erreur");
    expect(r.message).toMatch(/HTML vide/);
  });

  it("ajoute le pied de désinscription s'il manque et le signale", async () => {
    const resend = resendSimule({ modele: { html: "<p>Sans lien</p>" } });
    const r = await executerRevue({ config: config(), resend, maintenant: DIMANCHE_18H, trouverPublication: publicationTrouvee });
    expect(r.statut).toBe("programmee");
    expect(resend.broadcasts.create.mock.calls[0][0].html).toContain('href="{{{RESEND_UNSUBSCRIBE_URL}}}"');
    expect(r.avertissements).toHaveLength(1);
    expect(resend.emails.send.mock.calls[0][0].html).toContain("pied « Se désinscrire » a été ajouté");
  });

  it("mode brouillon : campagne créée sans être programmée", async () => {
    const resend = resendSimule();
    const r = await executerRevue({
      config: config({ mode: "brouillon" }),
      resend,
      maintenant: DIMANCHE_18H,
      trouverPublication: publicationTrouvee,
    });
    expect(r.statut).toBe("brouillon");
    const payload = resend.broadcasts.create.mock.calls[0][0];
    expect(payload.send).toBe(false);
    expect(payload).not.toHaveProperty("scheduledAt");
    expect(resend.emails.send.mock.calls[0][0].html).toContain("https://resend.com/broadcasts/bc_42");
  });

  it("mode off : aucun appel", async () => {
    const resend = resendSimule();
    const r = await executerRevue({ config: config({ mode: "off" }), resend, trouverPublication: publicationTrouvee });
    expect(r.statut).toBe("off");
    expect(resend.templates.get).not.toHaveBeenCalled();
    expect(resend.emails.send).not.toHaveBeenCalled();
  });

  it("erreur Resend à la création : compte rendu d'erreur", async () => {
    const resend = resendSimule({ erreurCreation: "The `from` domain is not verified" });
    const r = await executerRevue({ config: config(), resend, maintenant: DIMANCHE_18H, trouverPublication: publicationTrouvee });
    expect(r.statut).toBe("erreur");
    expect(r.message).toContain("Création de la campagne Resend : The `from` domain is not verified");
    const mail = resend.emails.send.mock.calls[0][0];
    expect(mail.subject).toBe("ERREUR ON A LU POUR VOUS — campagne du lundi 12/10 non créée");
    expect(mail.text).toContain("domain is not verified");
  });

  it("erreur réseau (exception) à la lecture du modèle : compte rendu d'erreur", async () => {
    const resend = resendSimule();
    resend.templates.get.mockRejectedValueOnce(new Error("fetch failed"));
    const r = await executerRevue({
      config: config({ from: "FEG <revue@lafeg.ga>" }),
      resend,
      maintenant: DIMANCHE_18H,
      trouverPublication: publicationTrouvee,
    });
    expect(r.statut).toBe("erreur");
    expect(r.compteRenduEnvoye).toBe(true);
  });

  it("aucune publication téléversée depuis le lundi précédent : alerte, rien de programmé", async () => {
    const resend = resendSimule();
    const trouverPublication = vi.fn(async () => null);
    const r = await executerRevue({
      config: config({ alertesFrom: "Guide <guide@lafeg.ga>" }),
      resend,
      maintenant: DIMANCHE_18H,
      trouverPublication,
    });
    expect(trouverPublication).toHaveBeenCalledWith(new Date("2026-10-04T23:00:00Z"));
    expect(r.statut).toBe("pas-de-publication");
    expect(resend.templates.get).not.toHaveBeenCalled();
    expect(resend.broadcasts.create).not.toHaveBeenCalled();
    const mail = resend.emails.send.mock.calls[0][0];
    expect(mail.from).toBe("Guide <guide@lafeg.ga>");
    expect(mail.subject).toMatch(/^ALERTE/);
  });

  it("alerte sans expéditeur configuré : utilise celui du modèle", async () => {
    const resend = resendSimule();
    const r = await executerRevue({ config: config(), resend, maintenant: DIMANCHE_18H, trouverPublication: async () => null });
    expect(r.statut).toBe("pas-de-publication");
    expect(resend.broadcasts.create).not.toHaveBeenCalled();
    expect(resend.emails.send.mock.calls[0][0].from).toBe("FEG <revue@lafeg.ga>");
    expect(r.compteRenduEnvoye).toBe(true);
  });
});
