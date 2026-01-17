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
     * Initialize new game with settings
     */
    startGame(range, questionCount) {
        this.state.range = range;
        this.state.questionCount = questionCount;
        this.state.currentQuestion = 0;
        this.state.correctAnswers = 0;
        this.state.questions = this.generateQuestions(range, questionCount);
        this.state.currentTheme = THEMES[Math.floor(Math.random() * THEMES.length)];

        // Apply theme
        document.body.setAttribute('data-theme', this.state.currentTheme);

        return this.loadQuestion(0);
    }

    /**
     * Generate questions for the game
     */
    generateQuestions(range, count) {
        const questions = [];
        const minTarget = 2;
        const maxTarget = range;

        for (let i = 0; i < count; i++) {
            const target = Math.floor(Math.random() * (maxTarget - minTarget + 1)) + minTarget;
            questions.push({ target });
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
     * Check if current answer is valid
     */
    checkAnswer() {
        const counts = this.getSplitCounts();
        const target = this.state.questions[this.state.currentQuestion].target;

        // Both zones must have at least 1 object
        if (counts.left === 0 || counts.right === 0) {
            return { valid: false, reason: 'empty' };
        }

        // All objects must be placed
        if (counts.source > 0) {
            return { valid: false, reason: 'incomplete' };
        }

        // Check if sum equals target
        const isCorrect = counts.left + counts.right === target;

        if (isCorrect) {
            this.state.correctAnswers++;
        }

        return {
            valid: true,
            correct: isCorrect,
            left: counts.left,
            right: counts.right,
            target: target,
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
