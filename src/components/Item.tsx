import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { IItem, itemsState } from "../atoms";

function Item({ id, type, thick, quantity, width, height, price }: IItem) {
  const setItems = useSetRecoilState(itemsState);
  const onClick = () => {
    setItems((oldItems) => {
      const targetIndex = oldItems.findIndex((item) => item.id === id);
      return [
        ...oldItems.slice(0, targetIndex),
        ...oldItems.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <List>
      <InfoContainer>
        <span>{`${width} * ${height} / ${quantity} / ${type} ${thick}T`}</span>
        <button onClick={onClick}>지우기</button>
      </InfoContainer>
      <InfoContainer>
        <div>
          <span>-</span>
          <span>{price / 100}</span>
          <span>+</span>
        </div>
        <span>{price}원</span>
      </InfoContainer>
    </List>
  );
}

export default Item;

const List = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding: 10px 0px;
  &:not(&:first-child) {
    border-top: 1px solid #ebeeff;
  }
`;

const InfoContainer = styled.div`
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    border-radius: 5px;
    transition: all 0.2s ease-out;
    &:active {
      transform: scale(0.96);
    }
    &:hover {
      background-color: #ff9671;
      color: white;
    }
  }
  &:last-child {
    div {
      padding: 5px;
      background-color: #f1f2f4;
      border: 1px solid #dde0e3;
      span {
        &:nth-child(2) {
          background-color: white;
          padding: 4px;
        }
        &:not(&:nth-child(2)) {
          font-size: 15px;
          padding: 5px;
        }
        &:last-child {
          vertical-align: middle;
        }
      }
    }
  }
`;
