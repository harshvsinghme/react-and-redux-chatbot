import { useDispatch, useSelector } from "react-redux";
import { alterChatTurn } from "../store/commonSlice";

const Button = ({ label, actionKey }: { label: string; actionKey: string }) => {
  const dispatch = useDispatch();
  const CommonState = useSelector((state: any) => state.common);

  const handleClick = () => {
    if (actionKey === "do-nothing") {
      dispatch(alterChatTurn());
    }
  };

  return (
    <button className="btn-component" onClick={handleClick}>
      {label}
    </button>
  );
};

export default Button;
