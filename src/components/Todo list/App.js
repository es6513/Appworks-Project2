import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./App.css";
import Form from "./Form";
import List from "./List";
import { createStore } from "redux";

class App extends Component{
	constructor(props){
		super(props);

		this.state={inputValue:"",todos:[],show:""};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.showAll = this.showAll.bind(this);
		this.showDone = this.showDone.bind(this);
		this.showUndo = this.showUndo.bind(this);
	}

	handleChange(e) {
		this.setState({inputValue:e.currentTarget.value});
	}
		
	handleSubmit(e) {
		e.preventDefault();
		const newTodo = {
			value: this.state.inputValue,
			done: false,
			key: Date.now()
		};
		const todos = this.state.todos;
		todos.push(newTodo);
		this.setState({todos,inputValue:""}); //這邊可以只用一個todos (ES6) if key and value have same name
	}

	handleClick(index){
		const todos = this.state.todos;
		todos[index].done = !todos[index].done;
		this.setState({todos});
	};

	handleDelete(key){
		const filteredTodos = this.state.todos.filter(function(todo){
			return(todo.key !== key);
		});
		this.setState({todos:filteredTodos});
	};

	showAll(e){
		this.setState({show:""});
	}
	

	showDone(e){
		// const doneList = this.state.todos.filter(function(todo){
		// 	return(todo.done !== false);
		// });
		this.setState({show:"done"});
	}

	showUndo(e){
		// const undoList = this.state.todos.filter(function(todo){
		// 	return(todo.done !== true);
		// });
		this.setState({show:"undo"});
	}

	render(){
		return  (
			<div className='App'>
				<Form 
					handleChange={this.handleChange}
					inputValue={this.state.inputValue}
					handleSubmit={this.handleSubmit}
					showAll={this.showAll}
					showDone={this.showDone}
					showUndo={this.showUndo}
				/>
				<List 
					handleDelete={this.handleDelete}
					handleClick={this.handleClick}
					todos={this.state.todos}
					show={this.state.show}
				/>
			</div>
		);
	}
}

window.addEventListener("load",()=>{
	ReactDOM.render(
		<App />,  document.getElementById("root")
	);
});


export default App;