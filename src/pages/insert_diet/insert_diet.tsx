import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

export type Diet = {
  title: string;
  type: string[];
  imgSource: string;
  miniDescription: string;
  mainDescription: string;
  howWork: string;
  menuIdea: {
    breakfast: string[];
    launch: string[];
    dinner: string[];
    snack: string[];
    eatingOut: string[];
  };
  shoppingIdeas: string[];
};

const CreateDietPage: React.FC = () => {
  const [diet, setDiet] = useState<Diet>({
    title: '',
    type: [],
    imgSource: '',
    miniDescription: '',
    mainDescription: '',
    howWork: '',
    menuIdea: {
      breakfast: [],
      launch: [],
      dinner: [],
      snack: [],
      eatingOut: [],
    },
    shoppingIdeas: [],
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDiet((prevDiet) => ({
      ...prevDiet,
      [name]: value,
    }));
  };

  const handleMenuIdeaChange = (event: React.ChangeEvent<HTMLInputElement>, mealType: keyof Diet['menuIdea']) => {
    const { value } = event.target;
    setDiet((prevDiet) => ({
      ...prevDiet,
      menuIdea: {
        ...prevDiet.menuIdea,
        [mealType]: value.split(',').map((item) => item.trim()),
      },
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(diet); // You can perform further actions here, such as sending the data to an API
  };

  return (
    <div>
      <h2>Create Diet</h2>
      <form onSubmit={handleSubmit}>

        <TextField
          label="Title"
          name="title"
          value={diet.title}
          onChange={handleInputChange}
          required
          fullWidth
        />

        <TextField
          label="Type"
          name="type"
          value={diet.type}
          onChange={handleInputChange}
          required
          fullWidth
        />
        <TextField
          label="Image Source"
          name="imgSource"
          value={diet.imgSource}
          onChange={handleInputChange}
          required
          fullWidth
        />

        <TextField
          label="Mini Description"
          name="miniDescription"
          value={diet.miniDescription}
          onChange={handleInputChange}
          required
          fullWidth
        />

        <TextField
          label="Main Description"
          name="mainDescription"
          value={diet.mainDescription}
          onChange={handleInputChange}
          required
          fullWidth
        />

        <TextField
          label="How It Works"
          name="howWork"
          value={diet.howWork}
          onChange={handleInputChange}
          required
          fullWidth
        />

        <TextField
          label="Breakfast Menu Idea"
          name="breakfast"
          value={diet.menuIdea.breakfast}
          onChange={(e: any) => handleMenuIdeaChange(e, 'breakfast')}
          required
          fullWidth
        />

        <TextField
          label="Launch Menu Idea"
          name="launch"
          value={diet.menuIdea.launch}
          onChange={(e: any) => handleMenuIdeaChange(e, 'launch')}
          required
          fullWidth
        />

        <TextField
          label="Dinner Menu Idea"
          name="dinner"
          value={diet.menuIdea.dinner}
          onChange={(e: any) => handleMenuIdeaChange(e, 'dinner')}
          required
          fullWidth
        />

        <TextField
          label="Snack Menu Idea"
          name="snack"
          value={diet.menuIdea.snack}
          onChange={(e: any) => handleMenuIdeaChange(e, 'snack')}
          required
          fullWidth
        />

        <TextField
          label="Eating Out Menu Idea"
          name="eatingOut"
          value={diet.menuIdea.eatingOut}
          onChange={(e: any) => handleMenuIdeaChange(e, 'eatingOut')}
          required
          fullWidth
        />

        <TextField
          label="Shopping Ideas"
          name="shoppingIdeas"
          value={diet.shoppingIdeas}
          onChange={handleInputChange}
          required
          fullWidth
        />

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateDietPage;
