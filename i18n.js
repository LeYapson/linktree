// i18n.js - Bascule EN / FR.
// data-i18n="<clé>"        -> textContent
// data-i18n-title="<clé>"  -> attribut title
// data-i18n-aria="<clé>"   -> attribut aria-label
// data-i18n-tip="<clé>"    -> attribut data-tip (infobulle du menu)
// Côté script : T('clé', { var })  et  TL('clé')  pour les listes.
(() => {
  const dict = {
    en: {
      'boot.by': 'by yatokishi',
      'boot.skip': '[ CLICK TO SKIP ]',
      'sound.aria': 'Toggle sound',
      'menu.header2': '── CAREER ──',
      'menu.portfolio': 'THE FORGE',
      'menu.github': 'THE ARCHIVES',
      'menu.linkedin': 'THE NETWORK',
      'boot.chaos': '> INITIALIZING CHAOS.....',
      'boot.streamer': '> LOADING STREAMER........',
      'boot.sanity': '> CHECKING SANITY.........',
      'boot.fail': '[FAIL]',
      'boot.ignore': '> IGNORING ERROR..........',
      'boot.brew': '> BREWING CONTENT.........',
      'boot.summon': '> SUMMONING YATOKISHI....',
      'boot.ready': 'SYSTEM READY.',
      'boot.launch': '> LAUNCHING YATOKISHI.EXE',
      'boot.reconnect': '> RECONNECTING.........',
      'boot.welcome': 'WELCOME BACK.',

      'npc.class': 'Pixel Idol · Stream Goblin',
      'npc.lvl': 'LV: ∞   LIVE: MAYBE',
      'record.new': 'DUEL RECORD: NEW',
      'record.stats': 'W:{w} L:{l} · {g}G WON',

      'dialog.aria': 'Advance dialog',
      'dialog.hint': '[ CLICK TO CONTINUE ]',
      'dialogs': [
        "Ah, a new viewer!\nWelcome to the stream.\nDon't forget to follow~",
        "I'm not responsible\nfor any brain rot caused\nby watching me.",
        "Yes I take requests.\nNo I will not do\na normal one.",
        "I said I'd go live\nat 8pm. It is now\n2am. I'm ready.",
        "My chat is feral but\nthey're MY feral chat.\nDon't touch them.",
        "I'm always live at\nthe worst possible hours.\nTimezones are fake.",
      ],
      'konami': [
        "oh you found the void.\nit smells like instant\nnoodles in here.",
        "yatokishi was not\nprepared for this.\nnobody ever is.",
        "+999G added to your\nwallet. don't ask\nwhere it came from.",
      ],

      'menu.header': '── SELECT ACTION ──',
      'menu.twitch': 'ENTER THE ARENA',
      'menu.x': 'SEND A RAVEN',
      'menu.discord': 'JOIN THE GUILD',
      'menu.youtube': 'THE CHRONICLES',
      'menu.kofi': 'OFFER TRIBUTE',
      'tip.kofi': 'ko-fi / support',
      'duel.label': 'DUEL YATOKISHI',
      'dungeon.label': 'EXPLORE DUNGEON',
      'minigame': '[ minigame ]',
      'status.save': '✦ SAVE POINT ✦',
      'gold.title': 'Click to donate gold',
      'status.copy': '© YR.896 YATO CO.',

      'hp': 'HP',
      'you': 'YOU',
      'btn.attack': '⚔ ATTACK',
      'btn.magic': '✨ MAGIC',
      'btn.heal': '💊 HEAL',
      'btn.flee': '🏃 FLEE',
      'btn.close': '[ CLOSE ]',

      'battle.start': "yatokishi cracks her\nknuckles. let's go.",
      'battle.slash': 'yatokishi slashes!\n−{d} HP to you.',
      'battle.rage': 'chat goes WILD!\nyatokishi RAGES! −{d}!',
      'battle.afk': 'yatokishi went AFK...\n(0 damage this turn)',
      'battle.spam': 'yatokishi spam-clicks!\n−{d} HP!',
      'battle.potion': 'yatokishi chugs a\nsuper potion! +{h}HP',
      'player.attack': 'you attack!\n−{d} HP to yatokishi.',
      'player.magic': 'magic strike!\n−{d} HP! critical hit!',
      'player.miss': 'magic missed...\n"skill issue" — chat',
      'player.heal': 'you use a potion!\n+{h} HP restored.',
      'player.flee': 'you run away!\n"smart." — yatokishi',
      'player.noEscape': 'no escape! blocked!\nshe punishes for −{d}!',
      'result.winDungeon': 'YOU WIN!\n+{xp} XP EARNED!\n"gg no re" — yato',
      'result.win': 'YOU WIN!\nyatokishi drops {reward}G\n"gg no re" — yato',
      'result.flee': 'got away safely!\n"coward" — yatokishi',
      'result.loseDungeon': 'DEFEATED!\nyatokishi wins.\n"offer tribute" — chat',
      'result.lose': 'SKILL ISSUE\nyatokishi wins.\n"stay mad" — chat',

      'dungeon.title': '▼ DUNGEON OF YATO · FLOOR 1 ▼',
      'dungeon.hint': 'WASD / ARROWS · MOVE',
      'dungeon.retreat': '[ RETREAT ]',
      'dungeon.start': 'DUNGEON OF YATO — FLOOR 1  ·  find all 5 treasures',
      'dungeon.levelUp': 'LEVEL UP! Now LV.{n}! HP restored.',
      'dungeon.found': '★ {label} found! +15 HP.',
      'dungeon.defeated': 'Enemy defeated! +{xp} XP',
      'dungeon.lost': 'DEFEATED... offering tribute...',
      'dungeon.escaped': 'Escaped! The enemy remains...',
      'dungeon.enemy': 'An enemy appears!',
      'dungeon.exit': 'EXIT REACHED! {n}/5 treasures found.',
      'hud.level': 'LV.{n}',
      'dt.header': '★ TREASURE FOUND ★',
      'dt.open': 'OPEN PORTAL',
      'dt.continue': 'CONTINUE',
    },

    fr: {
      'boot.by': 'par yatokishi',
      'boot.skip': '[ CLIQUE POUR PASSER ]',
      'sound.aria': 'Activer ou couper le son',
      'menu.header2': '── CARRIÈRE ──',
      'menu.portfolio': 'LA FORGE',
      'menu.github': 'LES ARCHIVES',
      'menu.linkedin': 'LE RÉSEAU',
      'boot.chaos': '> INITIALISATION DU CHAOS.....',
      'boot.streamer': '> CHARGEMENT DU STREAMER........',
      'boot.sanity': '> VÉRIFICATION DE LA SANITÉ......',
      'boot.fail': '[ÉCHEC]',
      'boot.ignore': '> ERREUR IGNORÉE..........',
      'boot.brew': '> PRÉPARATION DU CONTENU.........',
      'boot.summon': '> INVOCATION DE YATOKISHI....',
      'boot.ready': 'SYSTÈME PRÊT.',
      'boot.launch': '> LANCEMENT DE YATOKISHI.EXE',
      'boot.reconnect': '> RECONNEXION.........',
      'boot.welcome': 'BON RETOUR.',

      'npc.class': 'Idole Pixel · Gobelin du Stream',
      'npc.lvl': 'NV : ∞   LIVE : PEUT-ÊTRE',
      'record.new': 'RECORD DE DUEL : VIERGE',
      'record.stats': 'V:{w} D:{l} · {g}G GAGNÉS',

      'dialog.aria': 'Passer au dialogue suivant',
      'dialog.hint': '[ CLIQUE POUR CONTINUER ]',
      'dialogs': [
        "Ah, un nouveau viewer !\nBienvenue sur le stream.\nN'oublie pas de follow~",
        "Je ne suis pas responsable\ndu brain rot causé\npar mes streams.",
        "Oui, je prends les requêtes.\nNon, je n'en ferai pas\nune normale.",
        "J'avais dit que je live\nà 20h. Il est 2h.\nJe suis prête.",
        "Mon chat est sauvage mais\nc'est MON chat sauvage.\nOn n'y touche pas.",
        "Je live toujours aux pires\nheures possibles.\nLes fuseaux horaires, c'est faux.",
      ],
      'konami': [
        "oh, tu as trouvé le vide.\nça sent les nouilles\ninstantanées ici.",
        "yatokishi n'était pas\npréparée à ça.\npersonne ne l'est.",
        "+999G ajoutés à ton\nportefeuille. ne demande\npas d'où ils viennent.",
      ],

      'menu.header': '── CHOISIS UNE ACTION ──',
      'menu.twitch': "ENTRER DANS L'ARÈNE",
      'menu.x': 'ENVOYER UN CORBEAU',
      'menu.discord': 'REJOINDRE LA GUILDE',
      'menu.youtube': 'LES CHRONIQUES',
      'menu.kofi': 'OFFRIR UN TRIBUT',
      'tip.kofi': 'ko-fi / soutien',
      'duel.label': 'DÉFIER YATOKISHI',
      'dungeon.label': 'EXPLORER LE DONJON',
      'minigame': '[ mini-jeu ]',
      'status.save': '✦ POINT DE SAUVEGARDE ✦',
      'gold.title': "Clique pour donner de l'or",
      'status.copy': '© AN 896 YATO CO.',

      'hp': 'PV',
      'you': 'TOI',
      'btn.attack': '⚔ ATTAQUE',
      'btn.magic': '✨ MAGIE',
      'btn.heal': '💊 SOIN',
      'btn.flee': '🏃 FUITE',
      'btn.close': '[ FERMER ]',

      'battle.start': "yatokishi se craque les\ndoigts. c'est parti.",
      'battle.slash': 'yatokishi attaque !\n−{d} PV pour toi.',
      'battle.rage': 'le chat devient FOU !\nyatokishi EN RAGE ! −{d} !',
      'battle.afk': 'yatokishi est AFK...\n(0 dégât ce tour)',
      'battle.spam': 'yatokishi spam-clique !\n−{d} PV !',
      'battle.potion': 'yatokishi boit une\nsuper potion ! +{h} PV',
      'player.attack': 'tu attaques !\n−{d} PV pour yatokishi.',
      'player.magic': 'frappe magique !\n−{d} PV ! coup critique !',
      'player.miss': 'la magie a raté...\n"skill issue" — le chat',
      'player.heal': 'tu utilises une potion !\n+{h} PV récupérés.',
      'player.flee': 'tu t\'enfuis !\n"intelligent." — yatokishi',
      'player.noEscape': "pas d'issue ! bloqué !\nelle te punit de −{d} !",
      'result.winDungeon': 'VICTOIRE !\n+{xp} XP GAGNÉS !\n"gg no re" — yato',
      'result.win': 'VICTOIRE !\nyatokishi lâche {reward}G\n"gg no re" — yato',
      'result.flee': 'tu t\'es enfui !\n"lâche" — yatokishi',
      'result.loseDungeon': 'DÉFAITE !\nyatokishi gagne.\n"offre un tribut" — le chat',
      'result.lose': 'SKILL ISSUE\nyatokishi gagne.\n"reste mad" — le chat',

      'dungeon.title': '▼ DONJON DE YATO · ÉTAGE 1 ▼',
      'dungeon.hint': 'WASD / FLÈCHES · DÉPLACEMENT',
      'dungeon.retreat': '[ RETRAITE ]',
      'dungeon.start': 'DONJON DE YATO — ÉTAGE 1  ·  trouve les 5 trésors',
      'dungeon.levelUp': 'NIVEAU SUPÉRIEUR ! NV.{n} ! PV restaurés.',
      'dungeon.found': '★ {label} trouvé ! +15 PV.',
      'dungeon.defeated': 'Ennemi vaincu ! +{xp} XP',
      'dungeon.lost': 'DÉFAITE... offrande du tribut...',
      'dungeon.escaped': "Tu t'échappes ! L'ennemi reste là...",
      'dungeon.enemy': 'Un ennemi apparaît !',
      'dungeon.exit': 'SORTIE ATTEINTE ! {n}/5 trésors trouvés.',
      'hud.level': 'NV.{n}',
      'dt.header': '★ TRÉSOR TROUVÉ ★',
      'dt.open': 'OUVRIR LE PORTAIL',
      'dt.continue': 'CONTINUER',
    },
  };

  const KEY = 'yato-lang';
  const listeners = [];

  function stored() {
    try { return localStorage.getItem(KEY); } catch { return null; }
  }

  let lang = stored();
  if (lang !== 'fr' && lang !== 'en') {
    lang = (navigator.language || '').toLowerCase().startsWith('fr') ? 'fr' : 'en';
  }

  function raw(key) {
    const v = dict[lang][key];
    return v !== undefined ? v : dict.en[key];
  }

  // Texte simple, avec variables {nom}
  window.T = (key, vars) => {
    const s = raw(key);
    if (typeof s !== 'string') return key;
    return vars ? s.replace(/\{(\w+)\}/g, (_, k) => (vars[k] !== undefined ? vars[k] : '')) : s;
  };

  // Liste de textes (dialogues)
  window.TL = (key) => {
    const v = raw(key);
    return Array.isArray(v) ? v : [];
  };

  window.onLangChange = (cb) => listeners.push(cb);

  function apply() {
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = window.T(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-title]').forEach(el => { el.title = window.T(el.dataset.i18nTitle); });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', window.T(el.dataset.i18nAria)); });
    document.querySelectorAll('[data-i18n-tip]').forEach(el => { el.dataset.tip = window.T(el.dataset.i18nTip); });

    const btn = document.getElementById('lang-toggle');
    if (btn) btn.textContent = lang === 'fr' ? 'EN' : 'FR';
  }

  function setLang(next) {
    lang = next;
    try { localStorage.setItem(KEY, lang); } catch {}
    apply();
    listeners.forEach(cb => cb(lang));
  }

  apply();

  const btn = document.getElementById('lang-toggle');
  if (btn) btn.addEventListener('click', () => setLang(lang === 'fr' ? 'en' : 'fr'));
})();
