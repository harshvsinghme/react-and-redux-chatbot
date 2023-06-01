import { useNavigate } from "react-router-dom";
import "./Enroll.css";
import { SvgBack, SvgNav } from "../../utils/svgs";
import { useEffect, useRef, useState } from "react";
import { TMessage } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, alterChatTurn } from "../../store/commonSlice";
import InputComponent from "../../components/Index";

var currentTimeOut: NodeJS.Timeout;
var currentInterval: NodeJS.Timer;
var messageId: number | null;

const Enroll = () => {
  const dispatch = useDispatch();
  const CommonState = useSelector((state: any) => state.common);
  const botMessages: TMessage[] = CommonState.botMessages;
  const chatTurn: string = CommonState.chatTurn;
  const messages: TMessage[] = CommonState.messages;
  const navigate = useNavigate();

  const messagesRef = useRef<HTMLDivElement>(null);

  const [timeLeft, setTimeLeft] = useState<number>(6);

  const [hideAtTheMoment, setHideAtTheMoment] = useState<any>({});

  const displayMessage = (id: any) => {
    if (!id) return;
    currentTimeOut = setTimeout(() => {
      if (messagesRef.current)
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;

      setHideAtTheMoment({ ...hideAtTheMoment, [id]: false });
      dispatch(alterChatTurn()); //messages left

      clearTimeout(currentTimeOut);
    }, 3000);
  };

  useEffect(() => {
    if (timeLeft < 6 && timeLeft > 0) {
      currentInterval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
        if (currentInterval) clearInterval(currentInterval);
      }, 1000);
    } else if (timeLeft === 0) {
      if (currentInterval) clearInterval(currentInterval);
      navigate("success");
    }

    return () => {};
  }, [timeLeft]);

  useEffect(() => {
    if (messageId && chatTurn === "bot") displayMessage(messageId);
    return () => {};
  }, [messages]);

  useEffect(() => {
    if (chatTurn === "bot" && botMessages) {
      if (botMessages.length > 0) {
        const newMessage: any = botMessages.at(0);

        if (newMessage) {
          dispatch(addMessage(newMessage));
          messageId = newMessage.id;
          if (messageId)
            setHideAtTheMoment({ ...hideAtTheMoment, [messageId]: true });
        }
      } else {
        messageId = null;
        setTimeLeft(timeLeft - 1);
      }
    }
    return () => {};
  }, [chatTurn]);

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
        <div className="messages" ref={messagesRef}>
          {messages.map((msg) => (
            <div key={msg.id} className={`message sendor-${msg.sender}`}>
              {msg.sender === "user" || hideAtTheMoment[msg.id]
                ? msg.content
                : msg.replaceBy}
            </div>
          ))}
        </div>
        {chatTurn === "user" && (
          <div className="user__inputs">
            <InputComponent />
          </div>
        )}
        {timeLeft < 6 && (
          <div className="alert">
            <p>In {timeLeft}s, you will be redirected to Details Page</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Enroll;
