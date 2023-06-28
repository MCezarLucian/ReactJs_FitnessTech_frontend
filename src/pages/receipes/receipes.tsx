import { IconButton, InputBase, Modal, Paper } from "@mui/material";
import Header from "../../components/header/header";
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent, useState } from "react";
import fetchFoodItemDetails from "../../connection/axios_food";
import CloseIcon from '@mui/icons-material/Close';
import "./receipes.scss";

const ReceipesPage = (): JSX.Element => {
  const [receipes, setReceipes] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<any>();

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value; // Get the input value from the event
    setInputValue(inputValue);
    const fetchedData = await fetchFoodItemDetails(inputValue);
    const foods = fetchedData?.foods || []; // Extract 'foods' from the fetched data, or provide an empty array as a default
    setReceipes(foods);
    console.log(receipes);
  };

  const openModal = () => {
    setOpen(!open);
    console.log(data);
  };

  return (
    <>
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
                  openModal();
                }}
                key={key}
              >
                &nbsp; {e.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Modal className="modal" open={open}>
        <div className="modal_main">
          <div className="close" onClick={openModal}>
            <CloseIcon className="close" />
          </div>
          <div className="modal_box">
            <h1 className="title">{data?.description}</h1>
            <h2 className="title">Ingredients: </h2>
            <ul className="list_ul">
                {data?.finalFoodInputFoods.map( (e:any, key:any) => 
                    <li className="ll" key={key}>{e.foodDescription} - {e.gramWeight} g;</li>
                )}
            </ul>
            <h2 className="title">Nutrients per 100g: </h2>
            <ul className="list_ul">
                <li className="ll">{data?.foodNutrients[0].nutrientName}: {data?.foodNutrients[0].value} g;</li>
                <li className="ll">{data?.foodNutrients[1].nutrientName}: {data?.foodNutrients[1].value} g;</li>
                <li className="ll">{data?.foodNutrients[2].nutrientName}: {data?.foodNutrients[2].value} g;</li>
                <li className="ll">{data?.foodNutrients[3].nutrientName}: {data?.foodNutrients[3].value} kcal;</li>
            </ul>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ReceipesPage;
