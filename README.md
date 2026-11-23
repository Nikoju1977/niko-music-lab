# Studio Niko Music Lab Pro

Station de production musicale gratuite dans le navigateur, signée Studio Niko.

**Application publique :** https://niko-music-lab.vercel.app/

## Fonctionnalités

- Séquenceur de 16 pas, **12 pistes**, 4 patterns A–D.
- Piano roll polyphonique sur 3 octaves pour les 6 instruments mélodiques.
- Arrangement jusqu'à 16 mesures et mixeur 12 canaux.
- Générateur de grooves Techno, EBM / Industrial, House / Afro, Acid et Drum & Bass.
- 3 synthétiseurs EBM originaux **sans samples préenregistrés** :
  - **PULSE 101 :** basses analogiques avec deux oscillateurs, suboscillateur, filtre à enveloppe et saturation.
  - **FM HAMMER :** timbres métalliques par modulation de fréquence, filtre passe-bande et enveloppes percussives.
  - **DARK MACHINE :** nappes sombres avec oscillateurs désaccordés, suboscillateur et enveloppe longue.
- 3 presets par synthé EBM (9 au total) ; 4 réglages propres à chaque piste (filtre/tone, caractère, durée, saturation), enregistrés dans le JSON.
- Moteur audio Web Audio API ; mixage, panoramique, mute/solo, filtres et effets master.
- Import de samples WAV / MP3 / OGG / M4A selon le navigateur (25 Mo maximum).
- Export WAV stéréo 44,1 kHz PCM 16 bits, export MIDI et sauvegarde/restauration de projet JSON.
- Interface responsive et commandes tactiles.

## Composer en EBM

1. Choisir **EBM / Industrial** dans le menu de génération, puis cliquer **Générer un pattern**.
2. Sélectionner les pistes **PULSE 101**, **FM HAMMER** ou **DARK MACHINE** dans la liste des instruments.
3. Tester les presets et ajuster les quatre paramètres dans **SOUND DESIGN**.
4. Programmer des notes dans **Séquenceur** ou **Piano roll**.
5. Arranger les patterns, mixer les pistes et exporter le résultat.

## Installation locale

Pour une utilisation locale complète, télécharger **index.html** et **ebm-synths.js** dans le même dossier, puis ouvrir `index.html` dans un navigateur Web Audio moderne. Aucun compte ni service de génération externe n'est requis. Les capacités audio dépendent de l'appareil et du navigateur. Sur mobile, un premier appui sur Lecture est nécessaire pour autoriser l'audio.

## Déploiement

- Dépôt GitHub : https://github.com/Nikoju1977/niko-music-lab
- Site Vercel : https://niko-music-lab.vercel.app/
- La branche `main` est reliée au déploiement Vercel.

## Vérification et limites

- La présence des 12 pistes et des nouveaux contrôles a été vérifiée dans un navigateur automatisé.
- Le déploiement et les ressources publiques sont contrôlés séparément.
- La qualité sonore perçue, les téléchargements WAV/MIDI et la compatibilité sur tous les appareils doivent être confirmés par des essais utilisateur ou des tests audio supplémentaires.
- Les trois synthés sont des créations **originales inspirées de l'esthétique EBM**, et non des émulations matérielles exactes de SH-101, DX7 ou d'autres machines.

## Attribution

Projet indépendant. Il n'intègre pas de code ni d'éléments graphiques de LMMS.
