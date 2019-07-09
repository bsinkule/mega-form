import React from 'react'
import styled from 'styled-components'

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`

const Icon = styled.svg`
  fill: none;
  stroke: rgb(255, 0, 255);
  stroke-width: 3px;
`
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  background: ${props => (props.checked ? '#d9d9d9' : 'white')}
  border-radius: 3px;
  transition: all 250ms;
  cursor: pointer;

  ${Icon} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')}
  }
`

const Checkbox = ({ className, checked, ...props }) => {
  return (
  <CheckboxContainer className={className}>
    <HiddenCheckbox checked={checked} {...props} />
    <StyledCheckbox checked={checked}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
  )
}

export default Checkbox