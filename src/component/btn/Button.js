import React from 'react'
import "./btn.css"

const Button = ({ children, ...props }) => {
  return (
    <div className = {props.className} onClick = {props.onClick}>
        <span>{children}</span>
    </div>
  )
}

export default Button