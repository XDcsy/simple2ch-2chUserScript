var enabled = 1;

//监听由popup.js发送的消息，消息是询问状态则发送回应，消息是传递新状态则更改enabled的值。
chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
	    if (message.content == "askStatus")
	    {
		    if (enabled == 1)
			    sendResponse({content :"on"});
		    else sendResponse({content :"off"});
	    }
	    else if (message.content == "turnOn")
	    {
	        enabled = 1;
	    }
	    else if (message.content == "turnOff")
	    {
		    enabled = 0;
	    }
});

var urlof2ch=new RegExp(".*2ch[.]net.*");
var urlOfThreadListPage=new RegExp(".*2ch[.]net.*subback.*");
//background监听tab的更新，如果tab的url有更新，且能够匹配到目标网站的url，向网页中插入content script
chrome.tabs.onUpdated.addListener(
    function (tabId,changeInfo,tab) {
		if (changeInfo.url&&enabled)  //当tab的url有更新，且插件功能被打开时会执行
			{
				if (urlof2ch.test(changeInfo.url))
				{
					if (urlOfThreadListPage.test(changeInfo.url))
				        chrome.tabs.executeScript(tabId,{file: "thread_list_page.js"});
					else
						chrome.tabs.executeScript(tabId,{file: "board_and_thread_page.js"});
				}
			}
});
