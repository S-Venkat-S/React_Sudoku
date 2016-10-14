const gridArr = [
	[1,2,3,10,11,12,19,20,21],
	[4,5,6,13,14,15,22,23,24],
	[7,8,9,16,17,18,25,26,27],
	[28,29,30,37,38,39,46,47,48],
	[31,32,33,40,41,42,49,50,51],
	[34,35,36,43,44,45,52,53,54],
	[55,56,57,64,65,66,73,74,75],
	[58,59,60,67,68,69,76,77,78],
	[61,62,63,70,71,72,79,80,81]
]

const question = {
};

const setQuestion = function () {
	var quesStr = "000000000"+
				 "000529800"+
				 "920600010"+
				 "500000300"+
				 "000943000"+
				 "001000006"+
				 "010006098"+
				 "006437000"+
				 "000000000";
	for (var i=0;i<quesStr.length;i++) {
		if (quesStr[i] != "0") {
			question[i+1] = quesStr[i];
		}
	}
}

setQuestion();

const isValid = function(fullState,state) {
	if (checkRow(fullState,state) && checkColumn(fullState,state) && checkGrid(fullState,state)) {
		return true;
	}
	return false;
}

// conside if the id is 49
// This function will check the sudoku row eg : 46,47,48.49,50,51,52,53,54
const checkRow = function(fullState,state) {
	var id = state.id;
	var value = state.value;
	// Checking the row from the reverse order 48,47,46
	var curId = id-1;
	while(curId%9 != 0) {
		if (fullState[curId].value == value) {
			return false;
		}
		curId--; // There is some logic behind to decrement after the condition.
	}
	// Checking the row from the forward order 50,51,52,53,54
	var curId = id;
	while(curId%9 != 0) {
		curId++; // There is some logic behind to increment before the condition.
		if (fullState[curId].value == value) {
			return false;
		}
	}
	return true;
}

// conside if the id is 49
// This function will check the sudoku row eg : 46,47,48.49,50,51,52,53,54
const checkColumn = function (fullState,state) {
	var id = state.id;
	var value = state.value;
	// Checking the column from the reverse order 40,31,22,13
	var curId = id-9;
	while (curId > 1) {
		if (fullState[curId].value == value) {
			return false;
		}
		curId = curId-9;
	}
	// Checking the column from the forward order 58,67,76
	var curId = id+9;
	while (curId < 81) {
		if (fullState[curId].value == value) {
			return false;
		}
		curId = curId+9;
	}
	return true;
}

const checkGrid = function (fullState,state) {
	var id = state.id;
	var value = state.value;
	var curGrid = null;
	for (var i=0;i<gridArr.length;i++) {
		if (gridArr[i].indexOf(id) != -1) {
			curGrid = gridArr[i];
			break;
		}
	}
	for (var i=0;i<curGrid.length;i++) {
		var curId = curGrid[i];
		if (id != curId && fullState[curId].value == value) {
			return false;
		}
	}
	return true;
}

const clearAllValue = function (fullState) {
	for (var i=1;i<82;i++) {
		if (!fullState[i].isDefault) {
			fullState[i].value = "";
			fullState[i].isValid = false;
		}
	}
	return fullState;
}

const getIncrement = function (fullState,id) {
	if (fullState[id] == undefined) {
		return 100;
	}
	else if (fullState[id].isDefault) {
		return getIncrement(fullState,id+1);
	}
	return id;
}

const getDecrement = function (fullState,id) {
	if (fullState[id] == undefined) {
		return -1;
	}
	else if (fullState[id].isDefault) {
		return getDecrement(fullState,id-1);
	}
	return id;
}

var maxId = 0;

const solveSudoku = function (fullState,id) {
	if (id > 81) {
		return fullState;
	}
	else if (id == -1) {
		throw new Error("Invalid Question");
	}
	var defaultValue = fullState[id].value == "" ? 1 : parseInt(fullState[id].value)+1;
	for (var i=defaultValue;i<10;i++) {
		var state = {};
		state.id = id;
		state.value = i;		
		if (isValid(fullState,state)) {
			fullState[id].value = i.toString();
			fullState[id].isValid = true;
			if (id > maxId) {
				maxId = id;
				console.log(id,i,"SET");
			}
			return solveSudoku(fullState,getIncrement(fullState,id+1));
		}
	}
	fullState[id].value = "";
	fullState[id].isValid = false;	
	return solveSudoku(fullState,getDecrement(fullState,id-1));
}

const solve = function (fullState) {
	fullState = clearAllValue(fullState);
	return solveSudoku(fullState,getIncrement(fullState,1));
}

module.exports = {
	isValid,
	question,
	solve
}