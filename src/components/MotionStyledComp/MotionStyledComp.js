import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import styled from 'styled-components';



//<Wrapper /> is going to wrap our animated component.
const Wrapper = styled.div`
  background:#00897B;
  display: flex;
  width: 100vw;
  min-height: 100vh;
`;

//<Content /> is our animated component.
const Content = styled.div`
  flex-basis: ${(props) => props.width}%;
  background: #333;
  color: #FFF;
`

class MotionStyledComp extends Component {

  render() {
    console.log("this.props on motion", this.props.name)
    return (
      <Motion
        defaultStyle={ { width: 0 } }
        style={ { width: spring(100) } }
      >
        {(style) => (
          <Wrapper>
            <Content width={style.width}>
              <h1>Hello world!</h1>
            </Content>
          </Wrapper>
        )}
      </Motion>
    )
  }
}

export default MotionStyledComp;