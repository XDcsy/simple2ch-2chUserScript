// ==UserScript==
// @name         simple2ch
// @namespace    https://github.com/neEverett/simple2ch-2chChromeExtension
// @version      0.2.1
// @description  Making the webpage version of 2ch a little bit easy to use.
// @author       neEverett
// @match        http://*.2ch.net/*
// @match        http://*.bbspink.com/*/subback.html
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function isNotTag(tag)
    {
        try
        {
            var tname = tag.tagName;
        }
        catch(e1)
        {
            return 1;
        }
        return 0;
    }

    function board_and_thread_page()
    {
        //换行功能
        var isBoardPage = 1;
        var menuNamedTag = document.getElementsByName("menu");  //用来定位
        if (menuNamedTag.length !== 0)
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

        //取消外部url跳转确认
        //2ch不同板块跳转url的格式也略有区别，有的板块http://jump.2ch.net/?后不接http://，有的板块后接。因此需分两种情况处理。
        var hasThreadPage = 1;
        var dlTags = document.getElementsByClassName("thread");  //在板块主页定位到串的部分
        if (dlTags.length !== 0)
        {
            var urlExp = new RegExp("http:\/\/jump.2ch.net/[?]|https:\/\/jump.2ch.net/[?]");  //这里用\?会出错，匹配不到问号
            var httpExp = new RegExp(".*[?]http.*");
            for (var k=0; k < dlTags.length; k++)
            {
                var threadaTags = dlTags[k].getElementsByTagName("a");
                for (var j=0; j < threadaTags.length; j++)
                {
                    if (urlExp.test(threadaTags[j].href))  //是一个跳转的url
                    {
                        if (!httpExp.test(threadaTags[j].href))  //如果这个url没有包含http://，则加上http://，删去跳转的代码
                        {
                            threadaTags[j].href = ("http://" + threadaTags[j].href.replace(urlExp,""));
                        }
                        else  //如果包含了http://或https://，这部分保持原样，删去跳转的代码
                        {
                            threadaTags[j].href = (threadaTags[j].href.replace(urlExp,""));
                        }
                    }
                }
            }
        }
    }

    function thread_list_page()
    {
        //匹配串列表页面
        var smallTag = document.getElementById("trad");  //定位
        if (smallTag)
        {
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
        }
    }
    board_and_thread_page();
    thread_list_page();

})();
