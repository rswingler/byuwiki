/********************
* MARKDOWN SUPPORTED FEATURES
* italics
* bold
* links
* advanced links
* headers
* horizontal lines
* Bullet list
* numbered list
* list nesting
* Images
* Code
*/

function boldText()
{
  	addMarkup(getInputTextArea(), "bold");
}
function italicText()
{
  	addMarkup(getInputTextArea(), "italic");
}
function underlineText()
{
  	addMarkup(getInputTextArea(), "underline");
}
function h1Text()
{
  	addMarkup(getInputTextArea(), "h1");
}
function h2Text()
{
  	addMarkup(getInputTextArea(), "h2");
}
function getInputTextArea()
{
	return document.getElementById('inputPane');
}

//INPUT IMAGE
function addImage()
{

}

//INPUT TABLE
function addTable()
{
 	
}

function addMarkup(el,markup)
{
    if (typeof el.selectionStart == "number") 
    {    	
    	var prefix = el.value.slice(el.value[0], el.selectionStart);
    	var selected = el.value.slice(el.selectionStart, el.selectionEnd);
    	var suffix = el.value.slice(el.selectionEnd, el.value[el.value.length]);
    	    	
    	if (markup == "bold")
    		selected = "**" + selected + "**";
     	else if (markup == "italic")
    		selected = "*" + selected + "*";
     	else if (markup == "underline")
     		selected = "__" + selected + "__";
      	else if (markup == "h1")
      		selected = "#" + selected;
      	else if (markup == "h2")
      		selected = "##" + selected;
    	
    	var newTextAreaValue = prefix + selected + suffix;
    	
    	el.value = newTextAreaValue;

	renderHTML();
    	
       // return newTextAreaValue;
    }
    else if (typeof document.selection != "undefined")
    {
        var range = document.selection.createRange();
        if (range.parentElement() == el) 
        {
            return range.text;
        }
    }
    //return "";
}

function renderHTML()
{
   	var inputPane = document.getElementById('inputPane');
	var previewPane = document.getElementById('previewPane');

	//alert(iPane.value);
	var converter = new Showdown.converter();
	var html = converter.makeHtml(inputPane.value);

	//alert(html);
	previewPane.innerHTML = html;
}

// function getSelectedText(el) {
//     if (typeof el.selectionStart == "number") {
//         return el.value.slice(el.selectionStart, el.selectionEnd);
//     } else if (typeof document.selection != "undefined") {
//         var range = document.selection.createRange();
//         if (range.parentElement() == el) {
//             return range.text;
//         }
//     }
//     return "";
// }
