//换行功能
var isBoardPage = 1;
var menuNamedTag = document.getElementsByName("menu");  //用来定位
if (menuNamedTag.length != 0)
{
    var tableTag = menuNamedTag[0].nextSibling;  //目前发现2ch有两种html。对于其中一种，menuNamedTag后的一个节点就是table标签。对另一种，nextSibling会获得一个换行符
    while (isNotTag(tableTag) || tableTag.tagName != "TABLE")  //获得到非talbe标签时，继续向后获取直到找到table标签
    {
        tableTag = tableTag.nextSibling;
    }
    var titleaTags = tableTag.getElementsByTagName("a");
    if (titleaTags[4].previousSibling.nodeValue == "　")  //对于其中一种html，所有a标签之间有一个空格。判断为这种后，要在第一个a标签前手动加上空格保持排版的一致性。
    {
        var space = document.createElement("nobr");
        var parentNode = titleaTags[2].parentNode;
        space.innerHTML = "　";
        parentNode.insertBefore(space,titleaTags[2]);
    }
    for (var i=0; i < titleaTags.length; i++)
    {
        if (titleaTags[i].innerHTML.length > 5)  //前几个标题，序号和内容分别是两个a标签。如果是序号标签，则不换行。
            titleaTags[i].innerHTML += "<br>";
    }
}

function isNotTag(tag)
{
    try
    {
        name = tag.tagName;
    }
    catch(e1)
    {
        return 1;
    }
    return 0;
}

//取消外部url跳转确认
var hasThreadPage = 1;
var dlTags = document.getElementsByClassName("thread");  //在板块主页定位到串的部分
if (dlTags.length != 0)
{
    var urlExp = new RegExp("http:\/\/jump.2ch.net/[?]|https:\/\/jump.2ch.net/[?]");  //这里用\?会出错
    var httpExp = new RegExp(".*[?]http.*");
    for (var i=0; i < dlTags.length; i++)
    {
    	var threadaTags = dlTags[i].getElementsByTagName("a");
        for (var j=0; j < threadaTags.length; j++)
        {
            if (urlExp.test(threadaTags[j].href))  //是一个跳转的url
	        {
	        	if (!httpExp.test(threadaTags[j].href))  //如果这个url没有包含http://，则加上http://，删去跳转的代码
	        	{
	        		threadaTags[j].href = ("http://" + threadaTags[j].href.replace(urlExp,""));
	        	}
	        	else  //如果包含了http://或https://，保持原样，删去跳转的代码
	        	{
	        		threadaTags[j].href = (threadaTags[j].href.replace(urlExp,""));
	        	}
        	}
        }
    }
}
