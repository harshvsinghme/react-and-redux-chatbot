import { Link, useNavigate } from "react-router-dom";
import "./Success.css";
import { SvgHome, SvgNav } from "../../utils/svgs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetEverything } from "../../store/commonSlice";
import { TMessage } from "../../utils/types";

const Success = () => {
  const dispatch = useDispatch();
  const CommonState = useSelector((state: any) => state.common);
  const botMessages: TMessage[] = CommonState.botMessages;
  const { userName, userAge }: { userName: string; userAge: number } =
    CommonState;

  const navigate = useNavigate();

  useEffect(() => {
    if (botMessages && botMessages.length > 0) navigate("/");
    return () => {
      if (botMessages && botMessages.length === 0) {
        dispatch(resetEverything());
      }
    };
  }, [botMessages]);

  return (
    <div className="success">
      <div className="content">
        <div className="nav">
          <div>
            <img
              src="https://img.freepik.com/free-vector/student-with-laptop-studying-online-course_74855-5293.jpg?w=826&t=st=1685560128~exp=1685560728~hmac=2d75c9bded30df7e82ce69f67d53e9790a8cc8b105a3e02776e61359e364fd46"
              alt="logo"
            />
          </div>
          <div>
            <SvgNav />
          </div>
        </div>
        <div className="utilities">
          <Link to="/">
            <SvgHome />
          </Link>
        </div>
        <div className="block">
          <p className="msg">
            Successfully Registered <span>:)</span>
          </p>
          <p className="heading">Here are your details</p>
          <p className="name">Name: {userName}</p>
          <p className="age">Age: {userAge} yrs</p>
        </div>
      </div>
    </div>
  );
};

export default Success;
