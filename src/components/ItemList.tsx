import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { itemsState } from "../atoms";
import CreateItems from "./CreateItems";
import Item from "./Item";
import TotalInfo from "./TotalInfo";

const Container = styled.div`
  margin: 0 auto;
  max-width: 480px;
`;

const Title = styled.h1`
  font-size: 30px;
  font-family: "Cafe24SsurroundAir", sans-serif;
  text-align: center;
  margin: 15px 0px;
`;

const List = styled.ul`
  margin-top: 10px;
`;

function ItemList() {
  const items = useRecoilValue(itemsState);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    let totalPrice = 0;
    for (let i = 0; i < items.length; i++) {
      totalPrice += items[i].price;
    }
    setTotalPrice(totalPrice);
  }, [items]);
  return (
    <Container>
      <Helmet>
        <title>22.8</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <Title>22.8</Title>
      <CreateItems />
      <List>
        {items.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </List>
      <TotalInfo totalPrice={totalPrice} />
    </Container>
  );
}

export default ItemList;
