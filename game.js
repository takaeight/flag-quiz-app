/**
 * Flag Quiz App Logic
 * Designed for premium interaction and smooth gameplay.
 */

// Global Error Handler for Mobile Debugging
window.onerror = function (msg, url, line, col, error) {
    const el = document.getElementById('status-bar');
    if (el) {
        el.style.background = 'red';
        el.innerText = `ERR: ${msg} [L${line}]`;
    }
    console.error(msg, error);
    return false;
};

// console.log("!!! GAME.JS V24.7 LOADED !!!");
const elStatus = document.getElementById('status-bar');
if (elStatus) elStatus.textContent = "System: Logic v24.7 (Level 5) Loaded OK";

function logStatus(msg) {
    const el = document.getElementById('status-bar');
    if (el) el.innerText = msg;
    console.log(msg);
}

// List of Countries
// Level 1: Super Famous (Japan, USA, China, etc.)
// Level 2: Europe / Asia Main (Normal)
// Level 3: Africa / South America (Hard)
// Level 4: Middle East / Others (Very Hard)
const COUNTRIES = [
    // Level 1: Very Famous (10 countries)
    { code: 'jp', name: 'にほん', level: 1 },
    { code: 'us', name: 'アメリカ', level: 1 },
    { code: 'cn', name: 'ちゅうごく', level: 1 },
    { code: 'kr', name: 'かんこく', level: 1 },
    { code: 'gb', name: 'イギリス', level: 1 },
    { code: 'fr', name: 'フランス', level: 1 },
    { code: 'de', name: 'ドイツ', level: 1 },
    { code: 'it', name: 'イタリア', level: 1 },
    { code: 'br', name: 'ブラジル', level: 1 },
    { code: 'au', name: 'オーストラリア', level: 1 },

    // Level 2: Europe / Asia Main (15 countries)
    { code: 'ca', name: 'カナダ', level: 2 },
    { code: 'es', name: 'スペイン', level: 2 },
    { code: 'ru', name: 'ロシア', level: 2 },
    { code: 'in', name: 'インド', level: 2 },
    { code: 'th', name: 'タイ', level: 2 },
    { code: 'vn', name: 'ベトナム', level: 2 },
    { code: 'sg', name: 'シンガポール', level: 2 },
    { code: 'id', name: 'インドネシア', level: 2 },
    { code: 'ph', name: 'フィリピン', level: 2 },
    { code: 'my', name: 'マレーシア', level: 2 },
    { code: 'ch', name: 'スイス', level: 2 },
    { code: 'nl', name: 'オランダ', level: 2 },
    { code: 'be', name: 'ベルギー', level: 2 },
    { code: 'se', name: 'スウェーデン', level: 2 },
    { code: 'pt', name: 'ポルトガル', level: 2 },

    // Level 3: Africa / South America (15 countries)
    { code: 'mx', name: 'メキシコ', level: 3 },
    { code: 'ar', name: 'アルゼンチン', level: 3 },
    { code: 'cl', name: 'チリ', level: 3 },
    { code: 'co', name: 'コロンビア', level: 3 },
    { code: 'pe', name: 'ペルー', level: 3 },
    { code: 'eg', name: 'エジプト', level: 3 },
    { code: 'za', name: 'みなみアフリカ', level: 3 },
    { code: 'ke', name: 'ケニア', level: 3 },
    { code: 'ng', name: 'ナイジェリア', level: 3 },
    { code: 'gh', name: 'ガーナ', level: 3 },
    { code: 'ma', name: 'モロッコ', level: 3 },
    { code: 'et', name: 'エチオピア', level: 3 },
    { code: 'cm', name: 'カメルーン', level: 3 },
    { code: 'ci', name: 'コートジボワール', level: 3 },
    { code: 'sn', name: 'セネガル', level: 3 },

    // Level 4: Middle East / Small / Rare (15 countries)
    { code: 'sa', name: 'サウジアラビア', level: 4 },
    { code: 'tr', name: 'トルコ', level: 4 },
    { code: 'ae', name: 'アラブしゅちょうこくれんぽう', level: 4 },
    { code: 'il', name: 'イスラエル', level: 4 },
    { code: 'ir', name: 'イラン', level: 4 },
    { code: 'qa', name: 'カタール', level: 4 },
    { code: 'nz', name: 'ニュージーランド', level: 4 },
    { code: 'gr', name: 'ギリシャ', level: 4 },
    { code: 'no', name: 'ノルウェー', level: 4 },
    { code: 'dk', name: 'デンマーク', level: 4 },
    { code: 'fi', name: 'フィンランド', level: 4 },
    { code: 'ua', name: 'ウクライナ', level: 4 },
    { code: 'pl', name: 'ポーランド', level: 4 },
    // New Additions (Level 5: Super Rare / Confusing)
    { code: 'kz', name: 'カザフスタン', level: 5 },
    { code: 'uz', name: 'ウズベキスタン', level: 5 },
    { code: 'pk', name: 'パキスタン', level: 5 },
    { code: 'np', name: 'ネパール', level: 5 },
    { code: 'bt', name: 'ブータン', level: 5 },
    { code: 'mn', name: 'モンゴル', level: 5 },
    { code: 'lk', name: 'スリランカ', level: 5 },
    { code: 'bd', name: 'バングラデシュ', level: 5 },
    { code: 'kh', name: 'カンボジア', level: 5 },
    { code: 'la', name: 'ラオス', level: 5 },
    { code: 'mm', name: 'ミャンマー', level: 5 },
    { code: 'cz', name: 'チェコ', level: 5 },
    { code: 'hu', name: 'ハンガリー', level: 5 },
    { code: 'at', name: 'オーストリア', level: 5 },
    { code: 'ro', name: 'ルーマニア', level: 5 },
    { code: 'bg', name: 'ブルガリア', level: 5 },
];

const MAX_QUESTIONS = 10;
let currentQuestionIndex = 0;
let score = 0;
let currentCountry = null;
let isAnswering = false;
let audioContext = null;
let currentMode = 'normal'; // easy, normal, hard, super, extreme
let timer = null;
let questionQueue = []; // Stores the ordered list of countries for the current game

// DOM Elements
const flagImage = document.getElementById('flag-image');
const optionsContainer = document.getElementById('options-container');
const scoreValue = document.getElementById('score-value');
const currentQuestionEl = document.getElementById('current-question');
const progressBar = document.getElementById('progress-bar');
const timerBar = document.getElementById('timer-bar-visual');
const resultModal = document.getElementById('result-modal');
const finalScoreEl = document.getElementById('final-score');
const resultComment = document.getElementById('result-comment');
const restartBtn = document.getElementById('restart-btn');
const homeBtn = document.getElementById('home-btn');
const feedbackOverlay = document.getElementById('feedback-overlay');
const startScreen = document.getElementById('start-screen');
const calendarModal = document.getElementById('calendar-modal');
const calendarGrid = document.getElementById('calendar-grid');
const calendarMonthYear = document.getElementById('calendar-month-year');
const calendarBtn = document.getElementById('calendar-btn');
const closeCalendarBtn = document.getElementById('close-calendar');

// Difficulty Buttons
const modeEasyBtn = document.getElementById('mode-easy');
const modeNormalBtn = document.getElementById('mode-normal');
const modeHardBtn = document.getElementById('mode-hard');
const modeSuperBtn = document.getElementById('mode-super');
const modeExtremeBtn = document.getElementById('mode-extreme');

// ... (initAudio, playSound, startTimer remain same) ...

/**
 * Save Progress (Calendar)
 */
function saveProgress() {
    // Use Local Time for YYYY-MM-DD to match Calendar Display
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const today = `${year}-${month}-${day}`;

    let history = localStorage.getItem('flagQuiz_history');
    let historyData = {};

    // Data Migration: Array -> Object
    try {
        const parsed = JSON.parse(history);
        if (Array.isArray(parsed)) {
            // Convert old array ["2023-01-01"] to object {"2023-01-01": {highScore: 0}}
            parsed.forEach(date => {
                historyData[date] = { highScore: 0, playCount: 1 }; // 0 indicates legacy data
            });
        } else if (parsed && typeof parsed === 'object') {
            historyData = parsed;
        }
    } catch (e) {
        // No valid data or parse error, start fresh
        historyData = {};
    }

    // Update Today's Entry
    if (!historyData[today]) {
        historyData[today] = { highScore: score, playCount: 1 };
    } else {
        // Update High Score if higher
        const currentHigh = historyData[today].highScore || 0;
        historyData[today].highScore = Math.max(currentHigh, score);
        // Increment Play Count
        historyData[today].playCount = (historyData[today].playCount || 0) + 1;
    }

    localStorage.setItem('flagQuiz_history', JSON.stringify(historyData));
}

/**
 * 💾 Save Game State (Multi-Layer)
 * 1. LocalStorage
 * 2. window.name (Fallback for local files)
 */
function saveGameState() {
    try {
        const state = {
            mode: currentMode,
            qIndex: currentQuestionIndex,
            score: score,
            timestamp: Date.now(),
            queue: questionQueue ? questionQueue.map(c => c.code) : []
        };
        const json = JSON.stringify(state);

        // Layer 1: LocalStorage
        try { localStorage.setItem('flagQuiz_state', json); } catch (e) { }

        // Layer 2: window.name (Robust Fallback)
        window.name = "flagQuiz_data::" + json;

        logStatus('State Saved: ' + currentQuestionIndex);
    } catch (e) {
        console.warn('Save State Failed:', e);
        logStatus('ERR: SaveFailed');
    }
}

/**
 * 🗑️ Clear Game State
 */
function clearGameState() {
    try {
        localStorage.removeItem('flagQuiz_state');
        window.name = ""; // Clear window.name
        logStatus('State Cleared');
    } catch (e) { }
}

/**
 * 🔄 Restore Game State
 * Returns true if restored, false if clean start
 */
function restoreGameState() {
    try {
        let raw = localStorage.getItem('flagQuiz_state');

        // Fallback to window.name if LocalStorage empty
        if (!raw && window.name && window.name.startsWith("flagQuiz_data::")) {
            raw = window.name.split("::")[1];
            console.log("Recovered from window.name!");
        }

        if (!raw) {
            logStatus('No Save Found (Clean Start)');
            return false;
        }

        const state = JSON.parse(raw);
        // Basic validity check (expire after 1 hour?)
        if (Date.now() - state.timestamp > 3600000) {
            clearGameState();
            logStatus('Save Expired');
            return false;
        }

        if (state.qIndex > 0 && state.qIndex <= MAX_QUESTIONS) {
            console.log('Restoring Game State:', state);
            logStatus(`Restoring: Q${state.qIndex} (${state.mode})`);

            currentMode = state.mode;
            score = state.score;
            currentQuestionIndex = state.qIndex - 1; // loadQuestion will ++

            // Restore Queue
            if (state.queue && Array.isArray(state.queue)) {
                questionQueue = state.queue.map(code => COUNTRIES.find(c => c.code === code)).filter(Boolean);
            }

            // Restore UI immediately to avoid flash
            const sv = document.getElementById('score-value');
            if (sv) sv.textContent = score;

            // Start Game with restored mode
            startGame(currentMode, true); // true = isRestoring
            return true;
        }
    } catch (e) {
        console.error('Restore Failed:', e);
        logStatus('ERR: RestoreFailed');
        clearGameState();
    }
    return false;
}

/**
 * Render Calendar
 */
function renderCalendar() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0-11

    // Fix: Use Local Time YYYY-MM-DD
    const tYear = now.getFullYear();
    const tMonth = String(now.getMonth() + 1).padStart(2, '0');
    const tDay = String(now.getDate()).padStart(2, '0');
    const todayStr = `${tYear}-${tMonth}-${tDay}`;

    // Localized Month/Year
    calendarMonthYear.textContent = `${year}ねん ${month + 1}がつ`;

    // Get History and Migration Logic
    let historyData = {};
    try {
        const raw = localStorage.getItem('flagQuiz_history');
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
            parsed.forEach(date => { historyData[date] = { highScore: '?' }; });
        } else if (parsed && typeof parsed === 'object') {
            historyData = parsed;
        }
    } catch (e) { }

    // Calendar Calculations
    const firstDay = new Date(year, month, 1).getDay(); // 0(Sun) - 6(Sat)
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    calendarGrid.innerHTML = '';

    // Day Headers (Sun-Sat)
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    days.forEach(d => {
        const header = document.createElement('div');
        header.className = 'calendar-day empty';
        header.style.fontSize = '0.8rem';
        header.style.border = 'none';
        header.textContent = d;
        calendarGrid.appendChild(header);
    });

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement('div');
        empty.className = 'calendar-day empty';
        calendarGrid.appendChild(empty);
    }

    // Days
    for (let i = 1; i <= daysInMonth; i++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        dayCell.textContent = i;

        // Format YYYY-MM-DD
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;

        if (dateStr === todayStr) {
            dayCell.classList.add('today');
        }

        if (historyData[dateStr]) {
            dayCell.classList.add('played');
            const entry = historyData[dateStr];

            // Clear date number
            dayCell.textContent = '';

            // Create Score Label
            const scoreDiv = document.createElement('div');
            scoreDiv.className = 'daily-score';
            const displayScore = (entry.highScore !== undefined) ? entry.highScore : '?';
            scoreDiv.innerHTML = `★${displayScore}`;
            dayCell.appendChild(scoreDiv);

            // Perfect Score Effect
            if (entry.highScore === 10) {
                dayCell.classList.add('perfect');
            }
        }

        calendarGrid.appendChild(dayCell);
    }
}

// ... (startGame, initGame, getTargetCountries, loadQuestion, startTimer, handleTimeUp, generateOptions, handleAnswer remain same) ...

/**
 * End Game
 */
function endGame() {
    progressBar.style.width = '100%';
    finalScoreEl.textContent = score;

    clearFeedback(); // Fix stuck overlay on result screen

    if (score === MAX_QUESTIONS) {
        resultComment.textContent = "かんぺき！こっきマスターだね！🏆";
        playSound('correct');
        saveProgress();
    } else if (score >= 8) {
        resultComment.textContent = "すごい！あとすこしで まんてん！✨";
        saveProgress();
    } else if (score >= 5) {
        resultComment.textContent = "なかなかの せいせき！👍";
        saveProgress();
    } else {
        resultComment.textContent = "つぎは もっと がんばろう！💪";
        saveProgress();
    }

    resultModal.classList.remove('hidden'); // Ensure it's not hidden
    resultModal.style.display = 'flex'; // Force flex
    // Small delay to allow display:flex to apply before opacity transition
    setTimeout(() => {
        resultModal.classList.add('visible');
    }, 10);

    clearGameState(); // Clear interrupted state on normal finish
}

// ... (shuffleArray remains same) ...

// Event Listeners
modeEasyBtn.addEventListener('click', () => startGame('easy'));
modeNormalBtn.addEventListener('click', () => startGame('normal'));
modeHardBtn.addEventListener('click', () => startGame('hard'));
modeSuperBtn.addEventListener('click', () => startGame('super'));
modeExtremeBtn.addEventListener('click', () => startGame('extreme'));

restartBtn.addEventListener('click', (e) => {
    // 🛡️ RESTART GUARD
    // Prevent Restart if the game is not clearly Over
    // If result modal is NOT visible, this click is invalid (Ghost Click)
    if (!resultModal.classList.contains('visible') && resultModal.style.display === 'none') {
        console.warn('Blocked Ghost Click on Restart Button');
        return;
    }

    // Double Check: If we are in middle of game (e.g. Q4) and not finished
    if (currentQuestionIndex < MAX_QUESTIONS && currentQuestionIndex > 0) {
        console.warn('Blocked Accidental Restart mid-game');
        return;
    }

    e.preventDefault();
    e.stopPropagation();

    // Show start screen again on restart
    resultModal.classList.remove('visible');
    setTimeout(() => {
        resultModal.classList.add('hidden');
        resultModal.style.display = 'none';
    }, 300);

    startScreen.classList.remove('hidden');
    startScreen.style.display = 'flex';
    setTimeout(() => startScreen.classList.add('visible'), 10);

    // Add Start Screen Class
    document.body.classList.add('is-start-screen');

    clearFeedback(); // Fix stuck overlay on restart
    clearGameState();
});

// Home Button (Abort Game)
if (homeBtn) {
    homeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Explicitly hide result modal if open
        resultModal.classList.remove('visible');
        resultModal.classList.add('hidden');
        resultModal.style.display = 'none';

        // Explicitly show start screen
        startScreen.classList.remove('hidden');
        startScreen.style.display = 'flex';
        setTimeout(() => startScreen.classList.add('visible'), 10);

        // Add Start Screen Class
        document.body.classList.add('is-start-screen');

        // Reset Game State
        clearFeedback();
        clearGameState();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Attempt auto-restore
    const restored = restoreGameState();
    if (!restored) {
        // Normal start
        console.log('Clean Start');
        document.body.classList.add('is-start-screen');
    } else {
        document.body.classList.remove('is-start-screen');
    }
});

// Calendar Events
calendarBtn.addEventListener('click', () => {
    renderCalendar();
    calendarModal.classList.remove('hidden');
    calendarModal.classList.add('visible');
});



// End Button (Result Screen -> Calendar)
const endToCalendarBtn = document.getElementById('end-to-calendar-btn');
if (endToCalendarBtn) {
    endToCalendarBtn.addEventListener('click', () => {
        // Hide Result Modal
        resultModal.classList.remove('visible');
        resultModal.classList.add('hidden');
        resultModal.style.display = 'none';

        // Show Calendar Modal
        renderCalendar();
        calendarModal.classList.remove('hidden');
        calendarModal.classList.add('visible');
    });
}

closeCalendarBtn.addEventListener('click', () => {
    calendarModal.classList.remove('visible');
    calendarModal.classList.add('hidden');
});

/**
 * Initialize AudioContext
 */
/**
 * Initialize AudioContext
 */
function initAudio() {
    if (audioContext) return; // Already initialized

    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) {
            console.warn('Web Audio API not supported in this browser.');
            return;
        }
        audioContext = new AudioContext();
    } catch (e) {
        console.error('Web Audio API initialization failed:', e);
    }
}

/**
 * 🔓 Unlock Audio (iOS Fix)
 * Silent play on first touch to wake up the Audio Engine
 */
function unlockAudio() {
    if (!audioContext) initAudio();
    if (!audioContext) return;

    if (audioContext.state === 'running') {
        // Already running, no need to keep listeners
        document.removeEventListener('click', unlockAudio);
        document.removeEventListener('touchstart', unlockAudio);
        document.removeEventListener('keydown', unlockAudio);
        return;
    }

    if (audioContext.state === 'suspended') {
        audioContext.resume().then(() => {
            console.log('AudioContext resumed via unlock');
            // Check again to remove listeners
            if (audioContext.state === 'running') {
                document.removeEventListener('click', unlockAudio);
                document.removeEventListener('touchstart', unlockAudio);
                document.removeEventListener('keydown', unlockAudio);
            }
        }).catch(e => console.error(e));
    }

    // Play silent buffer to force iOS audio stack to wake up
    try {
        const buffer = audioContext.createBuffer(1, 1, 22050);
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start(0);
        console.log('Audio Unlocked (Silent Play)');
    } catch (e) {
        console.error('Audio unlock failed', e);
    }
}

// Attach Unlock Listeners Global (Passive: false for mobile)
const unlockOptions = { once: false, passive: false }; // Keep trying until success
document.addEventListener('click', unlockAudio, unlockOptions);
document.addEventListener('touchstart', unlockAudio, unlockOptions);
document.addEventListener('keydown', unlockAudio, unlockOptions);

/**
 * Play Sound Effect
 */
function playSound(type) {
    initAudio(); // Ensure audio context is initialized
    if (!audioContext) return; // If initialization failed, cannot play sound

    if (audioContext.state === 'suspended') {
        audioContext.resume().catch(e => console.error(e));
    }

    // Safety: If resume is still pending, we might want to wait, but usually fire-and-forget works better for UI sounds
    // unless we want perfect timing. For this quiz, immediate feedback is preferred even if slightly clipped.

    // Create new context nodes
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    if (type === 'correct') {
        const now = audioContext.currentTime;

        // Simple Ding-Dong
        // Note 1: G5 (784Hz)
        const osc1 = audioContext.createOscillator();
        const gain1 = audioContext.createGain();
        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(784, now);
        osc1.connect(gain1);
        gain1.connect(audioContext.destination);

        gain1.gain.setValueAtTime(0, now);
        gain1.gain.linearRampToValueAtTime(0.3, now + 0.05);
        gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

        osc1.onended = () => {
            try { osc1.disconnect(); gain1.disconnect(); } catch (e) { }
        };

        osc1.start(now);
        osc1.stop(now + 0.4);

        // Note 2: C6 (1047Hz)
        const osc2 = audioContext.createOscillator();
        const gain2 = audioContext.createGain();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(1047, now + 0.1);
        osc2.connect(gain2);
        gain2.connect(audioContext.destination);

        gain2.gain.setValueAtTime(0, now + 0.1);
        gain2.gain.linearRampToValueAtTime(0.3, now + 0.15);
        gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.6);

        osc2.onended = () => {
            try { osc2.disconnect(); gain2.disconnect(); } catch (e) { }
        };

        osc2.start(now + 0.1);
        osc2.stop(now + 0.6);

    } else if (type === 'incorrect') {
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.3);
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime); // Increased from 0.1
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

        oscillator.onended = () => {
            try { oscillator.disconnect(); gainNode.disconnect(); } catch (e) { }
        };

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.3);
    } else if (type === 'tick') {
        // Ticking sound for timer
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
    } else if (type === 'click') {
        // Simple UI Click Sound
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
    }
}

/**
 * Start Game with selected mode
 */
/**
 * Start Game with selected mode
 */
function startGame(mode, isRestoring = false) {
    currentMode = mode;
    // CSS Guard: Add class to body if extreme
    if (mode === 'extreme') {
        document.body.classList.add('mode-extreme');
    } else {
        document.body.classList.remove('mode-extreme');
    }

    // Start Screen Hide Logic (Fix Ghost Clicks)
    startScreen.classList.remove('visible');
    startScreen.classList.add('hidden'); // Add hidden class

    // Remove Start Screen Class for Background Visibility
    document.body.classList.remove('is-start-screen');

    setTimeout(() => {
        if (!startScreen.classList.contains('visible')) {
            startScreen.style.display = 'none'; // FORCE HIDE
        }
    }, 300);

    // Ensure Result Modal is GONE
    resultModal.classList.remove('visible');
    resultModal.classList.add('hidden');
    resultModal.style.display = 'none';

    // Warm up Audio Context on user interaction
    if (!isRestoring) {
        // Only re-init audio on manual click, not auto-restore (browser blocks anyway)
        initAudio();
        if (audioContext && audioContext.state === 'suspended') {
            audioContext.resume().then(() => {
                console.log('AudioContext resumed');
            }).catch(e => console.error(e));
        }
    }

    if (isRestoring) {
        // Just resume
        loadQuestion();
    } else {
        initGame();
    }
}

/**
 * Initialize the game logic
 */
function initGame() {
    score = 0;
    currentQuestionIndex = 0;
    scoreValue.textContent = 0;

    // Prepare Question Queue (Unique Questions)
    const targetCountries = getTargetCountries();
    shuffleArray(targetCountries); // Randomize
    // Ensure we have enough questions, or take all available if less than MAX
    questionQueue = targetCountries.slice(0, Math.max(MAX_QUESTIONS, 10)); // Take at least 10 or all if smaller
    // Actually simpler: Just splice them one by one or iterate.
    // Let's just keep the full shuffled list and take the first 10.
    if (questionQueue.length > MAX_QUESTIONS) {
        questionQueue = questionQueue.slice(0, MAX_QUESTIONS);
    }

    // Nuclear Reset of Modals
    resultModal.classList.remove('visible');
    resultModal.classList.add('hidden');
    resultModal.style.display = 'none';

    clearFeedback(); // Ensure no stuck overlay

    loadQuestion();
    initAudio();
}

/**
 * Clear Feedback Overlay
 */
function clearFeedback() {
    if (feedbackOverlay) {
        feedbackOverlay.className = 'feedback-overlay';
        feedbackOverlay.textContent = '';
        feedbackOverlay.style.display = 'none';
    }
}

/**
 * Game Mode configuration
 */
function getTargetCountries() {
    // Return filtered list based on mode
    let levels = [1]; // Default Easy
    if (currentMode === 'normal') {
        levels = [1, 2];
    } else if (currentMode === 'hard') {
        levels = [1, 2, 3];
    } else if (currentMode === 'super') {
        // Super: "Middle East / Rare" -> Level 3, 4, 5
        // Exclude 1 & 2 to make it actually hard
        levels = [3, 4, 5];
    } else if (currentMode === 'extreme') {
        // Extreme: "Super Difficult" -> Level 4, 5 ONLY
        levels = [4, 5];
    }

    const targets = COUNTRIES.filter(c => levels.includes(c.level));

    // Safety Fallback: If we don't have enough questions (e.g. filtered too much), add lower levels
    if (targets.length < MAX_QUESTIONS) {
        console.warn("Not enough hard questions, loosening filter");
        return COUNTRIES.filter(c => c.level >= 2);
    }

    return targets;
}

/**
 * Load a new question
 */
function loadQuestion() {
    isAnswering = true;
    currentQuestionIndex++;

    // Clear Timer
    if (timer) clearTimeout(timer);

    if (timerBar) {
        timerBar.style.width = '0%';
        timerBar.style.transition = 'none';
        timerBar.style.display = 'none'; // FORCE HIDDEN immediately
    }

    // Reset feedback
    const fb = document.getElementById('feedback-overlay');
    fb.textContent = '';
    fb.className = 'feedback-overlay';
    fb.style.display = ''; // ensuring we clean up any inline styles


    // Safety check: isAnswering should be true now
    isAnswering = true;

    // Update UI headers
    const elStatus = document.getElementById('status-bar');
    if (elStatus) elStatus.textContent = `Mode: ${currentMode} | Q: ${currentQuestionIndex}`;
    currentQuestionEl.textContent = currentQuestionIndex;
    const progressPercent = ((currentQuestionIndex - 1) / MAX_QUESTIONS) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // Select random country based on MODE
    // OLD: const targetCountries = getTargetCountries();
    // OLD: currentCountry = targetCountries[Math.floor(Math.random() * targetCountries.length)];

    // NEW: Use Question Queue
    if (!questionQueue || questionQueue.length === 0) {
        // Fallback if queue is missing
        const targetCountries = getTargetCountries();
        currentCountry = targetCountries[Math.floor(Math.random() * targetCountries.length)];
    } else {
        // Use the index to pick the pre-determined unique country
        // currentQuestionIndex is 1-based (1..10)
        // queue is 0-based
        const queueIndex = currentQuestionIndex - 1;
        if (queueIndex < questionQueue.length) {
            currentCountry = questionQueue[queueIndex];
        } else {
            // Should not happen if logic is correct
            const targetCountries = getTargetCountries();
            currentCountry = targetCountries[Math.floor(Math.random() * targetCountries.length)];
        }
    }

    // Load Flag Image
    const flagUrl = `https://flagcdn.com/w640/${currentCountry.code}.png`;

    flagImage.classList.remove('loaded');
    flagImage.src = flagUrl;
    flagImage.onload = () => {
        flagImage.classList.add('loaded');

        // Start Timer ONLY for Extreme Mode
        if (currentMode === 'extreme') {
            if (timerBar) timerBar.style.display = 'block';
            startTimer(3000); // 3 seconds
        } else {
            if (timerBar) timerBar.style.display = 'none';
        }
    };

    generateOptions(currentCountry, getTargetCountries()); // Pass full pool for distractors

    // Save State at start of question
    saveGameState();
}

/**
 * Timer Logic for Speed Mode
 */
function startTimer(durationMs) {
    if (!isAnswering) return;
    if (currentMode !== 'extreme') return; // STRICT CHECK

    // Reset bar width and force reflow
    timerBar.style.width = '100%';
    timerBar.offsetHeight; // force reflow
    timerBar.style.transition = `width ${durationMs}ms linear`;
    timerBar.style.width = '0%';

    timer = setTimeout(() => {
        if (isAnswering) {
            handleTimeUp();
        }
    }, durationMs);
}

function handleTimeUp() {
    if (!isAnswering) return;
    handleAnswer(null, null, true); // Time up!
}

/**
 * Generate options (Always 4)
 */
function generateOptions(correctCountry, availableCountries) {
    const distractors = [];
    const numOptions = 4; // Always 4 options now
    const numDistractors = numOptions - 1;

    while (distractors.length < numDistractors) {
        // Pick distractors from the SAME difficulty pool to avoid confusion
        const random = availableCountries[Math.floor(Math.random() * availableCountries.length)];
        if (random.code !== correctCountry.code && !distractors.includes(random)) {
            distractors.push(random);
        }
    }

    const options = [correctCountry, ...distractors];
    shuffleArray(options);

    optionsContainer.innerHTML = '';
    optionsContainer.className = 'options-grid'; // Reset class (always 2 columns)
    optionsContainer.style.gridTemplateColumns = ''; // Reset inline styles

    options.forEach(country => {
        const btn = document.createElement('button');
        btn.type = 'button'; // Prevent accidental form submission
        btn.className = 'option-btn';
        btn.textContent = country.name;

        // Revert to simple onclick for maximum compatibility
        btn.onclick = (e) => {
            e.preventDefault(); // CRITICAL: Stop any form submission or link behavior
            e.stopPropagation();

            // Prevent double taps if necessary, but isAnswering handles it
            logStatus(`Click: ${country.code}`);

            // Force resume audio
            try {
                if (audioContext && audioContext.state === 'suspended') {
                    audioContext.resume().catch(e => console.error(e));
                }
                if (!audioContext) initAudio();
            } catch (e) { console.error(e); }

            handleAnswer(country, btn);
        };
        optionsContainer.appendChild(btn);
    });
}

// RELOAD GUARD: Prevent accidental swipes or reloads
window.addEventListener('beforeunload', (e) => {
    // Only warn if game is actually in progress (Q1 or later)
    if (currentQuestionIndex > 0 && currentQuestionIndex < 11) {
        e.preventDefault();
        e.returnValue = '';
    }
});

/**
 * Status Logger
 */
function logStatus(msg) {
    const el = document.getElementById('status-bar');
    if (el) el.innerText = msg;
    console.log(msg);
}

/**
 * Handle answer
 */
function handleAnswer(selected, btnElement, isTimeUp = false) {
    try {
        // START DEBUG
        logStatus(`HandleAnswer: ${selected ? selected.code : 'TimeUp'} (Busy:${isAnswering})`);

        // Prevent double-clicks / racing
        if (!isAnswering) {
            logStatus(`Ignored: Busy or Finished`);
            return;
        }

        // Stop responding to further clicks immediately
        isAnswering = false;

        // Clear Timer if running
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        let isCorrect = false;

        if (isTimeUp) {
            logStatus("Result: Time Up -> X");
            feedbackOverlay.textContent = '✖';
            feedbackOverlay.className = 'feedback-overlay incorrect show';
            try { playSound('incorrect'); } catch (e) { }
        } else {
            // Compare
            const selCode = selected ? selected.code : 'null';
            const curCode = currentCountry ? currentCountry.code : 'null';
            isCorrect = (selCode === curCode);

            logStatus(`Compare: ${selCode} vs ${curCode} = ${isCorrect}`);

            if (isCorrect) {
                if (btnElement) btnElement.classList.add('correct');

                // Dim others
                const allBtns = optionsContainer.querySelectorAll('.option-btn');
                allBtns.forEach(btn => {
                    if (btn !== btnElement) btn.style.opacity = '0.3';
                });

                // Increment Score safely
                score = Number(score) + 1;
                saveGameState(); // Save score immediately

                // Updates
                const sv = document.getElementById('score-value');
                if (sv) {
                    sv.textContent = score;
                    // Animation
                    sv.style.transform = 'scale(1.5)';
                    setTimeout(() => sv.style.transform = 'scale(1)', 200);
                }

                logStatus(`Action: Correct -> Show O (Score: ${score})`);
                feedbackOverlay.textContent = '⭕';
                feedbackOverlay.style.display = 'flex'; // Explicit Flex
                feedbackOverlay.className = 'feedback-overlay correct show';

                // Audio
                try { playSound('correct'); } catch (e) { console.error(e); }

            } else {
                logStatus("Action: Incorrect -> Show X");
                if (btnElement) btnElement.classList.add('incorrect');

                // Show Visuals
                feedbackOverlay.textContent = '✖';
                feedbackOverlay.style.display = 'flex'; // Explicit Flex
                feedbackOverlay.className = 'feedback-overlay incorrect show';

                try { playSound('incorrect'); } catch (e) { console.error(e); }
            }
        }

        // Always show correct answer if wrong or time up
        if (!isCorrect && currentCountry) {
            const allBtns = optionsContainer.querySelectorAll('.option-btn');
            allBtns.forEach(btn => {
                // Determine which button has the correct country name
                if (btn.textContent === currentCountry.name) {
                    btn.classList.add('reveal-correct');
                } else if (btn !== btnElement) {
                    btn.style.opacity = '0.3';
                }
            });
        }

        // Disable all buttons
        const allBtns = optionsContainer.querySelectorAll('.option-btn');
        allBtns.forEach(btn => btn.classList.add('disabled'));

        // Delay before NEXT question
        // ⏩ Correct: Fast (0.8s) to keep tempo
        // 🛑 Incorrect: Slower (2.5s) to review the correct answer
        let delay = isCorrect ? 800 : 2500;

        // Super/Extreme modes might want even faster? Let's keep consistent for now or tune slightly
        if ((currentMode === 'extreme' || currentMode === 'super') && isCorrect) {
            delay = 600; // Super fast for experts if correct
        }

        setTimeout(() => {
            try {
                if (currentQuestionIndex >= MAX_QUESTIONS) {
                    endGame();
                } else {
                    loadQuestion();
                }
            } catch (e) {
                logStatus(`Transition Error: ${e.message}`);
                console.error("Critical transition error", e);
                // Attempt Emergency Recovery
                setTimeout(() => loadQuestion(), 1000);
            }
        }, delay);

    } catch (err) {
        console.error("Critical error in handleAnswer", err);
        logStatus(`ERR: ${err.message}`);
        // Attempt recovery
        setTimeout(() => loadQuestion(), 2000);
    }
}

/**
 * End Game
 */
// Duplicate endGame function removed


/**
 * Shuffle Array
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Event Listeners (Accessory Buttons)
// Note: Mode buttons and Restart button are already handled above. duplicate listeners removed.

// Calendar Events (Secondary Listener if needed, but primary is above. Let's keep this one if it's safe or remove if duplicate)
// Lines 500-504 already handle calendarBtn. checking...
// Yes, line 500: calendarBtn.addEventListener...
// So we remove these duplicates too.

// Legal Modal Events
// (These seem to be only defined here, so we keep them)
// Wait, legal events are lines 1144+.

// Removing lines 1118-1141 which are duplicates of lines 420, 500, 524


// Legal Modal Events
const legalBtn = document.getElementById('legal-btn');
const legalModal = document.getElementById('legal-modal');
const closeLegalBtn = document.getElementById('close-legal');

if (legalBtn && legalModal && closeLegalBtn) {
    legalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        legalModal.classList.remove('hidden');
        legalModal.classList.add('visible');
    });

    closeLegalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        legalModal.classList.remove('visible');
        legalModal.classList.add('hidden');
    });
}

// Sound Test Button
const soundTestBtn = document.getElementById('sound-test-btn');
if (soundTestBtn) {
    soundTestBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        // 1. Force Init
        if (!audioContext) initAudio();

        // 2. Force Resume
        if (audioContext) {
            if (audioContext.state === 'suspended') {
                audioContext.resume().then(() => {
                    playTestSound();
                });
            } else {
                playTestSound();
            }
        } else {
            alert('エラー: オーディオ機能が使えません (Web Audio API not supported)');
        }
    });
}

function playTestSound() {
    try {
        // Use a louder, distinct sound for testing (Square wave)
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(440, audioContext.currentTime); // A4
        osc.frequency.linearRampToValueAtTime(880, audioContext.currentTime + 0.1); // Slide up

        // Max Volume
        gain.gain.setValueAtTime(0.5, audioContext.currentTime);
        gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);

        osc.connect(gain);
        gain.connect(audioContext.destination);

        osc.start();
        osc.stop(audioContext.currentTime + 0.5);

        setTimeout(() => {
            const state = audioContext ? audioContext.state : 'null';
            alert(
                `音の信号を送りました！(System: ${state})\n\n` +
                `【重要】\n` +
                `YouTubeなどの「動画アプリ」と違って、\n` +
                `「ブラウザのゲーム」はマナーモード(消音)だと\n` +
                `完全に音が消えてしまいます。\n\n` +
                `YouTubeが聞こえても、ここが聞こえない場合は\n` +
                `『本体のサイレントスイッチ』を必ずOFFにしてください！`
            );
        }, 600);
    } catch (e) {
        alert('エラー: 再生に失敗しました\n' + e.message);
    }
}
