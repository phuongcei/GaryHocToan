/**
 * Main App - Entry point and coordination
 */

const App = {
    draggedElement: null,

    /**
     * Initialize the application
     */
    init() {
        this.container = document.getElementById('game-container');
        this.setupMuteButton();
        this.setupTabNavigation();

        // Show start screen
        Screens.renderStart(this.container);

        // Initialize audio on first interaction
        document.addEventListener('click', () => audioManager.init(), { once: true });
        document.addEventListener('touchstart', () => audioManager.init(), { once: true });
    },

    /**
     * Setup mute button
     */
    setupMuteButton() {
        const muteBtn = document.getElementById('mute-btn');
        const soundOn = muteBtn.querySelector('.sound-on');
        const soundOff = muteBtn.querySelector('.sound-off');

        // Set initial state
        if (!audioManager.isEnabled()) {
            soundOn.style.display = 'none';
            soundOff.style.display = '';
        }

        muteBtn.addEventListener('click', () => {
            const enabled = audioManager.toggle();
            soundOn.style.display = enabled ? '' : 'none';
            soundOff.style.display = enabled ? 'none' : '';
        });
    },

    /**
     * Setup tab navigation
     */
    setupTabNavigation() {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.disabled) return;

                audioManager.playClick();
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const tab = btn.dataset.tab;
                if (tab === 'tach-gop') {
                    gameEngine.reset();
                    Screens.renderStart(this.container);
                }
            });
        });
    },

    /**
     * Start a new game
     */
    startGame(range, questionCount) {
        const questionData = gameEngine.startGame(range, questionCount);
        Screens.renderGame(this.container, questionData);
    },

    /**
     * Check current answer
     */
    checkAnswer() {
        const result = gameEngine.checkAnswer();

        if (!result.valid) {
            // Show hint - need to place all objects
            Screens.showWrongFeedback(this.container);
            audioManager.playWrong();
            return;
        }

        if (result.correct) {
            audioManager.playCorrect();
            Screens.showCorrectFeedback(this.container);

            // Wait then move to next question
            setTimeout(() => {
                const nextQuestion = gameEngine.nextQuestion();
                if (nextQuestion) {
                    Screens.renderGame(this.container, nextQuestion);
                } else {
                    // Game complete
                    audioManager.playCelebration();
                    const results = gameEngine.getResults();
                    Screens.renderResult(this.container, results);
                }
            }, 1000);
        } else {
            audioManager.playWrong();
            Screens.showWrongFeedback(this.container);
        }
    },
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => App.init());
