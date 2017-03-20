//匹配串列表页面
var smallTag = document.getElementById("trad");  //定位
var aTags = smallTag.getElementsByTagName("a");
var space = new Array(aTags.length);  //在每个标题前加几个空格，视觉效果好一些。
for (var i=0; i < aTags.length; i++)
{
    space[i] = document.createElement("nobr");
    space[i].innerHTML = "&nbsp;&nbsp;&nbsp;";
    smallTag.insertBefore(space[i],aTags[i]);
    //如果在循环中使用insertBefore(tag,aTags[i])，则tag的插入位置会不断地被替换，最终只在最后一个位置插入。因此使用数组。
    aTags[i].innerHTML += "<br>";
}
