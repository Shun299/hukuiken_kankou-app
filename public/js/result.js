window.onload = async () => {
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
        const minorMatch = (item.minor === minor);
        return majorMatch && middleMatch && minorMatch;
    });
    console.log(filterdata);

    // カードのテンプレート作成
};