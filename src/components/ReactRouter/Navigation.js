import React from "react";
import {NavLink} from "react-router-dom";

const Navigation = ()=>{
	return(
		<div className="navigation">
			<NavLink to="/">Game</NavLink>
			<NavLink to="/ranking">Ranking</NavLink>
		</div>
	);
};

export default Navigation;