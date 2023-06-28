import { Table, styled, TableHead, TableCell, TableBody, TableContainer, Paper, TableRow, tableCellClasses } from '@mui/material';
import Header from "../../components/header/header";
import { CertificationContext } from '../../contexts/certification_context';
import { useContext, useEffect, useState } from 'react';
import { Certification, CertificationContextType } from '../../models/certification';
import './admin.scss';
import ModalImage from '../../components/modal_image/modal_image';
import TextModal from '../../components/text_modal/text_modal';
import getAxiosInstanceCustom from '../../connection/axios_connection';
import { User } from '../../models/user';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const AdminPage = () : JSX.Element => {
    const {certifications} = useContext<CertificationContextType>(CertificationContext);
    const [myCertifications, setMyCertifications] = useState<Certification[]>(certifications);
    const [close, setClose] = useState<boolean>(false);
    const [closeId, setCloseId] = useState<boolean>(false);
    const [closeText, setCloseText] = useState<boolean>(false);
    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
      const jwt = localStorage.getItem('jwt');
      if(!jwt){
        navigate('/home');
      }
      const user: any = jwtDecode(jwt as string);
      if(user.role !== 'admin'){
        navigate('/home');
      }
    }, [navigate]);
    
    
    useEffect(() => {
        setMyCertifications(certifications);
    },[certifications]);
    
    
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

      const handleOnClose = () => {
        setClose(!close);
      };
      const handleOnCloseId = () => {
        setCloseId(!closeId);
      };
      const handleOnCloseText = () => {
        setCloseText(!closeText);
      };


      const handleDecline = (id: string) => {
        try{
          getAxiosInstanceCustom().post(`certification/delete/${id}`);

          const myNewCertifications = myCertifications.filter((cer) => cer._id !== id);
          setMyCertifications(myNewCertifications);
        }
        catch (error) {

        }
      }

    
      const handleAccept = (username: string, role: string, id: string) => {
        try{
          const newRole: Partial<User> = {role: role};
          getAxiosInstanceCustom().post(`/user/update/role/${username}`, newRole);
          console.log(newRole);
          handleDecline(id);
        } catch(error){
          console.error("can't")
        }
      }

    return (<div className="admin">
        <Header/>
        <div className="admin_container">
        <div className="table">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Username</StyledTableCell>
                                    <StyledTableCell align="center">About</StyledTableCell>
                                    <StyledTableCell align="center">Certificate</StyledTableCell>
                                    <StyledTableCell align="center">ID</StyledTableCell>
                                    <StyledTableCell align="center"></StyledTableCell>
                                    <StyledTableCell align="center"></StyledTableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                    {myCertifications.map((c, key) => {
                                        return <StyledTableRow key={key}>
                                            <StyledTableCell align="center">{c.username}</StyledTableCell>
                                            <StyledTableCell align="center"><p className='admin_link' onClick={handleOnCloseText}>View</p></StyledTableCell>
                                            {closeText && <TextModal text={c.aboutYou} onClose={handleOnCloseText}/>}
                                            <StyledTableCell align="center"><img className='admin_image' onClick={handleOnClose} src={c.certificate} alt='certificate'></img></StyledTableCell>
                                            {close && <ModalImage imageUrl={c.certificate} onClose={handleOnClose} />}
                                            <StyledTableCell align="center"><img className='admin_image' onClick={handleOnCloseId} src={c.idImage} alt='id'></img></StyledTableCell>
                                            {closeId && <ModalImage imageUrl={c.idImage} onClose={handleOnCloseId} />}
                                            <StyledTableCell align="center"><button className='admin_button' onClick={() => {handleDecline(c._id)}}>Decline</button></StyledTableCell>
                                            <StyledTableCell align="center" ><button className='admin_button_a' onClick={() =>{handleAccept(c.username, c.role, c._id)}}>Accept</button></StyledTableCell>
                                        </StyledTableRow>
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
        </div>
    </div>);
}

export default AdminPage;