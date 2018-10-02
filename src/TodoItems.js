import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './ToDoList.css';

class ToDoItems extends Component {

	constructor(props){
		super(props);
		this.createtasks = this.createtasks.bind(this);
	}

	createtasks(item){
		return(
			
			<li key={item.key}> {item.text}
				<button type="button" className="close" onClick={() => this.delete(item.key)}>&times;</button>
			</li>
		);
	}

	delete(key){
		this.props.delete(key);
	}

	render(){
		var todoEntries = this.props.entries;
		var listItems = todoEntries.map(this.createtasks);

		return(
			<ul className='theList'>
				{listItems}
			</ul>
		);
	}

}

export default ToDoItems;