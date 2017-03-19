var smallTag = document.getElementById("trad");
var aTags = smallTag.getElementsByTagName("a");
var space = new Array(aTags.length);
for (var i=0; i < aTags.length; i++)
{
	space[i] = document.createElement("nobr"); 
	space[i].innerHTML = "&nbsp;&nbsp;&nbsp;";
	smallTag.insertBefore(space[i],aTags[i]);
	aTags[i].innerHTML += "<br>";
}
