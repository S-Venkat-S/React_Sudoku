import React from "react";
import style from "./Grid.css"

export default React.createClass({

	getInitialState: function (props) {
		return {
			id:this.props.id,
			value:this.props.value,
			isValid:this.props.isValid,
			isDefault:this.props.isDefault
		}
	},

	validateInput: function (event) {
		var value = event.target.value;
		if (value == "" && (!this.state.isDefault)) {
			this.props.updateValue(Object.assign({},this.state,{value:value.toString()}));
			return true;
		}
		if (value.length > 1) {
			value = value.replace(this.state.value,"");
		}
		value = parseInt(value);
		if (value > 0 && value < 10 && (!this.state.isDefault)) {
			this.props.updateValue(Object.assign({},this.state,{value:value.toString()}));
			return true;
		}
		return false;
	},

	componentWillReceiveProps: function (props) {
		this.setState(props);
	},

	render : function() {
		var gridStyle = this.state.isValid ? (this.state.isDefault ? "default" : "right") : "wrong";		
    		return (
    			<input type="text" onInput={this.validateInput} className={style[gridStyle]} value={this.state.value} />
    		);
  	},
});
