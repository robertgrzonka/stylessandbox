import React from 'react'
import styled from '@emotion/styled'

const OutputDiv = styled.div`
  background-color: ${props => props.bgColor ? props.bgColor : '#212b35'};
  width: ${props => props.width ? props.width : '200px'};
  height: ${props => props.height ? props.height : '200px'};
  border-radius: ${props => props.radius ? props.radius : '5px'};
  border: 1px solid #212b35;
  `

const Output = (props) => {
  return <OutputDiv {...props}>{props.children}</OutputDiv>
}

export default Output
