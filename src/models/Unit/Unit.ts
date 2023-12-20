import { IWorld } from '../World/World';

export type Orders = 'alive' | 'dye' | 'stay' | 'initial';
export type Command = {
	x: number;
	y: number;
	command: Orders;
} | null;
export interface IUnit {
	health: number;
	isAlive: boolean;
	x: number;
	y: number;
	world: IWorld | null;
	genLog: number[][];
	nextStepOrder: Orders;
	generationCommand: Command;
	checkSiblings(): void;
	dye(): void;
	alive(): void;
	getNextItemStep(): Command;
}

export class Unit {
	constructor(health: number, x: number, y: number, world: IWorld | null) {
		this.health = health;
		this.x = x;
		this.y = y;
		this.world = world;
		this.nextStepOrder = 'initial';

		this.genLog = [
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0]
		];

		if (health >= 50) {
			this.world && console.log({ health }, { x }, { y });
			this.isAlive = true;
			this.genLog[1][1] = 1;
		} else {
			this.world && console.log({ health }, { x }, { y });
			this.isAlive = false;
			this.genLog[1][1] = 0;
		}

		this.generationCommand = null;
	}

	health: number;
	isAlive: boolean;
	x: number;
	y: number;
	genLog: number[][];
	world: IWorld | null;
	nextStepOrder: Orders;
	generationCommand: Command;

	checkSiblings(): void {
		const checkingResp = [];

		if (this.world) {
			if (this.world.cells[this.y][this.x - 1].isAlive) {
				checkingResp.push('LiveSibling');
				console.log(`
                Me isAlive(${this.isAlive}) X_${this.x}_Y_${this.y}  
                
                LiveSibling просто слева
                x_${this.x - 1} y_${this.y} 
                `);
				this.genLog[1][0] = 1;
			}

			if (this.world.cells[this.y - 1][this.x - 1].isAlive) {
				checkingResp.push('LiveSibling');
				console.log(`
                Me isAlive(${this.isAlive}) X_${this.x}_Y_${this.y}  
                
                LiveSibling сверху слева
                x_${this.x - 1} y_${this.y - 1} 
                `);
				this.genLog[0][0] = 1;
			}

			if (this.world.cells[this.y - 1][this.x].isAlive) {
				checkingResp.push('LiveSibling');
				console.log(`
                Me isAlive(${this.isAlive}) X_${this.x}_Y_${this.y}  
                
                LiveSibling сверху просто 
                x_${this.x} y_${this.y - 1} 
                `);
				this.genLog[0][1] = 1;
			}

			if (this.world.cells[this.y - 1][this.x + 1].isAlive) {
				checkingResp.push('LiveSibling');
				console.log(`
                Me isAlive(${this.isAlive}) X_${this.x}_Y_${this.y}  
                
                LiveSibling сверху справа
                x_${this.x + 1} y_${this.y - 1} 
                `);
				this.genLog[0][2] = 1;
			}

			if (this.world.cells[this.y][this.x + 1].isAlive) {
				checkingResp.push('LiveSibling');
				console.log(`
                Me isAlive(${this.isAlive}) X_${this.x}_Y_${this.y}  
                
                LiveSibling просто справа
                x_${this.x + 1} y_${this.y} 
                `);
				this.genLog[1][2] = 1;
			}

			if (this.world.cells[this.y + 1][this.x + 1].isAlive) {
				checkingResp.push('LiveSibling');
				console.log(`
                Me isAlive(${this.isAlive}) X_${this.x}_Y_${this.y}  
                
                LiveSibling снизу справа
                x_${this.x + 1} y_${this.y + 1} 
                `);
				this.genLog[2][2] = 1;
			}

			if (this.world.cells[this.y + 1][this.x].isAlive) {
				checkingResp.push('LiveSibling');
				console.log(`
                Me isAlive(${this.isAlive}) X_${this.x}_Y_${this.y}  
                
                LiveSibling снизу просто
                x_${this.x} y_${this.y + 1} 
                `);
				this.genLog[2][1] = 1;
			}

			if (this.world.cells[this.y + 1][this.x - 1].isAlive) {
				checkingResp.push('LiveSibling');
				console.log(`
                Me isAlive(${this.isAlive}) X_${this.x}_Y_${this.y}  
                
                LiveSibling снизу слева
                x_${this.x - 1} y_${this.y + 1} 
                `);
				this.genLog[2][0] = 1;
			}
		}

		if (this.world && this.isAlive && checkingResp.length < 2) {
			// this.isAlive = false;
			this.nextStepOrder = 'dye';
		} else if (this.world && this.isAlive && checkingResp.length > 3) {
			// this.isAlive = false;
			this.nextStepOrder = 'dye';
		} else if (this.world && !this.isAlive && checkingResp.length === 3) {
			// this.isAlive = true;
			this.nextStepOrder = 'alive';
		} else if (
			this.world &&
			this.isAlive &&
			(checkingResp.length === 2 || checkingResp.length === 3)
		) {
			// this.isAlive = true;
			this.nextStepOrder = 'stay';
		}
		this.generationCommand = {
			x: this.x,
			y: this.y,
			command: this.nextStepOrder
		};
	}

	dye(): void {
		this.isAlive = false;
		this.genLog[1][1] = 0;
	}

	alive(): void {
		this.isAlive = true;
		this.genLog[1][1] = 1;
	}

	getNextItemStep(): Command {
		return this.generationCommand;
	}
}
