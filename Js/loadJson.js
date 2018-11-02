function loadJson(name) {
	return fetch(`../marioJSON/${name}.json`)
		.then(r =>r.json())
		.then((objectJson)=>{	
			return objectJson;
		});
}

export{loadJson}; 