const submit_button = document.getElementById('submit');

// 中分類と小分類の対応表
const categoryMap = {
    '歴史・文化': ['史跡', '神社・仏閣', '庭園', '博物館', '美術館', '記念・資料館', '歴史的まち並み、旧街道', '城'],
    '自然（行祭事・イベント）': ['海岸', '動・植物園', '山岳', '河川', '高原', '湖沼', '公園', 'その他自然'],
    '温泉・健康': ['温泉地'],
    'ｽﾎﾟｰﾂ･ﾚｸﾘｴｰｼｮﾝ': ['海水浴場', 'スポーツ・レクリエーション施設', '釣り場', 'キャンプ場', 'スキー場', '水族館', 'レジャーランド・遊園地', 'テーマパークテーマパーク'],
    '都市型観光 買物 食': ['産業観光', '地区・商店街', '食・グルメ', 'その他都市型観光－買物・食等－'],
    'その他': ['他に分類されない観光地点']
};

// 選択された中分類を調べて対応する小分類の項目のみを表示する
window.onload = () => {
    const middleselect = document.getElementById('middle-class');
    const minorselect = document.getElementById('minor-class');

    // 選択された中分類の項目から対応した小分類の項目をmiddleANDminorに入れる
    middleselect.addEventListener('change', ()=> {
        const middlevalue = middleselect.value;
        const middleANDminor = categoryMap[middlevalue] || [];

        minorselect.innerHTML = '<option hidden>小分類を選択してください</option>';

        // 対応する小分類を新しく追加
        middleANDminor.forEach(item => {
            const option = document.createElement('option');
            option.textContent = item;
            option.value = item;
            minorselect.appendChild(option);
        });
    });
};

// 検索ボタンを押されたときの処理
submit_button.addEventListener('click', (event) => {

    // 各プルダウンメニューの値を取得
    const major = document.getElementById('major-class').value;
    const middle = document.getElementById('middle-class').value;
    const minor = document.getElementById('minor-class').value;

    if (major === '大分類を選択してください') {
        alert('大分類を選択してください。');
        return; 
    } elseif (middle === '中分類を選択してください') {
        alert('中分類を選択してください。');
        return;
    } elseif (major === '大分類を選択してください' && middle === '中分類を選択してください') {
        alert('大分類と中分類を選択してください。');
        return;
    }

    // 各プルダウンメニューの値を取得からURLを作成
    location.href = `/html/result.html?major=${major}&middle=${middle}&minor=${minor}`
})