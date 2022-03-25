import styled from "styled-components";

const Button = styled.button`
  border: 0;
  margin-left: auto;
  margin-right: auto;
  display: block;
  background: none;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  outline: none;
  width:33%;
  margin-top:20px;
  box-shadow: 2px 2px 1px rgb(0 0 0 / 25%);
  background: #e9e9e9;
  color: rgba(0,0,0,0.7);
  :active {
    transform: translateY(2px);
  }
`;

export default function ButtonDefault() {
    return (<Button>CONFIRM</Button>)
}