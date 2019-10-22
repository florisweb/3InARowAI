






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




















function mergeColours(_colourA, _colourB, _colourAPerc = 0.5) {
  colorBPerc = 1 - _colourAPerc;
  if (Object.keys(_colourA).length < 3 && Object.keys(_colourB).length < 3) return {r: 255, g: 255, b: 255};
  if (Object.keys(_colourA).length < 3) return _colourB;
  if (Object.keys(_colourB).length < 3) return _colourA;
  
  let obj = {
    r: _colourA.r * _colourAPerc + _colourB.r * colorBPerc,
    g: _colourA.g * _colourAPerc + _colourB.g * colorBPerc,
    b: _colourA.b * _colourAPerc + _colourB.b * colorBPerc
  }
  if (_colourA.a && _colourB.a) obj.a = _colourA.a * _colourAPerc + _colourB.a * colorBPerc;
  return obj;
}

function colourToString(_colour) {
  if (!_colour || typeof _colour.r !== "number" || typeof _colour.g !== "number" || typeof _colour.b !== "number") return false;
  let color = "rgb(" + parseInt(_colour.r) + ", " + parseInt(_colour.g) + ", " + parseInt(_colour.b) + ")";
  if (_colour.a) color = "rgba(" + parseInt(_colour.r) + ", " + parseInt(_colour.g) + ", " + parseInt(_colour.b) + ", " + _colour.a + ")";
  return color;
}

function stringToColour(_str) {
  if (!_str || typeof _str !== "string") return false;
  if (_str.substr(0, 1) == "#") return hexToRgb(_str)
 
  let prefix = _str.split("rgba(");
  if (prefix.length < 2) prefix = _str.split("rgb(");
  let colors = prefix[1].substr(0, prefix[1].length - 1).split(",");

  return {
    r: parseFloat(colors[0]),
    g: parseFloat(colors[1]),
    b: parseFloat(colors[2]),
    a: colors[3] ? parseFloat(colors[3]) : 1
  }
}

	function rgbToHex(_colour) {
	    return "#" + componentToHex(_colour.r) + componentToHex(_colour.g) + componentToHex(_colour.b);

		function componentToHex(c) {
		    var hex = c.toString(16);
		    return hex.length == 1 ? "0" + hex : hex;
		}
	}

	function hexToRgb(_hex) {
	    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(_hex);
	    return result ? {
	        r: parseInt(result[1], 16),
	        g: parseInt(result[2], 16),
	        b: parseInt(result[3], 16)
	    } : null;
	}





function TwoDArrTo1D(_2dArr) {
	let newArr = [];
	for (arr of _2dArr) newArr = newArr.concat(arr);
	return newArr;
}



