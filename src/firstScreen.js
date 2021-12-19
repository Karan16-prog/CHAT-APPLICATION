import React from 'react';
import './firstScreen.css'; 

//BASIC DISPLAY FOR FIRST SCREEN

function Screen(props){
    return(
        <div className='screen'>
                <div>
                    <h4 style={{color:'#EDF5E1'}}>{props.topic}</h4>
                </div>
        </div>
    )
}

export default Screen;