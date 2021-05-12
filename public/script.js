// Always include at top of Javascript file
"use strict";

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
/*     */

var chooseColors = document.getElementsByClassName('square')[0].children;
for(var i = 0 ; i < chooseColors.length; i++){
    chooseColors[i].addEventListener( 'click', function(index) { 
    var backgroundColor = document.getElementById('postcard_wrap');
    backgroundColor.style.backgroundColor = this.style.backgroundColor;
    removeBorder(this); 
    this.style.border="1px solid black";
  });
}

function removeBorder(obj){
  for(var i = 0 ; i < chooseColors.length; i++){
    obj.parentNode.children[i].style.border="";   
  }
}

function imageChnage(obj){
  readURL(obj);
}

function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
          document.getElementById('blah').setAttribute('src',e.target.result);
      }
      reader.readAsDataURL(input.files[0]);
    }
}


var myObj = {photo: photo, message: "", color: chooseColors, font: fonts};
var myJSON = JSON.stringfy(myObj);
localStorage.setItem("postcardData",myJSON);


