import React, { Component } from "react";
import ReactDOM from "react-dom";
import map from "lodash/map";
import filter from "lodash/filter";
import{ BrowserRouter, Route, Switch } from "react-router-dom";
import "./router.css";
import Error from "./Error";
import Navigation from "./Navigation";

class App extends Component {
	constructor(props){
		super(props);
		this.state={
			inputValue:""		};
	}
	render() {
		return (
			<BrowserRouter>
				<div className="container">
					<Navigation />
					<Switch>
						<Route path="/" component={Game} exact />
						<Route path="/ranking" component={Ranking} exact />
						<Route  component={Error} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

class Ranking extends Component{
	constructor(props){
		super(props);
		this.state={
			rankingLists:JSON.parse(localStorage.getItem("winLists"))
		};
	}

	createRankingList(){
		if(this.state.rankingLists){
			return(	<div className="rankingContainer">
				<ul className='ranking'>
					<li>Ranking</li>
					<li>Name</li>
					<li>Steps</li>
				</ul>
				{this.state.rankingLists.map((rankingList,index)=>{
					return <ul 
						key={index}
						className={"rankingList"}>
						<li>{index+1}</li>
						<li>{rankingList.name}</li>
						<li>{rankingList.step}</li>
					</ul>;						
				})}

			</div>);
		}else{
			return(	
				<div className="rankingContainer">
					<ul className='ranking'>
						<li>Ranking</li>
						<li>Name</li>
						<li>Steps</li>
					</ul>
					<p className="noranking">no ranking data</p>
				</div>
			);
		}
	}
	
	render() {
		return(
			this.createRankingList()
		);
	}
}

const layout = _.range(0, 9).map(n => {
	const row = Math.floor(n / 3);
	const col = n % 3;
	return [80 * col, 80 * row];
});
class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// positions: _.shuffle(_.range(0, 9)),
			positions:[1,2,3,4,5,6,7,0,8],
			inpuName:"",
			clientName:"",
			stepCount:0,
			diabled:false,
			gameDisabled:false,
			winLists:JSON.parse(localStorage.getItem("winLists"))
		};
	}

	winGame(){
		let {positions} = this.state;
		for(let i=0;i<positions.length-2;i+=1){
			if(positions[i]!==i+1){
				return false;
			}
		}
		if(positions[positions.length-1]==0){
			return true;
		}
	
	}

	getName(e){
		this.setState({inpuName:e.currentTarget.value});
	}

	handleSubmit(e) {
		e.preventDefault();
		this.setState({
			clientName:this.state.inpuName,
			positions:[1,2,3,4,5,6,7,0,8],
			inpuName:"",
			stepCount:0,
			disabled:true,
			gameDisabled:false
		}); 
	}


	addNewWinner(){
		let newWinner ={
			name:this.state.clientName,
			step:this.state.stepCount+1
		};
		let winLists = this.state.winLists;
		if(!winLists){
			let winLists = [];
			winLists.push(newWinner);
			this.setState({winLists});
			localStorage.setItem("winLists", JSON.stringify(winLists));
		}else{
			for(let i=0;i<winLists.length;i+=1){
				if(newWinner.step < winLists[i].step){
					winLists.splice(i,0,newWinner);
					winLists = winLists.sort(function (a, b) {
						// return a.step > b.step ? 1 : -1; 
						//將物件從小到大排序排序
						if(a.step > b.step){
							return 1;
						}
						if(a.step < b.step){
							return -1;
						}
						if(a.step == b.step){
							return 0;
						}
					});
					this.setState({winLists});
					localStorage.setItem("winLists", JSON.stringify(winLists));
					console.log("smaller");
				}else{
					winLists.push(newWinner);
					winLists = winLists.sort(function (a, b) {
						if(a.step > b.step){
							return 1;
						}
						if(a.step < b.step){
							return -1;
						}
						if(a.step == b.step){
							return 0;
						}
					});
					this.setState({winLists});
					localStorage.setItem("winLists", JSON.stringify(winLists));
					console.log("bigger");
				}
				return;
			}
		}
	}
	updatePosition(index) {
		let clientName = this.state.clientName;
		if(clientName == ""){
			console.log("please input your name");
			console.log(this.state.winLists.length);
		}else if(this.state.gameDisabled == false){
			let {positions} = this.state;
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
					this.setState({stepCount:this.state.stepCount+1});
					positions[emptyCell] = index;
					positions[targetCell] = 0;
					this.setState({positions});
				
					let win = this.winGame();
					console.log(win);
					if (win) {
						this.addNewWinner();
						// localStorage.setItem("winList", JSON.stringify(winList));
						this.setState({disabled:false,gameDisabled:true});
						console.log("youwin");
					}
				}
			}
		}
	}
		
	render() {
		
		return (<div className="game">
			<div className="gameInfo">	

				<form onSubmit={this.handleSubmit.bind(this)}>
					<input 
						className="clientname" 
						name="clientname" 
						placeholder="Enter Name"
						onChange={this.getName.bind(this)} 
						value={this.state.inpuName}
						disabled={this.state.disabled}
					></input>
					<button className="startbtn" type="submit" disabled={this.state.disabled}>Start Game</button>
				</form>
				<p>Step Count:{this.state.stepCount}</p>	
				<span>Welcome,{this.state.clientName}</span>

			</div>
			<div className="gameContent">
				{this.state.positions.map((i, key)=> {
					let cellClass = key ? "cell":"empty cell";
					let [x,y] = layout[this.state.positions.indexOf(key)];
					return <div  key={key}
						className={cellClass}
						onClick={this.updatePosition.bind(this, key)}
						style={{transform: `translate3d(${x}px,${y}px,0) scale(1.1)`}}>{key}</div>;
				})}
			</div>
		</div>);
	}
}


window.addEventListener("load",()=> {
	ReactDOM.render(
		<App />,  document.getElementById("main")
	);
});

export default App;
