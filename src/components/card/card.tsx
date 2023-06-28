import { Modal, tableCellClasses } from "@mui/material";
import { TrainingPlan } from "../../models/trainingPlan";
import { useState } from "react";
import { Table, styled, TableHead, TableCell, TableBody, TableContainer, Paper, TableRow } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import "./card.scss";

interface CardComponent {
    content?: TrainingPlan; 
}

const Card: React.FC<CardComponent> = (props: CardComponent): JSX.Element => {
    const [open, setOpen] = useState<boolean>(false);

    function openModal(){
        setOpen(!open);
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
    
      console.log(props.content)
    return <>
            <div className="card_main">
                <div className="content">
                    <h2 className="title">{props.content?.name}</h2>
                    <p>Duration: {props.content?.summary.duration} weeks</p>
                    {/* <p className="description">{props.content?.description}</p> */}
                    <p onClick={openModal} className="read_more" >Read More</p>
                </div>
            </div>
            <Modal className="modal" open={open}>
                <div className="modal_main_t">
                    <div className="close" onClick={openModal}><CloseIcon className="close"></CloseIcon></div>
                    <h1 className="modal_title">{props.content?.name}</h1>
                    <p>{props.content?.description}</p>
                    <div className="table">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                <TableRow>
                                    <StyledTableCell>Main Goal</StyledTableCell>
                                    <StyledTableCell align="center">Type</StyledTableCell>
                                    <StyledTableCell align="center">Duration</StyledTableCell>
                                    <StyledTableCell align="center">Training Level</StyledTableCell>
                                    <StyledTableCell align="center">Equipment</StyledTableCell>
                                    <StyledTableCell align="center">Suppliments</StyledTableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                
                                    <StyledTableRow key={props.content?.summary.goal}>
                                    <StyledTableCell component="th" scope="row">
                                        {props.content?.summary.goal}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{props.content?.summary.type}</StyledTableCell>
                                    <StyledTableCell align="center">{props.content?.summary.duration} weeks</StyledTableCell>
                                    <StyledTableCell align="center">{props.content?.summary.trainingLevel}</StyledTableCell>
                                    <StyledTableCell align="center">{
                                    props.content?.summary.equipment.map(suppliment => {
                                        return suppliment + " ";
                                    })
                                    }
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{
                                    props.content?.summary.suppliments.map( suppliment => {
                                        return suppliment + " ";
                                    })
                                    }
                                    </StyledTableCell>
                                    </StyledTableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <h2>There are the exercises for this training:</h2>
                    <ul className="modal_list">
                        {props.content?.exercises.map( exercise => {
                            return <li>{exercise}</li>;
                        })}
                    </ul>
                </div>
            </Modal>
    </>;
}

export default Card;