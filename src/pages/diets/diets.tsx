import { useContext, useEffect, useState } from "react";
import Header from "../../components/header/header";
import { Diet, DietContextType } from "../../models/diet";
import { DietContext } from "../../contexts/diet_context";
import DietCard from "../../components/dietCard/dietCard";
import "./diets.scss";
import { FormControl, MenuItem, Pagination, Select, SelectChangeEvent } from "@mui/material";
import { NavigateFunction, useNavigate } from "react-router-dom";

const DietsPage = (): JSX.Element => {
    const {diets} = useContext<DietContextType>(DietContext);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [filter, setFilter] = useState<string>();
    const [pageDiets, setPageDiets] = useState<Diet[]>(diets);
    // const [filteredDiets, setFilteredDiets] = useState<Diet[]>();
    const recordsPerPage = 3;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = pageDiets.slice(firstIndex, lastIndex);
    const npage = Math.ceil(pageDiets.length/recordsPerPage);
    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if(!jwt){
          navigate('/login');
        }
      }, [navigate]);

    useEffect(() => {
        if(diets){
            setPageDiets(diets);
        }

        if(filter){
            const myFilteredDiets: Diet[] = diets.filter((diet) => {
                if (!filter) return true; // No filter applied
                return diet.type.includes(filter);
            });
            setPageDiets(myFilteredDiets);
        }
    }, [diets, filter]);

    

    const handlePageChange = (event: any, page: number) => {
        setCurrentPage(page);
      };

      const handleFilterChange = (event: SelectChangeEvent<string>) => {
        setFilter(event.target.value as string);
    }
    

    return (
        <div className="diets_page">
            <Header></Header>
            <div className="diets_page_container">
                <FormControl className="form_diets">
                    {/* <InputLabel id="filter-select-label">Filter by type</InputLabel> */}
                    <Select
                    labelId="filter-select-label"
                    id="filter-select"
                    value={filter}
                    onChange={handleFilterChange}
                    >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="low-carb">Low Carb</MenuItem>
                    <MenuItem value="vegan">Vegan</MenuItem>
                    <MenuItem value="gluten-free">Gluten Free</MenuItem>
                    </Select>
                </FormControl>
                <div className="diets_page_main">
                    {records.map(diet => {
                        return <DietCard content={diet}></DietCard>
                    })}
                </div>
            </div>
            <Pagination className="pagination" count={npage} page={currentPage} onChange={handlePageChange}></Pagination>
        </div>
    );
}

export default DietsPage;