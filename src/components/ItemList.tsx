import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { itemsState } from "../atoms";
import CreateItems from "./CreateItems";
import Item from "./Item";

const Container = styled.div`
  margin: 0 auto;
  max-width: 480px;
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
      <CreateItems />
      <span>{totalPrice}</span>
      <ul>
        {items.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </ul>
    </Container>
  );
}

export default ItemList;
