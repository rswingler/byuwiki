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
function h2Text()
{
  	addMarkup(getInputTextArea(), "h2");
}
function h3Text()
{
  	addMarkup(getInputTextArea(), "h3");
}
function bulletList()
{
  	addMarkup(getInputTextArea(), "bullet");
}
function numericList()
{
  	addMarkup(getInputTextArea(), "numeric");
}
function getInputTextArea()
{
	return document.getElementById('inputPane');
}

//INPUT IMAGE
function addImage()
{
    var imageURL = prompt("Please enter the URL of your image:","http://yourPictureURL");
    var el = getInputTextArea();
    var prefix = el.value.slice(el.value[0], el.selectionStart);
    var selected = el.value.slice(el.selectionStart, el.selectionEnd);
    var suffix = el.value.slice(el.selectionEnd, el.value[el.value.length]);

    selected = selected + "![Valid XHTML] (" + imageURL + ")";

    var newTextAreaValue = prefix + selected + suffix;
    el.value = newTextAreaValue;

    renderHTML();
    
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
      	else if (markup == "h2")
      		selected = "##" + selected;
      	else if (markup == "h3")
      		selected = "###" + selected;
      	else if (markup == "bullet")
      		selected = "- " + selected;
      	else if (markup == "numeric")
      		selected = "1. " + selected;
         
    	
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

function renderHTML() {
  var inputPane = document.getElementById('inputPane');
	var previewPane = document.getElementById('previewPane');

	//alert(iPane.value);
	var converter = new Showdown.converter();
	var html = converter.makeHtml(inputPane.value);

	//alert(html);
	previewPane.innerHTML = html;
}

function send() {
        var person = {
            name: $("#id-name").val(),
            address:$("#id-address").val(),
            phone:$("#id-phone").val()
        };

        $('#target').html('sending..');

        $.ajax({
            url: '/test/PersonSubmit',
            type: 'post',
            dataType: 'application/json',
            success: function (data) {
                $('#target').html(data.msg);
            },
            data: person
        });
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
