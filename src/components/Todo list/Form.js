import React, { Component } from "react";

class Form extends Component{

	render(){
		return(
			<div className='Form'>
				<ul className='catagory'>
					<li
						onClick={this.props.showAll}
					>All</li>
					<li
						onClick={this.props.showUndo}
					>Undo</li>
					<li
						onClick={this.props.showDone}
					>Completed</li>
					
				</ul>
				<form onSubmit={this.props.handleSubmit}>
					<input
						placeholder='Add New Item'
						onChange={this.props.handleChange} 
						value={this.props.inputValue}/>
					<button type='submit'>Add</button>
				</form>
			</div>
		);
	}
}

export default Form;