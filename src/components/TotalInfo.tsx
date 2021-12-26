import styled from "styled-components";

function TotalInfo({ totalPrice }: { totalPrice: number }) {
  return (
    <Container>
      <span>총 상품 금액 </span>
      <span>{totalPrice}원</span>
    </Container>
  );
}

export default TotalInfo;

const Container = styled.div`
  display: flex;
  position: fixed;
  justify-content: space-between;
  width: 100%;
  bottom: 0;
  left: 0;
  padding: 20px 20px;
  background-color: #ebeeff;
`;
