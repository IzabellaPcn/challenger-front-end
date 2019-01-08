const Http = new XMLHttpRequest(); //const cria uma variável que nao pode mudar o valor//
const url = 'json/batteries.json';
Http.open("GET", url);
Http.setRequestHeader("Content-type", "application/json");
Http.send(); //faz a requisição, chama o site//
Http.onreadystatechange = function(e) {
	if (Http.readyState == XMLHttpRequest.DONE ) {
       if (Http.status == 200) {
			let content = Http.responseText;
			let data = JSON.parse(content);
			data = data["data"]                                                 ;

			let htmlFinal = "";
			for (var i = 0; i < data.length; i++) {
				htmlFinal += "<b>" + data[i]["battery_name"] + "</b>";
				htmlFinal += "<p>Serial Number: " + data[i]["serial_number"] + "</p>";
			}

			let div = document.getElementById("div");

			div.innerHTML = htmlFinal;
		}
	}
}