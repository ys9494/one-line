import styled from 'styled-components';

export const DropdownWrapper = styled.div`
    position: relative;
    display: inline-block;
`;

export const DropdownHeader = styled.div`
    padding: 10px;
    color: #333;
    background-color: #f9f9f9;
    border: none;
    cursor: pointer;
`;

export const DropdownListContainer = styled.div`
    display: block;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
`;

export const DropdownListItem = styled.div`
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    cursor: pointer;

    &:hover {
        background-color: #f1f1f1;
    }
`;