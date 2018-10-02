import React, { Component } from "react";
import ReactDOM from "react-dom";
import map from "lodash/map";
import filter from "lodash/filter";
import{ BrowserRouter, Route, Switch } from "react-router-dom";
import "./router.css";
import Game from "./Game";
import Ranking from "./Ranking";
import Error from "./Error";
import Navigation from "./Navigation";


// class App extends Component {
// 	constructor(props){
// 		super(props);
// 		this.state={inputValue:""};
// 	}
// 	render() {
// 		return (
// 			<BrowserRouter>
// 				<div className="container">
// 					<Navigation />
// 					<Switch>
// 						<Route path="/" component={Home} exact />
// 						<Route path="/ranking" component={Ranking} />
// 						<Route  component={Error} />
// 					</Switch>
// 				</div>
// 			</BrowserRouter>
// 		);
// 	}
// }


const winArray = [0,1,2,3,4,5,6,7,8];

const layout = _.range(0, 9).map(n => {
	const row = Math.floor(n / 3);
	const col = n % 3;
	return [80 * col, 80 * row];
});
class APP extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			positions: (_.range(0, 9))
			// positions: _.shuffle(_.range(0, 9))
		};
	}
	updatePosition(index) {
		
		let {positions} = this.state;
		if(positions ===winArray){
			console.log("hi");
		}
		console.log(positions);
		let emptyCell = positions.indexOf(0);
		let targetCell = positions.indexOf(index);
		const dif = Math.abs(targetCell - emptyCell);
		if (dif == 1 || dif == 3 ) {
			if((targetCell == 6 && emptyCell ==5)
			||(targetCell == 5 && emptyCell ==6)
			||(emptyCell ==2 && targetCell == 3)
			||(emptyCell ==3 && targetCell == 2)) {
				return;
			}
			else{
				positions[emptyCell] = index;
				positions[targetCell] = 0;
				this.setState({positions});
				// let win = _.every(positions, (value, index, array)=> {
				// 	value = value || 9;
				// 	return index === 0 || parseInt(array[index - 1]) <= parseInt(value);
				// });
				if (positions == winArray) {
					console.log("win");
					window.alert("U Win!!!");
				}
			}
			
		}
	}
	render() {
		return (<div className="game">
			{this.state.positions.map((i, key)=> {
				let cellClass = key ? "cell":"empty cell";
				let [x,y] = layout[this.state.positions.indexOf(key)];
				return <div  key={key}
					className={cellClass}
					onClick={this.updatePosition.bind(this, key)}
					style={{transform: `translate3d(${x}px,${y}px,0) scale(1.1)`}}>{key}</div>;
			})}
		</div>);
	}
}


window.addEventListener("load",()=> {
	ReactDOM.render(
		<APP />,  document.getElementById("main")
	);
});

export default APP;
