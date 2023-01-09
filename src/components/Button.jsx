import React from 'react'

const Button = ({ name, classnames, type, onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        type={type}
        className={classnames}
      >{name}</button>
    </>
  )
}

export default Button
