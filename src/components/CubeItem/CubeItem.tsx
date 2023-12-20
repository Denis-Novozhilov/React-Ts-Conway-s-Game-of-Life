import { FC, useEffect, useState } from 'react';
import { IUnit } from '../../models/Unit/Unit';
import s from './CubeItem.style.module.css';
import cn from 'classnames';

interface CubeItemProps {
	size: string;
	fontSize: string;
	index?: number;
	unit: IUnit;
	gameStatus: boolean;
}

const CubeItem: FC<CubeItemProps> = ({ size, index, unit, gameStatus, fontSize }) => {
	const [LiveStatus, setLiveStatus] = useState(unit.isAlive);
	const [gameStatusState, setgameStatusState] = useState(gameStatus);

	let generationStepInterval: ReturnType<typeof setInterval>;

	const generationStep = () => {
		unit.checkSiblings();
		// console.log(unit.genLog);
		console.log(`
    Me isAlive(${unit.isAlive}) X_${unit.x}_Y_${unit.y} my_world_${unit.world} 

    generation log 
    ${unit.genLog[0]} 
    ${unit.genLog[1]} 
    ${unit.genLog[2]} 
`);
		setLiveStatus(unit.isAlive);
	};

	const toggleLiveStatus = () => {
		if (unit.isAlive) {
			unit.dye();
			setLiveStatus(unit.isAlive);
		} else {
			unit.alive();
			setLiveStatus(unit.isAlive);
		}
	};

	useEffect(() => {
		if (gameStatusState && unit.world) {
			generationStepInterval = setInterval(() => generationStep(), 500);
			// generationStepInterval = setTimeout(() => generationStep(), 500);
			// generationStepInterval = setTimeout(() => {
			// 	console.log(`Generation Step ${Date.now()}`);
			// 	generationStep();
			// }, 1000);
		}

		return () => {
			clearInterval(generationStepInterval);
		};
	}, []);

	return (
		<>
			<div
				className={cn(s.ceil__common, {
					[s.ceil__live]: unit.isAlive,
					[s.ceil__hidden]: !unit.world
				})}
				style={{ width: size, height: size, fontSize: fontSize }}
				onClick={toggleLiveStatus}
			>
				{/* {unit.x+':'+unit.y} */}
			</div>
		</>
	);
};

export default CubeItem;
