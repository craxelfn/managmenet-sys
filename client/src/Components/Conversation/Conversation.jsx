import { useEffect, useState } from "react";
import "./Conversation.css";
import axiosInstance from '../../axiosInstance.js' ;
import imagee from '../../assets/avatar.jpg';



export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axiosInstance("api/users?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={
          user?.profilePicture
            ? PF + user.profilePicture
            : imagee
        }
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}