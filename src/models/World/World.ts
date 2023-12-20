import { IUnit, Unit } from '../Unit/Unit';

export interface IWorld {
	cells: IUnit[][];
	gridRange: number;
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

		for (let i = 0; i < quadScale + 2; i++) {
			const row: Unit[] = [];

			if (i === 0 || i === quadScale + 1) {
				for (let n = 0; n < quadScale + 2; n++) {
					row.push(new Unit(0, n, i, null));
				}
			} else {
				for (let j = 0; j < quadScale + 2; j++) {
					if (j === 0 || j === quadScale + 1) {
						row.push(new Unit(0, j, i, null));
					} else {
						row.push(new Unit(roundMinMax(0, 55), j, i, this));
						// row.push(new Unit(roundMinMax(0,100), j, i, this))
					}
				}
			}

			this.cells.push(row);
		}
	}

	cells: Unit[][] = [];
	gridRange: number;
}
