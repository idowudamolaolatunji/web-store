import React from 'react'

function SizesBox({ size, handleSelected, selected }) {
  return (
    <div className={`size-box ${selected === size ? 'selected' : ''}`} onClick={() => handleSelected(size)}>
        <p>{size}</p>
    </div>
  )
}

export default SizesBox
