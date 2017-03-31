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

//background监听tab的更新，如果tab的url有更新，且能够匹配到目标网站的url，向网页中插入content script
chrome.tabs.onUpdated.addListener(
function (tabId,changeInfo,tab)
    {
		if(changeInfo.url)  //当tab的url有更新时会执行
			{alert(changeInfo.url)}
	})
