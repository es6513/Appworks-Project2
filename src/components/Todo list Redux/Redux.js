import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./App.css";
import Form from "./Form";
import List from "./List";
import { createStore } from "redux";
import{ BrowserRouter, Route, Switch } from "react-router-dom";

console.log(BrowserRouter);

class App extends Component{
	constructor(props){
		super(props);
		this.state=store.getState();
	}

	handleChange(e){
		store.dispatch({
			type:"CatchTextValue",
			value:e.currentTarget.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		store.dispatch({
			type:"AddTask"
		});
	}

	handleClick(index){
		console.log(index);
		store.dispatch({
			type:"CheckDone",
			index
		});
	};

	handleDelete(key){
		store.dispatch({
			type:"DeleteTask",
			key
		});
	}

	showAll(e){
		store.dispatch({
			type:"ShowAll"
		});
	}

	showDone(e){
		store.dispatch({
			type:"ShowDone"
		});
	}

	showUndo(e){
		store.dispatch({
			type:"ShowUndo"
		});
	}
		
		
	refresh(){
		this.setState(store.getState());
	}

	componentDidMount(){
		this.unsubscribe=store.subscribe(this.refresh.bind(this));
	}

	componentWillUnmount(){
		this.unsubscribe();
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

let store;
let reducer=function(state, action){
	// 根據 action 的 type，來執行狀態更新的動作
	switch(action.type){
	case "CatchTextValue":
		return Object.assign({},state,{
			inputValue:action.value
		});
	
	case "AddTask":
		const newTodo = {
			value: state.inputValue,
			done: false,
			key: Date.now()
		};
		let todos = state.todos;
		todos.push(newTodo);
		return Object.assign({},state,{
			todos,inputValue:""
		});
	
	case "CheckDone":
		todos = state.todos;
		todos[action.index].done = !todos[action.index].done;
		return Object.assign({},state,{
			todos
		});

	case "DeleteTask":
		let filteredTodos = state.todos.filter(function(todo){
			return(todo.key !== action.key);  // 前後key 不同，前面的是fiter過程中的key`,後面action 的key
		});
		return Object.assign({},state,{
			todos:filteredTodos
		});

	case "ShowAll":
		return Object.assign({},state,{
			show:""
		});

	case "ShowDone":
		return Object.assign({},state,{
			show:"done"
		});

	case "ShowUndo":
		return Object.assign({},state,{
			show:"undo"
		});

	default:
		return state;
	}
};

window.addEventListener("load",()=>{
	store = createStore(reducer, {inputValue:"",todos:[],show:""});
	ReactDOM.render(
		<App />,  document.getElementById("root")
	);
});

export default App;