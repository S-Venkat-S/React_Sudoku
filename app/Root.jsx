import React from "react";
import style from "./Root.css";
import Grid from "./Grid.jsx";
import Util from "./Util.js";

export default React.createClass({

	getQuestion: function (inp) {
		var output = {};
		output.id = inp;
		output.isValid = true;
		output.isDefault = false;
		output.value = "";
		if (Util.question[inp] != undefined) {
			output.value = Util.question[inp];
			output.isDefault = true;
		}
		return output;
	},

	getInitialState: function () {
		var initialState = {state:{}};
		for (var i=1;i<82;i++) {
			initialState.state[i] = this.getQuestion(i);
		}
		return initialState;
	},

	updateValue: function (valueState) {
		var state = this.state.state;
		var id = valueState.id;
		state[id] = valueState;
		if (valueState.value != "" && Util.isValid(this.state.state,valueState)) {
			state[id].isValid = true;
		}
		else {
			state[id].isValid = false;	
		}
		this.setState({state:state});
	},

	solve: function () {
		var state = Util.solve(this.state.state);
		this.setState({state:state});
	},

	setQuestionMode: function () {
		var state = this.state;
		Object.keys(this.state.state).map(function (i) {
			state.state[i].isDefault = false;
			state.state[i].value = "";
			state.state[i].isValid = false;
		})
		state.isQuestion = true;
		this.setState(state);
	},

	setQuestion: function () {
		var state = this.state;
		for (var i=1;i<82;i++) {
			if (state.state[i].value != "" && state.state[i].isValid == true) {
				state.state[i].isDefault = true;
				state.state[i].isValid = true;
			}
		}
		state.isQuestion = false;
		this.setState(state);	
	},

	render : function() {
    		return (
    			<div>
    				{!this.state.isQuestion ? <input type="button" value="Solve Me..." onClick={this.solve} /> : null}
    				<input type="button" value="Set Question" onClick={this.setQuestionMode} />
    				{this.state.isQuestion ? <input type="button" onClick={this.setQuestion} value="Done" /> : null}
    				<hr />
    				<div></div>
	    			<div className={style.container} >
	    				{Object.keys(this.state.state).map(function (i,j) {
	    					return <Grid isQuestion={this.state.isQuestion} updateValue={this.updateValue} {...this.state.state[i]} />
	    				}.bind(this))}
	      		</div>
	      	</div>
    		);
  	},
});
