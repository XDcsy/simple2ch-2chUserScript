var menuNamedTag = document.getElementsByName("menu");
var tableTag = menuNamedTag[0].nextSibling;
var aTags = tableTag.getElementsByTagName("a");
var space = document.createElement("nobr"); 
var parentNode = aTags[2].parentNode;
space.innerHTML = "　";
parentNode.insertBefore(space,aTags[2])
for (var i=0; i < aTags.length; i++)
{
    if (aTags[i].innerHTML.length > 5)
	    aTags[i].innerHTML += "<br>";
}
