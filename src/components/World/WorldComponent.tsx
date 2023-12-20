import { FC, useEffect, useState, useRef } from 'react';
import s from './World.style.module.css';
import cn from 'classnames';
import CubeItem from '../CubeItem/CubeItem';
import { v4 as uuidv4 } from 'uuid';
import { IWorld } from '../../models/World/World';
import { Command, IUnit } from '../../models/Unit/Unit';

interface WorldProps {
	world: IWorld;
	size: number;
}

const WorldComponent: FC<WorldProps> = ({ world, size }) => {
	const cubeItemSize = size / (world.gridRange + 2) + 'px';
	const cubeFontSize = size / (world.gridRange + 50) + 'px';

	const [gameStatusState, setgameStatusState] = useState(false);
	const [items, setItems] = useState(world.cells);
	const [rCount, setRCount] = useState(0);

	// let generationStepInterval: ReturnType<typeof setInterval> | ReturnType<typeof useRef<T>()> = useRef();
	let generationStepInterval = useRef<ReturnType<typeof setInterval>>();

	const clearWorld = () => {
		// world.cells.map((row: IUnit[]) => {
		items.map((row: IUnit[]) => {
			row.map((unitItem) => {
				unitItem.dye();
			});
		});
		setRCount((p) => p + 1);
	};

	const checkWorldSiblings = (worldLog: number[][]) => {
		console.log(`worldLog.length : ${worldLog.length}`);

		const blokedX = [0, worldLog.length - 1];
		const blokedY = [0, worldLog.length - 1];

		console.log({ blokedX });
		console.log({ blokedY });

		// const res = [];

		const res = worldLog.map((row, y) => {
			return row.map((item, x) => {
				// периметр заполняется нулями, как и был
				if (blokedY.includes(y) || blokedX.includes(x)) {
					return 0;
				}

				// в переменную заносим самого юнита
				//const unit = worldLog[y][x]; // это и есть item

				// формируем массив соседей
				// перерасчитываем внутренние unit-ы по часовой стрелке
				//добавляем просто верхний worldLog[y-1][x]
				//добавляем справа верхний worldLog[y-1][x+1]
				//добавляем справа просто  worldLog[y][x+1]
				//добавляем справа нижний  worldLog[y+1][x+1]
				//добавляем просто нижний  worldLog[y+1][x]
				//добавляем слева нижний   worldLog[y+1][x-1]
				//добавляем слева просто   worldLog[y][x-1]
				//добавляем слева верхний  worldLog[y-1][x-1]
				const siblings = [
					worldLog[y - 1][x],
					worldLog[y - 1][x + 1],
					worldLog[y][x + 1],
					worldLog[y + 1][x + 1],
					worldLog[y + 1][x],
					worldLog[y + 1][x - 1],
					worldLog[y][x - 1],
					worldLog[y - 1][x - 1]
				];

				console.log(`For х ${x}  y ${y}`);
				console.log({ item });
				console.log({ siblings });

				const liveSiblings = siblings.filter((el) => el === 1).length;

				console.log({ liveSiblings });

				//теперь считаем логику выживания
				//по количеству живых (1) и мертвых (0) соседей,
				//исходя из того, сам элемент (1)или(0)

				// правило 1)
				// в пустой (мёртвой) клетке,
				// с которой соседствуют три живые клетки, зарождается жизнь
				if (!item && liveSiblings === 3) {
					console.log(`правило 1)`);
					return 1;
				}

				// правило 2)
				// если у живой клетки есть две или три живые соседки,
				// то эта клетка продолжает жить;
				if (item && (liveSiblings === 3 || liveSiblings === 2)) {
					console.log(`правило 2)`);
					return 1;
				}

				// правило 3)
				// (если живых соседей меньше двух или больше трёх)
				// клетка умирает («от одиночества» или «от перенаселённости»).
				if (liveSiblings < 2 || liveSiblings > 3) {
					console.log(`правило 3)`);
					return 0;
				}

				// если условия не подошли, то значит,
				// эта клетка - неживая
				// и соседей меньше 3х
				console.log(`правило NaN)`);
				return item;
			});
		});

		console.log(` OLD World LOG`);
		console.log(worldLog);
		console.log(` NEW res for World LOG`);
		console.log(res);
	};
	// const generationStep = async () => {
	const generationStep = () => {
		// world.
		// const data = Promise.all()
		// const

		// собрать все логи в матрицу - world.logMap
		// перерисовать items
		// repeat

		// items.forEach((row) => {
		// 	console.log(` Inside Items For Each `);
		const resLog = items.map((row: IUnit[]) => {
			// row.map((unit) => unit.getNextItemStep());
			return row.map((unit: IUnit) => unit.getNextItemStep());
		});

		console.log(` world.logMap `);
		console.log(world.logMap);
		// console.log(` resLog `);
		// console.log(resLog);
		// console.log(` items `);
		// console.log(items);
		const newWorld = checkWorldSiblings(world.logMap);
		// setTimeout(() => {
		//     setItems(newWorld);
		// }, 1000);
		// });
		console.log(`items`);
		console.log(items);
		console.log(`world`);
		console.log(world);
	};

	const getNextItemStep = (command: Command) => {
		console.log(command);
		return command;
	};

	useEffect(() => {}, [rCount]);

	useEffect(() => {
		if (gameStatusState) {
			generationStepInterval.current = setInterval(() => generationStep(), 500);
		}

		return () => {
			clearInterval(generationStepInterval.current);
		};
	}, [gameStatusState]);

	// useEffect(() => {
	// 	if (gameStatusState && unit.world) {
	// 		generationStepInterval = setInterval(() => generationStep(), 500);
	// 	}

	// 	return () => {
	// 		clearInterval(generationStepInterval);
	// 	};
	// }, []);

	return (
		<>
			<h1>Conway's Game of Life</h1>
			<span>React & Ts minimalistic test work</span>

			<div className={cn(s.world__wrap)} style={{ width: `${size}px` }}>
				{items.map((row: IUnit[]) =>
					row.map((unitItem) => (
						<CubeItem
							key={uuidv4()}
							size={cubeItemSize}
							fontSize={cubeFontSize}
							unit={unitItem}
							gameStatus={gameStatusState}
							getNextItemStep={getNextItemStep}
						/>
					))
				)}
			</div>

			<div className={cn(s.world__button_wrap)}>
				<button
					className={cn(s.world__button)}
					onClick={() => {
						setgameStatusState(true);
					}}
				>
					Run game
				</button>
				<button
					className={cn(s.world__button)}
					onClick={() => {
						generationStep();
					}}
				>
					Generation Step
				</button>

				<button
					className={cn(s.world__button)}
					onClick={() => {
						setgameStatusState(false);
					}}
				>
					Stop game
				</button>

				<button
					className={cn(s.world__button)}
					onClick={() => {
						clearWorld();
					}}
				>
					Clear world
				</button>

				<button
					className={cn(s.world__button)}
					onClick={() => {
						window.location.reload();
					}}
				>
					Reset
				</button>

				<a className={s.world__contact} href="https://t.me/dennovozhilov1">
					&#10149; telegram: @dennovozhilov1
				</a>
				<a className={s.world__contact} href="mailto: dennovozhilov1@gmail.com">
					&#9993; send email dennovozhilov1@gmail.com
				</a>
				<a className={s.world__contact} href="https://github.com/Denis-Novozhilov">
					&#10149; github.com/Denis-Novozhilov
				</a>
			</div>
		</>
	);
};

export default WorldComponent;
