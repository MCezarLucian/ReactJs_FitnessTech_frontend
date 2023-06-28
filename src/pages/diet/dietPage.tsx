import Header from "../../components/header/header";
import "./diet.scss";

import { Diet } from "../../models/diet";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const DietPage = (): JSX.Element => {
    let diet: Diet = {
        _id: "",
        title: "",
        type: [],
        imgSource: "",
        miniDescription: "",
        mainDescription: "",
        howWork: "",
        menuIdea: {
            breakfast: [],
            launch: [],
            dinner: [],
            snack: [],
            eatingOut: [],
        },
        shoppingIdeas: [],
    };
    const navigate: NavigateFunction = useNavigate();
    
    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if(!jwt){
          navigate('/login');
        }
      }, [navigate]);

    const aux = sessionStorage.getItem('diet');
    if(aux !== null){
        diet = JSON.parse(aux);
    }

    console.log(diet);

    return (
        <div className="diet_page">
            <Header></Header>
            <div className="diet_page_main">
                <img className="diet_img" src={diet.imgSource} alt="img"></img>
                <div className="diet_page_main_v2">
                    <h1 className="diet_page_title">{diet.title}</h1>
                    <p className="diet_page_content">{diet.miniDescription}</p>
                    <h2 className="diet_page_header">What is {diet.title}?</h2>
                    <p className="diet_page_content">{diet.mainDescription}</p>
                    <h2 className="diet_page_header">How does it work?</h2>
                    <p className="diet_page_content">{diet.howWork}</p>
                    <h2 className="diet_page_header">There is a menu idea</h2>
                    <h3 className="diet_page_menu_h3">Breakfast</h3>
                    <p className="diet_page_content_item">{diet.menuIdea.breakfast.map((element, key) => {
                        return <li key={key} className="diet_page_content_item">{element}</li>;
                    }
                    )}</p>
                    <h3 className="diet_page_menu_h3">Launch</h3>
                    <p className="diet_page_content_item">{diet.menuIdea.launch.map((element, key) => {
                        return <li key={key} className="diet_page_content_item">{element}</li>;
                    }
                    )}</p>
                    <h3 className="diet_page_menu_h3">Dinner</h3>
                    <p className="diet_page_content_item">{diet.menuIdea.dinner.map((element, key) => {
                        return <li key={key} className="diet_page_content_item">{element}</li>;
                    }
                    )}</p>
                    <h3 className="diet_page_menu_h3">Snack</h3>
                    <p className="diet_page_content_item">{diet.menuIdea.snack.map((element, key) => {
                        return <li key={key} className="diet_page_content_item">{element}</li>;
                    }
                    )}</p>
                    <h3 className="diet_page_menu_h3">Eating Out</h3>
                    <p className="diet_page_content_item">{diet.menuIdea.eatingOut.map((element, key) => {
                        return <li key={key} className="diet_page_content_item">{element}</li>;
                    }
                    )}</p>
                    <h2 className="diet_page_header">Shopping ideas</h2>
                    {diet.shoppingIdeas.map((element, key) => {
                        return <li key={key} className="diet_page_content_item">{element}</li>
                    })}
                    <div className="border"></div>
                </div>
            </div>
        </div>
    );
}

export default DietPage;