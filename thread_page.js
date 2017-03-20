//匹配串的内容页面

//取消外部url跳转确认
var aTags = document.getElementsByTagName("a");
var urlExp = new RegExp("http:\/\/jump.2ch.net/[?]|https:\/\/jump.2ch.net/[?]");
for (var i=0; i < aTags.length; i++)
{
	if (urlExp.test(aTags[i].href))
	{
		aTags[i].href = ("http://" + aTags[i].href.replace(urlExp,""));
	}
}
