import React from 'react'

export function ColorBoxSm({ color }) {
    return (
        <div className='color-box'>
            <span style={{ backgroundColor: `${color}` }}>&nbsp;</span>
        </div>
    )
}


export function ColorBoxLg({ color, handleSelected, selected }) {
    return (
        <div className={`color-box-lg ${selected === color ? 'selected' : ''}`} onClick={() => handleSelected(color)}>
            <span style={{ backgroundColor: `${color}` }}>&nbsp;</span>
        </div>
    )
}
