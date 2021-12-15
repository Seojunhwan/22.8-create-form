import React from "react";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import ItemList from "./components/ItemList";
import { RecoilRoot } from "recoil";

const GlobalStyle = createGlobalStyle`  
  ${reset}
  @font-face {
      font-family: 'Cafe24SsurroundAir';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2105_2@1.0/Cafe24SsurroundAir.woff') format('woff');
      font-weight: normal;
      font-style: normal;
  }
  *{
    box-sizing:border-box;
    font-family:"Cafe24SsurroundAir",sans-serif;
  }
  span{
    font-family:"Cafe24SsurroundAir",sans-serif;
  }
  select{
    outline:none;
    border:none;
  }
  input {
    outline:none;
    border:none;
  }
  button {
    background-color:inherit;
    outline:none;
    border:none;
    cursor: pointer;
  }
`;

function App() {
  return (
    <>
      <RecoilRoot>
        <GlobalStyle />
        <ItemList />
      </RecoilRoot>
    </>
  );
}

export default App;
