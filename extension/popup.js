//获取popup.html上两个单选框
var onRadio = document.getElementById("on");
var offRadio = document.getElementById("off");

//在DOM被创建时，向background发送消息，询问此时插件处于打开还是关闭状态。收到回复后以此决定将哪个单选框设置为选中。
//同时创建监听：在单选框被点击时，向background.js发送消息，更新插件的状态。
document.addEventListener("DOMContentLoaded", function () {
  chrome.runtime.sendMessage({content: "askStatus"}, updateStatus);
  onRadio.addEventListener("click", enable);
  offRadio.addEventListener("click", disable);
});

function updateStatus(response)
{
	if (response.content == "on")
		onRadio.checked = true;
	if (response.content == "off")
		offRadio.checked = true;
}
function enable()
{
	chrome.runtime.sendMessage({content: "turnOn"});
}
function disable()
{
	chrome.runtime.sendMessage({content: "turnOff"});
}
