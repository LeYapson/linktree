document.addEventListener('DOMContentLoaded', () => {

  /* ── Helpers ─────────────────────────────────────────────────── */
  function rng(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  /* ── 8-bit SFX (Web Audio API) ───────────────────────────────── */
  let audioCtx = null;

  const SFX = {
    _init() {
      try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();
      } catch {}
    },

    _play({ freq = 440, dur = 0.1, type = 'square', vol = 0.07, delay = 0 }) {
      this._init();
      if (!audioCtx) return;
      try {
        const t   = audioCtx.currentTime + delay;
        const osc = audioCtx.createOscillator();
        const g   = audioCtx.createGain();
        osc.connect(g); g.connect(audioCtx.destination);
        osc.type = type;
        osc.frequency.setValueAtTime(freq, t);
        g.gain.setValueAtTime(vol, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + dur);
        osc.start(t); osc.stop(t + dur + 0.01);
      } catch {}
    },

    hover()      { this._play({ freq: 440, dur: 0.05, vol: 0.04 }); },
    select()     { this._play({ freq: 600, dur: 0.08, vol: 0.06 }); },
    tick()       { this._play({ freq: 880, dur: 0.025, vol: 0.025 }); },
    bootBeep()   { this._play({ freq: 440, dur: 0.06, vol: 0.05 }); },

    attack() {
      this._play({ freq: 300, dur: 0.08, type: 'sawtooth', vol: 0.1,  delay: 0    });
      this._play({ freq: 200, dur: 0.12, type: 'sawtooth', vol: 0.08, delay: 0.07 });
    },
    magic() {
      [800, 1000, 1200].forEach((f, i) =>
        this._play({ freq: f, dur: 0.07, type: 'sine', vol: 0.08, delay: i * 0.06 }));
    },
    heal() {
      [523, 659, 784].forEach((f, i) =>
        this._play({ freq: f, dur: 0.09, vol: 0.07, delay: i * 0.08 }));
    },
    hit()     { this._play({ freq: 150, dur: 0.15, type: 'sawtooth', vol: 0.12 }); },
    rageHit() {
      this._play({ freq: 100, dur: 0.12, type: 'sawtooth', vol: 0.15, delay: 0   });
      this._play({ freq: 80,  dur: 0.2,  type: 'sawtooth', vol: 0.12, delay: 0.1 });
    },
    flee() {
      [400, 500, 600].forEach((f, i) =>
        this._play({ freq: f, dur: 0.06, vol: 0.07, delay: i * 0.06 }));
    },
    win() {
      [523, 659, 784, 1047].forEach((f, i) =>
        this._play({ freq: f, dur: i === 3 ? 0.4 : 0.1, vol: 0.1, delay: i * 0.1 }));
    },
    lose() {
      [500, 400, 300, 200].forEach((f, i) =>
        this._play({ freq: f, dur: 0.15, vol: 0.1, delay: i * 0.15 }));
    },
    bootReady() {
      [523, 659, 784].forEach((f, i) =>
        this._play({ freq: f, dur: 0.1, vol: 0.08, delay: i * 0.08 }));
    },
    konami() {
      [800, 1000, 1200, 1600, 2000].forEach((f, i) =>
        this._play({ freq: f, dur: 0.06, vol: 0.12, delay: i * 0.06 }));
    },
  };


  /* ── Boot sequence ────────────────────────────────────────────── */
  const bootScreen  = document.getElementById('boot-screen');
  const bootLinesEl = document.getElementById('boot-lines');

  const isReturning  = sessionStorage.getItem('yato-booted');
  sessionStorage.setItem('yato-booted', '1');

  let bootDismissed = false;
  const bootTimers  = [];

  const FULL_BOOT = [
    { label: '> INITIALIZING CHAOS.....',  status: '[ OK ]',   cls: 'ok',   t: 500  },
    { label: '> LOADING STREAMER........', status: '[ OK ]',   cls: 'ok',   t: 900  },
    { label: '> CHECKING SANITY.........',  status: '[FAIL]',  cls: 'fail', t: 1300 },
    { label: '> IGNORING ERROR..........',  status: '[ OK ]',  cls: 'ok',   t: 1650 },
    { label: '> BREWING CONTENT.........',  status: '[ OK ]',  cls: 'ok',   t: 2050 },
    { label: '> SUMMONING YATOKISHI....',   status: '[ OK ]',  cls: 'ok',   t: 2500 },
    { label: '',                             status: '',        cls: '',     t: 2850 },
    { label: 'SYSTEM READY.',               status: '',        cls: '',     t: 2950 },
    { label: '> LAUNCHING YATOKISHI.EXE',  status: '',        cls: '',     t: 3350 },
  ];

  const QUICK_BOOT = [
    { label: '> RECONNECTING.........',  status: '[ OK ]',  cls: 'ok',  t: 200 },
    { label: 'WELCOME BACK.',            status: '',        cls: '',    t: 500 },
  ];

  const bootSequence = isReturning ? QUICK_BOOT : FULL_BOOT;
  const promptDelay  = isReturning ? 750 : 3750;

  function addBootLine({ label, status, cls }) {
    const row = document.createElement('div');
    row.className = 'boot-line';
    if (label) {
      const lbl = document.createElement('span');
      lbl.className = 'boot-lbl';
      lbl.textContent = label;
      row.appendChild(lbl);
    }
    if (status) {
      const sta = document.createElement('span');
      sta.className = `boot-status ${cls}`;
      sta.textContent = status;
      row.appendChild(sta);
    }
    bootLinesEl.appendChild(row);
    SFX.bootBeep();
  }

  bootSequence.forEach(line => {
    bootTimers.push(setTimeout(() => {
      if (!bootDismissed) addBootLine(line);
    }, line.t));
  });

  bootTimers.push(setTimeout(() => {
    if (!bootDismissed) {
      SFX.bootReady();
      setTimeout(dismissBoot, 900);
    }
  }, promptDelay));

  function dismissBoot() {
    if (bootDismissed) return;
    bootDismissed = true;
    bootTimers.forEach(clearTimeout);
    SFX.select();
    bootScreen.classList.add('fade-out');
    setTimeout(() => bootScreen.remove(), 600);
  }

  bootScreen.addEventListener('click', dismissBoot);


  /* ── Gold ─────────────────────────────────────────────────────── */
  let gold        = 9999;
  const goldEl    = document.getElementById('gold');
  const goldBadge = document.getElementById('gold-badge');

  function addGold(n) {
    gold += n;
    goldEl.textContent = gold.toLocaleString();
  }

  goldBadge.addEventListener('click', () => { SFX.select(); addGold(rng(10, 50)); });


  /* ── Stats (localStorage) ─────────────────────────────────────── */
  const STATS_KEY = 'yato-stats';
  const recordEl  = document.getElementById('battle-record');

  function getStats() {
    try { return JSON.parse(localStorage.getItem(STATS_KEY)) || { w: 0, l: 0, g: 0 }; }
    catch { return { w: 0, l: 0, g: 0 }; }
  }
  function saveStats(s) {
    try { localStorage.setItem(STATS_KEY, JSON.stringify(s)); } catch {}
  }
  function updateRecord() {
    if (!recordEl) return;
    const s = getStats();
    recordEl.textContent = (s.w === 0 && s.l === 0)
      ? 'DUEL RECORD: NEW'
      : `W:${s.w} L:${s.l} · ${s.g}G WON`;
  }
  function recordWin(reward) {
    const s = getStats(); s.w++; s.g += reward; saveStats(s); updateRecord();
  }
  function recordLoss() {
    const s = getStats(); s.l++; saveStats(s); updateRecord();
  }

  updateRecord();


  /* ── Dialog typewriter ────────────────────────────────────────── */
  const DIALOGS = [
    "Ah, a new viewer!\nWelcome to the stream.\nDon't forget to follow~",
    "I'm not responsible\nfor any brain rot caused\nby watching me.",
    "Yes I take requests.\nNo I will not do\na normal one.",
    "I said I'd go live\nat 8pm. It is now\n2am. I'm ready.",
    "My chat is feral but\nthey're MY feral chat.\nDon't touch them.",
    "I'm always live at\nthe worst possible hours.\nTimezones are fake.",
  ];

  const KONAMI_DIALOGS = [
    "oh you found the void.\nit smells like instant\nnoodles in here.",
    "yatokishi was not\nprepared for this.\nnobody ever is.",
    "+999G added to your\nwallet. don't ask\nwhere it came from.",
  ];

  let activeDialogs  = DIALOGS;
  let dialogIdx      = 0;
  let isTyping       = false;
  let typeTimer      = null;
  let currentFull    = '';

  const dialogBodyEl = document.getElementById('dialog-body');
  const dialogNextEl = document.getElementById('dialog-next');
  const dialogEl     = document.getElementById('dialog');

  function typeText(text) {
    if (typeTimer) clearTimeout(typeTimer);
    currentFull = text; isTyping = true;
    dialogBodyEl.textContent      = '';
    dialogNextEl.style.visibility = 'hidden';
    let i = 0;
    function tick() {
      i++;
      dialogBodyEl.textContent = text.slice(0, i);
      if (i % 2 === 0) SFX.tick();
      if (i < text.length) { typeTimer = setTimeout(tick, 36); }
      else { isTyping = false; dialogNextEl.style.visibility = 'visible'; }
    }
    typeTimer = setTimeout(tick, 400);
  }

  function advanceDialog() {
    SFX.select();
    if (isTyping) {
      clearTimeout(typeTimer);
      dialogBodyEl.textContent      = currentFull;
      isTyping = false;
      dialogNextEl.style.visibility = 'visible';
    } else {
      dialogIdx = (dialogIdx + 1) % activeDialogs.length;
      if (activeDialogs === KONAMI_DIALOGS && dialogIdx === 0) {
        activeDialogs = DIALOGS; dialogIdx = 0;
      }
      typeText(activeDialogs[dialogIdx]);
    }
  }

  dialogEl.addEventListener('click', advanceDialog);
  dialogEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); advanceDialog(); }
  });

  typeText(DIALOGS[0]);

  document.querySelectorAll('.menu-item').forEach(item =>
    item.addEventListener('mouseenter', () => SFX.hover())
  );
  document.getElementById('btn-start-battle')
    .addEventListener('mouseenter', () => SFX.hover());


  /* ── Particles ────────────────────────────────────────────────── */
  function spawnParticles() {
    const rect = document.querySelector('.battle-panel').getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;
    for (let i = 0; i < 24; i++) {
      const p     = document.createElement('span');
      p.className = 'particle';
      p.textContent = i % 2 === 0 ? '◆' : '★';
      const angle = Math.random() * Math.PI * 2;
      const spd   = rng(70, 170);
      const dx    = (Math.cos(angle) * spd).toFixed(1);
      const dy    = (Math.sin(angle) * spd - 130).toFixed(1);
      const dur   = (Math.random() * 0.5 + 0.5).toFixed(2);
      p.style.cssText = `left:${cx}px;top:${cy}px;--dx:${dx}px;--dy:${dy}px;--dur:${dur}s`;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), parseFloat(dur) * 1000 + 300);
    }
  }


  /* ── Battle ───────────────────────────────────────────────────── */
  const ENEMY_MAX  = 80;
  const PLAYER_MAX = 100;

  const B = {
    overlay:     document.getElementById('battle-overlay'),
    sprite:      document.getElementById('battle-sprite'),
    enemyFill:   document.getElementById('enemy-hp-fill'),
    enemyNum:    document.getElementById('enemy-hp-num'),
    playerFill:  document.getElementById('player-hp-fill'),
    playerTrack: document.getElementById('player-hp-track'),
    playerNum:   document.getElementById('player-hp-num'),
    log:         document.getElementById('battle-log'),
    actions:     document.getElementById('battle-actions'),
    result:      document.getElementById('battle-result'),
    resultMsg:   document.getElementById('result-msg'),
    panel:       document.querySelector('.battle-panel'),
  };

  let bs = { playerHP: PLAYER_MAX, enemyHP: ENEMY_MAX, active: false };

  const ENEMY_MOVES = [
    () => { const d = rng(10,20); return { dmg: d, msg: `yatokishi slashes!\n−${d} HP to you.`,         rage: false }; },
    () => { const d = rng(18,32); return { dmg: d, msg: `chat goes WILD!\nyatokishi RAGES! −${d}!`,     rage: true  }; },
    () =>                       ({ dmg: 0,          msg: `yatokishi went AFK...\n(0 damage this turn)`, rage: false }),
    () => { const d = rng(5,14);  return { dmg: d, msg: `yatokishi spam-clicks!\n−${d} HP!`,            rage: false }; },
  ];
  const ENEMY_POOL = [0, 0, 0, 1, 1, 2, 3, 3, 3];

  function battleLog(msg) { B.log.textContent = msg; }

  function updateBars() {
    const pMax = dungeon.active ? dungeon.maxHP : PLAYER_MAX;
    const ep = Math.max(0, bs.enemyHP  / ENEMY_MAX * 100);
    const pp = Math.max(0, bs.playerHP / pMax     * 100);
    B.enemyFill.style.width  = ep + '%';
    B.playerFill.style.width = pp + '%';
    B.enemyNum.textContent   = `${Math.max(0, bs.enemyHP)}/${ENEMY_MAX}`;
    B.playerNum.textContent  = `${Math.max(0, bs.playerHP)}/${pMax}`;
    B.enemyFill.style.background  = ep < 25 ? 'var(--red)' : 'var(--pink)';
    B.playerFill.style.background = pp < 25 ? 'var(--red)' : '#4080e0';
  }

  function lockActions(lock) {
    B.actions.querySelectorAll('button').forEach(btn => btn.disabled = lock);
  }

  function flashSprite() {
    B.sprite.classList.remove('hit');
    void B.sprite.offsetWidth;
    B.sprite.classList.add('hit');
    setTimeout(() => B.sprite.classList.remove('hit'), 450);
  }

  function shakePlayerBar() {
    B.playerTrack.classList.remove('shake');
    void B.playerTrack.offsetWidth;
    B.playerTrack.classList.add('shake');
    setTimeout(() => B.playerTrack.classList.remove('shake'), 400);
  }

  function shakeBattlePanel() {
    B.panel.classList.remove('panel-shake');
    void B.panel.offsetWidth;
    B.panel.classList.add('panel-shake');
    setTimeout(() => B.panel.classList.remove('panel-shake'), 500);
  }

  function endBattle(outcome) {
    bs.active = false;
    B.actions.classList.add('is-hidden');
    B.result.classList.remove('is-hidden');

    if (dungeon.active) {
      dungeon.lastBattleResult = outcome;
      dungeon.playerHP = Math.max(0, bs.playerHP);
    }

    if (outcome === 'win') {
      const reward = rng(50, 100);
      addGold(reward);
      recordWin(reward);
      SFX.win();
      spawnParticles();
      B.resultMsg.style.color = 'var(--yellow)';
      if (dungeon.active) {
        const xp = rng(30, 50);
        dungeon.pendingXP = xp;
        B.resultMsg.textContent = `YOU WIN!\n+${xp} XP EARNED!\n"gg no re" — yato`;
      } else {
        B.resultMsg.textContent = `YOU WIN!\nyatokishi drops ${reward}G\n"gg no re" — yato`;
      }
    } else if (outcome === 'flee') {
      SFX.flee();
      B.resultMsg.style.color = 'var(--text-dim)';
      B.resultMsg.textContent = `got away safely!\n"coward" — yatokishi`;
    } else {
      recordLoss();
      SFX.lose();
      B.resultMsg.style.color = 'var(--red)';
      if (dungeon.active) {
        B.resultMsg.textContent = `DEFEATED!\nyatokishi wins.\n"offer tribute" — chat`;
      } else {
        B.resultMsg.textContent = `SKILL ISSUE\nyatokishi wins.\n"stay mad" — chat`;
      }
    }
  }

  function enemyTurn() {
    if (!bs.active || bs.enemyHP <= 0) return;

    if (bs.enemyHP < 18 && Math.random() < 0.45) {
      const h = rng(10, 18);
      bs.enemyHP = Math.min(ENEMY_MAX, bs.enemyHP + h);
      battleLog(`yatokishi chugs a\nsuper potion! +${h}HP`);
      updateBars();
      lockActions(false);
      return;
    }

    const { dmg, msg, rage } = ENEMY_MOVES[ENEMY_POOL[rng(0, ENEMY_POOL.length - 1)]]();
    bs.playerHP -= dmg;
    battleLog(msg);

    if (dmg > 0) {
      shakePlayerBar();
      if (rage) { SFX.rageHit(); shakeBattlePanel(); }
      else      { SFX.hit(); }
    }

    updateBars();

    if (bs.playerHP <= 0) { setTimeout(() => endBattle('lose'), 500); }
    else                   { lockActions(false); }
  }

  function playerAction(type) {
    if (!bs.active) return;
    lockActions(true);

    if (type === 'attack') {
      const d = rng(15, 25);
      bs.enemyHP -= d;
      flashSprite(); SFX.attack();
      battleLog(`you attack!\n−${d} HP to yatokishi.`);

    } else if (type === 'magic') {
      SFX.magic();
      if (Math.random() < 0.70) {
        const d = rng(25, 40);
        bs.enemyHP -= d;
        flashSprite();
        battleLog(`magic strike!\n−${d} HP! critical hit!`);
      } else {
        battleLog(`magic missed...\n"skill issue" — chat`);
      }

    } else if (type === 'heal') {
      const h = rng(20, 30);
      const pMax = dungeon.active ? dungeon.maxHP : PLAYER_MAX;
      bs.playerHP = Math.min(pMax, bs.playerHP + h);
      SFX.heal();
      battleLog(`you use a potion!\n+${h} HP restored.`);

    } else if (type === 'flee') {
      if (Math.random() < 0.55) {
        SFX.flee();
        battleLog(`you run away!\n"smart." — yatokishi`);
        updateBars();
        setTimeout(() => endBattle('flee'), 700);
        return;
      } else {
        const d = rng(15, 25);
        bs.playerHP -= d;
        shakePlayerBar(); SFX.hit();
        battleLog(`no escape! blocked!\nshe punishes for −${d}!`);
        updateBars();
        if (bs.playerHP <= 0) { setTimeout(() => endBattle('lose'), 500); return; }
        lockActions(false);
        return;
      }
    }

    updateBars();
    if (bs.enemyHP <= 0) { setTimeout(() => endBattle('win'), 500); return; }
    setTimeout(enemyTurn, 900);
  }

  function startBattle() {
    const startHP = dungeon.active ? dungeon.playerHP : PLAYER_MAX;
    bs = { playerHP: startHP, enemyHP: ENEMY_MAX, active: true };
    B.actions.classList.remove('is-hidden');
    B.result.classList.add('is-hidden');
    lockActions(false);
    updateBars();
    SFX.select();
    battleLog(`yatokishi cracks her\nknuckles. let's go.`);
    B.overlay.classList.add('active');
  }

  function closeBattle() {
    B.overlay.classList.remove('active');
    bs.active = false;
    if (dungeon.active && dungeon.lastBattleResult !== null) {
      const result = dungeon.lastBattleResult;
      dungeon.lastBattleResult = null;
      handleDungeonBattleEnd(result);
    }
  }

  document.getElementById('btn-start-battle').addEventListener('click', startBattle);
  document.getElementById('btn-attack').addEventListener('click',       () => playerAction('attack'));
  document.getElementById('btn-magic').addEventListener('click',        () => playerAction('magic'));
  document.getElementById('btn-heal').addEventListener('click',         () => playerAction('heal'));
  document.getElementById('btn-flee').addEventListener('click',         () => playerAction('flee'));
  document.getElementById('btn-battle-close').addEventListener('click', closeBattle);
  B.overlay.addEventListener('click', (e) => { if (e.target === B.overlay) closeBattle(); });


  /* ── Konami code ──────────────────────────────────────────────── */
  const KONAMI_SEQ = [
    'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
    'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
    'b','a',
  ];
  let konamiIdx = 0;

  function triggerKonami() {
    SFX.konami();
    addGold(999);
    const flash = document.createElement('div');
    flash.className = 'konami-flash';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 600);
    activeDialogs = KONAMI_DIALOGS;
    dialogIdx     = 0;
    if (typeTimer) clearTimeout(typeTimer);
    typeText(KONAMI_DIALOGS[0]);
  }

  /* ── Dungeon ──────────────────────────────────────────────────── */

  const DUNGEON_MAP = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,0,1,1,1,1,1,0,1,1,1,0],
    [0,1,3,1,0,1,1,8,1,1,0,1,5,1,0], // 3=Twitch, 5=Discord
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,0,0,0,1,0,0,0,0,0,0,1,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,8,1,0,1,1,1,0,1,1,1,8,1,0],
    [0,1,1,1,0,1,4,1,0,1,1,1,1,6,0], // 4=Twitter, 6=YouTube
    [0,0,1,0,0,1,0,0,0,0,1,0,0,1,0],
    [0,1,1,1,1,1,1,7,1,1,1,1,1,8,0], // 7=Ko-fi
    [0,2,1,1,0,1,1,1,1,1,0,1,1,9,0], // 2=start, 9=exit
  ];

  const TREASURE_DATA = {
    3: { label: 'ENTER THE ARENA', icon: '◉', hint: 'twitch.tv/yatokishi',    url: 'https://twitch.tv/yatokishi' },
    4: { label: 'SEND A RAVEN',    icon: '✉', hint: 'x.com/yatokishi',        url: 'https://x.com/yatokishi' },
    5: { label: 'JOIN THE GUILD',  icon: '⚔', hint: 'discord.gg/93fJgDmhec', url: 'https://discord.gg/93fJgDmhec' },
    6: { label: 'THE CHRONICLES',  icon: '📜', hint: 'youtube.com/@yatokishi', url: 'https://www.youtube.com/@yatokishi' },
    7: { label: 'OFFER TRIBUTE',   icon: '◆', hint: 'ko-fi.com/yatokishi',    url: 'https://ko-fi.com/yatokishi' },
  };

  const D_COLS = 15, D_ROWS = 11;

  const dungeon = {
    active: false,
    playerCol: 1, playerRow: 10,
    xp: 0, level: 1,
    playerHP: 100, maxHP: 100,
    cellOverrides: {},
    seen: new Set(),
    lastBattleResult: null,
    pendingXP: 0,
    battleEnemyPos: null,
    battlePrevPos: null,
  };

  const Dov  = document.getElementById('dungeon-overlay');
  const Dmap = document.getElementById('dungeon-map');
  const DhpF = document.getElementById('d-hp-fill');
  const DhpN = document.getElementById('d-hp-num');
  const DxpF = document.getElementById('d-xp-fill');
  const DxpN = document.getElementById('d-xp-num');
  const DlvL = document.getElementById('d-level');
  const DtrC = document.getElementById('d-treasure-count');
  const DlogE = document.getElementById('d-log');
  const DTdialog = document.getElementById('dungeon-treasure-dialog');

  function dCellType(c, r) {
    const key = `${c},${r}`;
    return dungeon.cellOverrides[key] !== undefined ? dungeon.cellOverrides[key] : DUNGEON_MAP[r][c];
  }

  function dungeonReveal(c, r) {
    for (let dr = -2; dr <= 2; dr++) {
      for (let dc = -2; dc <= 2; dc++) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < D_ROWS && nc >= 0 && nc < D_COLS
            && Math.abs(dr) + Math.abs(dc) <= 3) {
          dungeon.seen.add(`${nc},${nr}`);
        }
      }
    }
  }

  function dungeonTreasureCount() {
    let count = 0;
    for (const key in dungeon.cellOverrides) {
      const [c, r] = key.split(',').map(Number);
      const orig = DUNGEON_MAP[r][c];
      if (orig >= 3 && orig <= 7 && dungeon.cellOverrides[key] === 1) count++;
    }
    return count;
  }

  function updateDungeonHUD() {
    const xpNeeded = dungeon.level * 100;
    const xpInLevel = dungeon.xp - (dungeon.level - 1) * 100;
    DhpF.style.width = Math.max(0, dungeon.playerHP / dungeon.maxHP * 100) + '%';
    DhpN.textContent = `${dungeon.playerHP}/${dungeon.maxHP}`;
    DxpF.style.width = Math.min(100, xpInLevel / 100 * 100) + '%';
    DxpN.textContent = `${xpInLevel}/100`;
    DlvL.textContent = `LV.${dungeon.level}`;
    DtrC.textContent = `◆ ${dungeonTreasureCount()}/5`;
    if (dungeon.playerHP <= 25) {
      DhpF.style.background = 'var(--red)';
    } else {
      DhpF.style.background = '';
    }
  }

  function dungeonLog(msg) { if (DlogE) DlogE.textContent = msg; }

  function renderDungeonMap() {
    Dmap.innerHTML = '';
    for (let r = 0; r < D_ROWS; r++) {
      for (let c = 0; c < D_COLS; c++) {
        const cell = document.createElement('div');
        cell.className = 'd-cell';
        const key = `${c},${r}`;
        const seen = dungeon.seen.has(key);
        const type = dCellType(c, r);
        const isPlayer = (c === dungeon.playerCol && r === dungeon.playerRow);

        if (!seen) {
          cell.classList.add('d-unseen');
        } else if (type === 0) {
          cell.classList.add('d-wall');
        } else {
          cell.classList.add('d-floor');
          if (isPlayer) {
            cell.classList.add('d-player');
            cell.textContent = '@';
          } else if (type >= 3 && type <= 7) {
            cell.classList.add('d-treasure');
            cell.textContent = '★';
          } else if (type === 8) {
            cell.classList.add('d-enemy');
            cell.textContent = '☠';
          } else if (type === 9) {
            cell.classList.add('d-exit');
            cell.textContent = '▼';
          } else if (type === 2) {
            cell.classList.add('d-start');
            cell.textContent = '▲';
          }
        }
        Dmap.appendChild(cell);
      }
    }
  }

  function checkLevelUp() {
    const xpNeeded = dungeon.level * 100;
    if (dungeon.xp >= xpNeeded) {
      dungeon.level++;
      dungeon.maxHP += 10;
      dungeon.playerHP = Math.min(dungeon.playerHP + 25, dungeon.maxHP);
      dungeonLog(`LEVEL UP! Now LV.${dungeon.level}! HP restored.`);
    }
  }

  function openDungeon() {
    dungeon.active = true;
    dungeon.playerCol = 1; dungeon.playerRow = 10;
    dungeon.xp = 0; dungeon.level = 1;
    dungeon.playerHP = 100; dungeon.maxHP = 100;
    dungeon.cellOverrides = {};
    dungeon.seen = new Set();
    dungeon.lastBattleResult = null;
    dungeon.pendingXP = 0;
    dungeon.battleEnemyPos = null;
    dungeon.battlePrevPos = null;
    dungeonReveal(1, 10);
    Dov.classList.add('active');
    renderDungeonMap();
    updateDungeonHUD();
    dungeonLog('DUNGEON OF YATO — FLOOR 1  ·  find all 5 treasures');
    SFX.select();
  }

  function closeDungeon() {
    dungeon.active = false;
    Dov.classList.remove('active');
    SFX.flee();
  }

  function openTreasureDialog(type) {
    const data = TREASURE_DATA[type];
    document.getElementById('dt-icon').textContent = data.icon;
    document.getElementById('dt-name').textContent = data.label;
    document.getElementById('dt-url').textContent  = data.hint;
    document.getElementById('dt-open').onclick = () => window.open(data.url, '_blank');
    document.getElementById('dt-close').onclick = () => {
      DTdialog.classList.remove('active');
      dungeon.playerHP = Math.min(dungeon.maxHP, dungeon.playerHP + 15);
      dungeonLog(`★ ${data.label} found! +15 HP.`);
      renderDungeonMap();
      updateDungeonHUD();
    };
    DTdialog.classList.add('active');
    SFX.win();
  }

  function handleDungeonBattleEnd(outcome) {
    dungeon.playerHP = Math.max(0, bs.playerHP);

    if (outcome === 'win') {
      const xp = dungeon.pendingXP || rng(30, 50);
      dungeon.pendingXP = 0;
      dungeon.xp += xp;
      checkLevelUp();
      if (dungeon.battleEnemyPos) {
        dungeon.cellOverrides[`${dungeon.battleEnemyPos.col},${dungeon.battleEnemyPos.row}`] = 1;
      }
      dungeonLog(`Enemy defeated! +${xp} XP`);
      renderDungeonMap();
      updateDungeonHUD();
    } else if (outcome === 'lose') {
      dungeonLog('DEFEATED... offering tribute...');
      setTimeout(() => { window.location.href = 'https://ko-fi.com/yatokishi'; }, 800);
    } else if (outcome === 'flee') {
      if (dungeon.battlePrevPos) {
        dungeon.playerCol = dungeon.battlePrevPos.col;
        dungeon.playerRow = dungeon.battlePrevPos.row;
      }
      dungeonLog('Escaped! The enemy remains...');
      renderDungeonMap();
      updateDungeonHUD();
    }

    dungeon.battleEnemyPos = null;
    dungeon.battlePrevPos = null;
  }

  function movePlayer(dc, dr) {
    if (!dungeon.active
        || B.overlay.classList.contains('active')
        || DTdialog.classList.contains('active')) return;

    const newCol = dungeon.playerCol + dc;
    const newRow = dungeon.playerRow + dr;
    if (newRow < 0 || newRow >= D_ROWS || newCol < 0 || newCol >= D_COLS) return;

    const type = dCellType(newCol, newRow);
    if (type === 0) return;

    const prevCol = dungeon.playerCol;
    const prevRow = dungeon.playerRow;
    dungeon.playerCol = newCol;
    dungeon.playerRow = newRow;
    dungeonReveal(newCol, newRow);
    SFX.hover();

    if (type >= 3 && type <= 7) {
      dungeon.cellOverrides[`${newCol},${newRow}`] = 1;
      renderDungeonMap();
      updateDungeonHUD();
      openTreasureDialog(type);
    } else if (type === 8) {
      dungeon.battleEnemyPos = { col: newCol, row: newRow };
      dungeon.battlePrevPos  = { col: prevCol, row: prevRow };
      renderDungeonMap();
      dungeonLog('An enemy appears!');
      startBattle();
    } else if (type === 9) {
      renderDungeonMap();
      updateDungeonHUD();
      const found = dungeonTreasureCount();
      dungeonLog(`EXIT REACHED! ${found}/5 treasures found.`);
      SFX.win();
      spawnParticles();
      addGold(rng(100, 200));
      setTimeout(closeDungeon, 2000);
    } else {
      renderDungeonMap();
    }
  }

  document.getElementById('btn-dungeon').addEventListener('click', openDungeon);
  document.getElementById('d-up').addEventListener('click',    () => movePlayer(0,-1));
  document.getElementById('d-down').addEventListener('click',  () => movePlayer(0, 1));
  document.getElementById('d-left').addEventListener('click',  () => movePlayer(-1,0));
  document.getElementById('d-right').addEventListener('click', () => movePlayer( 1,0));
  document.getElementById('d-exit-btn').addEventListener('click', closeDungeon);

  /* ── Global keydown ───────────────────────────────────────────── */
  document.addEventListener('keydown', (e) => {
    // Boot screen: any key dismisses
    if (!bootDismissed) { dismissBoot(); return; }

    // Battle: Escape closes
    if (e.key === 'Escape' && B.overlay.classList.contains('active')) {
      closeBattle(); return;
    }

    // Dungeon movement (WASD / arrows)
    if (dungeon.active && !B.overlay.classList.contains('active')
        && !document.getElementById('dungeon-treasure-dialog').classList.contains('active')) {
      if (e.key === 'ArrowUp'    || e.key === 'w' || e.key === 'W') { e.preventDefault(); movePlayer(0,-1); return; }
      if (e.key === 'ArrowDown'  || e.key === 's' || e.key === 'S') { e.preventDefault(); movePlayer(0, 1); return; }
      if (e.key === 'ArrowLeft'  || e.key === 'a' || e.key === 'A') { e.preventDefault(); movePlayer(-1,0); return; }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') { e.preventDefault(); movePlayer( 1,0); return; }
      if (e.key === 'Escape') { closeDungeon(); return; }
    }

    // Konami tracker
    if (e.key === KONAMI_SEQ[konamiIdx]) {
      konamiIdx++;
      if (konamiIdx === KONAMI_SEQ.length) { konamiIdx = 0; triggerKonami(); }
    } else {
      konamiIdx = (e.key === KONAMI_SEQ[0]) ? 1 : 0;
    }
  });

});
