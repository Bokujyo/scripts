function getID(){
	var a = window.location.href.split('/');return a[a.length - 1];
}
function getToken() {
	return fetch('https://chat.openai.com/api/auth/session', {method: 'GET',}).then(r => r.json()).then(d => d.accessToken);
}
function getJson(id, accessToken) {	
	return fetch(`https://chat.openai.com/backend-api/conversation/${id}`, {
		method: 'GET',
		headers: {'Authorization': `Bearer ${accessToken}`}
	}).then(r => r.json());
}

function openWindow(content){
	var formattedJson = JSON.stringify(content, null, 4);
	// 新しいウィンドウを開く
	var w = window.open('', '_blank');
	// ウィンドウに内容を書き込む
	w.document.write('<html><head><title>Export GPT JSON Output</title>');
	w.document.write('<style>body { font-family: "Yu Gothic", YuGothic, sans-serif; font-size: 9px; }</style>');
	w.document.write('</head><body>');
	w.document.write(`<pre>${formattedJson}</pre>`); // JSONを整形して表示
	w.document.write('</body></html>');
	w.document.close();
}

function exportGTPJsonAll(){
	getToken().then(t => getJson(getID(), t)).then(c => {
		navigator.clipboard.writeText(c);
		openWindow(c);
	});
}

