import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { thickState, typeState } from "../atoms";
import { Types } from "./CreateItems";

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  button {
  }
`;

const Button = styled.button<{ isSelected?: boolean }>`
  padding: 10px;
  border-radius: 5px;
  background-color: ${(props) => (props.isSelected ? "#B0A8B9" : "#ffffff")};
  color: ${(props) => (props.isSelected ? "#ffffff" : "black")};
  transition: box-shadow 0.2s, -ms-transform 0.1s, -webkit-transform 0.1s,
    transform 0.1s;
  &:focus-visible {
    box-shadow: #222222 0 0 0 2px, rgba(255, 255, 255, 0.8) 0 0 0 4px;
    transition: box-shadow 0.2s;
  }
  &:active {
    background-color: #f7f7f7;
    border-color: #000000;
    transform: scale(0.96);
  }
  &:disabled {
    border-color: #dddddd;
    color: #dddddd;
    cursor: not-allowed;
    opacity: 1;
  }
`;

function TypeButtons() {
  const [type, setType] = useRecoilState(typeState);
  const [thick, setThick] = useRecoilState(thickState);
  const onClick = (event: React.FormEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setType(value);
    setThick("");
  };
  const thickChange = (event: React.FormEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setThick(value);
  };
  console.log(type, thick);
  return (
    <>
      <Container>
        <Button
          onClick={onClick}
          value={Types.B}
          isSelected={type === Types.B ? true : false}
        >
          2B
        </Button>
        <Button
          onClick={onClick}
          value={Types.HL}
          isSelected={type === Types.HL ? true : false}
        >
          HL
        </Button>
        <Button
          onClick={onClick}
          value={Types.MIRROR}
          isSelected={type === Types.MIRROR ? true : false}
        >
          Mirror
        </Button>
        <Button
          onClick={onClick}
          value={Types.BLACK_HL}
          isSelected={type === Types.BLACK_HL ? true : false}
        >
          Black H/L
        </Button>
        <Button
          onClick={onClick}
          value={Types.GOLD_HL}
          isSelected={type === Types.GOLD_HL ? true : false}
        >
          Gold H/L
        </Button>
        <Button
          onClick={onClick}
          value={Types.GOLD_MIRROR}
          isSelected={type === Types.GOLD_MIRROR ? true : false}
        >
          Gold Mirror
        </Button>
      </Container>
      <Container>
        {type !== Types.MIRROR &&
          type !== Types.BLACK_HL &&
          type !== Types.GOLD_HL &&
          type !== Types.GOLD_MIRROR && (
            <Button
              onClick={thickChange}
              value={0.8}
              isSelected={thick === "0.8"}
            >
              0.8T
            </Button>
          )}
        {type !== Types.BLACK_HL &&
          type !== Types.GOLD_HL &&
          type !== Types.GOLD_MIRROR && (
            <Button onClick={thickChange} value={1} isSelected={thick === "1"}>
              1T
            </Button>
          )}
        <Button onClick={thickChange} value={1.2} isSelected={thick === "1.2"}>
          1.2T
        </Button>
        {type !== Types.BLACK_HL &&
          type !== Types.GOLD_HL &&
          type !== Types.GOLD_MIRROR && (
            <Button
              onClick={thickChange}
              value={1.5}
              isSelected={thick === "1.5"}
            >
              1.5T
            </Button>
          )}
        {type !== Types.BLACK_HL &&
          type !== Types.GOLD_HL &&
          type !== Types.GOLD_MIRROR && (
            <Button onClick={thickChange} value={2} isSelected={thick === "2"}>
              2T
            </Button>
          )}
      </Container>
    </>
  );
}

export default TypeButtons;
