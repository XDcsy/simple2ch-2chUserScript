function lineFeed
{
	var aTags=document.getElementByName("menu").nextSbiling.getElementsByTagName("a");
	for (var i=0; i < aTags.length; i++)
		{
			aTages[i].innerHTML += "<br>";
		}
}
