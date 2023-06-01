import { useDispatch, useSelector } from "react-redux";
import { addMessage, alterChatTurn, saveInput } from "../store/commonSlice";
import { ChangeEvent, useState } from "react";
import { EInputType, TypeComponent } from "../utils/types";

const InputComponent = () => {
  const dispatch = useDispatch();
  const CommonState = useSelector((state: any) => state.common);
  const {
    userName,
    userInputs,
  }: { userName: string; userAge: number; userInputs: TypeComponent[] } =
    CommonState;

  const [name, setName] = useState<string>(userName);

  const handleClick = () => {
    const payload: any = {
      id: userInputs.at(0)?.id,
      sender: "user",
      content: "Got it!",
    };

    dispatch(addMessage(payload));

    dispatch(alterChatTurn());
  };

  const handleNameSubmit = () => {
    dispatch(saveInput({ key: "userName", value: name }));
    const payload: any = {
      id: userInputs.at(0)?.id,
      sender: "user",
      content: `${name}`,
    };
    dispatch(addMessage(payload));

    dispatch(alterChatTurn());
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(saveInput({ key: "userAge", value: e.target.value }));
    const payload: any = {
      id: userInputs.at(0)?.id,
      sender: "user",
      content: `Age: ${e.target.value} yrs`,
    };
    dispatch(addMessage(payload));

    dispatch(alterChatTurn());
  };

  if (userInputs && userInputs.length > 0) {
    const currentInput = userInputs.at(0);
    if (currentInput && currentInput.type === EInputType.button)
      return (
        <button className="btn-component" onClick={handleClick}>
          Got it!
        </button>
      );

    if (currentInput && currentInput.type === EInputType.textInput)
      return (
        <>
          <input
            className="input-component"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder={`Enter Your Name`}
          />
          <button className="btn-component" onClick={handleNameSubmit}>
            Submit
          </button>
        </>
      );

    if (currentInput && currentInput.type === EInputType.dropdown)
      return (
        <select value={18} onChange={handleSelect} className="input-select">
          {Array.from(Array(40 - 18 + 1).keys(), (_, i) => i + 18).map(
            (option, index) => (
              <option key={index} value={option}>
                {`Age: ${option} yrs`}
              </option>
            )
          )}
        </select>
      );
  }
  return <></>;
};

export default InputComponent;
