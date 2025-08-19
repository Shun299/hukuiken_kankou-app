const submit_button = document.getElementById('submit');

// 検索ボタンを押されたときの処理
submit_button.addEventListener('click', (event) => {

    // 各プルダウンメニューの値を取得
    const major = document.getElementById('major-class').value;
    const middle = document.getElementById('middle-class').value;
    const minor = document.getElementById('minor-class').value;

    // もし一つでも選択しなかったら、アラート（警告ウィンドウ）を表示する
    if (major === '大分類を選択してください' || middle === '中分類を選択してください' || minor === '小分類を選択してください') {
        alert('すべての項目を選択してください。');
        return; 
    }

    // 各プルダウンメニューの値を取得からURLを作成
    location.href = `/html/result.html?major=${major}&middle=${middle}&minor=${minor}`
})