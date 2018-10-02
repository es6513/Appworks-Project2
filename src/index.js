
import "./components/FormContainer/FormContainer";

// import TodoItems from './TodoItems';


// -------------To do list 2-----------------




// -------------End To do list 2-----------------


// ---------Redux 開關元件--------------------


// class Button extends React.Component{
// 	render(){
// 		return <div className="btn"></div>;
// 	}
// }
// // 選項開關組件，根據 state 的設定，調整畫面。點擊時可更新。
// class Switch extends React.Component{
// 	constructor(props){
// 		super(props);
// 		// 1. 初始化狀態資料，資料從 Redux 取得
// 		this.state=store.getState();
// 	}
// 	render(){
// 		// 2. 使用者可點擊畫面
// 		return <div className={'switch'+(this.state.on? ' switch-on':'')} onClick={this.update.bind(this)}>
// 			<Button/>
// 		</div>;
// 	}
// 	// 3. 派送點建立：使用者點擊，觸發狀態的變化，直接派送給 Redux 做處理
// 	update(){
// 		store.dispatch({
// 			type:'ChangeSwitch'
// 		});
// 	}
// 	// 以下程式是用來連接 React 和 Redux
// 	// 4. 回應狀態變化：Redux 處理完成，返回 React 接收最新狀態，並觸發畫面的更新
// 	refresh(){
// 		this.setState(store.getState());
// 	}
// 	// 連結點建立：註冊狀態改變的通知處理函式，回應 Redux 中的狀態變化
// 	componentDidMount(){
// 		this.unsubscribe=store.subscribe(this.refresh.bind(this));
// 	}
// 	// 連結點斷開：若使用者介面被遺棄，則取消註冊函式
// 	componentWillUnmount(){
// 		this.unsubscribe();
// 	}
// }

// // 以下是 Redux 的程式
// let store;
// let reducer=function(state, action){
// 	// 根據 action 的 type，來執行狀態更新的動作
// 	switch(action.type){
// 	case 'ChangeSwitch':
// 		return {on:!state.on};
// 	default:
// 		return state;
// 	}
// };

// // 以下是網頁的初始化程式
// window.addEventListener('load', ()=>{
// 	// 初始化 Redux 的狀態儲存空間
// 	store=createStore(reducer, {on:false});
// 	// 初始化 React 的介面繪製
// 	ReactDOM.render(<Switch/>, document.getElementById('root'));
// });




// ---------Redux 整合介面-------------------
// class MyHead extends React.Component{
// 	constructor(props){
// 		super(props);
// 	}
// 	render(){
// 		return <li>Hello World {this.props.level}</li>;
// 	}
// }
// // MyHeadList 組件，根據 state 中的資料決定要顯示多少列表項目
// class MyHeadList extends React.Component{
// 	constructor(props){
// 		super(props);
// 		// 1. 初始化狀態資料，資料從 Redux 取得
// 		this.state=store.getState();
// 	}
// 	render(){
// 		let cells=[];
// 		for(let i=0;i<this.state.max;i++){
// 			cells.push(<MyHead level={i}/>);
// 		}
// 		// 2. 使用者可點擊畫面
// 		return <ul onClick={this.update.bind(this)}>{cells}</ul>;
// 	}
// 	// 3. 派送點建立：使用者點擊，觸發狀態的變化，直接派送給 Redux 做處理
// 	update(){
// 		store.dispatch({
// 			type:'ChangeMax',
// 			max:5
// 		});
// 	}
// 	// 以下程式是用來連接 React 和 Redux
// 	// 4. 回應狀態變化：Redux 處理完成，返回 React 接收最新狀態，並觸發畫面的更新
// 	refresh(){
// 		// 串接 Redux 的狀態改變，並且觸發 React 組件的更新
// 		this.setState(store.getState());
// 	}
// 	// 連結點建立：註冊狀態改變的通知處理函式，回應 Redux 中的狀態變化
// 	componentDidMount(){
// 		this.unsubscribe=store.subscribe(this.refresh.bind(this));
// 	}
// 	// 連結點斷開：若使用者介面被遺棄，則取消註冊函式
// 	componetWillUnmount(){
// 		this.unsubscribe();
// 	}
// }

// // 以下是 Redux 程式
// let store;
// let reducer=function(state,action){
// 	switch(action.type){
// 	case 'ChangeMax':
// 		return{max:action.max};
// 	default:
// 		return state;
// 	}
// };


// // 以下是網頁的初始化程式
// window.addEventListener('load', ()=>{
// 	// 初始化 Redux 的狀態儲存空間
// 	store=createStore(reducer, {max:3});
// 	// 初始化 React 的介面繪製
// 	ReactDOM.render(<MyHeadList/>, document.getElementById('root'));
// });







//-----------------Redux------------------------
// let store;
// let reducer=function(state /*目前的狀態物件*/ ,action /*接收到的行動物件*/){
// 	// 無論狀態是否改變，都[一定要回傳]狀態物件，新的狀態物件會[完全取代]舊的狀態物件
// 	switch(action.type){
// 	case 'UPDATE_SWITCH':
// 		return {on:!state.on};
// 	default:
// 		return state;
// 	}
// };

// let handler=function(){
// 	// 一旦狀態有變化，就會被呼叫
// 	let state=store.getState();
// 	document.getElementById('root').innerHTML=state.on?'on':'off';
// };

// window.addEventListener('load',()=>{
// 	// 建立狀態儲存空間，必須準備好狀態處理函式 (Reducer),以及初始的狀態物件
// 	store=createStore(reducer, {on:false});
// 	// 註冊回應狀態改變的函式
// 	let unsubsribe=store.subscribe(handler);
// 	unsubsribe(); //取消對應的，已註冊的狀態改變函式
// 	document.addEventListener('click',()=>{
// 		// 建立行動物件，並且透過 dispatch 派送給狀態處理函式 (Reducer), 改變狀態
// 		// 行動物件:唯一的要求, 一定要提供 type 屬性, 代表行動是什麼
// 		store.dispatch({
// 			type:'UPDATE_SWITCH'
// 		});	
// 	});
// });


//---------------- End Redux--------------------

// class MyHead extends React.Component{
// 	render(){
// 		// console.log(this.props.level);
// 		return React.createElement('h'+this.props.level, null, 'Hello Component');
// 	}
// }
// class MyHeadList extends React.Component{
// 	constructor(props){
// 		super(props);
// 		this.state={maxLevel:props.start};
// 		// window.setTimeout(()=>{
// 		// 	// this.setState({maxLevel:6});
// 		// 	this.setState((currentState, currentProps) => (
// 		// 		{maxLevel:currentState.maxLevel+1}
// 		// 	));
// 		// },2000);
// 	}
// 	UNSAFE_componentWillMount(){
// 		this.intervalID = window.setInterval(()=>{
// 			this.setState((currentState, currentProps)=>{
// 				if(currentState.maxLevel>currentProps.end){
// 					return currentState;
// 				}else{
// 					return {maxLevel:currentState.maxLevel+1};
// 				}
// 			}); //不 return 會怎樣, 箭頭函式{} () 的差別
// 		},1000);
// 	}
// 	componentWillUnmount(){
// 		window.clearInterval(this.intervalID);
// 	}
// 	render(){
// 		let heads = [];
// 		let head;
// 		for (let i = 1; i < this.state.maxLevel; i++) {
// 			head = React.createElement(MyHead, {level:i});
// 			heads.push(head);
// 		}
// 		return React.createElement('div', null, heads);
// 	}
// }

// window.addEventListener('load',()=>{
// 	let myComponent = React.createElement(MyHeadList, {start:1, end:3});
// 	ReactDOM.render(
// 		myComponent,  document.getElementById('root')
// 	);
// });

//-------------JSX------------------

// class MyHead extends React.Component{
// 	render(){
// 		return <div className='head' style={{color:this.props.color}}>Hello World {this.props.level}</div>;
// 	}
// }

// class MyHeadList extends React.Component{
// 	render(){
// 		return <div>
// 			<MyHead level="1" color='red'/>
// 			<MyHead level="2" color='green'/>
// 			<MyHead level="3" color='blue'/>
// 		</div>;
// 	}
// }

// window.addEventListener('load',()=>{
// 	let myElement = <MyHead level="2"/>;
// 	let myList = <MyHeadList />;
// 	ReactDOM.render(
// 		myList, document.getElementById('root')
// 	);
// });


// ----------事件處理------------------


// class MyHead extends React.Component{
// 	constructor(props){
// 		super(props);
// 		this.state={color:'red'};
// 	}
// 	render(){
// 		return <div onClick={this.clickHandler.bind(this)}
// 			onMouseOver={this.mouseOverHandler.bind(this)}
// 			onMouseOut={this.mouseOutHandler.bind(this)}
// 			style={{color:this.state.color}} 
// 			className={'head-'+this.props.level}>Hello Componen</div>;
// 		// React.createElement('h'+this.props.level, {
// 		// 	onClick: this.clickHandler
// 		// },'Hello Component');
// 	}
// 	mouseOutHandler(e){
// 		this.setState({color:'red'});
// 	}
// 	mouseOverHandler(e){
// 		this.setState({color:'pink'});
// 	}
// 	clickHandler(e){
// 		console.log('touch');
// 		this.setState({color:'green'});
// 	}
// }

// window.addEventListener('load',()=>{
// 	let myElement = <MyHead level="2"/>;
// 	ReactDOM.render(
// 		myElement, document.getElementById('root')
// 	);
// });


// ------------表單處理------------

// class MyForm extends React.Component{
// 	constructor(props){
// 		super(props);
// 		this.state={name:'',gender:'male',story:''};
// 	}
// 	render(){
// 		return <form onSubmit={this.handleSubmit.bind(this)}>
// 			Name<input type='text' value={this.state.name} 
// 				onChange={this.handleNameChange.bind(this)}	/>
// 			<br />
// 			Gender <select value={this.state.gender} 
// 				onChange={this.handleGenderChange.bind(this)}>
// 				<option value='male'>男</option>
//  				<option value='female'>女</option>
// 			</select>
// 			<br/>
// 			Story <textarea value={this.state.story} 
// 				onChange={this.handleStoryChange.bind(this)}
// 			/>
// 			<br/>
// 			<input type='submit' value='Submit' />
// 		</form>;
// 	}
// 	handleStoryChange(e){
// 		this.setState({story:e.currentTarget.value});
// 	}
// 	handleGenderChange(e){
// 		this.setState({gender:e.currentTarget.value});
// 	}

// 	handleNameChange(e){
// 		this.setState({name:e.currentTarget.value});
// 	}
// 	handleSubmit(e){
// 		e.preventDefault();
// 		console.log('form submitted');
// 		console.log(this.state.name);
// 		console.log(this.state.gender);
// 		console.log(this.state.story);
// 	}
// }
// window.addEventListener('load',()=>{
// 	let myForm = <MyForm />;
// 	ReactDOM.render(
// 		myForm, document.getElementById('root')
// 	);
// });

// ----下拉式選單-----


// class MySelectForm extends React.Component{
// 	constructor(props){
// 		super(props);
// 		this.state={selected:'male'};
// 	}
// 	render(){
// 		return <form onSubmit={this.handleSubmit.bind(this)}>
// 			<select value={this.state.selected}
// 				onChange={this.handleSelectChange.bind(this)}>
// 				<option value='male'>男</option>
// 				<option value='female'>女</option>
// 			</select>
// 			<input type='submit' value='Submit' />
// 		</form>;
// 	}
// 	handleSelectChange(e){
// 		this.setState({selected:e.currentTarget.value});
// 	}
// 	handleSubmit(e){
// 		e.preventDefault();
// 		console.log('form submitted');
// 	}
// }

// window.addEventListener('load',()=>{
// 	let myForm = <MyForm />;
// 	ReactDOM.render(
// 		myForm, document.getElementById('root')
// 	);
// });



// ----------開關元件-----------
// class Switch extends React.Component{
// 	constructor(props){
// 		super(props);
// 		this.state={on:false};
// 	}

// 	render(){
// 		let className='switch';
// 		if(this.state.on){
// 			className+=' switch-on';
// 		}
// 		return <div onClick={this.update.bind(this)} 
// 			className={className}>
// 			<div className='btn'></div>
// 		</div>;
// 	}
// 	update(){
// 		this.setState((currentState)=>({on:!currentState.on}));
// 	}
// };


// window.addEventListener('load', ()=>{
// 	let mySwitch = <Switch />;
// 	ReactDOM.render(mySwitch, document.getElementById('root'));
// });

// -------------To do list-----------------

// class MyToDoList extends React.Component{
// 	constructor(props){
// 		super(props);

// 		this.state={
// 			items:[]
// 		};
// 		this.addItem = this.addItem.bind(this);
// 		this.deleteItem = this.deleteItem.bind(this);
// 	}

// 	render(){
// 		return(
// 			<div className='todoListMain'>
// 				<div className='header'>
// 					<form onSubmit={this.addItem.bind(this)}>
// 						<input
// 							ref={(a) => this._inputElement = a}
// 							placeholder='add some tasks' />
// 						<button type='submit'>add</button>
// 					</form>
// 				</div>
// 				<TodoItems 
// 					delete={this.deleteItem}
// 					entries={this.state.items} />
// 			</div>
// 		);
// 	}

// 	handleStoryChange(e){
// 		this.setState({story:e.currentTarget.value});
// 	}

// 	handleNameChange(e){
// 		this.setState({name:e.currentTarget.value});
// 	}

// 	addItem(e){
// 		e.preventDefault();
// 		if(this._inputElement.value !==''){
// 			var newItem = {
// 				text: this._inputElement.value,
// 				key: Date.now()
// 			};
// 			this.setState((prevState) => {
// 				return {
// 					items: prevState.items.concat(newItem)
// 				};
// 			});
// 		}
// 		this._inputElement.value = ''; //使用react 的話不太會直接操作 dom 

// 		console.log(this.state.items);
// 	}

// 	deleteItem(key){
// 		var filteredItems = this.state.items.filter(function(item){
// 			return(item.key !== key);
// 		});
// 		this.setState({
// 			items: filteredItems
// 		});
// 	}
// }

// window.addEventListener('load',()=>{
// 	let mytodo = <MyToDoList />;
// 	ReactDOM.render(
// 		mytodo, document.getElementById('root')
// 	);
// });


// export default MyToDoList;




// class App extends Component {
// 	constructor () {
// 		super();
// 	}

// 	render () {
// 		return (
// 			<div>Hello World</div>
// 		);
// 	}
// }



// ReactDOM.render(<App />, document.getElementById('root'));