import styled from 'styled-components';

interface InnerScreen {
  width: string;
}

export const AdminBox = styled.div`
  width: 80%;
  height: 400px;
  margin: 4rem auto;
  background-color: white;
  border-radius: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid #ccc;
  box-shadow: 2px 4px 4px 0px rgba(0, 0, 0, 0.25);
  text-align: center;
`;

export const AdminItem = styled.div`
  font-size: 16px;
  color: #598392;
  width: 200px;
  height: 200px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const AdminName = styled.p`
  font-weight: 500;
  font-size: 30px;
  color: black;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  span {
    font-size: 30px;
    margin-left: 1rem;
  }
`;

export const AdminContainer = styled.main`
  max-width: 1300px;
  width: 90%;
  height: 100vh;
  margin: 0 auto;
  padding: 0 20px;
`;
export const UserContainer = styled.main`
  width: 100%;
  height: auto;
  margin: 0 auto;
  padding: 0 20px;
`;
export const PostContainer = styled.main`
  width: 100%;
  height: auto;
  margin: 0 auto;
  padding: 0 20px;
`;

export const UserTable = styled.div`
  text-align: center;
  width: 95%;
  margin: 2rem auto;
`;

export const TableHead = styled.div`
  background-color: #eee;
  border-top: 1px solid;
  border-bottom: 1px solid;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem;
`;

export const TableRow = styled.div`
  font-size: 0.8rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem;

  &:hover {
    background-color: #eee;
  }
`;

export const TableCell = styled.span<InnerScreen>`
  width: ${(props: any) => props.width};
  line-height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
