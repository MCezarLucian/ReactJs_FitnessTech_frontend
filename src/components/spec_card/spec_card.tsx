import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import './spec_card.scss';
import { useContext, useEffect, useState } from "react";
import { User } from '../../models/user';
import { Group, GroupContextType } from '../../models/group';
import { GroupContext } from '../../contexts/group_context';
import jwtDecode from 'jwt-decode';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import getAxiosInstanceCustom from '../../connection/axios_connection';

interface Specialist {
    name: string;
    gender: string;
    age: number;
    username: string;
    image: string;
}



const SpecCard = (props: Specialist): JSX.Element => {
    // const {users} = useContext<UserContextType>(UserContext);
    const {groups} = useContext<GroupContextType>(GroupContext);
    const [grp, setGrp] = useState<Group>();
    const navigate: NavigateFunction = useNavigate();

    const handleChat = () => {
        const jwt = localStorage.getItem('jwt');
        let user: User = jwtDecode(jwt as string);

        if(user){
            const group = groups.find(gr => gr.participants.includes(user.username) && gr.participants.includes(props.username));
            // console.log(group);
            if(group){
                navigate(`/chat/${group._id}/${user.username}`)
            }
            else{
                // console.log(props.username, user.username)
                const newGroup = {
                    participants: [user.username, props.username],
                    messages: []
                }
                const gr = getAxiosInstanceCustom().post('/group', newGroup);
                
                gr.then((res: any) => setGrp(res.data));
                
            }
        }
        
    }

    useEffect(() => {
        if (grp) {
          const jwt = localStorage.getItem('jwt');
          let user: User = jwtDecode(jwt as string);
          navigate(`/chat/${grp._id}/${user.username}`);
        }
      }, [grp, navigate]);


    return (
        <div className="spec_card_container">
                <img className='spec_card_image' src={props.image} alt='a'></img>
                <div className='spec_card_details'>
                    <h3 className="spec_card_name">{props.name}</h3>
                    <p>Gender: &nbsp; {props.gender}</p>
                    <p>Age: &nbsp; {props.age}</p>
                    <button onClick={handleChat} className='spec_card_button'>
                        <ChatBubbleOutlineIcon></ChatBubbleOutlineIcon>
                        Chat
                    </button>
                </div>
        </div>
    );
}

export default SpecCard;