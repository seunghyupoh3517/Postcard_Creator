// Always include at top of Javascript file
"use strict";

/*
// UPLOAD IMAGE using a post request
// Called by the event listener that is waiting for a file to be chosen
function uploadFile() {
  
    // get the file chosen by the file dialog control
    const selectedFile = document.getElementById('fileChooser').files[0];
    // store it in a FormData object
    const formData = new FormData();
    // name of field, the file itself, and its name
    formData.append('newImage',selectedFile, selectedFile.name);

    // build a browser-style HTTP request data structure
    const xhr = new XMLHttpRequest();
    // it will be a POST request, the URL will this page's URL+"/upload" 
    xhr.open("POST", "/upload", true);
  
    // callback function executed when the HTTP response comes back
    xhr.onloadend = function(e) {
        // Get the server's response body
        console.log(xhr.responseText);
        // now that the image is on the server, we can display it!
        let newImage = document.getElementById("serverImage");
        newImage.src = "../images/"+selectedFile.name;
    }
  
    // actually send the request
    xhr.send(formData);
}

// Add event listener to the file input element
var photo = document.getElementById("fileChooser").addEventListener("change",uploadFile);

var fonts = document.getElementsByClassName('choose_font')[0].children;
for(var i = 0 ; i < fonts.length; i++){
  fonts[i].addEventListener( 'click', function(index) {
    var font = document.getElementById('select_font');
    font.style.fontFamily = this.textContent;
  });
}
*/

getData();

function getData(){
  var xhr = new XMLHttpRequest();
  var data = {
   
  };
  xhr.onload = function() {
    if (xhr.status === 200 || xhr.status === 201) {
      console.log(xhr.response);

      var cardData = new Object();
      cardData = JSON.parse(xhr.response);
      document.getElementById('postcard_wrap').style.backgroundColor = cardData.color;
      document.getElementById('select_font').style.fontFamily = cardData.font;
      document.getElementById('blah').src="./images/"+cardData.photo;
      document.getElementById('select_font').value = cardData.message;
      document.getElementById('blah').style.display ="inline-block";
    } else {
      console.error(xhr.response);
    }
  };
  xhr.open('GET', '/getCardData');
//   xhr.setRequestHeader('Content-Type', 'application/json'); // 컨텐츠타입을 json으로
  xhr.send(); // 데이터를 stringify해서 보냄
}

