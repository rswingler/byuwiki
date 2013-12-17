$(function() {
  var saveAndPost = function() {
    //GET DOCUMENT ELEMENTS
    var inputPane = document.getElementById('inputPane');
    var previewPane = document.getElementById('previewPane');
    var location = document.location.href;
    var urlArray = location.split("/");

    //GET TITLE, MARKUP, AND HTML CONTENT
    var title = urlArray[urlArray.length - 1];
    urlArray.splice(-2, 2);
    var dest = urlArray.join('/');
    var markupContent = inputPane.value;
    var htmlContent = previewPane.innerHTML;

    //BUILD JSON
    var article = {
      'markup': markupContent,
      'html': htmlContent
    };
    // article.wikiTitle = title;

    //PREP AJAX POST
    var postURL = dest + '/update/' + title;
    
    var request = $.ajax({
        'url': postURL,
        'type': 'POST',
        'data': JSON.stringify(article),
        'dataType': 'json',
        'contentType': 'application/json'
    });

    //AJAX RESPONSE CALLBACKS
    request.done(function (response, textStatus, jqXHR){
      window.location.href = dest + '/wiki/' + title;
    });


    request.fail(function (jqXHR, textStatus, errorThrown){
        alert('Unable to save your changes at this time.');
    });

    // request.always(function () {
    //     // reenable the inputs
    //     //$inputs.prop("disabled", false);
    // });
  }

  renderHTML();
  $('#saveButton').click(function() {return saveAndPost();});
});

function addCategory() {
  var category = prompt("Please enter a new category:");
  if (category != null && category != "") {
    displayResult(category);
  }
}

function displayResult(category) {
  var x = document.getElementById("categories");
  var option = document.createElement("option");
  option.text = category;
  try {
    // for IE earlier than version 8
    x.add(option, x.options[null]);
  } catch (e) {
    x.add(option, null);
  }
}