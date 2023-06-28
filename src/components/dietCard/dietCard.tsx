import React from "react";
import { Diet } from "../../models/diet";
import "./dietCard.scss";
import { NavigateFunction, useNavigate } from "react-router-dom";

interface DietCardComponent {
    content?: Diet;
}

const DietCard: React.FC<DietCardComponent> = (props: DietCardComponent): JSX.Element => {
    const navigate: NavigateFunction = useNavigate();
    function handleReadMore(){
        sessionStorage.setItem('diet', JSON.stringify(props.content));
        navigate(`/diet/${props.content?._id}`);
    }
    
    return (
        <div className="diet_card_main">
            <img className="diet_card_image" src={props.content?.imgSource} alt="dietCard"></img>
            <div className="diet_card_content">
                <h1 className="diet_card_title">{props.content?.title}</h1>
                <div className="diet_card_description">{props.content?.miniDescription}</div>
                <p onClick={handleReadMore} className="diet_card_read">Read More</p>
            </div>
        </div>
    );
}

export default DietCard;