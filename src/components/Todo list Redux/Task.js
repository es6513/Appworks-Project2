import React, { Component } from "react";

class Task extends Component{


	render(){
		return(
			<div className='Task'>
				<button
					className={"tick"}
					onClick={() => this.props.handleClick(this.props.index)}
				>V</button>
				<span
					className={"taskText"}
					key={this.props.todo.key}
					style={{textDecoration: this.props.todo.done ? "line-through" : "none"}}>
					{this.props.todo.value}
				</span>
				<button onClick={() => this.props.handleDelete(this.props.todo.key)}>Delete</button>
			</div>
		);
	}
}


export default Task;