import { FC, useState } from 'react';
import s from './World.style.module.css';
import cn from 'classnames';
import CubeItem from '../CubeItem/CubeItem';
import { v4 as uuidv4 } from 'uuid';
import { IWorld, World } from '../../models/World/World';
import { IUnit } from '../../models/Unit/Unit';

interface WorldProps  {
    world: IWorld;
    size: number;
};  

const WorldComponent: FC<WorldProps> = ({world, size}) => {

    const cubeItemSize = size / (world.gridRange + 2) + 'px';
    const cubeFontSize = size / (world.gridRange + 50) + 'px';

    const [gameStatusState, setgameStatusState] = useState(false);

    return (
        <>
            <h1>Conway's Game of Life</h1>
            <span>React & Ts minimalistic test work</span>

            <div className={cn(s.world__wrap)} style={{width: `${size}px`}}>

                {world.cells.map( ( row: IUnit[] ) => (
                        row.map( unitItem => (
                            <CubeItem  key={uuidv4()} 
                                    size={cubeItemSize} 
                                    fontSize={cubeFontSize} 
                                    unit={unitItem} 
                                    gameStatus={gameStatusState}
                            />
                        ))
                ))}

            </div>

            <div className={cn(s.world__button_wrap)}>

                <button className={cn(s.world__button)}
                    onClick={() => {
                        setgameStatusState(true)
                    }}
                >
                    Run game
                </button>

                <button className={cn(s.world__button)}
                    onClick={() => {
                        setgameStatusState(false)
                    }}
                >
                    Stop game
                </button>

                <button className={cn(s.world__button)}
                    onClick={() => {
                        window.location.reload();
                    }}
                >
                    Reset
                </button>

                <a className={s.world__contact} href="https://t.me/dennovozhilov1">&#10149; telegram: @dennovozhilov1</a>
                <a className={s.world__contact} href = "mailto: dennovozhilov1@gmail.com">&#9993; send email dennovozhilov1@gmail.com</a>
                <a className={s.world__contact} href="https://github.com/Denis-Novozhilov">&#10149; github.com/Denis-Novozhilov</a>
            </div>
        </>
    );
};

export default WorldComponent;