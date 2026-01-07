// ゲーム状態管理
let gameState = {
    playerCount: 4,
    theme: '',
    players: [],
    currentPlayerIndex: 0,
    revealedCards: [],
    allDistributed: false
};

// デフォルトのテーマリスト
const defaultThemes = [
    '好きな食べ物',
    '怖いもの',
    '大きいもの',
    '速いもの',
    '高価なもの',
    '美しいもの',
    '重いもの',
    '冷たいもの',
    '古いもの',
    '遠いもの'
];

// ゲーム開始
function startGame() {
    const playerCount = parseInt(document.getElementById('player-count').value);
    const themeInput = document.getElementById('theme-input').value.trim();
    
    // テーマの設定
    const theme = themeInput || defaultThemes[Math.floor(Math.random() * defaultThemes.length)];
    
    // プレイヤーの初期化
    gameState = {
        playerCount: playerCount,
        theme: theme,
        players: [],
        currentPlayerIndex: 0,
        revealedCards: [],
        allDistributed: false
    };
    
    // 各プレイヤーに1-100の数字をランダムに割り当て
    const numbers = generateUniqueNumbers(playerCount);
    for (let i = 0; i < playerCount; i++) {
        gameState.players.push({
            name: `プレイヤー ${i + 1}`,
            number: numbers[i],
            revealed: false
        });
    }
    
    // 配布画面へ遷移
    showScreen('distribute-screen');
    updateDistributeScreen();
}

// 1-100のユニークな数字を生成
function generateUniqueNumbers(count) {
    const numbers = [];
    while (numbers.length < count) {
        const num = Math.floor(Math.random() * 100) + 1;
        if (!numbers.includes(num)) {
            numbers.push(num);
        }
    }
    return numbers;
}

// 配布画面の更新
function updateDistributeScreen() {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    document.getElementById('theme-display').textContent = `テーマ: ${gameState.theme}`;
    document.getElementById('current-player-name').textContent = currentPlayer.name;
    document.getElementById('number-card').classList.add('hidden');
    document.getElementById('show-number-btn').classList.remove('hidden');
    document.getElementById('next-player-btn').classList.add('hidden');
}

// 数字を表示
function showNumber() {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    document.getElementById('number-display').textContent = currentPlayer.number;
    document.getElementById('number-card').classList.remove('hidden');
    document.getElementById('show-number-btn').classList.add('hidden');
    document.getElementById('next-player-btn').classList.remove('hidden');
}

// 次のプレイヤーへ
function nextPlayer() {
    gameState.currentPlayerIndex++;
    
    if (gameState.currentPlayerIndex >= gameState.playerCount) {
        // 全員に配布完了
        gameState.allDistributed = true;
        startGamePlay();
    } else {
        updateDistributeScreen();
    }
}

// ゲームプレイ開始
function startGamePlay() {
    showScreen('game-screen');
    updateGameScreen();
}

// ゲーム画面の更新
function updateGameScreen() {
    document.getElementById('game-theme-display').textContent = `テーマ: ${gameState.theme}`;
    
    // 残りプレイヤー数
    const remainingPlayers = gameState.players.filter(p => !p.revealed);
    document.getElementById('remaining-count').textContent = remainingPlayers.length;
    
    // プレイヤー選択リストの更新
    const playerSelect = document.getElementById('player-select');
    playerSelect.innerHTML = '';
    remainingPlayers.forEach(player => {
        const option = document.createElement('option');
        option.value = player.name;
        option.textContent = player.name;
        playerSelect.appendChild(option);
    });
    
    // 公開されたカードの表示
    updateRevealedCards();
}

// 公開されたカードの表示
function updateRevealedCards() {
    const container = document.getElementById('revealed-cards');
    container.innerHTML = '';
    
    if (gameState.revealedCards.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #94a3b8; padding: 20px;">まだカードが出されていません</p>';
        return;
    }
    
    gameState.revealedCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card-item';
        
        // 順序チェック
        if (index > 0) {
            const prevCard = gameState.revealedCards[index - 1];
            if (card.number < prevCard.number) {
                cardElement.classList.add('incorrect');
            } else {
                cardElement.classList.add('correct');
            }
        } else {
            cardElement.classList.add('correct');
        }
        
        cardElement.innerHTML = `
            <span class="card-player">${card.name}</span>
            <span class="card-number">${card.number}</span>
        `;
        container.appendChild(cardElement);
    });
}

// カードを公開
function revealCard() {
    const playerSelect = document.getElementById('player-select');
    const selectedPlayerName = playerSelect.value;
    
    if (!selectedPlayerName) {
        alert('プレイヤーを選択してください');
        return;
    }
    
    const player = gameState.players.find(p => p.name === selectedPlayerName);
    if (!player || player.revealed) {
        alert('無効なプレイヤーです');
        return;
    }
    
    // カードを公開
    player.revealed = true;
    gameState.revealedCards.push({
        name: player.name,
        number: player.number
    });
    
    // 画面更新
    updateGameScreen();
    
    // 全員公開したら結果表示を促す
    const remainingPlayers = gameState.players.filter(p => !p.revealed);
    if (remainingPlayers.length === 0) {
        setTimeout(() => {
            if (confirm('全員がカードを出しました。結果を確認しますか?')) {
                showResult();
            }
        }, 500);
    }
}

// 結果表示
function showResult() {
    showScreen('result-screen');
    
    document.getElementById('result-theme-display').textContent = `テーマ: ${gameState.theme}`;
    
    // 成功判定
    let isSuccess = true;
    for (let i = 1; i < gameState.revealedCards.length; i++) {
        if (gameState.revealedCards[i].number < gameState.revealedCards[i - 1].number) {
            isSuccess = false;
            break;
        }
    }
    
    // 成功状態の表示
    const successStatus = document.getElementById('success-status');
    if (isSuccess) {
        successStatus.className = 'success-status success';
        successStatus.textContent = '🎉 成功！完璧な順番です！';
    } else {
        successStatus.className = 'success-status failure';
        successStatus.textContent = '😢 失敗...もう一度挑戦しよう！';
    }
    
    // カードリストの表示
    const resultCards = document.getElementById('result-cards');
    resultCards.innerHTML = '<h3 style="margin-bottom: 16px;">出された順番:</h3>';
    
    gameState.revealedCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card-item';
        
        if (index > 0) {
            const prevCard = gameState.revealedCards[index - 1];
            if (card.number < prevCard.number) {
                cardElement.classList.add('incorrect');
            } else {
                cardElement.classList.add('correct');
            }
        } else {
            cardElement.classList.add('correct');
        }
        
        cardElement.innerHTML = `
            <span class="card-player">${index + 1}. ${card.name}</span>
            <span class="card-number">${card.number}</span>
        `;
        resultCards.appendChild(cardElement);
    });
}

// ゲームをリセット
function resetGame() {
    gameState = {
        playerCount: 4,
        theme: '',
        players: [],
        currentPlayerIndex: 0,
        revealedCards: [],
        allDistributed: false
    };
    
    showScreen('start-screen');
}

// 画面切り替え
function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    showScreen('start-screen');
});
