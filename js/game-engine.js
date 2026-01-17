/**
 * Game Engine - Core logic for Tách Gộp Số game
 */

const THEMES = ['ocean', 'forest', 'candy'];

const OBJECT_SETS = [
    ['🍎', '🍊', '🍋', '🍇', '🍓', '🍑', '🥭', '🍒'],
    ['🐱', '🐶', '🐰', '🐻', '🐼', '🦊', '🐨', '🐯'],
    ['⭐', '🌟', '💫', '✨', '🌈', '🎈', '🎀', '💎'],
    ['🌸', '🌺', '🌻', '🌷', '🌹', '🏵️', '🌼', '💐'],
];

class GameEngine {
    constructor() {
        this.state = {
            mode: 'drag-split', // 'drag-split', 'tree', 'missing', 'dice'
            range: 10,
            questionCount: 10,
            currentQuestion: 0,
            correctAnswers: 0,
            questions: [],
            currentSplit: { left: [], right: [] },
            currentObjects: [],
            currentTheme: THEMES[0],
            currentEmoji: '🍎',
            // For tree/missing modes
            userAnswer: null,
            // For dice mode  
            diceValues: [],
        };
    }

    /**
     * Initialize new game with settings
     */
    startGame(range, questionCount, mode = 'drag-split') {
        this.state.mode = mode;
        this.state.range = range;
        this.state.questionCount = questionCount;
        this.state.currentQuestion = 0;
        this.state.correctAnswers = 0;
        this.state.questions = this.generateQuestions(range, questionCount, mode);
        this.state.currentTheme = THEMES[Math.floor(Math.random() * THEMES.length)];
        this.state.userAnswer = null;
        this.state.diceValues = [];

        // Apply theme
        document.body.setAttribute('data-theme', this.state.currentTheme);

        return this.loadQuestion(0);
    }

    /**
     * Generate questions for the game based on mode
     */
    generateQuestions(range, count, mode) {
        const questions = [];
        const minTarget = 2;
        const maxTarget = range;

        for (let i = 0; i < count; i++) {
            const target = Math.floor(Math.random() * (maxTarget - minTarget + 1)) + minTarget;

            if (mode === 'tree' || mode === 'missing') {
                // Generate tree/missing question with one part hidden
                const part1 = Math.floor(Math.random() * (target - 1)) + 1;
                const part2 = target - part1;
                const showPart = Math.random() > 0.5 ? 1 : 2;
                questions.push({
                    target,
                    part1,
                    part2,
                    shownPart: showPart === 1 ? part1 : part2,
                    hiddenPart: showPart === 1 ? part2 : part1,
                    showPosition: showPart // 1 = left shown, 2 = right shown
                });
            } else if (mode === 'dice') {
                // Generate dice question (two dice that sum to target)
                const dice1 = Math.min(6, Math.max(1, Math.floor(Math.random() * Math.min(6, target - 1)) + 1));
                const dice2 = Math.min(6, target - dice1);
                if (dice2 >= 1 && dice2 <= 6) {
                    questions.push({ target, dice1, dice2 });
                } else {
                    // Fallback if dice don't work
                    questions.push({ target, dice1: Math.ceil(target / 2), dice2: Math.floor(target / 2) });
                }
            } else {
                // Default drag-split mode
                questions.push({ target });
            }
        }

        return questions;
    }

    /**
     * Load a specific question
     */
    loadQuestion(index) {
        if (index >= this.state.questions.length) {
            return null; // Game complete
        }

        this.state.currentQuestion = index;
        const question = this.state.questions[index];

        // Pick random emoji set and emoji
        const emojiSet = OBJECT_SETS[Math.floor(Math.random() * OBJECT_SETS.length)];
        this.state.currentEmoji = emojiSet[Math.floor(Math.random() * emojiSet.length)];

        // Create objects array
        this.state.currentObjects = Array(question.target).fill(null).map((_, i) => ({
            id: i,
            emoji: this.state.currentEmoji,
            zone: 'source', // 'source', 'left', 'right'
        }));

        this.state.currentSplit = { left: [], right: [] };

        return {
            target: question.target,
            objects: this.state.currentObjects,
            emoji: this.state.currentEmoji,
            questionNumber: index + 1,
            totalQuestions: this.state.questionCount,
        };
    }

    /**
     * Move object to a zone
     */
    moveObject(objectId, targetZone) {
        const obj = this.state.currentObjects.find(o => o.id === objectId);
        if (!obj) return false;

        // Remove from current zone
        if (obj.zone === 'left') {
            this.state.currentSplit.left = this.state.currentSplit.left.filter(id => id !== objectId);
        } else if (obj.zone === 'right') {
            this.state.currentSplit.right = this.state.currentSplit.right.filter(id => id !== objectId);
        }

        // Add to new zone
        if (targetZone === 'left') {
            this.state.currentSplit.left.push(objectId);
        } else if (targetZone === 'right') {
            this.state.currentSplit.right.push(objectId);
        }

        obj.zone = targetZone;

        return true;
    }

    /**
     * Get current split counts
     */
    getSplitCounts() {
        return {
            left: this.state.currentSplit.left.length,
            right: this.state.currentSplit.right.length,
            source: this.state.currentObjects.filter(o => o.zone === 'source').length,
        };
    }

    /**
     * Check if current answer is valid (mode-aware)
     */
    checkAnswer(userInput = null) {
        const mode = this.state.mode;
        const question = this.state.questions[this.state.currentQuestion];
        const target = question.target;

        if (mode === 'drag-split') {
            // Original drag-split logic
            const counts = this.getSplitCounts();
            if (counts.left === 0 || counts.right === 0) {
                return { valid: false, reason: 'empty' };
            }
            if (counts.source > 0) {
                return { valid: false, reason: 'incomplete' };
            }
            const isCorrect = counts.left + counts.right === target;
            if (isCorrect) this.state.correctAnswers++;
            return { valid: true, correct: isCorrect, left: counts.left, right: counts.right, target };
        }

        if (mode === 'tree' || mode === 'missing') {
            // Tree/Missing: check if user's answer equals hidden part
            if (userInput === null || userInput === undefined) {
                return { valid: false, reason: 'empty' };
            }
            const isCorrect = parseInt(userInput) === question.hiddenPart;
            if (isCorrect) this.state.correctAnswers++;
            return {
                valid: true,
                correct: isCorrect,
                userAnswer: userInput,
                correctAnswer: question.hiddenPart,
                target
            };
        }

        if (mode === 'dice') {
            // Dice: check if user split matches the actual dice values shown (exact order)
            if (!userInput || userInput.part1 === undefined || userInput.part2 === undefined) {
                return { valid: false, reason: 'incomplete' };
            }
            const p1 = parseInt(userInput.part1);
            const p2 = parseInt(userInput.part2);
            // Must match dice values exactly in order (dice1 first, dice2 second)
            const isCorrect = (p1 === question.dice1 && p2 === question.dice2);
            if (isCorrect) this.state.correctAnswers++;
            return {
                valid: true,
                correct: isCorrect,
                target,
                correctAnswer: `${question.dice1} + ${question.dice2}`
            };
        }

        return { valid: false, reason: 'unknown_mode' };
    }

    /**
     * Set user answer for current question (tree/missing/dice modes)
     */
    setUserAnswer(answer) {
        this.state.userAnswer = answer;
    }

    /**
     * Get current question with mode-specific data
     */
    getCurrentQuestionData() {
        const question = this.state.questions[this.state.currentQuestion];
        if (!question) return null;

        return {
            mode: this.state.mode,
            target: question.target,
            questionNumber: this.state.currentQuestion + 1,
            totalQuestions: this.state.questionCount,
            // Tree/Missing specific
            shownPart: question.shownPart,
            hiddenPart: question.hiddenPart,
            showPosition: question.showPosition,
            // Dice specific
            dice1: question.dice1,
            dice2: question.dice2,
            // Drag-split specific
            objects: this.state.currentObjects,
            emoji: this.state.currentEmoji,
        };
    }

    /**
     * Move to next question
     */
    nextQuestion() {
        return this.loadQuestion(this.state.currentQuestion + 1);
    }

    /**
     * Get game results
     */
    getResults() {
        const correct = this.state.correctAnswers;
        const total = this.state.questionCount;
        const percentage = Math.round((correct / total) * 100);

        let stars = 1;
        if (percentage >= 90) stars = 3;
        else if (percentage >= 70) stars = 2;

        return {
            correct,
            total,
            percentage,
            stars,
        };
    }

    /**
     * Reset game
     */
    reset() {
        this.state = {
            range: 10,
            questionCount: 10,
            currentQuestion: 0,
            correctAnswers: 0,
            questions: [],
            currentSplit: { left: [], right: [] },
            currentObjects: [],
            currentTheme: THEMES[0],
            currentEmoji: '🍎',
        };
    }

    /**
     * Get current question data
     */
    getCurrentQuestion() {
        if (this.state.currentQuestion >= this.state.questions.length) {
            return null;
        }
        return {
            target: this.state.questions[this.state.currentQuestion].target,
            objects: this.state.currentObjects,
            emoji: this.state.currentEmoji,
            questionNumber: this.state.currentQuestion + 1,
            totalQuestions: this.state.questionCount,
        };
    }
}

// Global game engine instance
const gameEngine = new GameEngine();
