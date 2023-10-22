import styled from "styled-components";
import { RiMenu3Line } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";

export const Bars = styled(RiMenu3Line)`
  display: none;
  color: #000;

  &:hover {
    color: #107acc;
  }

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 4px;
    right: 0;

    font-size: 1.6rem;
    cursor: pointer;
  }
`;

export const SearchIcon = styled(BiSearch)`
  display: none;

  @media screen and (max-width: 768px) {
    display: flex;
    color: #000;
    position: relative;
    top: 19px;
    right: 3rem;
    font-size: 1.6rem;
    cursor: pointer;

    &:hover {
      color: #107acc;
    }
  }
`;
