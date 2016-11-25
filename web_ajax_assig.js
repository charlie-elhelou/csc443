
function myFunction(){
	var city = document.getElementById("city").value;
	var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D'"+city+"')&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"
	callAjax(url, callback);
}

function callAjax(url, callback){
    var xmlhttp;
    xmlhttp = new XMLHttpRequest();
	
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
           console.log('responseText:'+ xmlhttp.responseText);
			try{
				var data = JSON.parse(xmlhttp.responseText);
			}catch(err){
				console.log(err.message);
				return;
			}
			callback(data);
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function callback(data){
	document.getElementById("weather_response").innerHTML="";
	var para = document.createElement("P");

	var title = data.query.results.channel.item.title;
	var temp = data.query.results.channel.item.temp;
	var sky = data.query.results.channel.item.text;
	
	var title2 = document.createTextNode(title);
	var temp2 = document.createTextNode(temp);
	var sky2 = document.createTextNode(sky);	
	
	para.appendChild(title2)
	para.appendChild(temp2)
	para.appendChild(sky2)
	
	document.getElementById("weather_response").appendChild(para);
}

