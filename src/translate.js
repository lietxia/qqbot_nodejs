翻译 = (s) => fetch("http://translate.google.cn/translate_a/single?client=gtx&dt=t&dj=1&ie=UTF-8&sl=auto&tl=zh_CH&q=" + s, res => {
  res = JSON.parse(res)
  alert(res.sentences[0].trans)
})