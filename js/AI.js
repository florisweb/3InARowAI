




const Trainer = new function () {
	const This = {
		AI1: false,
		AI2: false,
		nextMove: nextMove
	}

	This.AI1 = createRandomAI();
	This.AI2 = createRandomAI();




	function nextMove() {
		let outputs = [];
		switch (Game.turn)
		{
			case 0: outputs = This.AI1.calcMove(Game.board); break;
			default: outputs = This.AI2.calcMove(Game.board); break;
		}
		console.log(outputs);
		applyOutputs(outputs);
		Drawer.drawBoard(Game.board);
	}
	
	function applyOutputs(_outputs) {
		let tagedArr = [];
		for (let i = 0; i < _outputs.length; i++)
		{
			tagedArr.push({val: _outputs[i], index: i});
		}


		tagedArr.sort(function (a, b) {
			if (a.val < b.val) return 1;
			return -1;
		});
		
		let validMove = false;
		while (!validMove)
		{
			if (tagedArr.length == 0)
			{
				console.warn("No possible moves anymore");
				break
			}

			let stoneIndex = tagedArr[0].index;
			tagedArr.splice(0, 1);
			validMove = Game.board.placeStone(stoneIndex, Game.turn);
		}
	}






	return This;



	function createRandomAI() {
		return createAI(
			[Math.random() * 5, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10]
		);
	}
	
	function createAI(_DNA) {
		let AI = new AIConstructor(_DNA);
		// This.AIs.push(AI);
		return AI;
	}


}



















function AIConstructor(_brainDNA) {
	const This = {
		DNA: _brainDNA,
		calcMove: calcMove,
	}
	This.brain = createBrain(_brainDNA)

	return This;


	function calcMove(_board) {
		let inputs = TwoDArrTo1D(_board);
		let outputs = This.brain.feedForward(inputs);
		return outputs;
	}




	function createBrain(_brainDNA) {
		const outputNeurons = 5;

		let brainStructure = [25]; 
		let layers = Math.abs(Math.round(_brainDNA[0]));

		let newBrainDNA = Object.assign([], _brainDNA);
		let curBrainIndex = layers;

		let supposedBrainDNASize = layers + 1;

		for (let l = 1; l < layers + 2; l++)
		{
			let prevLayerLength = brainStructure[l - 1];
			let curLayerLength = Math.abs(Math.round(_brainDNA[l]));
			if (curLayerLength <= 0) curLayerLength = 1; 

			if (l != layers + 1) 
			{
				brainStructure.push(curLayerLength);
			} else curLayerLength = outputNeurons;
			
			supposedBrainDNASize += curLayerLength + prevLayerLength * curLayerLength;

			for (let n = 0; n < curLayerLength; n++)
			{
				curBrainIndex++;
				if (!newBrainDNA[curBrainIndex])
				{
					newBrainDNA[curBrainIndex] = 1 - Math.random() * 2;
				}
			
				for (let w = 0; w < prevLayerLength; w++)
				{
					curBrainIndex++;
					if (newBrainDNA[curBrainIndex]) continue;
					newBrainDNA[curBrainIndex] = 1 - Math.random() * 2;
				}
			}	
		}

		brainStructure.push(outputNeurons); // outputs


		if (supposedBrainDNASize > newBrainDNA.length)
		{
			console.warn("Brain-error", This, supposedBrainDNASize, newBrainDNA.length, brainStructure);
			Main.running = false;
		}

		let brain = new NeuralNetwork(brainStructure);
		let brainData = Object.assign([], newBrainDNA).splice(layers + 1, newBrainDNA.length);
		This.DNA = newBrainDNA;
		return populateBrain(brain, brainData, brainStructure);
	}

	function populateBrain(_brain, _brainData, _brainStructure) {
		for (let l = 1; l < _brain.layers.length; l++)
		{
			let cLayer 	= _brain.layers[l];
			cLayer.b 	= _brainData.splice(0, _brainStructure[l]);

			for (let n = 0; n < cLayer.w.length; n++)
			{
				cLayer.w[n] = _brainData.splice(0, _brainStructure[l - 1]);
			}
		}

		return _brain;
	}

}

