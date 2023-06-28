import { useContext, useEffect, useState } from "react";
import Header from "../../components/header/header";
import { Group, GroupContextType } from "../../models/group";
import { GroupContext } from "../../contexts/group_context";
import { User, UserContextType } from "../../models/user";
import { UserContext } from "../../contexts/user_context";
import './chats.scss';
import jwtDecode from "jwt-decode";
import ChatIcon from '@mui/icons-material/Chat';
import { NavigateFunction, useNavigate } from "react-router-dom";
import MessModal from "../../components/mess_modal/mess_modal";

interface Messanger {
    name: string;
    group: Group;
    image: string;
    user: User;
}

const ChatsPage = () : JSX.Element => {
    const {groups} = useContext<GroupContextType>(GroupContext);
    const {users} = useContext<UserContextType>(UserContext);
    const [myGroups, setMyGroups] = useState<Messanger[]>();
    const [me, setMe] = useState<string>();
    const navigate: NavigateFunction = useNavigate();
    const [close, setClose] = useState<boolean>(false);

    useEffect(() => {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) {
        navigate("/login");
      } else {
        const user: any = jwtDecode(jwt as string);
        if (user.role !== "trainer" && user.role !== "nutritionist") {
          navigate("/chats");
        } else {
          setMe(user.username);
          console.log(user.username);
        }
      }
    }, [navigate]);
  
    useEffect(() => {
      if (me) {
        const timer = setTimeout(() => {
          const auxGroups: Group[] = groups.filter((gr) => gr.participants.includes(me));
  
          console.log("gr", auxGroups);
          let auxMess: Messanger[] = [];
  
          if (auxGroups) {
            auxGroups.forEach((gr) => {
              const messenger: Messanger = {
                group: gr,
                name: users.find((u) => u.username === (gr.participants.find((e) => e !== me) as string))?.name as string,
                image: users.find((u) => u.username === (gr.participants.find((e) => e !== me) as string))?.image as string,
                user: users.find((u) => u.username === (gr.participants.find((e) => e !== me) as string)) as User,
              };
              auxMess.push(messenger);
            });
  
            setMyGroups(auxMess);
          }
        }, 1000);
  
        return () => clearTimeout(timer); // Clear the timer if the component unmounts
      }
    }, [groups, me, users]);
    

      const hanldeChat = (group: Group, username: string) => {
        navigate(`/chat/${group._id}/${username}`)
      }
      
      const handleOnClose = () => {
        setClose(!close);
      }


    return (
        <div className="chats">
            <Header/>
            <div className="chats_container">
                <h1>Chat with our users</h1>
                {
                    myGroups?.map(gr => {
                        return<>
                            <div className="item_mess" >
                                {close && <MessModal name={gr.user.name} age={gr.user.age} height={gr.user.height} weight={gr.user.weight} problems={gr.user.problems} onClose={handleOnClose}/>}
                                <img onClick={handleOnClose} className="item_mess_img" src={gr.image} alt="" ></img>
                                <div className="item_mess_container">
                                    <h3 className="mess_name">{gr.name}</h3>
                                    <p>{gr.group.messages[gr.group.messages.length -1].sender === me? 'Me': gr.name}: {gr.group.messages[gr.group.messages.length -1].content}</p>
                                </div>
                                <div onClick={() => {hanldeChat(gr.group, me as string)}}>
                                <ChatIcon className="mess_icon"/>
                                </div>
                            </div>
                        </>;
                    })
                }
            </div>
        </div>
    );
}

export default ChatsPage;