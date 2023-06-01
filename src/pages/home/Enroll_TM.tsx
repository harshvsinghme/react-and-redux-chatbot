import { useNavigate } from "react-router-dom";
import "./Enroll.css";
import { SvgBack, SvgNav } from "../../utils/svgs";

const Enroll = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="enroll">
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
          <SvgBack goBack={goBack} />
        </div>
        <div className="block">enroll</div>
      </div>
    </div>
  );
};

export default Enroll;
