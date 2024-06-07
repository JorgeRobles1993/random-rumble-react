import React from 'react';

const HealthBar = (props) => {
  return (
    <div className="progress md-progress" >
      <div className="progress-bar"
        style={{ width: (props.pv * 100 / props.pvmax) + "%" }}
        aria-valuenow={props.pv}
        aria-valuemin="0"
        aria-valuemax={props.pvmax}
        role="progressbar" >
        <i className={` fas ${props.faType} ${props.bgType} icon-text`}> {props.pv} {props.barName} </i>
    </div>
</div >
  ); 
};

export default HealthBar;
