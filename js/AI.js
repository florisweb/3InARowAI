




const Trainer = new function () {
	const This = {
		nextMove: nextMove,
		compareAIs: compareAIs,
		createRandomAI: createRandomAI,
		createRandomAIs: createRandomAIs,
		compareAIList: compareAIList,
	}

	
	function createRandomAIs(_amount = 100) {
		let AIs = [];
		for (let i = 0; i < _amount; i++) AIs.push(createRandomAI());
		return AIs;
	}


	
	function compareAIList(_list) {
		let list = shuffle(_list);
		let newList = [];
		for (let i = 0; i < list.length; i += 2)
		{
			if (!list[i + 1]) continue;
			let winner = compareAIs(list[i], list[i + 1]);
			newList.push(winner);
			newList.push(winner.reproduce());
		}
		return newList;
	}




	

	let AI1;
	let AI2;

	let comparing = false;
	function compareAIs(_AI1, _AI2) {
		Game.reset();
		comparing = true;
		AI1 = _AI1;
		AI2 = _AI2;


		recurse();
		function recurse() {
			nextMove();
			if (comparing) recurse();
		}

		let score = Game.board.calcScore();
		if (score.scoreA > score.scoreB) return _AI1;
		return _AI2;
	}




	function nextMove() {
		let gameEnded = false;
		switch (Game.turn)
		{
			case 0: gameEnded = AI1.move(Game.board); break;
			default: gameEnded = AI2.move(Game.board); break;
		}

		if (Game.turn == 0) Game.turn = 1; else Game.turn = 0;
		if (gameEnded) comparing = false;
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
		move: move,
		reproduce: reproduce,
	}
	
	This.brain = createBrain(_brainDNA)
	return This;


	function reproduce() {
		const mutationRate = .1;
		const mutationChance = .1;
		let newDNA = Object.assign([], This.DNA);

		for (let i = 0; i < newDNA.length; i++) 
		{
			if (Math.random() > mutationChance) continue;
			newDNA[i] += mutationRate - 2 * mutationRate * Math.random();
		}

		return new AIConstructor(newDNA);
	}


	function move(_board) {
		let inputs = TwoDArrTo1D(_board);
		let outputs = This.brain.feedForward(inputs);	
		
		let ended = applyOutputs(outputs);
		Drawer.drawBoard(Game.board);
		return ended;
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
			if (tagedArr.length == 0) return true;
		
			let stoneIndex = tagedArr[0].index;
			tagedArr.splice(0, 1);
			validMove = Game.board.placeStone(stoneIndex, Game.turn);
		}
		return false;
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

