import React, { Component } from "react";
import Task from "./Task";

class List extends Component{
	constructor(props){
		super(props);
	}
	
	render(){
		let showState = this.props.show;
		console.log(showState);
		// {newList}
		// newList=[];
		// newList.push(<Task />);
		// if(showState == 'done'){
		// 	filteredList = this.props.todos.filter(function(todo,index){
		// 		return(todo.done == true);
		// 	});
		// }else if(showState =='undo'){
		// 	filteredList =  this.props.todos.filter(function(todo,index){
		// 		return(todo.done !== true);
		// 	});
		// }else if(showState == ''){
		// 	filteredList = this.props.todos;
		// }

		return(
			<div className='List'>
				
				{this.props.todos.map((todo,index) =>{
					if(showState=="done" && todo.done==true){
						return(
							<Task 
								key={todo.key}
								index={index}
								handleDelete={this.props.handleDelete}
								handleClick={this.props.handleClick}
								todo={todo}	
							/>
						);
					}else if(showState=="undo" && todo.done==false){
						return(
							<Task 
								key={todo.key}
								index={index}
								handleDelete={this.props.handleDelete}
								handleClick={this.props.handleClick}
								todo={todo}	
							/>
						);
					}else if(showState==""){
						return(
							<Task 
								key={todo.key}
								index={index}
								handleDelete={this.props.handleDelete}
								handleClick={this.props.handleClick}
								todo={todo}	
							/>
						);
					}
					
				})}
			</div>
		);
	}
}

export default List;