import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

interface ISpinningIndicatorProps {
  size?: number;
}
const SpinningIndicator = styled.div<ISpinningIndicatorProps>`
  width: ${(props) => props.size || 14}px;
  height: ${(props) => props.size || 14}px;
  border-top: 3px solid #cccccc;
  border-right: 3px solid #cccccc;
  border-radius: 50%;
  background: transparent;

  animation: ${rotate} 0.75s linear infinite;
  transform: translateZ(0);
`;

export default SpinningIndicator;
