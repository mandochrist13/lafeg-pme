
```
lafeg-pme
├─ app
│  ├─ (user)
│  │  ├─ a-propos
│  │  │  └─ page.tsx
│  │  ├─ actualite
│  │  │  ├─ ActuLast.tsx
│  │  │  ├─ page.tsx
│  │  │  └─ [slug]
│  │  │     └─ page.tsx
│  │  ├─ ClientLayout.tsx
│  │  ├─ entreprise
│  │  │  └─ page.tsx
│  │  ├─ institutions-financieres
│  │  │  ├─ loading.tsx
│  │  │  └─ page.tsx
│  │  ├─ layout.tsx
│  │  ├─ offre
│  │  │  └─ page.tsx
│  │  ├─ page.tsx
│  │  ├─ structures-accompagnement
│  │  │  ├─ loading.tsx
│  │  │  └─ page.tsx
│  │  └─ textes-juridiques
│  │     ├─ loading.tsx
│  │     ├─ page.tsx
│  │     └─ [id]
│  │        └─ page.tsx
│  ├─ admin
│  │  ├─ actualite
│  │  │  ├─ ActualiteForm.tsx
│  │  │  ├─ ActualitePreview.tsx
│  │  │  └─ page.tsx
│  │  ├─ dashboard
│  │  │  └─ page.tsx
│  │  ├─ entreprise
│  │  │  └─ page.tsx
│  │  ├─ institutions
│  │  │  └─ page.tsx
│  │  ├─ layout.tsx
│  │  ├─ structures
│  │  │  ├─ loading.tsx
│  │  │  └─ page.tsx
│  │  ├─ textes
│  │  │  ├─ loading.tsx
│  │  │  └─ page.tsx
│  │  └─ vente
│  │     └─ page.tsx
│  ├─ api
│  │  ├─ actualite
│  │  │  ├─ route.ts
│  │  │  └─ [id]
│  │  │     └─ route.ts
│  │  ├─ FinancialInstitution
│  │  │  ├─ route.ts
│  │  │  └─ [id]
│  │  │     └─ route.ts
│  │  ├─ institutions
│  │  │  ├─ route.ts
│  │  │  └─ [id_institution]
│  │  │     └─ route.ts
│  │  ├─ offres
│  │  │  ├─ archive-expirees
│  │  │  │  └─ route.ts
│  │  │  ├─ route.ts
│  │  │  └─ [id]
│  │  │     └─ route.ts
│  │  ├─ sea
│  │  │  ├─ route.ts
│  │  │  └─ [id]
│  │  │     └─ route.ts
│  │  ├─ swagger
│  │  │  └─ route.ts
│  │  ├─ texte-juridique
│  │  │  ├─ route.ts
│  │  │  └─ [id]
│  │  │     └─ route.ts
│  │  ├─ vente
│  │  │  ├─ route.ts
│  │  │  └─ [id]
│  │  │     └─ route.ts
│  │  └─ [...nextauth]
│  │     └─ route.ts
│  ├─ api-docs
│  │  └─ page.tsx
│  ├─ auth
│  │  └─ login
│  │     └─ page.tsx
│  ├─ globals.css
│  ├─ layout.tsx
│  ├─ lib
│  │  └─ http.ts
│  ├─ loading.tsx
│  ├─ providers.tsx
│  └─ services
│     ├─ actualite
│     │  └─ api.ts
│     ├─ institution
│     │  └─ api.ts
│     ├─ offre
│     │  └─ api.ts
│     ├─ public
│     │  └─ actualite.ts
│     ├─ sea
│     │  └─ api.ts
│     ├─ texte
│     │  └─ api.ts
│     └─ vente
│        └─ api.ts
├─ components
│  ├─ AddressAutocomplete.tsx
│  ├─ ads
│  │  ├─ AdBanner.tsx
│  │  ├─ DeleteConfirmationDialog.tsx
│  │  ├─ FormCreerPublicite.tsx
│  │  └─ FormModifierPublicite.tsx
│  ├─ Captcha.tsx
│  ├─ LegalChatBot.tsx
│  ├─ ProtectedRoute.tsx
│  ├─ section
│  │  ├─ AutoCarousel.tsx
│  │  ├─ burgermenu.tsx
│  │  ├─ categorieText.tsx
│  │  ├─ FinancingOffersCarousel.tsx
│  │  ├─ footer.tsx
│  │  ├─ form.tsx
│  │  ├─ nav.tsx
│  │  ├─ new_text.tsx
│  │  ├─ search.tsx
│  │  └─ TickerTextes.tsx
│  ├─ theme-provider.tsx
│  └─ ui
│     ├─ accordion.tsx
│     ├─ alert-dialog.tsx
│     ├─ alert.tsx
│     ├─ aspect-ratio.tsx
│     ├─ avatar.tsx
│     ├─ badge.tsx
│     ├─ breadcrumb.tsx
│     ├─ button.tsx
│     ├─ calendar.tsx
│     ├─ card.tsx
│     ├─ carousel.tsx
│     ├─ chart.tsx
│     ├─ checkbox.tsx
│     ├─ collapsible.tsx
│     ├─ command.tsx
│     ├─ context-menu.tsx
│     ├─ dialog.tsx
│     ├─ drawer.tsx
│     ├─ dropdown-menu.tsx
│     ├─ form.tsx
│     ├─ hover-card.tsx
│     ├─ input-otp.tsx
│     ├─ input.tsx
│     ├─ label.tsx
│     ├─ menubar.tsx
│     ├─ navigation-menu.tsx
│     ├─ pagination.tsx
│     ├─ popover.tsx
│     ├─ progress.tsx
│     ├─ radio-group.tsx
│     ├─ resizable.tsx
│     ├─ scroll-area.tsx
│     ├─ select.tsx
│     ├─ separator.tsx
│     ├─ sheet.tsx
│     ├─ sidebar.tsx
│     ├─ skeleton.tsx
│     ├─ slider.tsx
│     ├─ sonner.tsx
│     ├─ switch.tsx
│     ├─ table.tsx
│     ├─ tabs.tsx
│     ├─ textarea.tsx
│     ├─ toast.tsx
│     ├─ toaster.tsx
│     ├─ toggle-group.tsx
│     ├─ toggle.tsx
│     ├─ tooltip.tsx
│     ├─ use-mobile.tsx
│     └─ use-toast.ts
├─ components.json
├─ generated
├─ hooks
│  ├─ use-mobile.tsx
│  └─ use-toast.ts
├─ lib
│  ├─ auth.ts
│  ├─ cors.ts
│  ├─ prisma.ts
│  ├─ supabase.ts
│  ├─ swagger-schemas.ts
│  ├─ swagger.ts
│  └─ utils.ts
├─ native test
│  └─ testnative
├─ next.config.mjs
├─ package.json
├─ pglite-debug.log
├─ pnpm-lock.yaml
├─ pnpm-workspace.yaml
├─ postcss.config.mjs
├─ prisma
│  ├─ migrations
│  │  ├─ 20251008203006_init_supabase
│  │  │  └─ migration.sql
│  │  └─ migration_lock.toml
│  └─ schema.prisma
├─ prisma.config.ts
├─ public
│  ├─ actu2.jpg
│  ├─ article.png
│  ├─ ban_feg.png
│  ├─ communication.jpeg
│  ├─ contrat.jpeg
│  ├─ ESPACE carre.gif
│  ├─ ESPACE center.gif
│  ├─ Espace top.gif
│  ├─ etape2.jpeg
│  ├─ feg_actu.png
│  ├─ font
│  │  └─ HyundaiSansTextOffice-Regular.woff2
│  ├─ formation.jpg
│  ├─ images
│  │  ├─ bank.jpeg
│  │  ├─ bank.jpg
│  │  ├─ bank1.jpeg
│  │  ├─ BVMAC.jpg
│  │  ├─ fond.jpeg
│  │  ├─ hero-img.jpg
│  │  ├─ institution
│  │  │  ├─ banque
│  │  │  │  ├─ afg_logo.jpg
│  │  │  │  ├─ bceg_logo.png
│  │  │  │  ├─ bgfi_logo.jpg
│  │  │  │  ├─ Ecobank_Logo.jpg
│  │  │  │  ├─ ora_bank.jpg
│  │  │  │  ├─ uba_logo.png
│  │  │  │  └─ ugb_logo.png
│  │  │  ├─ fond
│  │  │  │  ├─ fgis_logo.png
│  │  │  │  ├─ okoume_logo.jpg
│  │  │  │  └─ sgg_logo.png
│  │  │  └─ micro
│  │  │     ├─ bamboo_logo.png
│  │  │     ├─ city_bank.jpg
│  │  │     ├─ cofina.jpg
│  │  │     ├─ cofina_logo.jpg
│  │  │     ├─ cofina_logo.png
│  │  │     ├─ edg_logo.png
│  │  │     ├─ finam.jpg
│  │  │     ├─ finam_logo.jpg
│  │  │     └─ sodec_logo.png
│  │  ├─ judicia.jpg
│  │  ├─ logo-feg.png
│  │  ├─ logo_FEG_blanc.png
│  │  ├─ micro.jpeg
│  │  ├─ mine.jpg
│  │  ├─ offre.jpg
│  │  ├─ sea
│  │  │  ├─ formation
│  │  │  │  ├─ cyber_logo.png
│  │  │  │  ├─ juridaf_logo.png
│  │  │  │  ├─ ogooue_logo.png
│  │  │  │  ├─ onec_logo.jpg
│  │  │  │  └─ onec_logo.png
│  │  │  ├─ incubateur
│  │  │  │  ├─ akewa_logo.png
│  │  │  │  ├─ iml_logo.jpg
│  │  │  │  └─ sing_logo.jpg
│  │  │  └─ publique
│  │  │     ├─ anpi.jpg
│  │  │     ├─ chambre.jpg
│  │  │     ├─ cnamgs_logo.png
│  │  │     ├─ cnss_logo.jpg
│  │  │     ├─ dgi_logo.jpg
│  │  │     ├─ mae.png
│  │  │     ├─ oapi_pme.png
│  │  │     ├─ pem.jpg
│  │  │     ├─ pme_logo.png
│  │  │     └─ pmi_min.jpg
│  │  └─ sea.jpg
│  ├─ incubateur.jpg
│  ├─ logo.jpg
│  ├─ megaphone.jpeg
│  ├─ opportunite.jpeg
│  ├─ placeholder-logo.png
│  ├─ placeholder-logo.svg
│  ├─ placeholder-user.jpg
│  ├─ placeholder.jpg
│  ├─ placeholder.svg
│  ├─ pub_offre1.jpeg
│  ├─ pub_offre3.png
│  ├─ pub_offre4.jpg
│  ├─ visibilit.jpeg
│  └─ étape.png
├─ scripts
│  ├─ hashPasswords.ts
│  └─ resetPassword.ts
├─ styles
│  └─ globals.css
├─ tailwind.config.ts
├─ tsconfig.json
└─ types
   └─ global.d.ts

```
```

## Envoi hebdomadaire « ON A LU POUR VOUS » (Resend)

Chaque dimanche à 17:00 UTC (18 h à Libreville), Vercel Cron appelle `/api/cron/revue-hebdo` (voir `vercel.json`).
La tâche :

1. vérifie qu'une actualité dont le titre contient « on a lu pour vous » a été publiée sur le Guide depuis le lundi précédent (sinon : alerte, rien n'est programmé) ;
2. lit le modèle Resend `RESEND_TEMPLATE_ID` (publié, HTML non vide) ;
3. ajoute un pied « Se désinscrire » si `{{{RESEND_UNSUBSCRIBE_URL}}}` n'est pas dans un `href` ;
4. vérifie qu'aucune campagne « ON A LU POUR VOUS » n'existe déjà pour ce lundi ;
5. détermine le numéro de volume : celui indiqué sur l'actualité (titre, fichier ou lien), sinon le plus élevé des campagnes « ON A LU POUR VOUS VOL. » envoyées ou programmées + 1, sinon `REVUE_VOLUME_DEPART` (33) ; vérifie qu'aucune autre campagne ne porte ce numéro ;
6. crée la campagne « ON A LU POUR VOUS VOL. <n> — <date> » (objet « ON A LU POUR VOUS VOL. <n> ») vers `RESEND_SEGMENT_ID`, programmée le lundi à 08:00 UTC (9 h à Libreville) ;
7. envoie un compte rendu à `REVUE_ALERTES`, avec le numéro utilisé.

Variables : voir `.env.example`. `REVUE_RESEND_MODE` vaut `off` (par défaut), `brouillon` ou `programmer`.

- `pnpm resend:ids` : liste les segments et les modèles Resend avec leurs identifiants.
- `pnpm test` : tests (Resend simulé).
