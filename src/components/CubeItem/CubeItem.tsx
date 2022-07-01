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

const CubeItem: FC<CubeItemProps> = ({size, index, unit, gameStatus, fontSize}) => {

    const [LiveStatus, setLiveStatus] = useState(unit.isAlive);
    const [gameStatusState, setgameStatusState] = useState(gameStatus);

    let generationStepInterval: ReturnType<typeof setInterval>;

    const generationStep = () => {
        unit.checkSiblings();
        setLiveStatus(unit.isAlive);
    }

    useEffect(() => {
        if (gameStatusState) {
            generationStepInterval = setInterval(() => generationStep(), 100);
        }

        return(()=>{ 
            clearInterval(generationStepInterval);
        });
    }, []);

    return (
        <>
            <div className={cn(s.ceil__common, {[s.ceil__live]: unit.isAlive, [s.ceil__hidden]: !unit.world})} 
                style={{width: size, height: size, fontSize: fontSize}}
            >
                {/* {unit.x+':'+unit.y} */}
            </div>
        </>
    );
};

export default CubeItem;