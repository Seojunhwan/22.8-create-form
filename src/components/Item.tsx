import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IItem, itemsState } from "../atoms";

const List = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  &:not(&:first-child) {
    margin-top: 15px;
  }
`;

const InfoContainer = styled.div`
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
`;

function Items({ id, type, thick, quantity, width, height, price }: IItem) {
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

export default Items;
