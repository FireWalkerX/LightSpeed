
//Exchange api usage thingy
//This is where the magick happens

function test() {
    var userInput = document.getElementById("userInput").value;
    var sel1 = document.getElementById('mySelect1');
	var pair1 = sel1.options[sel1.selectedIndex].value;
	var sel2 = document.getElementById('mySelect2');
	var pair2 = sel2.options[sel2.selectedIndex].value;

var Request = new XMLHttpRequest();

Request.open("POST", "https://shapeshift.io/shift");

Request.setRequestHeader("Content-Type", "application/json");

Request.onreadystatechange = function () {
  if (this.readyState === 4) {
    console.log("Status:", this.status);
    console.log("Headers:", this.getAllResponseHeaders());
    console.log("Body:", this.responseText);
	var str = this.responseText;
	if(str.length > 10) str = str.substring(12,46)+"";
	document.getElementById("demo").innerHTML = (str);
	
	deposithistory()
	
	while (txStatReturn.indexOf("no_deposit") > -1) {
	deposithistory()
	}
  }
};

var body = {
  "withdrawal": userInput,
  "pair": pair1 + "_" + pair2,
};

Request.send(JSON.stringify(body));
}

//End of magick

//Smooth anchors

$(function() {
	  $('a[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {

	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html,body').animate({
	          scrollTop: target.offset().top
	        }, 1000);
	        return false;
	      }
	    }
	  });
	});
// End of dark magick
//voldemort stuff here
function deposithistory() {
var Request = new XMLHttpRequest();
var str = document.getElementById("demo").innerHTML;
Request.open('GET', "http://shapeshift.io/txStat/" + str);

Request.onreadystatechange = function () {
  if (this.readyState === 4) {
    console.log('Status:', this.status);
    console.log('Headers:', this.getAllResponseHeaders());
    console.log('Body:', this.responseText);
	txStatReturn = this.responseText;
	
	setTimeout("deposithistory()", 3000);
  }
};
var body = "test";
Request.send(JSON.stringify(body));
}