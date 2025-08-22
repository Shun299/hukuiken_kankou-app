window.onload = async () => {

    // 地図の初期化
    const map = L.map('map').setView([35.82387240481848, 136.07278048220354], 9);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

    // 送信されたURLから値を取得
    const url = new URL(decodeURIComponent(document.location.href));
    const major  = url.searchParams.get('major');
    const middle = url.searchParams.get('middle');
    const minor  = url.searchParams.get('minor');
    console.log(major, middle, minor);

    // CSVファイルを取得
    const csvFilePath = '/kankouti.csv'; 
    const response = await fetch(csvFilePath);
    const text = await response.text()
    console.log(text);

    // 取得したCSVファイルをワードごとに分割
    const word = text.trim().split('\n');
    const headers = word[0].split(',');
    const hairetu = [];

    console.log(headers);
    
    // ワードの最後まで処理を繰り返す
    for (let i=1; i < word.length;i++) {
        const values = word[i].split(',');
        const data = {
            name:values[0],
            address:values[1],
            latitude:values[2],
            longitude:values[3],
            major:values[4],
            middle:values[5],
            minor:values[6].trim()
        };
        hairetu.push(data);
    };
    console.log(hairetu);

    // フィルター処理
    const filterdata = hairetu.filter((item) => {
        const majorMatch = (item.major === major);
        const middleMatch = (item.middle === middle);
        const minorMatch = (minor === '小分類を選択してください' || item.minor === minor);  //小分類が選択されていなくても通るようにしている
        return majorMatch && middleMatch && minorMatch;
    });
    console.log(filterdata.length);  // 確認

    const kekkaTitle = document.getElementById('kensaku_kekka');
    const kennsuu = document.createElement('div');
    kennsuu.textContent = `${searchResultCount}件ヒットしました`;
    kennsuu.id = 'result-count';
    kekkaTitle.after(kennsuu); 

    const resultcontainer = document.getElementById('result-container');
    if (filterdata.length > 0) {
        // 緯度経度を取得してピンを立てる
        filterdata.forEach(item => {
            const lat = parseFloat(item.latitude);
            const lon = parseFloat(item.longitude);
            L.marker([lat, lon]).addTo(map).bindPopup(`<a href="https://www.google.com/search?q=${item.name}" target="_blank"><b>${item.name}</b></a>`);
            });

        // テンプレート関数を使用して各カードを作成
        filterdata.forEach(item => {
            const card = createcard(item);
            resultcontainer.appendChild(card);
        });
    } else {
        resultcontainer.textContent = '該当する結果がありませんでした。';
    };
};

// カードのテンプレート関数
function createcard(item) {
    const card = document.createElement('div');
    card.innerHTML = `
    <div class="card-image-container">
        <img src="../picture/kari1_1280_853.jpg" class="card-image">
        <img src="../picture/kari2_768_512.jpg" class="card-image">
        <img src="../picture/kari3_650_433.jpg" class="card-image">
        <img src="../picture/kari4_1299_867.jpg" class="card-image">
    </div>
    <div class="card-text-container">
        <h3>${item.name}</h3>
        <p>${item.address}</p>
        <a href="https://www.google.com/search?q=${item.name}" target="_blank">Googleで詳しく調べる</a>
    </div>
    `;
    return card;
};