import "./Message.css";
import { format } from "timeago.js";
import imagee from '../../assets/avatar.jpg';


export default function Message({ message, own, image  }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={image || imagee}
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}