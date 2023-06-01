import { useNavigate } from "react-router-dom";
import "./Enroll.css";
import { SvgBack, SvgNav } from "../../utils/svgs";
import { useEffect, useState } from "react";
import { TMessage } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { alterChatTurn } from "../../store/commonSlice";
import Button from "../../components/Button";

var currentTimeOut: NodeJS.Timeout;
var currentInterval: NodeJS.Timer;
var messageId: number | null;

const Enroll = () => {
  const dispatch = useDispatch();
  const CommonState = useSelector((state: any) => state.common);
  const botMessages: TMessage[] = CommonState.botMessages;
  const chatTurn: string = CommonState.chatTurn;
  const navigate = useNavigate();

  const [messages, setMessages] = useState<TMessage[]>([]);

  const [timeLeft, setTimeLeft] = useState<number>(16);

  const displayMessage = (id: number) => {
    console.log(`em ${id}`);

    currentTimeOut = setTimeout(() => {
      console.log("ran timeout");
      let messagesCopy = [...messages];
      console.log(JSON.stringify(messages));
      messagesCopy = messagesCopy.map((e) => {
        const newObj = Object.assign({}, e);
        if (e.id === id && e.replaceBy) {
          newObj.content = e.replaceBy;
          // alert(`${newObj.content}`);
        }
        return newObj;
      });
      setMessages(messagesCopy);
      if (botMessages.length) dispatch(alterChatTurn()); //messages left
      clearTimeout(currentTimeOut);
    }, 3000);
  };

  useEffect(() => {
    console.log(`running timer: ${timeLeft}s`);
    // alert(`running timer: ${timeLeft}s`);
    if (timeLeft < 16 && timeLeft > 0) {
      console.log(`Now time remaining: ${timeLeft}s`);

      currentInterval = setInterval(() => {
        // alert("setting time bro" + timeLeft);
        setTimeLeft(timeLeft - 1);
        if (currentInterval) clearInterval(currentInterval);
      }, 1000);
    } else if (timeLeft === 0) {
      console.log("closing timeleft " + timeLeft);
      if (currentInterval) clearInterval(currentInterval);
      navigate("success");
    }

    return () => {};
  }, [timeLeft]);

  useEffect(() => {
    console.log("messagees updated bro");
    if (messageId && chatTurn === "bot") displayMessage(messageId);
    return () => {};
  }, [messages]);

  useEffect(() => {
    console.log(chatTurn);
    if (chatTurn === "bot" && botMessages && botMessages.length > 0) {
      const newMessages = [...messages];
      const newMessage = botMessages.at(0);

      if (newMessage) {
        newMessages.push(newMessage);
        setMessages(newMessages);
        // alert("setMessages");
        messageId = newMessage.id;
      }
    } else if (botMessages && botMessages.length === 0) {
      messageId = null;
      setTimeLeft(timeLeft - 1);
      // currentInterval = setInterval(() => {
      //   alert("setting time bro" + timeLeft);
      //   setTimeLeft(timeLeft - 1);
      // }, 1000);
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
        <div className="messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`message sendor-${msg.sender}`}>
              {msg.content}
            </div>
          ))}
        </div>
        {chatTurn === "user" && (
          <div className="user__inputs">
            <Button label="Got it!" actionKey="do-nothing" />
          </div>
        )}
        {timeLeft < 16 && (
          <div className="alert">
            <p>In {timeLeft}s, you will be redirected to Details Page</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Enroll;
