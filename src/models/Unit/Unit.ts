import { IWorld } from "../World/World";

export interface IUnit {
    health: number;
    isAlive: boolean;
    x: number;
    y: number;
    world: IWorld | null;
    checkSiblings(): void;
}

export class Unit {

    constructor(health: number, x: number, y: number , world: IWorld | null) {
        
        this.health = health;
        this.x = x;
        this.y = y;
        this.world = world;

        if (health >= 50) {
            this.isAlive = true;
        } else {
            this.isAlive = false;
        }

    }

    health: number;
    isAlive: boolean;
    x: number;
    y: number;
    world: IWorld | null;

    checkSiblings(): void {

        const checkingResp = [];

        if (this.world) {
  
            if (this.world.cells[this.y][this.x-1].isAlive) {
                checkingResp.push('LiveSibling')
            }
 
            if (this.world.cells[this.y-1][this.x-1].isAlive) {
                checkingResp.push('LiveSibling')
            }
   
            if (this.world.cells[this.y-1][this.x].isAlive) {
                checkingResp.push('LiveSibling')
            }
        
            if (this.world.cells[this.y-1][this.x+1].isAlive) {
                checkingResp.push('LiveSibling')
            }
        
            if (this.world.cells[this.y][this.x+1].isAlive) {
                checkingResp.push('LiveSibling')
            }
        
            if (this.world.cells[this.y+1][this.x+1].isAlive) {
                checkingResp.push('LiveSibling')
            }
        
            if (this.world.cells[this.y+1][this.x].isAlive) {
                checkingResp.push('LiveSibling')
            }
        
            if (this.world.cells[this.y+1][this.x-1].isAlive) {
                checkingResp.push('LiveSibling')
            }
        }

        if (this.world && this.isAlive && checkingResp.length < 2) {

            this.isAlive = false;

        } else if (this.world && this.isAlive && checkingResp.length > 3) {

            this.isAlive = false;

        } else if (this.world && !this.isAlive && checkingResp.length === 3) {

            this.isAlive = true;

        }
        
    }

}