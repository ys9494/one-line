import styled from 'styled-components';

export const Container = styled.div`
  max-width: 420px;
  margin: 0 auto;
  padding: 0 20px 80px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  width: 100%;
  font-size: 15px;
`;

export const Button = styled.button`
  width: 100%;
  margin-top: 46px;
  padding: 10px 0;
  border-radius: 5px;
  border: none;
  background-color: #598392;
  color: white;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;

  &:hover {
    background-color: #124559;
  }
`;

export const InputWrapper = styled.div`
  margin-top: 40px;
  width: 100%;
`;

export const SignupTitle = styled.h2`
  font-size: 1.4rem;
  font-family: 'Roboto Flex', sans-serif;
  font-weight: bold;
  position: relative;
  top: 5%;
`;

export const InputTitle = styled.h3`
  font-family: 'Roboto Flex', sans-serif;
  text-align: left;
  position: relative;
  left: 0px;
  top: 5%;
`;
