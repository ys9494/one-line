import styled from 'styled-components';

export const SearchContainer = styled.main`
  max-width: 920px;
  margin: 0 auto;
  padding: 10px 20px;
`;

export const SearchForm = styled.form`
  width: 100%;
  position: relative;

  input {
    width: 100%;
    flex-grow: 1;
    padding: 10px 0 10px 44px;
    border: none;
    outline: none;
    border-bottom: 2px solid #eee;
    font-size: 1.2rem;
  }
  button {
    position: absolute;
    left: 5px;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    background: none;
  }
`;

export const SearchResultContainer = styled.div`
  margin-top: 20px;
  > h3 > span {
    color: #729fbf;
  }
`;

export const NoResultsWrapper = styled(SearchResultContainer)`
  > h3 {
    margin-top: 50px;
    text-align: center;
  }
`;
