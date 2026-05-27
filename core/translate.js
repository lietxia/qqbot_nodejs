/**
 * @模块 translate.js
 * @描述 翻译功能，调用Google翻译API将文本翻译为中文
 */

const http = require('http');

/**
 * 翻译文本为中文
 * @param {string} s - 待翻译的文本
 * @returns {void} 控制台输出翻译结果
 */
翻译 = (s) => {
	const url = "http://translate.google.cn/translate_a/single?client=gtx&dt=t&dj=1&ie=UTF-8&sl=auto&tl=zh_CH&q=" + encodeURIComponent(s);
	http.get(url, (res) => {
		let data = "";
		res.setEncoding("utf8");
		res.on("data", (chunk) => { data += chunk; });
		res.on("end", () => {
			try {
				const parsed = JSON.parse(data);
				if (parsed.sentences && parsed.sentences[0])
					console.log(parsed.sentences[0].trans);
			} catch (e) {
				console.log("Translation error:", e);
			}
		});
	});
};