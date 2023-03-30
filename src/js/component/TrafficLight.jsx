import React, {useState, useEffect} from "react";

const myConstantColors = ["green", "yellow", "red"];

const TrafficLight = () => {

	const [ color, setColor] = useState("red");
	
	const [greenLight, setGreenLight] = useState(false);
	const [yellowLight, setYellowLight] = useState(false);
	const [redLight, setRedLight] = useState(false);
	const [purpleLight, setPurpleLight] = useState(false);
	
	const [showPurpleLight, setShowPurpleLight] = useState(false);
	const [lightCyclerActive, setLightCyclerActive] = useState(false);
	const [colorPosition, setColorPosition ] =useState(0);

	const [colors, setColors] = useState(myConstantColors) 
	console.log(colors);

	const purpleShowHandler = ()=>{
		setShowPurpleLight(prev=>{
			if (!prev) {
				const myModifiedColors = [...myConstantColors, "purple"];
				setColors(myModifiedColors);
				return true;
			}
			if (prev) {
				setColors(myConstantColors);
				return false;
			}	
		});
	}
	const lightCycler = ()=>{
		setLightCyclerActive(prev=>!prev);
	}
	
	// Logic
	const myLogicSwitch = (receivedColor)=>{
		switch (receivedColor) {
			case "red":
				setRedLight(true);
				setYellowLight(false);
				setGreenLight(false);
				setPurpleLight(false);
			break;
			case "yellow":
				setRedLight(false);
				setYellowLight(true);
				setGreenLight(false);
				setPurpleLight(false);
			break;
			case "green":
				setRedLight(false);
				setYellowLight(false);
				setGreenLight(true);
				setPurpleLight(false);
			break;
			case "purple":
				setRedLight(false);
				setYellowLight(false);
				setGreenLight(false);
				setPurpleLight(true);
			break;
		}
	}
	const handleClickOnLight = (evt)=>{
		const myTarget = evt.target.id;
		// console.log(evt);
		// console.log(evt.target.id);
		myLogicSwitch(myTarget);
	}

	useEffect(()=>{
		
		const myTimer = setInterval(() => {
			
			clearInterval(myTimer);
			if (lightCyclerActive) setColorPosition(prev=>{
				if (prev == 0) {
					myLogicSwitch(colors[1]);
					return 1;
				}
				if (prev == 1) {
					myLogicSwitch(colors[2]);
					return 2;
				}
				if (prev == 2 && showPurpleLight) {
					myLogicSwitch(colors[3]);
					return 3;
				}
				if (prev == 2 && !showPurpleLight || prev == 3) {
					myLogicSwitch(colors[0]);
					return 0;
				}
			})
		  }, "1000");

	},[colorPosition, lightCyclerActive])

	// Rendering

	const redClass = redLight ? "red light selected" : "red light";
	const yellowClass = yellowLight ? "yellow light selected" : "yellow light";
	const greenClass = greenLight ? "green light selected" : "green light";
	const purpleClass = purpleLight ? "purple light selected" : "purple light";

	const purpleLightRender = <div id="purple" className={purpleClass} onClick={handleClickOnLight}></div>;

	return (
		<div className="container">
			<div className="trafficTop"></div>
			<div className="trafficLight">
				<div id="red" className={redClass} onClick={handleClickOnLight}></div>
				<div id="yellow" className={yellowClass} onClick={handleClickOnLight}></div>
				<div id="green" className={greenClass} onClick={handleClickOnLight}></div>
				{showPurpleLight && purpleLightRender}
			</div>
			<div className="">
				<button type="button" className="btn btn-success" onClick={lightCycler}>Cycle</button>
				<button type="button" className="btn btn-info" onClick={purpleShowHandler}>Surprise!!!</button>
			</div>
		</div>
	);
};

export default TrafficLight ;
