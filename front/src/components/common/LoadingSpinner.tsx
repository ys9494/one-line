import styled, { keyframes } from 'styled-components';

type Props = {
  width: string;
  height: string;
  border: string;
  borderColor?: string;
};

const rotation = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
`;

export const Spinner = styled.div<Props>`
  border: ${props => `${props.border} solid #f3f3f3`};
  border-top: ${props =>
    props.borderColor ? `4px solid ${props.borderColor}` : '4px solid #598392'};
  border-radius: 50%;
  width: ${props => props.width};
  height: ${props => props.height};
  animation: ${rotation} 1s linear infinite;
`;

export const LoadingWrapper = styled.div`
  width: 100%;
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;
