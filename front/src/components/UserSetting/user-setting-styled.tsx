import styled from 'styled-components';

export const SettingContainer = styled.main`
  max-width: 420px;
  margin: 0 auto 40px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    text-align: center;
    font-size: 1.3rem;
    margin-bottom: 30px;
  }
`;

export const ProfileImageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  span {
    font-size: 1rem;
    display: block;
    width: 150px;
  }
`;

export const ImageInputArea = styled.label`
  display: block;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 5px solid #eff6e0;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
    transition: all 0.2s;
  }
`;

export const ImageInput = styled.input`
  display: none;
`;

export const ImageHolder = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  background-color: #ddd;
`;

export const ImageDeleteBtn = styled.button`
  margin-top: 10px;
  border: none;
  outline: none;
  font-weight: bold;
  font-size: 1rem;
  padding: 5px 10px;
  border-radius: 5px;
  background: #aec3b0;

  &:hover {
    opacity: 0.7;
    transition: all 0.2s;
  }
`;

export const SettingForm = styled.form`
  width: 100%;
  margin-top: 20px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;

  label {
    font-weight: bold;
    font-size: 1.1rem;
    margin-bottom: 5px;
  }

  input {
    font-size: 1.1rem;
    padding: 7px;
  }
`;

export const SpanWrapper = styled(InputWrapper)`
  span {
    font-size: 1.1rem;
  }
`;

export const UserSettingInput = styled.input`
  border: 1px solid #ccc;
`;

export const Button = styled.button`
  width: 100%;
  border-radius: 10px;
  border: none;
  padding: 10px 0;
  font-size: 1.1rem;
  font-weight: bold;

  &:hover {
    opacity: 0.7;
    transition: all 0.3s;
  }
`;

export const SubmitButton = styled(Button)`
  background-color: #598392;
  color: white;
`;

export const DeleteAccountButton = styled(Button)`
  background: none;
  margin-top: 5px;
  font-weight: normal;
`;
