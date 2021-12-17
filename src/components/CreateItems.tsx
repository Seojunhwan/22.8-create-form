import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { itemsState, optionState } from "../atoms";
import { calcMaterial } from "../calc";
import TypeButtons from "./TypeButtons";

export enum Types {
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
  extraError?: string;
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

const Button = styled.button<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  color: ${(props) => (props.bgColor ? "white" : "black")};
  padding: 10px;
  margin-top: 10px;
  transition: transform 0.3s ease-out, color 0.2s ease-out;
  &:active {
    transform: scale(0.96);
    color: black;
  }
`;

function CreateItems() {
  const setItems = useSetRecoilState(itemsState);
  const [type, thick] = useRecoilValue(optionState);
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
    setValue,
  } = useForm<IForm>();
  const handleValid = ({ quantity, width, height }: IForm) => {
    if (type === "") {
      setError("extraError", { message: "타입을 골라주세요!" });
      return;
    }
    if (thick === "") {
      setError("extraError", { message: "두께를 골라주세요!" });
      return;
    }
    const newItem = calcMaterial(
      type,
      parseFloat(thick),
      parseInt(quantity),
      parseFloat(width),
      parseFloat(height)
    );
    setItems((oldItems) => [{ ...newItem, id: Date.now() }, ...oldItems]);
    setValue("quantity", "");
    setValue("width", "");
    setValue("height", "");
  };
  return (
    <>
      <TypeButtons />
      <Form onSubmit={handleSubmit(handleValid)}>
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
              : parseInt(watch().width) >= 50
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
              : parseInt(watch().height) >= 50
              ? "#78e08f"
              : "#ebeeff"
          }
          type={"number"}
          placeholder="세로 길이를 입력해주세요!"
        />
        <Button
          onClick={() => clearErrors("extraError")}
          bgColor={
            errors.extraError?.message ||
            errors.height?.message ||
            errors.quantity?.message ||
            errors.width?.message
              ? "#ff7073"
              : parseInt(watch().height) > 50
              ? "#78e08f"
              : "#ebeeff"
          }
        >
          {errors.extraError?.message ??
            errors.quantity?.message ??
            errors.width?.message ??
            errors.height?.message ??
            "딸깍"}
        </Button>
      </Form>
    </>
  );
}

export default CreateItems;
