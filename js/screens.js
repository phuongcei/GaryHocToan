/**
 * Screens - UI rendering for each game screen
 */

const Screens = {
  /**
   * Render Start Screen
   */
  renderStart(container) {
    container.innerHTML = `
      <div class="screen start-screen fade-in">
        <div class="mascot-container float">
          🧮
        </div>
        
        <div class="setting-group">
          <div class="setting-label">🎮 Chọn dạng bài:</div>
          <div class="option-buttons" id="mode-options">
            <button class="btn btn-option selected" data-mode="drag-split">✂️ Kéo thả</button>
            <button class="btn btn-option" data-mode="tree">🌳 Cây số</button>
            <button class="btn btn-option" data-mode="missing">❓ Tìm số</button>
            <button class="btn btn-option" data-mode="dice">🎲 Xúc xắc</button>
          </div>
        </div>
        
        <div class="setting-group">
          <div class="setting-label">📊 Chọn phạm vi số:</div>
          <div class="option-buttons" id="range-options">
            <button class="btn btn-option" data-range="5">5</button>
            <button class="btn btn-option selected" data-range="10">10</button>
            <button class="btn btn-option" data-range="20">20</button>
          </div>
        </div>
        
        <div class="setting-group">
          <div class="setting-label">🔢 Số câu hỏi:</div>
          <div class="option-buttons" id="count-options">
            <button class="btn btn-option" data-count="5">5</button>
            <button class="btn btn-option selected" data-count="10">10</button>
            <button class="btn btn-option" data-count="15">15</button>
            <button class="btn btn-option" data-count="20">20</button>
          </div>
        </div>
        
        <div class="start-button-container">
          <button class="btn btn-primary btn-large pulse" id="start-btn">
            🚀 BẮT ĐẦU!
          </button>
        </div>
      </div>
    `;

    this.attachStartListeners(container);
  },

  /**
   * Attach event listeners for Start Screen
   */
  attachStartListeners(container) {
    // Mode selection
    container.querySelectorAll('#mode-options .btn-option').forEach(btn => {
      btn.addEventListener('click', () => {
        audioManager.playClick();
        container.querySelectorAll('#mode-options .btn-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });

    // Range selection
    container.querySelectorAll('#range-options .btn-option').forEach(btn => {
      btn.addEventListener('click', () => {
        audioManager.playClick();
        container.querySelectorAll('#range-options .btn-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });

    // Count selection
    container.querySelectorAll('#count-options .btn-option').forEach(btn => {
      btn.addEventListener('click', () => {
        audioManager.playClick();
        container.querySelectorAll('#count-options .btn-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });

    // Start button
    container.querySelector('#start-btn').addEventListener('click', () => {
      audioManager.playClick();
      const mode = container.querySelector('#mode-options .selected').dataset.mode;
      const range = parseInt(container.querySelector('#range-options .selected').dataset.range);
      const count = parseInt(container.querySelector('#count-options .selected').dataset.count);
      App.startGame(range, count, mode);
    });
  },

  /**
   * Render Game Screen
   */
  renderGame(container, questionData) {
    const progress = (questionData.questionNumber / questionData.totalQuestions) * 100;

    container.innerHTML = `
      <div class="screen game-screen fade-in">
        <div class="game-header">
          <span class="question-counter">
            Câu ${questionData.questionNumber}/${questionData.totalQuestions}
          </span>
        </div>
        
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progress}%"></div>
        </div>
        
        <div class="target-display bounce-once">
          <div class="target-label">Tách số</div>
          <div class="target-number">${questionData.target}</div>
        </div>
        
        <div class="objects-container" id="source-zone">
          ${this.renderObjects(questionData.objects.filter(o => o.zone === 'source'))}
        </div>
        
        <div class="equation-display" id="equation">
          ${questionData.target} = ? + ?
        </div>
        
        <div class="split-zones">
          <div class="drop-zone" id="left-zone" data-zone="left">
            <span class="zone-count" id="left-count">0</span>
            ${this.renderObjects(questionData.objects.filter(o => o.zone === 'left'))}
            <span class="drop-zone-label">Nhóm 1</span>
          </div>
          <div class="drop-zone" id="right-zone" data-zone="right">
            <span class="zone-count" id="right-count">0</span>
            ${this.renderObjects(questionData.objects.filter(o => o.zone === 'right'))}
            <span class="drop-zone-label">Nhóm 2</span>
          </div>
        </div>
        
        <div class="check-button-container">
          <button class="btn btn-secondary btn-large" id="check-btn">
            ✅ KIỂM TRA
          </button>
        </div>
      </div>
    `;

    this.attachGameListeners(container);
  },

  /**
   * Render emoji objects
   */
  renderObjects(objects) {
    return objects.map(obj =>
      `<span class="emoji-object" data-id="${obj.id}" draggable="true">${obj.emoji}</span>`
    ).join('');
  },

  /**
   * Attach event listeners for Game Screen
   */
  attachGameListeners(container) {
    const sourceZone = container.querySelector('#source-zone');
    const leftZone = container.querySelector('#left-zone');
    const rightZone = container.querySelector('#right-zone');

    // Setup drag and drop for all zones
    [sourceZone, leftZone, rightZone].forEach(zone => {
      this.setupDropZone(zone, container);
    });

    // Setup draggable objects
    this.setupDraggables(container);

    // Check button
    container.querySelector('#check-btn').addEventListener('click', () => {
      audioManager.playClick();
      App.checkAnswer();
    });
  },

  /**
   * Setup drop zone
   */
  setupDropZone(zone, container) {
    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      zone.classList.add('drag-over');
    });

    zone.addEventListener('dragleave', () => {
      zone.classList.remove('drag-over');
    });

    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('drag-over');

      const objectId = parseInt(e.dataTransfer.getData('text/plain'));
      const targetZone = zone.dataset.zone || 'source';

      gameEngine.moveObject(objectId, targetZone);
      audioManager.playDrop();

      this.updateGameUI(container);
    });

    // Touch support
    zone.addEventListener('touchend', (e) => {
      if (App.draggedElement) {
        const objectId = parseInt(App.draggedElement.dataset.id);
        const targetZone = zone.dataset.zone || 'source';

        gameEngine.moveObject(objectId, targetZone);
        audioManager.playDrop();

        App.draggedElement.style.position = '';
        App.draggedElement.style.left = '';
        App.draggedElement.style.top = '';
        App.draggedElement.classList.remove('dragging');
        App.draggedElement = null;

        this.updateGameUI(container);
      }
    });
  },

  /**
   * Setup draggable objects
   */
  setupDraggables(container) {
    container.querySelectorAll('.emoji-object').forEach(obj => {
      // Mouse drag
      obj.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', obj.dataset.id);
        obj.classList.add('dragging');
        audioManager.playPickup();
      });

      obj.addEventListener('dragend', () => {
        obj.classList.remove('dragging');
      });

      // Touch drag
      obj.addEventListener('touchstart', (e) => {
        App.draggedElement = obj;
        obj.classList.add('dragging');
        audioManager.playPickup();
      });

      obj.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        obj.style.position = 'fixed';
        obj.style.left = (touch.clientX - 25) + 'px';
        obj.style.top = (touch.clientY - 25) + 'px';
        obj.style.zIndex = '1000';
      });
    });
  },

  /**
   * Update game UI after move
   */
  updateGameUI(container) {
    const question = gameEngine.getCurrentQuestion();
    if (!question) return;

    const counts = gameEngine.getSplitCounts();
    const target = question.target;

    // Update zones
    const sourceZone = container.querySelector('#source-zone');
    const leftZone = container.querySelector('#left-zone');
    const rightZone = container.querySelector('#right-zone');

    sourceZone.innerHTML = this.renderObjects(question.objects.filter(o => o.zone === 'source'));

    leftZone.innerHTML = `
      <span class="zone-count">${counts.left}</span>
      ${this.renderObjects(question.objects.filter(o => o.zone === 'left'))}
      ${counts.left === 0 ? '<span class="drop-zone-label">Nhóm 1</span>' : ''}
    `;

    rightZone.innerHTML = `
      <span class="zone-count">${counts.right}</span>
      ${this.renderObjects(question.objects.filter(o => o.zone === 'right'))}
      ${counts.right === 0 ? '<span class="drop-zone-label">Nhóm 2</span>' : ''}
    `;

    // Update equation
    const equation = container.querySelector('#equation');
    const leftDisplay = counts.left > 0 ? counts.left : '?';
    const rightDisplay = counts.right > 0 ? counts.right : '?';
    equation.textContent = `${target} = ${leftDisplay} + ${rightDisplay}`;

    // Re-attach draggables
    this.setupDraggables(container);
    [sourceZone, leftZone, rightZone].forEach(zone => {
      this.setupDropZone(zone, container);
    });
  },

  /**
   * Show correct answer feedback
   */
  showCorrectFeedback(container) {
    const gameScreen = container.querySelector('.game-screen');
    gameScreen.classList.add('pop');

    // Create flying stars
    for (let i = 0; i < 5; i++) {
      const star = document.createElement('span');
      star.textContent = '⭐';
      star.className = 'fly-star';
      star.style.cssText = `
        position: fixed;
        font-size: 2rem;
        left: 50%;
        top: 50%;
        --fly-x: ${(Math.random() - 0.5) * 200}px;
        --fly-y: ${-50 - Math.random() * 100}px;
        animation-delay: ${i * 0.1}s;
      `;
      container.appendChild(star);
      setTimeout(() => star.remove(), 1000);
    }

    setTimeout(() => gameScreen.classList.remove('pop'), 300);
  },

  /**
   * Show wrong answer feedback
   */
  showWrongFeedback(container) {
    const gameScreen = container.querySelector('.game-screen');
    gameScreen.classList.add('shake');

    // Create red flash overlay
    const overlay = document.createElement('div');
    overlay.className = 'wrong-overlay';
    overlay.innerHTML = `
      <div class="wrong-content">
        <span class="wrong-emoji">😢</span>
        <span class="wrong-text">Chưa đúng rồi!</span>
      </div>
    `;
    container.appendChild(overlay);

    // Remove effects after animation
    setTimeout(() => {
      gameScreen.classList.remove('shake');
      overlay.remove();
    }, 1500);
  },

  /**
   * Render Result Screen
   */
  renderResult(container, results) {
    const messages = {
      3: ['Xuất sắc! 🎉', 'Tuyệt vời quá!'],
      2: ['Giỏi lắm! 👏', 'Cố lên nào!'],
      1: ['Không sao! 💪', 'Thử lại nhé!'],
    };
    const msg = messages[results.stars][Math.floor(Math.random() * 2)];

    container.innerHTML = `
      <div class="screen result-screen fade-in">
        <div class="result-mascot bounce">
          ${results.stars === 3 ? '🎊' : results.stars === 2 ? '😊' : '🤗'}
        </div>
        
        <h2 class="result-title">${msg}</h2>
        
        <div class="stars-container">
          ${[1, 2, 3].map(i => `
            <span class="star ${i <= results.stars ? 'earned star-spin' : ''}" 
                  style="animation-delay: ${i * 0.2}s">⭐</span>
          `).join('')}
        </div>
        
        <div class="result-stats">
          <div class="stat-row">
            <span class="stat-label">Đúng:</span>
            <span class="stat-value">${results.correct}/${results.total}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Tỷ lệ:</span>
            <span class="stat-value">${results.percentage}%</span>
          </div>
        </div>
        
        <div class="result-buttons">
          <button class="btn btn-primary btn-large" id="replay-btn">
            🔄 CHƠI LẠI
          </button>
          <button class="btn btn-accent" id="home-btn">
            🏠 VỀ TRANG CHỦ
          </button>
        </div>
      </div>
    `;

    // Create confetti
    this.createConfetti(container);

    // Buttons
    container.querySelector('#replay-btn').addEventListener('click', () => {
      audioManager.playClick();
      App.startGame(gameEngine.state.range, gameEngine.state.questionCount);
    });

    container.querySelector('#home-btn').addEventListener('click', () => {
      audioManager.playClick();
      Screens.renderStart(container);
    });
  },

  /**
   * Create confetti effect
   */
  createConfetti(container) {
    const overlay = document.createElement('div');
    overlay.className = 'confetti-overlay';
    container.appendChild(overlay);

    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#C44AFF', '#95E08E'];

    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti-piece';
      confetti.style.cssText = `
        left: ${Math.random() * 100}%;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        animation-duration: ${2 + Math.random() * 2}s;
        animation-delay: ${Math.random() * 0.5}s;
      `;
      overlay.appendChild(confetti);
    }

    setTimeout(() => overlay.remove(), 4000);
  },

  /**
   * Render Tree/Missing Game Screen
   */
  renderTreeGame(container, questionData, mode = 'tree') {
    const progress = (questionData.questionNumber / questionData.totalQuestions) * 100;
    const isSquare = mode === 'missing';
    const shapeClass = isSquare ? 'square' : '';

    // Generate number choices (1 to range)
    const range = gameEngine.state.range;
    const choices = [];
    for (let i = 1; i <= Math.min(range, 10); i++) {
      choices.push(i);
    }

    container.innerHTML = `
      <div class="screen game-screen fade-in">
        <div class="game-header">
          <span class="question-counter">
            Câu ${questionData.questionNumber}/${questionData.totalQuestions}
          </span>
        </div>
        
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progress}%"></div>
        </div>
        
        <div class="tree-container bounce-once">
          <div class="tree-structure">
            <div class="tree-parent ${shapeClass}">
              <span>${questionData.target}</span>
            </div>
            <div class="tree-lines"></div>
            <div class="tree-children">
              <div class="tree-child ${shapeClass} ${questionData.showPosition === 1 ? '' : 'empty'}" id="left-child">
                <span>${questionData.showPosition === 1 ? questionData.shownPart : '?'}</span>
              </div>
              <div class="tree-child ${shapeClass} ${questionData.showPosition === 2 ? '' : 'empty'}" id="right-child">
                <span>${questionData.showPosition === 2 ? questionData.shownPart : '?'}</span>
              </div>
            </div>
          </div>
          
          <div class="setting-label">Chọn số còn thiếu:</div>
          <div class="number-choices" id="number-choices">
            ${choices.map(n => `
              <button class="choice-btn" data-value="${n}">${n}</button>
            `).join('')}
          </div>
        </div>
        
        <div class="check-button-container">
          <button class="btn btn-secondary btn-large" id="check-btn" disabled>
            ✅ KIỂM TRA
          </button>
        </div>
      </div>
    `;

    this.attachTreeListeners(container, questionData);
  },

  /**
   * Attach Tree Game Listeners
   */
  attachTreeListeners(container, questionData) {
    let selectedValue = null;
    const checkBtn = container.querySelector('#check-btn');
    const emptyChild = questionData.showPosition === 1
      ? container.querySelector('#right-child')
      : container.querySelector('#left-child');

    container.querySelectorAll('.choice-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        audioManager.playClick();
        container.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedValue = parseInt(btn.dataset.value);

        // Update empty child display
        emptyChild.querySelector('span').textContent = selectedValue;
        emptyChild.classList.remove('empty');

        checkBtn.disabled = false;
      });
    });

    checkBtn.addEventListener('click', () => {
      if (selectedValue !== null) {
        audioManager.playClick();
        App.checkAnswer(selectedValue);
      }
    });
  },

  /**
   * Render Dice Game Screen
   */
  renderDiceGame(container, questionData) {
    const progress = (questionData.questionNumber / questionData.totalQuestions) * 100;

    container.innerHTML = `
      <div class="screen game-screen fade-in">
        <div class="game-header">
          <span class="question-counter">
            Câu ${questionData.questionNumber}/${questionData.totalQuestions}
          </span>
        </div>
        
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progress}%"></div>
        </div>
        
        <div class="dice-container bounce-once">
          <div class="dice-mascot">🐰</div>
          
          <div class="dice-row">
            ${this.renderDice(questionData.dice1, 'primary')}
            <span class="dice-plus">+</span>
            ${this.renderDice(questionData.dice2, 'secondary')}
          </div>
          
          <div class="dice-total">= ${questionData.target}</div>
          
          <div class="setting-label">Tách số ${questionData.target} thành 2 phần:</div>
          
          <div class="dice-split">
            <div class="dice-split-zone">
              <span class="dice-split-zone-label">Phần 1</span>
              <input type="number" class="equation-box" id="part1" min="1" max="${questionData.target - 1}" placeholder="?">
            </div>
            <span class="equation-operator">+</span>
            <div class="dice-split-zone">
              <span class="dice-split-zone-label">Phần 2</span>
              <input type="number" class="equation-box" id="part2" min="1" max="${questionData.target - 1}" placeholder="?">
            </div>
          </div>
        </div>
        
        <div class="check-button-container">
          <button class="btn btn-secondary btn-large" id="check-btn">
            ✅ KIỂM TRA
          </button>
        </div>
      </div>
    `;

    this.attachDiceListeners(container, questionData);
  },

  /**
   * Render a single dice
   */
  renderDice(value, colorClass) {
    const dots = [];
    for (let i = 1; i <= 9; i++) {
      dots.push(`<div class="dice-dot ${colorClass === 'secondary' ? 'red' : ''} pos-${i}"></div>`);
    }
    return `<div class="dice" data-value="${value}">${dots.join('')}</div>`;
  },

  /**
   * Attach Dice Game Listeners
   */
  attachDiceListeners(container, questionData) {
    const part1Input = container.querySelector('#part1');
    const part2Input = container.querySelector('#part2');
    const checkBtn = container.querySelector('#check-btn');

    // Auto-focus first input
    part1Input.focus();

    // NO auto-calculate - user must enter both values matching the dice shown

    checkBtn.addEventListener('click', () => {
      audioManager.playClick();
      const part1 = parseInt(part1Input.value) || 0;
      const part2 = parseInt(part2Input.value) || 0;
      App.checkAnswer({ part1, part2 });
    });
  },
};
