# Studio Niko Music Lab Pro

Station de production musicale autonome dans le navigateur, signée Studio Niko.

## Fonctionnalités présentes dans cette version

- Séquenceur 16 pas, 9 pistes et 4 patterns A–D.
- Piano roll sur 3 octaves pour les pistes mélodiques.
- Arrangement jusqu'à 16 mesures.
- Générateur de grooves Techno, EBM, House/Afro, Acid et Drum & Bass.
- Synthèse sonore Web Audio API, contrôle des filtres, distorsion et mixage.
- Import de samples audio (formats selon les capacités du navigateur, taille limitée à 25 Mo).
- Export WAV stéréo 44,1 kHz 16 bits, MIDI et sauvegarde de projet JSON.
- Interface responsive prévue pour ordinateur et appareil tactile.

Le traitement se fait dans le navigateur, sans compte ni serveur de génération musicale. Les performances et la compatibilité audio dépendent du navigateur et de l'appareil.

## Utiliser en local

Ouvrir `index.html` dans un navigateur moderne. Sur mobile, touchez **Lecture** pour autoriser le moteur audio.

## Publier avec GitHub Pages

1. Créer un dépôt public `niko-music-lab` sur GitHub.
2. Ajouter `index.html`, `README.md` et `.nojekyll` à la racine de la branche `main`.
3. Ouvrir **Settings > Pages**, sélectionner **Deploy from a branch**, puis **main / (root)**.
4. Une fois le déploiement GitHub Pages terminé, la page sera normalement disponible à : `https://nikoju1977.github.io/niko-music-lab/` (à vérifier après publication).

## État des vérifications

- Fichiers HTML et JavaScript présents.
- Les deux blocs JavaScript intégrés passent `node --check` (syntaxe uniquement).
- Lecture audio, import, export et compatibilité Android/iOS **non testés sur un navigateur réel** dans cette livraison.

## Attribution

Projet indépendant. N'inclut pas le code ni les éléments graphiques de LMMS.