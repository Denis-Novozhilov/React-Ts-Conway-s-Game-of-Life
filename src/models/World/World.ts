import { IUnit, Unit } from '../Unit/Unit';

export interface IWorld {
	cells: IUnit[][];
	gridRange: number;
	logMap: number[][];
}

export class World {
	constructor(quadScale: number = 3) {
		this.gridRange = quadScale;

		const roundMinMax = (min: number, max: number) => Math.round(min + Math.random() * (max - min));

		/* 
            генерация новых Unit-ов 
            *если roundMinMax() вернет больше 50 - статус [isAlive = true];
            
            добавление пустых Unit-ов [isAlive = false] и [world = null]
            по периметру таблицы с ячейками
            для упрощения логики проверки живых соседей на границах поля.
            эти ячейки не смогут проверять соседей.

            ↓
        */

		for (let y = 0; y < quadScale + 2; y++) {
			const row: Unit[] = [];

			if (y === 0 || y === quadScale + 1) {
				for (let x = 0; x < quadScale + 2; x++) {
					row.push(new Unit(0, x, y, null));
				}
			} else {
				for (let x = 0; x < quadScale + 2; x++) {
					if (x === 0 || x === quadScale + 1) {
						row.push(new Unit(0, x, y, null));
					} else {
						row.push(new Unit(roundMinMax(0, 55), x, y, this));
						// row.push(new Unit(roundMinMax(0,100), j, i, this))
					}
				}
			}

			this.cells.push(row);
			this.logMap.push(row.map((unit) => (unit.health >= 50 ? 1 : 0)));

			console.log(`CELLS`);
			console.log({ cells: this.cells });
			console.table(this.cells);
			console.log(`logMap`);
			console.log({ cells: this.logMap });
			console.table(this.logMap);
		}
	}

	cells: Unit[][] = [];
	gridRange: number;
	logMap: number[][] = [];
}
