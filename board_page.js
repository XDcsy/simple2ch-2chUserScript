//匹配各板的板面页面

//换行功能
var menuNamedTag = document.getElementsByName("menu");  //用来定位
var tableTag = menuNamedTag[0].nextSibling;  //目前发现2ch有两种html。对于其中一种，menuNamedTag后的一个节点就是table标签。对另一种，nextSibling会获得一个换行符
while (isNotTag(tableTag) || tableTag.tagName != "TABLE")  //获得到非talbe标签时，继续向后获取直到找到table标签
{
    tableTag = tableTag.nextSibling;
}
var aTags = tableTag.getElementsByTagName("a");
if (aTags[4].previousSibling.nodeValue == "　")  //对于其中一种html，所有a标签之间有一个空格。判断为这种后，要在第一个a标签前手动加上空格保持排版的一致性。
{
    var space = document.createElement("nobr");
    var parentNode = aTags[2].parentNode;
    space.innerHTML = "　";
    parentNode.insertBefore(space,aTags[2]);
}
for (var i=0; i < aTags.length; i++)
{
    if (aTags[i].innerHTML.length > 5)  //前几个标题，序号和内容分别是两个a标签。如果是序号标签，则不换行。
        aTags[i].innerHTML += "<br>";
}

function isNotTag(tag)
{
    try
    {
        name = tag.tagName;
    }
    catch(e)
    {
        return 1;
    }
    return 0;
}

//取消外部url跳转确认
var dlTags = document.getElementsByClassName("thread");  //定位到串
for (var i=0; i < dlTags.length; i++)
{
    var threadaTags = dlTags[i].getElementsByTagName("a");
    var urlExp = new RegExp("http:\/\/jump.2ch.net/[?]|https:\/\/jump.2ch.net/[?]");  //此处用\?转义会有问题
    for (var j=0; j < threadaTags.length; j++)
    {
	    if (urlExp.test(threadaTags[j].href))
    	{
	    	threadaTags[j].href = ("http://" + threadaTags[j].href.replace(urlExp,""));
	    }
    }
}
