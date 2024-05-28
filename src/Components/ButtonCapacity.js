import React from 'react';
import { useDispatch } from 'react-redux';
import { hitMonster } from '../features/fight/fightSlice';



const ButtonCapacity = props => {
    const dispatch = useDispatch();
    const combat = () => {
        dispatch(hitMonster({ damage: 5}));
        console.log('aie !')
    }


        return (
            <button type="button" onClick={combat} className="btn btn-success material-tooltip-main ">
                hit
            <i className="fas fa-bomb"></i> 5
        <i className="fas fa-fire-alt"></i> - 5
    </button>
        );
    }



export default ButtonCapacity;