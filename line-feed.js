function lineFeed
{
	var menuTag=document.getElementsByName("menu");
	aTags = menuTag[0].nextSbiling.getElementsByTagName("a");
	for (var i=0; i < aTags.length; i++)
		{
			aTags[i].innerHTML += "<br>";
		}
}
