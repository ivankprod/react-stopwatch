import React, { useState, useRef } from "react"

import "./Timer.css"

const Timer = () => {
	const [count, setCount] = useState({
		seconds: 0,
		minutes: 0,
		hours: 0
	});

	const [btnsState, setBtnsState] = useState({
		btnStartDisabled: false,
		btnStopDisabled: true
	});

	const interval = useRef(0);

	const onHandleStart = () => {
		setCount(prev => {
			return {
				...prev,
				seconds: 0,
				minutes: 0,
				hours: 0
			}
		});

		setBtnsState({ btnStartDisabled: true, btnStopDisabled: false });
		
		interval.current = setInterval(() => {
			setCount(prev => {
				return {
					...prev,
					seconds: prev.seconds + 0.025,
					minutes: Math.floor(prev.seconds / 60),
					hours: Math.floor(prev.seconds / 3600)
				}
			});
		}, 25);
	};

	const onHandleStop = () => {
		setBtnsState({ btnStartDisabled: false, btnStopDisabled: true });

		clearInterval(interval.current);
	};

	return (
		<div className="timer-wrapper">
			<div className="timer-time-wrapper">
				{`${count.hours.toString().padStart(2, "0")}:`}
				{`${(count.minutes - (count.hours * 60)).toString().padStart(2, "0")}:`}
				{`${(count.seconds - (count.minutes * 60)).toFixed(3).padStart(6, "0")}`}
			</div>
			<div>
				<button onClick={onHandleStart} disabled={btnsState.btnStartDisabled}>Start</button>
				<button onClick={onHandleStop} disabled={btnsState.btnStopDisabled}>Stop</button>
			</div>
		</div>
	)
}

export default Timer
