import styled from "styled-components";
import  { AiOutlineSearch } from "react-icons/ai";

export const SearchStyle = styled.input`
    display: flex;
    align-items: center;
    justify-content: center;
    transition: box-shadow 0.15s ease-in-out 0s, border-color 0.15s ease-in-out 0s;
    border: 1px solid rgb(206, 212, 218);
    outline: none;
    border-radius: 0.25rem;
    min-height: 38px;
    width: 60ch;
`

export const SearchDiv = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    position: relative;
    `

export const Icon = styled(AiOutlineSearch) `
    right: 4px;
    width: 20%;
    border-left: 1px solid rgb(206, 212, 218);
    border-radius: 0.25rem 0.25rem 0px 0px;
    position: absolute;
`