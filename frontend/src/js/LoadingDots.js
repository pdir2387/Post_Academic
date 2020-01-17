import React, { useState } from 'react'
import styled, { keyframes } from "styled-components";


const BounceAnimation = keyframes`
0% { margin-bottom: 0; }
50% { margin-bottom: 15px }
100% { margin-bottom: 0 }`;
const DotWrapper = styled.div`
display: flex;
align-items: flex-end;`;

const Dot = styled.div`
background-color: ${props => props.bgColor};
border-radius: 50%;
width: 10px;
height: 10px;
margin: 0 5px;  /* Animation */
animation: ${BounceAnimation} .6s linear infinite;
animation-delay: ${props => props.delay};`;

class LoadingDots extends React.Component {
render() {
  return (
    <DotWrapper>
      <Dot delay=".0s" bgColor="#4dabf7" />
      <Dot delay=".1s" bgColor="#3bc9db" />
      <Dot delay=".2s" bgColor="#38d9a9" />
    </DotWrapper>
  )
}
}

export default LoadingDots;