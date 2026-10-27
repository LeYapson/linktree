# 🎮 YATOKISHI Linktree Pixel OS !

Un site Linktree rétro inspiré des interfaces RPG et consoles 8-bit, avec un menu interactif, un boot screen animé, et deux mini-jeux intégrés.

![Preview](https://img.shields.io/badge/Status-Live-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0-blue)

## ✨ Fonctionnalités

- 🎮 **Boot screen animé** : séquence de démarrage style console
- 💬 **Dialogues à effet machine à écrire** sur la page principale
- 🔗 **Menu de liens** vers Twitch, X, Discord, YouTube, Ko-fi
- ⚔️ **Mini-jeux intégrés** : duel et donjon via overlays
- 🔊 **Effets sonores 8-bit** avec Web Audio API
- 🕹️ **Contrôles clavier et clics** pour navigation et gameplay
- 🗄️ **Enregistrement local** du record et de l'or gagné
- 🖥️ **Design pixel art responsive** avec effet CRT
- 🌐 **Bascule EN / FR** : bouton en haut à droite du portrait, choix mémorisé (textes dans `i18n.js`)

## 🎯 Sections du projet

- **Boot screen** : écran de démarrage animé puis masqué au premier clic
- **Portrait de personnage** : image pixel art dans `assets`
- **Menu principal** : actions et liens de navigation
- **Overlay Duel** : combat contre Yatokishi avec quatre actions
- **Overlay Dungeon** : exploration de donjon avec déplacement WASD/Flèches
- **Dialogues** : textes à taper dynamiquement entre chaque interaction

## 🛠 Technologies utilisées

- **HTML5** : page unique
- **CSS3** : mise en page, animations, effet CRT, responsive
- **JavaScript Vanilla** : interactions, mini-jeux, stockage local
- **Google Fonts** : police `Press Start 2P`

## 📁 Structure du projet

```
linktree/
├── CNAME                 # Fichier de domaine personnalisé pour GitHub Pages
├── index.html            # Page principale
├── style.css             # Styles et animations
├── script.js             # Logique JavaScript et mini-jeux
├── README.md             # Documentation du projet
└── assets/
    ├── avatar.png        # Avatar de personnage
    └── avatar.png      # Sprite référencé dans index.html
```

> Note : `index.html` référence `assets/avatar.png`. Si ce fichier n'est pas présent, remplacez la source par `assets/avatar.png` ou ajoutez votre propre image.

## 🚀 Installation

1. **Cloner le projet**
```bash
git clone <votre-repo>
cd linktree
```

2. **Ouvrir la page**
- Double-cliquez sur `index.html`
- Ou servez le dossier via un serveur local pour un meilleur support des assets

3. **Personnaliser les liens**
- Éditez `index.html`
- Remplacez les URLs de Twitch, X, Discord, YouTube et Ko-fi par vos propres liens

4. **Remplacer l'avatar**
- Ajoutez votre image dans `assets/avatar.png`
- Ou mettez à jour la balise `<img>` dans `index.html` pour pointer vers `assets/avatar.png`

## ⚙️ Personnalisation

### Modifier les couleurs
Ajustez les variables CSS dans `style.css` :

```css
:root {
  --bg: #07040f;
  --panel: #110d22;
  --panel-inner: #0d091c;
  --border: #5030a0;
  --border-hi: #9060e0;
  --gold: #d4a020;
  --pink: #d040a0;
  --pink-hi: #f060c0;
  --text: #ece4f8;
  --text-dim: #7060a0;
}
```

### Adapter le contenu
- `index.html` contient les labels de menu, les liens et les textes de dialogue
- `script.js` gère les dialogues, le duel, le donjon et les sons
- `style.css` définit le design pixel, le CRT et les animations

### Désactiver les effets
- Pour enlever le boot screen, commentez l'appel à `dismissBoot()` ou supprimez le bloc correspondant
- Pour modifier les sons, éditez la section `SFX` dans `script.js`

## 📱 Responsive Design

Le projet est conçu pour s'adapter aux écrans mobiles et desktop, avec un panneau central optimisé et des boutons lisibles.

## 🔧 Développement

### Prérequis
- Navigateur moderne (Chrome, Firefox, Edge, Safari)
- Éditeur de code (VS Code recommandé)

### Tester localement
```bash
python -m http.server 8000
```

## 🤝 Contribution

Contributions bienvenues :
1. Forkez le projet
2. Créez une branche feature
3. Committez vos modifications
4. Poussez vers votre branche
5. Ouvrez une Pull Request

## 📄 Licence

Aucune licence n'est fournie dans le dépôt actuel.

## 👤 Auteur

**yatokishi** - VTuber / Streamer / Pixel Artist

- Twitch: `https://twitch.tv/yatokishi`
- X: `https://x.com/yatokishi`
- Discord: `https://discord.gg/93fJgDmhec`
- YouTube: `https://www.youtube.com/@yatokishi`

---

⭐ N'hésitez pas à étoiler le projet si vous appréciez le travail ! ⭐

