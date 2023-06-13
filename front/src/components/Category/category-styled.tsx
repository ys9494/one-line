import styled from 'styled-components';

export const CategoryContainer = styled.main`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  h1 {
    text-align: center;
    margin: 20px 0 40px;
    font-weight: bold;
    font-size: 1.3rem;
  }
`;

export const CategoryFormWrapper = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  input {
    flex-grow: 1;
    border: 2px solid #aec3b0;
    border-radius: 10px;
    font-size: 1rem;
    padding: 5px;
  }
`;

export const CategoryItemWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
`;

export const CategoryItemContainer = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 7px 0;
  height: 58px;

  input {
    border: none;
    flex-grow: 1;
    font-size: 1rem;
    background-color: #edf5ee;
    padding: 7px 5px;
    border-radius: 10px;
    /* border-bottom: 2px solid #aec3b0; */
  }
`;
export const CategoryName = styled.p``;
export const CategoryButtonContainer = styled.div`
  display: flex;
  align-items: center;
  button {
    margin-left: 10px;
  }
`;

export const CategoryModalContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  /* left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); */
  background-color: rgba(255, 255, 255, 0.3);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CategoryModalItem = styled.div`
  background-color: #fff;
  border: 1px solid blue;
  width: 70%;
  height: 300px;
  position: relative;
  padding: 0 20px;

  input {
    width: 100%;
    margin-top: 40px;
    border: none;
    border-bottom: 1px solid #d9d9d9;
  }
`;
export const CloseModalButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
`;
export const SubmitEditButton = styled.button`
  border: none;
  padding: 5px 10px;
  border-radius: 10px;
  margin-left: 15px;
`;
export const AddButton = styled(SubmitEditButton)`
  border: none;
  padding: 5px 10px;
  border-radius: 10px;
  margin-left: 15px;
  background-color: #aec3b0;
`;
