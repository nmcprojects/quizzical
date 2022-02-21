import React from 'react'
import { useNavigate } from "react-router-dom";

import Button from '../component/btn/Button'
import Loading from '../component/loader/Loading';

const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
}

const titleStyle = {
    margin: "0",
    color: "#293264",
    fontSize: "2.25rem",
    fontWeight: "bold",
}

const textStyle = {
    color: "#293264",
    fontSize: "1.1rem",
    fontWeight: "400",
    marginTop: "5px",
    marginBottom: "28px",

}

const Start = () => {

  const navigate = useNavigate();

  const onClickStart = () => {
    navigate("/react/quizzical-app/questions");
  }
    
  return (
    <div style = {containerStyle}>
        <h1 style = {titleStyle}>Quizzical</h1>
        <p style = {textStyle}>Challenge your knowledge - <span style = {{color: 'red'}}>Baby Boy NMC</span></p> 
        <Button className="btn btn-lg btn-br-md"onClick = {onClickStart}>
            Start quiz
        </Button>
    </div>
  )
}

export default Start