import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { itemsState } from "../atoms";
import { calcMaterial } from "../calc";

enum Types {
  "B" = "B",
  "HL" = "HL",
  "MIRROR" = "MIRROR",
  "BLACK_HL" = "BLACK_HL",
  "GOLD_HL" = "GOLD_HL",
  "GOLD_MIRROR" = "GOLD_MIRROR",
}

interface IForm {
  type: string;
  thick: string;
  quantity: string;
  width: string;
  height: string;
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input<{ borderColor: string }>`
  border-bottom: 2px solid ${(props) => props.borderColor};
  padding: 10px;
  text-align: center;
  transition: border-bottom 0.3s ease-in-out;
  &:not(:first-child) {
    margin-top: 10px;
  }
`;

const Button = styled.button`
  background-color: #edf0fe;
  padding: 10px;
  margin-top: 10px;
`;

function CreateItems() {
  const [items, setItems] = useRecoilState(itemsState);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IForm>();
  const handleValid = ({ type, thick, quantity, width, height }: IForm) => {
    const newItem = calcMaterial(
      type,
      parseFloat(thick),
      parseInt(quantity),
      parseFloat(width),
      parseFloat(height)
    );
    setItems((oldItems) => [{ ...newItem, id: Date.now() }, ...oldItems]);
  };
  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <select {...register("type", { required: "타입을 선택해주세요!" })}>
        <option value={Types.B}>2B</option>
        <option value={Types.HL}>H/L</option>
        <option value={Types.MIRROR}>Mirror</option>
        <option value={Types.BLACK_HL}>Black H/L</option>
        <option value={Types.GOLD_HL}>Gold H/L</option>
        <option value={Types.GOLD_MIRROR}>Gold Mirror</option>
      </select>
      <select {...register("thick", { required: "두께를 선택해주세요!" })}>
        <option value={0.8}>0.8 T</option>
        <option value={1}>1 T</option>
        <option value={1.2}>1.2 T</option>
        <option value={1.5}>1.5 T</option>
        <option value={2}>2 T</option>
      </select>
      <Input
        {...register("quantity", { required: "수량을 입력해주세요!" })}
        borderColor={
          errors.quantity?.message
            ? "#ff7073"
            : watch().quantity
            ? "#78e08f"
            : "#ebeeff"
        }
        type={"number"}
        placeholder="수량을 입력해주세요!"
      />
      <Input
        {...register("width", {
          required: "가로 길이를 입력해주세요!",
          min: { value: 50, message: "가로 최소 길이는 50mm 입니다!" },
          max: { value: 1219, message: "가로 최대 길이는 1,219mm 입니다!" },
        })}
        borderColor={
          errors.width?.message
            ? "#ff7073"
            : parseInt(watch().width) > 50
            ? "#78e08f"
            : "#ebeeff"
        }
        type={"number"}
        placeholder="가로 길이를 입력해주세요!"
      />
      <Input
        {...register("height", {
          required: "세로 길이를 입력해주세요!",
          min: { value: 50, message: "세로 최소 길이는 50mm 입니다!" },
          max: { value: 2438, message: "세로 최대 길이는 2,438mm 입니다!" },
        })}
        borderColor={
          errors.height?.message
            ? "#ff7073"
            : parseInt(watch().height) > 50
            ? "#78e08f"
            : "#ebeeff"
        }
        type={"number"}
        placeholder="세로 길이를 입력해주세요!"
      />
      <Button>
        {errors.quantity?.message ??
          errors.width?.message ??
          errors.height?.message ??
          "딸깍"}
      </Button>
    </Form>
  );
}

export default CreateItems;
