






function createNudgeArr() {
	let arr = copyArr(layers);
	arr = arr.splice(1, arr.length);
	for (let l = 0; l < arr.length; l++)
	{
		delete arr[l].a;
		for (let b = 0; b < arr[l].b.length; b++)
		{
			arr[l].b[b] = 0;
			for (let w = 0; w < arr[l].w[b].length; w++)
			{
				arr[l].w[b][w] = 0;
			}
		}
	}
	return arr;
}

function copyArr(_arr) {
	return JSON.parse(JSON.stringify(_arr));
}

function sigmoid(t) {
    return 1 / (1 + Math.pow(Math.E, -t));
}

function dsigmoid(t) {
	return sigmoid(t) * (1 - sigmoid(t));
}


function decimalToBinary(dec){
    return (dec >>> 0).toString(2);
}


function displayLayerStructure(_arr, _title = "") {
	let table = document.createElement("table");

	let headTr = document.createElement("tr");
	for (let layer = 0; layer < _arr.length; layer++)
	{
		let th = document.createElement("th");
		switch (layer) 
		{
			case 0: th.innerHTML = "Input"; break;
			case _arr.length - 1: th.innerHTML = "Output"; break;
			default: th.innerHTML = "Layer " + layer; break;
		}
		headTr.append(th);
	}	
	table.append(headTr);

	

	let maxLayerLength = 0;
	for (let layer = 0; layer < _arr.length; layer++)
	{
		if (_arr[layer].length > maxLayerLength) maxLayerLength = _arr[layer].length;
	}

	for (let v = 0; v < maxLayerLength; v++)
	{
		let rowTr = document.createElement("tr");

		for (let layer = 0; layer < _arr.length; layer++)
		{
			let td = document.createElement("td");
			let value = _arr[layer][v] !== undefined ? _arr[layer][v] : 10000000;
			if (typeof value == "object") 
			{
				for (let i = 0; i < value.length; i++) value[i] = Math.round(value[i] * 100) / 100;
				value = value.join(", "); 
			} else value = Math.round(value * 100) / 100;

			td.style.color = colourToString(
				mergeColours(
					stringToColour("#00ff00"),
					stringToColour("#ff0000"),
					value
				)
			);


			if (value == 10000000) value = "";
			td.innerHTML = value;
			rowTr.append(td);
		}	

		table.append(rowTr);
	}
	document.body.innerHTML += "<strong>" + _title + "</strong>";
	document.body.append(table);
	document.body.innerHTML += "<br><br><br><br><br><br><br>";
}

























function TwoDArrTo1D(_2dArr) {
	let newArr = [];
	for (arr of _2dArr) newArr = newArr.concat(arr);
	return newArr;
}



function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}