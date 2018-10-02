function loadJson(name) {
	return fetch(`/marioJSON/${name}.json`)
		.then(r =>r.json())
		.then((screen)=>{	
			return screen;
		});
}

export{loadJson}; 