import axios from 'axios';

const apiKey = 'lyzMZJ62xtO3QchkxPN6BONxbxL3apzzXh1KKZmU'; // Replace with your actual API key
const baseURL = 'https://api.nal.usda.gov/fdc/v1';

async function fetchFoodItemDetails(query: string) {
    try {
      const response = await axios.get(`${baseURL}/foods/search?api_key=${apiKey}&pageSize=5&query=${encodeURIComponent(query)}&dataType=${"Survey (FNDDS)"}`);
      return response.data;
    } catch (error) {
      console.error('Error searching for food items:', error);
    }
  }
  

// Call the function to fetch food item details
fetchFoodItemDetails('cheddar cheese');

export default fetchFoodItemDetails;