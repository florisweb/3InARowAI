



const Neural = new function() {


	let This = {

	}

	return This;



}

/*
STRUCTURE:
[
	layer 1 length,
	layer 2 length
]
*/

function _Neural_network(_structure) {
	let This = {
		layers: [],

	}

	createLayersByStructure(_structure);

	return This;



	function createLayersByStructure(_structure) {
		for (let l = 0; l < _structure.length; l++)
		{
			let cLayerLength = _structure[l];

			let cLayer 	= {};
			cLayer.a 	= createRandomArray(cLayerLength);

			if (l == 0)
			{
				This.layers[l] = cLayer;
				continue;
			}
			let prevLayerLength = _structure[l - 1];

			cLayer.b 	= createRandomArray(cLayerLength);
			cLayer.w 	= [];

			for (let n = 0; n < cLayerLength; n++)
			{
				cLayer.w[n] = createRandomArray(prevLayerLength);
			}

			This.layers[l] = cLayer;
		}
	}
	

	function createRandomArray(_arrLength) {
		let arr = [];
		for (let i = 0; i < _arrLength; i++) arr.push(1 - Math.random() * 2);
		return arr;
	}
}




let layers = [
	{//input layer
		a: [0, 0],
	},
	{
		a: [0, 0, 0],
		b: [1 - Math.random() * 2, 1 - Math.random() * 2, 1 - Math.random() * 2],
		w: [
			[1 - Math.random() * 2, 1 - Math.random() * 2],
			[1 - Math.random() * 2, 1 - Math.random() * 2],
			[1 - Math.random() * 2, 1 - Math.random() * 2]
		]
	},
	{
		a: [0],
		b: [1 - Math.random() * 2],
		w: [
			[1 - Math.random() * 2, 1 - Math.random() * 2, 1 - Math.random() * 2],
		]
	}
]









function feedForward(_input) {
	layers[0].a = copyArr(_input).splice(0, layers[0].a.length);
	for (let l = 1; l < layers.length; l++)	layers[l].a = calcActivationsByLayer(l);	
	return layers[layers.length - 1].a;

	function calcActivationsByLayer(L) {
		let activations = [];
		for (let neuron = 0; neuron < layers[L].a.length; neuron++)
		{
			let sum = layers[L].b[neuron];
			for (let w = 0; w < layers[L - 1].a.length; w++)
			{
				sum += layers[L - 1].a[w] * layers[L].w[neuron][w];
			}

			activations[neuron] = sigmoid(sum);
		}

		return activations;
	}
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




























