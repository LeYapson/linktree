# 🎮 Linktree Pixel Art - yatokishi

Un Linktree personnalisé avec un design pixel art moderne, des animations fluides et une interface responsive pour VTuber/Streamer.

![Preview](https://img.shields.io/badge/Status-Live-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Fonctionnalités

- 🎨 **Design Pixel Art** : Interface rétro avec police "Press Start 2P"
- 🌟 **Animations Modernes** : Effets de particules, avatars flottants, étoiles scintillantes
- 📱 **Responsive Design** : Adapté à tous les écrans (mobile, tablette, desktop)
- 🚀 **Performance Optimisée** : Icônes SVG intégrées, animations CSS fluides
- 💫 **Effets Visuels** : Parallax subtil, neige pixelisée, particules au clic
- 🎭 **Thème VTuber** : Couleurs et style adaptés au monde du streaming

## 🎯 Démonstration

### Sections Principales
- **Profil** : Avatar animé avec halo rotatif et informations personnelles
- **Réseaux Sociaux** : Icônes officielles avec tooltips et couleurs authentiques
- **Support** : Liens vers Throne Wishlist et donations StreamElements
- **Contact Pro** : Mail professionnel, commissions et partenariats

### Effets Interactifs
- Animation de typing pour le nom d'utilisateur
- Particules colorées au clic des boutons
- Effets de glow spécifiques à chaque plateforme
- Parallax léger sur les étoiles d'arrière-plan

## 🛠️ Technologies Utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Animations, gradients, grid/flexbox
- **JavaScript Vanilla** : Interactions et effets dynamiques
- **Google Fonts** : Police "Press Start 2P"
- **SVG Icons** : Logos officiels des réseaux sociaux

## 📁 Structure du Projet

```
linktree/
│
├── index.html              # Page principale
├── css/
│   └── style.css          # Styles et animations
├── js/
│   └── script.js          # Interactions JavaScript
├── assets/
│   └── avatar.png         # Avatar VTuber (à ajouter)
└── README.md              # Documentation
```

## 🚀 Installation

1. **Cloner le projet**
```bash
git clone https://github.com/LeYapson/linktree-pixel.git
cd linktree-pixel
```

2. **Ajouter votre avatar**
   - Placez votre image d'avatar dans `assets/avatar.png`
   - Format recommandé : 256x256px, PNG avec transparence

3. **Personnaliser les liens**
   - Ouvrez `index.html`
   - Remplacez les URLs par vos vrais liens
   - Modifiez les textes selon vos besoins

4. **Lancer le projet**
   - Ouvrez `index.html` dans votre navigateur
   - Ou utilisez un serveur local pour le développement

## ⚙️ Personnalisation

### Couleurs
Modifiez les variables CSS dans `style.css` :
```css
:root {
    --bg-primary: #0a0a23;      /* Fond principal */
    --bg-secondary: #1a1a3a;    /* Fond secondaire */
    --accent-pink: #ff6b9d;     /* Accent rose */
    --accent-blue: #4dabf7;     /* Accent bleu */
    --accent-purple: #9775fa;   /* Accent violet */
    --accent-green: #51cf66;    /* Accent vert */
    --accent-orange: #ff922b;   /* Accent orange */
}
```

### Liens Personnalisés
Dans `index.html`, remplacez :
```html
<!-- Réseaux sociaux -->
<a href="https://twitch.tv/VOTRE_PSEUDO" class="social-icon" data-platform="twitch">

<!-- Liens de support -->
<a href="https://throne.com/VOTRE_PSEUDO" class="link-button" data-color="pink">

<!-- Contact professionnel -->
<a href="mailto:votre-email@domaine.com" class="link-button" data-color="blue">
```

### Animations
Désactiver certains effets si nécessaire :
```css
/* Désactiver la neige */
/* Commentez l'appel à createPixelSnow() dans script.js */

/* Réduire les animations */
.avatar {
    /* animation: none; */
}
```

## 🎨 Guide de Style

### Palette de Couleurs
- **Fond Principal** : `#0a0a23` (Bleu foncé)
- **Fond Secondaire** : `#1a1a3a` (Bleu moyen)
- **Texte Principal** : `#ffffff` (Blanc)
- **Texte Secondaire** : `#b8b8ff` (Bleu clair)
- **Accents** : Rose, Bleu, Violet, Vert, Orange

### Typographie
- **Police Principale** : "Press Start 2P" (Google Fonts)
- **Tailles** : Responsive avec em/rem
- **Effets** : Ombres portées pour l'effet pixel

## 📱 Responsive Design

- **Mobile** : < 480px - Interface optimisée tactile
- **Tablette** : 480px - 768px - Adaptation des tailles
- **Desktop** : > 768px - Expérience complète

## 🔧 Développement

### Prérequis
- Navigateur moderne (Chrome, Firefox, Safari, Edge)
- Éditeur de code (VS Code recommandé)
- Serveur local optionnel pour le développement

### Scripts Utiles
```bash
# Serveur local simple avec Python
python -m http.server 8000

# Ou avec Node.js
npx http-server
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👤 Auteur

**yatokishi** - VTuber | Streamer | Pixel Artist & Developer

- 🎮 Twitch: [@yatokishi](https://twitch.tv/yatokishi)
- 🐦 Twitter: [@yatokishi](https://twitter.com/yatokishi)
- 📺 YouTube: [@yatokishi](https://youtube.com/@yatokishi)
- 💬 Discord: [Serveur](https://discord.gg/93fJgDmhec)

## 🙏 Remerciements

- Google Fonts pour la police "Press Start 2P"
- Simple Icons pour les logos SVG des réseaux sociaux
- La communauté VTuber pour l'inspiration

## 📈 Roadmap

- [ ] Mode sombre/clair
- [ ] Thèmes de couleurs personnalisables
- [ ] Intégration API réseaux sociaux
- [ ] Analytics intégrés
- [ ] PWA (Progressive Web App)
- [ ] Générateur de thèmes

---

⭐ **N'oubliez pas de star le projet si il vous plaît !** ⭐

Made with ❤️ and pixels
