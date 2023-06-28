import { IconButton, InputBase, Paper } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import Header from '../../components/header/header';
import SearchIcon from '@mui/icons-material/Search';
import fetchFoodItemDetails from '../../connection/axios_food';
import FoodModal from '../../components/food_modal/food_modal';
import './calculator.scss';
import { NavigateFunction, useNavigate } from 'react-router-dom';

interface Item {
    name: string;
    value: number;
}

const KcalCalculatorPage: React.FC = () => {
    const [receipes, setReceipes] = useState<any[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [open, setOpen] = useState<boolean>(false);
    const [data, setData] = useState<any>();
    const [items, setItems] = useState<Item[]>([])
    const [sum, setSum] = useState<number>(0);
    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if(!jwt){
          navigate('/login');
        }
      }, [navigate]);

    const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value; // Get the input value from the event
        setInputValue(inputValue);
        const fetchedData = await fetchFoodItemDetails(inputValue);
        const foods = fetchedData?.foods || []; // Extract 'foods' from the fetched data, or provide an empty array as a default
        setReceipes(foods);
        console.log(receipes);
    };

    const handleFoodValue = (val: number) => {
        const itm = (data?.foodNutrients[3].value as number) * val / 100;
        setSum(sum + itm);
        const newItm: Item = {
            name: data?.description,
            value: itm,
        }
        setItems((prevArray) => [...prevArray as Item[], newItm]);
    }

    const handleModalClose = () => {
        setOpen(!open);
    };
    
    const handleReset = () => {
        setItems([]);
        setSum(0);
    }
  
    return (
        <div className='kcal_container'>
            <Header />

            <div className="receips_page">
                <div className="receips_page_main">
                    <h1 className="h1_m"> Search a dish you want!</h1>
                    <Paper
                        className="paper"
                        component="form"
                        sx={{
                        p: '2px 4px',
                        display: 'flex',
                        alignItems: 'center',
                        width: 400,
                        justifyContent: 'center'
                        }}
                    >
                        <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search a recipe"
                        value={inputValue}
                        onChange={handleInputChange}
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                        </IconButton>
                    </Paper>
                    <ul className="items">
                        {receipes.map((e, key) => (
                        <li
                            className="list_item"
                            onClick={() => {
                            setData(e);
                            handleModalClose();
                            }}
                            key={key}
                        >
                            &nbsp; {e.description}
                        </li>
                        ))}
                    </ul>
                    {open && <FoodModal food={data.description} onFoodSelect={handleFoodValue} onClose={handleModalClose}></FoodModal>}
                </div>
                <div className='kcal_items_container'>
                    <ul className='kcal_items'>
                        {
                            items.map((e, key) => (
                                <li className='kcal_item' key={key}>{e.name}: &nbsp; {e.value.toFixed(0)} kcal</li>
                            ))
                        }
                    </ul>
                    <p className='kcal_total'>Total: {sum.toFixed(0)} kcal</p>
                    <div className='kcal_button_container'>
                    <button className='kcal_button' onClick={handleReset}>Reset</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KcalCalculatorPage;
