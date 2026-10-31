# Irahma Student Portal (`irahma_student`)

Portail Web moderne et élégant dédié aux élèves de l'établissement **Irahma School** (Collège & Lycée), partageant exactement la même charte graphique, les tokens de design et le thème Orange & Blanc de `irahma_web`.

---

## 🎨 Charte Graphique & Thème
- **Palette Signature Irahma** : Orange primaire (`#F97316`), dégradés ambre/orange, cartes blanches immaculées, arrière-plan ardoise propre (`#F8FAFC`).
- **Fichiers de thème synchronisés** :
  - `src/constants/theme.js`
  - `src/styles/theme.css`
  - `src/index.css` (Tailwind CSS v4 + `@tailwindcss/vite`)

---

## 🚀 Fonctionnalités du Tableau de Bord Élève

1. **Dashboard Principal (`/`)** :
   - **Bannière d'accueil personnalisée** avec alerte de prochain cours en direct, rang de classe et moyenne générale.
   - **4 Cartes KPI Étudiant** :
     - Moyenne Générale (16.85 / 20) • Top 5% de la classe.
     - Taux de Présence (98.4%) • 248h d'assiduité.
     - Matières Inscrites (8 matières) • Curriculum actif.
     - Devoirs en cours (3 à rendre) • Alertes d'échéances.
   - **Emploi du temps du jour interactif** : statut des séances (*Terminé*, *En cours [Live pulse]*, *À venir*), salle et enseignant.
   - **Graphique interactif d'évolution des notes** (Recharts) avec comparaison par rapport à la moyenne de la classe.
   - **Widget Devoirs à rendre** avec modal de dépôt de fichier de devoir en ligne.
   - **Grille des matières & coefficients** avec barres de progression visuelles.
   - **Avis & communications de l'établissement**.

2. **Emploi du Temps Hebdomadaire (`/timetable`)** :
   - Vue par jour ou semaine complète (Lundi au Vendredi).
   - Détail des salles, professeurs, créneaux et bouton d'impression directe.

3. **Relevé de Notes & Bulletin (`/grades`)** :
   - Tableau complet style bulletin officiel (Matières, Coefficients, Contrôles continus, Moyenne matière, Moyenne classe, Total des points, Appréciation de l'enseignant).
   - Félicitations du Conseil de Classe et mention *Très Bien*.
   - Téléchargement du Bulletin au format PDF.

4. **Mes Cours & Matières (`/courses`)** :
   - Cartes des matières avec coordonnées de chaque professeur.
   - Consultation des chapitres et téléchargement des syllabus.

5. **Devoirs & Travaux (`/assignments`)** :
   - Filtre par statut (*Tous*, *En attente*, *Soumis*, *Notés*).
   - Modal de transmission de devoirs avec pièces jointes et commentaires.

6. **Assiduité & Absences (`/attendance`)** :
   - Suivi du taux de présence, heures justifiées et registre officiel.
   - Modal de soumission de certificat ou justificatif médical.

7. **Avis & Notes d'Information (`/announcements`)** :
   - Calendrier des contrôles et examens à venir.
   - Annonces officielles de la direction et des clubs parascolaires.

8. **Profil Élève & Sécurité (`/profile`)** :
   - Informations administratives (Matricule, classe, date de naissance).
   - Coordonnées du tuteur légal / parents.
   - Téléchargement d'Attestation de Scolarité.
   - Formulaire de modification de mot de passe connecté à `/api/stud-auth/change-password`.

9. **Page de Connexion Élève (`/login`)** :
   - Formulaire d'authentification avec identifiant scolaire/email et mot de passe.
   - Bouton d'auto-remplissage démo en 1 clic.
   - Connexion à `/api/stud-auth/login` avec fallback hors-ligne fluide.

---

## 🛠️ Installation & Démarrage

```bash
cd /home/saif/projs/irahma_school/irahma_student

# Lancer en mode développement
npm run dev

# Compiler pour la production
npm run build

# Prévisualiser le build
npm run preview
```
