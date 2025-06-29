class PomodoroTimer {
    constructor() {
        this.timerElement = document.getElementById('timer');
        this.startButton = document.getElementById('start');
        this.resetButton = document.getElementById('reset');
        this.workButton = document.getElementById('work');
        this.shortBreakButton = document.getElementById('short-break');
        this.longBreakButton = document.getElementById('long-break');
        
        this.interval = null;
        this.minutes = 25;
        this.seconds = 0;
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.startButton.addEventListener('click', () => this.startTimer());
        this.resetButton.addEventListener('click', () => this.resetTimer());
        
        this.workButton.addEventListener('click', () => this.setMode('work'));
        this.shortBreakButton.addEventListener('click', () => this.setMode('short-break'));
        this.longBreakButton.addEventListener('click', () => this.setMode('long-break'));
    }

    setMode(mode) {
        // ボタンのアクティブ状態をリセット
        document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
        
        // 選択されたモードのボタンをアクティブに
        document.getElementById(mode).classList.add('active');
        
        // タイマーをリセット
        this.resetTimer();
        
        // モードに応じた時間を設定
        switch(mode) {
            case 'work':
                this.minutes = 25;
                break;
            case 'short-break':
                this.minutes = 5;
                break;
            case 'long-break':
                this.minutes = 15;
                break;
        }
        this.updateDisplay();
    }

    startTimer() {
        if (this.interval) return;
        
        this.interval = setInterval(() => {
            if (this.seconds === 0) {
                if (this.minutes === 0) {
                    this.resetTimer();
                    return;
                }
                this.minutes--;
                this.seconds = 59;
            } else {
                this.seconds--;
            }
            this.updateDisplay();
        }, 1000);
    }

    resetTimer() {
        clearInterval(this.interval);
        this.interval = null;
        
        // 現在のモードに応じた時間を設定
        const activeMode = document.querySelector('.mode-btn.active');
        if (activeMode) {
            const mode = activeMode.id;
            switch(mode) {
                case 'work':
                    this.minutes = 25;
                    break;
                case 'short-break':
                    this.minutes = 5;
                    break;
                case 'long-break':
                    this.minutes = 15;
                    break;
            }
        }
        this.seconds = 0;
        this.updateDisplay();
    }

    updateDisplay() {
        const minutes = this.minutes.toString().padStart(2, '0');
        const seconds = this.seconds.toString().padStart(2, '0');
        this.timerElement.textContent = `${minutes}:${seconds}`;
    }
}

// タイマーの初期化
const timer = new PomodoroTimer();
