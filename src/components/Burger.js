import React from 'react'

function Burger(props) {
    return (
        <div onClick = {props.handleBurgerClick} className = 'burger'>
            <div className = 'burger-line'></div>
            <div className = 'burger-line'></div>
            <div className = 'burger-line'></div>
        </div>
    )
}

export default Burger
