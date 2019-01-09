var data;
var historic;
const Http = new XMLHttpRequest();
const url = 'http://estagio-app.herokuapp.com/api/historic/battery/';
Http.open("GET", url);
Http.setRequestHeader("Content-type", "application/json");
Http.send();
Http.onreadystatechange = function(e) {
	if (Http.readyState == XMLHttpRequest.DONE ) {
       if (Http.status == 200) {
			let content = Http.responseText;
			data = JSON.parse(content);
			data = data["data"];                                                 
			let div = document.getElementById("bloco");
			for (var i = 0; i < data.length; i++) {
				let htmlFinal = "";
				let request = new XMLHttpRequest();
				request.open("GET", "http://estagio-app.herokuapp.com/api/historic/battery/" + data[i]["serial_number"]);
				request.setRequestHeader("Content-type", "application/json");
				request.order = i;
				request.send(); 
				request.onreadystatechange = function(e) {
					if (request.readyState == XMLHttpRequest.DONE ) {
       					if (request.status == 200) {
       						historic = JSON.parse(request.responseText);
							historic = historic["data"];    
							htmlFinal += "<div class=\"bateria\">";
							htmlFinal += "<p><span class=\"destaque\">" + data[this.order]["battery_name"] + "</span></p>";
							htmlFinal += "<p><span>Data</span><span>" + historic[historic.length-1]["timestamp_upload"] + "</span></p>";
							let estadoTemp = "temperatura ";
							if (data[this.order]["last_temperature"] < 3) {
								estadoTemp += "low";
							} else if (data[this.order]["last_temperature"] < 6) {
								estadoTemp += "medium";
							} else {
								estadoTemp += "high";
							}
							let estadoCarg = "carga ";
							if (data[this.order]["last_charge"] < 2) {
								estadoCarg += "low";
							} else if (data[this.order]["last_charge"] < 5) {
								estadoCarg += "medium";
							} else {
								estadoCarg += "high";
							}
							htmlFinal += "<p class=\"" + estadoTemp + "\"><span>Temperatura</span><span>" + data[this.order]["last_temperature"].toFixed(2) + "</span></p>";
							htmlFinal += "<p class=\"" + estadoCarg + "\"><span>Carga</span><span>" + data[this.order]["last_charge"].toFixed(2) + "</span></p>";
							htmlFinal += "<p class=\"linkHistorico\" ><a class=\"texto\" href=\"\"><span>Histórico da bateria</span></a></p></div>";
							div.innerHTML += htmlFinal;
						}
					}
				}
			}
		}
	}
}