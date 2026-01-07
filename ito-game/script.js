// ゲーム状態管理
let gameState = {
    playerCount: 4,
    theme: '',
    players: [],
    currentPlayerIndex: 0,
    revealedCards: [],
    allDistributed: false
};

// ito通常版のテーマ（100個）
const classicThemes = [
    'コンビニの商品の人気',
    '100円ショップの商品の人気',
    '飲食店の人気',
    '駅の人気',
    '中華料理の人気',
    '学校給食の人気',
    '有名人の人気',
    '子供に人気なもの',
    'アニメ・漫画のキャラの人気',
    'ゲームキャラの人気（モンスター含む）',
    'キャラクターの人気（ゆるキャラ含む）',
    'プレゼント・お土産の人気',
    '建物の人気',
    '住みたい国や場所の人気',
    'アプリ・ウェブサービスの人気',
    '乗り物の人気',
    '俳優の人気',
    '悪役の人気',
    '食べ物の人気',
    '飲み物の人気',
    '生き物の人気',
    'おもちゃの人気',
    '電化製品の人気',
    '映画の人気',
    'ミュージシャンの人気',
    'お菓子・スイーツ・アイスの人気',
    'ペットの人気',
    '職業の人気',
    'おにぎりの具の人気',
    'パンの種類の人気',
    '趣味の人気',
    'メーカー（ブランド）の人気',
    'アニメ・漫画の人気',
    'ゲームの人気',
    '和食料理の人気',
    '洋食料理の人気',
    '歴史上の人物の人気',
    '声優の人気',
    '童話の人気',
    '歌・曲の人気',
    '映画の登場人物の人気',
    'アスリートの人気',
    'スポーツの人気',
    'テレビ番組の人気',
    '恋人にしたい職業の人気',
    'デートスポットの人気',
    'ハネムーンで行きたい場所の人気',
    '酒のつまみ・居酒屋メニューの人気',
    '化粧品の人気',
    'ボードゲームの人気',
    '資格・免許の人気',
    '旅行したい国や場所の人気',
    '旅行先に持っていきたいもの',
    'ゾンビと戦うときに持っていきたいもの',
    '無人島に持っていきたいもの',
    '一人暮らしに必要なもの',
    '美しいもの',
    'こわいもの',
    '楽しいこと',
    '嬉しいこと',
    'カバンに入っていたら嬉しいもの',
    '言われて嬉しい言葉',
    'なりたい生き物',
    'なりたい歴史上の人物',
    'なりたい有名人',
    'なりたいキャラ（アニメ・漫画・ゲーム）',
    '生き物の大きさ',
    '学校にあるものの大きさ',
    '歴史上の人物の強さ',
    '映画の登場人物の強さ',
    '生き物の強さ',
    'アニメ・漫画のキャラの強さ',
    'ゲームキャラの強さ（モンスター含む）',
    '強そうな言葉（漢字、熟語など）',
    '強そうな効果音（創作OK）',
    '有名人の年収・資産',
    '重そうなもの',
    'ボードゲームの（物理的な）重さ',
    '食べ物のカロリー',
    'モテる条件・特技',
    'やわらかそうなもの',
    'カッコいいもの',
    'カッコいいセリフ',
    'カッコいい苗字・名前',
    'かわいいもの',
    '小学生が好きな言葉',
    '中高生が好きな言葉',
    '人生で大切なもの・こと',
    '雪山で遭難したときにもっていたいもの',
    '地球観光に来た宇宙人にあげたいお土産',
    'テンションが上がるもの・こと',
    '時代遅れの言葉',
    'オタクが喜ぶセリフ・設定',
    'グッとくる仕草・行動',
    '結婚したい有名人',
    '結婚したいキャラ（アニメ・漫画・ゲーム）',
    '親になってほしいキャラ（アニメ・漫画・ゲーム）',
    'ほしい特殊能力・武器（必殺技・道具）',
    '便利なもの',
    'されたいプロポーズ（セリフ・シチュエーション）'
];

// itoレインボーのテーマ（120個）
const rainbowThemes = [
    '旅先ですることの人気',
    '白米に合いそうなもの',
    '中学生になって考えよう カッコいいもの・こと',
    '鳥肌が立つこと',
    '1000円くらいまででできる楽しいこと',
    '桃太郎になって考えよう 頼りになる家来',
    '動物園にいる動物の人気',
    '男女がそれぞれ好きそうなもの',
    '祖父母になって考えよう 孫に言われたら嬉しい言葉',
    'ふだん聞く言葉の頻度',
    '破壊力のある言葉（パワーワード）',
    '冷蔵庫になって考えよう 入れてほしいもの',
    '行事の人気',
    '宝箱をあけて入ってたら嬉しいもの',
    '幼稚園児になって考えよう テンションが上がるとき',
    '上に乗ってみたい動物',
    '商店街のくじの景品でランクが高いもの',
    'SNSを活用するにあたって大切なもの・こと',
    '夏に行きたい場所や国の人気',
    '「一生これしか食べられない」なら選びたい食べもの',
    '猫になって考えよう 心地のいい場所',
    'いい匂いのもの',
    '強そうな5文字',
    '芸人になって考えよう ヤバい罰ゲーム',
    'コンビニで買える食べ物の人気',
    '公園の石をどかしたとき、あったらビックリするもの',
    '小学生になって考えよう 嬉しいこと',
    '明るいもの',
    '言われたら嬉しいプロポーズの言葉',
    '探検家になって考えよう ワクワクする場所',
    '寿司ネタの人気',
    '動物の特徴でほしいもの',
    'お嬢様になって考えよう 優秀な執事',
    '人からごちそうされたい食べ物',
    '桃太郎の場面（お話のどのあたりか）',
    '能力者になって考えよう ハデに使えそうな脳力',
    '海の生き物の人気',
    '冷蔵庫の中にあったらテンションが上がるもの',
    '高校生になって考えよう 授業中、起きたら大変なこと',
    '写真を撮りたくなるもの',
    'どうしてもこれだけは許せないということ',
    '幸せを感じること',
    '新婚旅行先の人気',
    '学校の先生に怒られそうなこと',
    '犬になって考えよう 嬉しいこと',
    'よく行く場所',
    '思わず見てしまうメールのタイトル',
    'ボディビルダーになって考えよう 言われたいかけ声',
    '生まれ変わったらなりたい動物',
    '大人っぽい言動',
    '動画配信者にとって必要な能力・資質',
    '家族にしてもらったら嬉しいこと',
    'ショックを受けた好きな人のクセ',
    '侍になって考えよう 尽くしたいタイプの人',
    '食べ物のやわらかさ',
    '突然の一日オフ。最高の過ごし方は？',
    '先生になって考えよう 卒業式に言われて嬉しい言葉',
    '幼いころにほしかったもの',
    '宇宙にいるときにやってみたい行動',
    'お笑い芸人にとって必要な能力・資質',
    '寝起きにしたいこと',
    '変顔の度合い（実際にやる）',
    '修学旅行生になって考えよう 行きたい旅行先',
    '部屋の中にある大切なもの',
    '痛い思い出（物理・精神どちらでも）',
    '生きる上で大切なもの・こと',
    '食べ物の辛さ',
    'カッコいいと思うエピソード',
    '就活中の大学生になって考えよう 働きたい職場',
    '聞こえてきたら嬉しい音',
    '厳しく無口な父に言われたら嬉しい言葉',
    'アイドル業にとって必要な能力・資質',
    '黒いもの',
    '卒業式で流したら感動する音楽や効果音',
    '魔法使いになって考えよう 使ってみたい魔法',
    '日常に起こるいいこと',
    '片思い中の好きな人に言われたら嬉しい言葉',
    '仕事をする上で必要な能力・資質',
    '眠くなるもの',
    '見た目が子供に戻ったならしたいこと',
    '馬主になって考えよう 速そうな馬の名前',
    '投げたいもの',
    '勇気ある行動',
    '芸能事務所の社長になって考えよう 所属芸能人が起こしたら大変な事件',
    '包まれたいもの',
    '砂漠で遭難したときにほしいもの',
    '超能力になって考えよう 友人の脳内を読んだらショックだった考え',
    'ずっと見ていられるもの',
    '死ぬまでにしたいこと',
    'ヒーローになって演じよう カッコいいポーズ（実際にやる）',
    'なつかしさを感じるもの・こと',
    'テストでその点を取ったときの反応',
    '母になって考えよう 子供が寝言で言っていたら嬉しいこと',
    '便利なスマホアプリ',
    '叫ぶと必殺技っぽい言葉（創作OK）',
    '芸能人になって考えよう 「これドッキリじゃね？」と疑うできごと',
    '足の速い動物',
    'これは恋か愛か',
    '人間関係で必要な能力・資質',
    'おみやげにもらったら嬉しいもの',
    '奇跡の体験',
    'タイムトラベラーになって考えよう 過去から持って帰りたいもの',
    '朝ごはんに食べたいもの',
    'お尻から出てきたらビックリするもの',
    '科学者になって考えよう 発明したい薬',
    '踏んだら痛そうなもの',
    'SNSでめちゃくちゃいいねされそうな投稿',
    '人物やキャラクターのイメージ',
    '疲れたときにしたいこと',
    'あったらおいしそうなアイスクリームの味',
    '赤ちゃんになって考えよう 最高の瞬間',
    '家にある便利なもの',
    '5歳児が言ったらビックリする言葉',
    '魔王になって考えよう こんな勇者はイヤだ',
    '大学生が反応する言葉',
    '機嫌がいいときにしそうな行動',
    'リーダーにとって必要な能力・資質',
    '友達になりたい人の特徴',
    '人生の中で、やる回数が多いこと',
    '愛されていると思うこと'
];

// itoクラシックのテーマ（100個）
const itoClassicThemes = [
    'アニメ・漫画の人気',
    'なりたい有名人',
    '鳥肌が立つこと',
    '写真を撮りたくなるもの',
    '生きる上で大切なもの・こと',
    'スポーツの人気',
    '住みたい場所の人気',
    '武器にしたら強そうな日用品',
    'ずっと見ていられるもの',
    'リーダーにとって必要な能力・資質',
    '童話の人気',
    'ほしい（手に入れたい）特殊能力・武器（必殺技・道具）',
    'どうしてもこれだけは許せないということ',
    'うっかり信じてしまいそうなウソ',
    '幸せを感じること',
    '付き合ってみたい（アニメ・漫画・ゲームの）キャラ',
    '映画の人気',
    '包まれたいもの',
    'あったらおいしそうなアイスクリームの味',
    'ゾンビと戦うときに持っていたい武器・道具',
    'アスリートの人気',
    'なりたい（アニメ・漫画・ゲームの）キャラ',
    'いい匂いのもの',
    '疲れたときにしたいこと',
    'SNSを活用するにあたって大切なもの・こと',
    '食べ物の人気',
    '俳優の人気（男女問わず）',
    'おみやげにもらったら嬉しいもの',
    'ガマンするのが難しいこと',
    'お笑い芸人にとって必要な能力・資質',
    '重そうなもの',
    '歴史上の人物の人気',
    '幼い頃に憧れたもの',
    '家にある便利なもの',
    '愛されていると思うこと（愛を感じること）',
    '歌・曲の人気',
    'メーカー（ブランド）の人気',
    '寝起きにしたいこと',
    '聞こえてきたら嬉しい音',
    '中学生になって考えよう カッコいいもの・こと',
    '記念日のプレゼントの人気',
    '旅行したい国の人気',
    '恋人がしてくれたら嬉しいこと',
    '上に乗ってみたい動物',
    '小学生になって考えよう 嬉しいこと',
    '悪役の人気（実在・非実在問わず）',
    'かわいいもの',
    '1人でやるにはハードルが高いこと',
    '仕事をする上で必要な能力・資質',
    '猫になって考えよう 心地のいい場所',
    '生き物の大きさ',
    'やわらかそうなもの',
    '5歳児が言ったらビックリする言葉',
    '公園の石をどかしたとき、あったらビックリするもの',
    '地球最後の日に頼りになりそうなもの',
    'よく行く場所',
    '飲み物の人気',
    '言われたら嬉しいプロポーズの言葉',
    '宝箱をあけて入ってたら嬉しいもの',
    'もしあったら参加してみたいお祭りの特徴',
    'おもちゃの人気',
    '眠くなるもの',
    '砂漠で遭難したときにほしいもの',
    'タイムマシンで行ってみたい時代と場所',
    '魔王になって考えよう こんな勇者はイヤだ',
    '言われたら嬉しい言葉',
    '乗り物の人気',
    'お尻から出てきたらビックリするもの',
    '人からごちそうされたい食べ物',
    '科学者になって考えよう 発明したいもの・こと',
    '無人島に持っていきたいもの',
    '楽しいこと',
    '叫ぶと必殺技っぽい言葉（創作OK）',
    '見かけたら気になってしまう本のタイトル',
    '犬になって考えよう 嬉しいこと',
    '嬉しいこと',
    'カッコいいもの',
    '友達になりたい人の特徴',
    '魔法使いになって考えよう 使ってみたい魔法',
    '学校の先生に言ったらビックリされそうなこと',
    '美しいもの',
    'お菓子・スイーツ・アイスの人気',
    'これは恋か愛か',
    'ヒーローになって考えよう ポーズのカッコよさ（実際にやる）',
    '入ってみたい漫画や小説の世界',
    '子供に人気なもの',
    'カッコいい苗字・名前（ありそうならOK）',
    '機嫌がいいときにしそうな行動',
    '探検家になって考えよう ワクワクする場所',
    '人間関係で必要な能力・資質',
    '映画の登場人物・キャラの強さ',
    'デートスポットの人気',
    '「一生これしか食べられない」なら選びたい食べもの',
    '高校生になって考えよう 授業中、起きたら大変なこと',
    'キャラクターの性格',
    'カバンに入っていたら嬉しいもの',
    '変顔の度合い（実際にやる）',
    '勇気ある行動',
    '自分の分身ができたらやってほしいこと',
    '動画配信者にとって必要な能力・資質'
];

let selectedTheme = ''; // 選択されたテーマ
let currentVersion = ''; // 現在選択されているバージョン

// バージョンごとのテーマリストを取得
function getThemesByVersion(version) {
    switch(version) {
        case 'classic':
            return classicThemes;
        case 'rainbow':
            return rainbowThemes;
        case 'ito-classic':
            return itoClassicThemes;
        default:
            return classicThemes;
    }
}

// バージョン名を取得
function getVersionName(version) {
    switch(version) {
        case 'classic':
            return 'ito通常版';
        case 'rainbow':
            return 'itoレインボー';
        case 'ito-classic':
            return 'itoクラシック';
        default:
            return '';
    }
}

// ステップ1: バージョンを選択
function selectVersion(version) {
    currentVersion = version;
    selectedTheme = '';
    
    // バージョンボタンの選択状態を更新
    document.querySelectorAll('.btn-version').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.classList.add('selected');
    
    // 選択方法のセクションを表示
    const versionName = getVersionName(version);
    document.getElementById('selected-version-display').textContent = `選択中: ${versionName}`;
    document.getElementById('theme-method-section').classList.remove('hidden');
    document.getElementById('selected-theme-display').classList.add('hidden');
}

// ステップ2-1: ランダムでテーマを選択
function selectRandomTheme() {
    if (!currentVersion) {
        alert('まずバージョンを選択してください');
        return;
    }
    
    const themes = getThemesByVersion(currentVersion);
    selectedTheme = themes[Math.floor(Math.random() * themes.length)];
    displaySelectedTheme();
}

// ステップ2-2: リストからテーマを選択（モーダル表示）
function showThemeListModal() {
    if (!currentVersion) {
        alert('まずバージョンを選択してください');
        return;
    }
    
    const modal = document.getElementById('theme-modal');
    const themeList = document.getElementById('theme-list');
    
    const themes = getThemesByVersion(currentVersion);
    themeList.innerHTML = '';
    themes.forEach(theme => {
        const item = document.createElement('div');
        item.className = 'theme-item';
        item.textContent = theme;
        item.onclick = () => selectThemeFromList(theme);
        themeList.appendChild(item);
    });
    
    modal.classList.remove('hidden');
}

// リストからテーマを選択
function selectThemeFromList(theme) {
    selectedTheme = theme;
    displaySelectedTheme();
    closeThemeModal();
}

// 選択されたテーマを表示
function displaySelectedTheme() {
    document.getElementById('theme-preview').textContent = selectedTheme;
    document.getElementById('selected-theme-display').classList.remove('hidden');
}

// テーマリストでフィルタリング
function filterThemes() {
    if (!currentVersion) return;
    
    const searchText = document.getElementById('theme-search').value.toLowerCase();
    const themeList = document.getElementById('theme-list');
    
    const themes = getThemesByVersion(currentVersion);
    const filteredThemes = themes.filter(theme => 
        theme.toLowerCase().includes(searchText)
    );
    
    themeList.innerHTML = '';
    filteredThemes.forEach(theme => {
        const item = document.createElement('div');
        item.className = 'theme-item';
        item.textContent = theme;
        item.onclick = () => selectThemeFromList(theme);
        themeList.appendChild(item);
    });
}

// テーマリストモーダルを閉じる
function closeThemeModal() {
    document.getElementById('theme-modal').classList.add('hidden');
    document.getElementById('theme-search').value = '';
}

// カスタムテーマ入力モーダルを表示
function showCustomTheme() {
    if (!currentVersion) {
        alert('まずバージョンを選択してください');
        return;
    }
    document.getElementById('custom-theme-modal').classList.remove('hidden');
    document.getElementById('custom-theme-input').value = '';
    document.getElementById('custom-theme-input').focus();
}

// カスタムテーマを設定
function setCustomTheme() {
    const customTheme = document.getElementById('custom-theme-input').value.trim();
    if (customTheme) {
        selectedTheme = customTheme;
        displaySelectedTheme();
        closeCustomThemeModal();
    } else {
        alert('テーマを入力してください');
    }
}

// カスタムテーマモーダルを閉じる
function closeCustomThemeModal() {
    document.getElementById('custom-theme-modal').classList.add('hidden');
}

// Enterキーでカスタムテーマを確定
document.addEventListener('DOMContentLoaded', () => {
    const customInput = document.getElementById('custom-theme-input');
    if (customInput) {
        customInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                setCustomTheme();
            }
        });
    }
});

// ゲーム開始
function startGame() {
    // バリデーション
    if (!currentVersion) {
        alert('① まずitoのバージョンを選択してください');
        return;
    }
    
    if (!selectedTheme) {
        alert('② テーマを選択してください（ランダム、リスト、またはオリジナル）');
        return;
    }
    
    const playerCount = parseInt(document.getElementById('player-count').value);
    const theme = selectedTheme;
    
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
    
    selectedTheme = '';
    currentVersion = '';
    
    // バージョンボタンの選択解除
    document.querySelectorAll('.btn-version').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // UIをリセット
    document.getElementById('theme-method-section').classList.add('hidden');
    document.getElementById('selected-theme-display').classList.add('hidden');
    document.getElementById('theme-preview').textContent = '';
    
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
