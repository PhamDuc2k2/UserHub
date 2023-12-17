import { useEffect, useState } from "react";

import { Box, Button, Typography } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from "@mui/material/Avatar";
import { deepPurple } from '@mui/material/colors';
import { DataGrid } from '@mui/x-data-grid';

import { useNavigate } from "react-router-dom";

import axios from "axios";


export default function Home() {
    const navigate = useNavigate()
    const[loading, setLoading] = useState(true) 
    const [dataApi, setDataApi] = useState([])
    var dataRegisterLocal = JSON.parse(localStorage.getItem("dataRegister"))
    useEffect(() => {
        if(!dataRegisterLocal) {
            navigate("/register")
        }

        try {
            const res = axios.get("https://64ec9d92f9b2b70f2bfaa870.mockapi.io/users")
        res.then(data => {
            setDataApi(data.data)
        })
        setTimeout(() => {
            setLoading(false)
        }, 3000)
        } catch (error) {
            
        }
        
    }, [])

    const handleLogout = () => {
        navigate("/login")
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        {
          field: 'age',
          headerName: 'Age',
          type: 'number',
          width: 90,
        },
        {
          field: 'email',
          headerName: 'Email',
          width: 160,
        },
        {
            field: 'address',
            headerName: 'EmaAddress',
            width: 160,
          },
      ];
      

    return (
        <>
            {
                loading ? <Box
                sx={{position: "absolute",top: "50%",  left: "50%", transform: "translate(-50%, -50%)"}}
            >
                <CircularProgress/> 
            </Box> :
            <>
                <Box sx={{display:"flex", justifyContent:"flex-end", alignItems:"center", paddingTop : "30px", paddingRight : "20px"}}>
                    <Avatar sx={{ bgcolor: deepPurple[500] }}>
                        {dataRegisterLocal.firstName.charAt(0) + dataRegisterLocal.lastName.charAt(0)}
                    </Avatar>
                    <Typography sx={{marginRight:"40px", marginLeft : "20px"}}>
                        {dataRegisterLocal.firstName + " " + dataRegisterLocal.lastName}
                    </Typography>
                    <Button onClick={handleLogout} variant="contained" sx={{textTransform : "uppercase"}}>
                        log out
                    </Button>
                </Box>
                <Box style={{ height: 400, width: '100%', marginTop : "30px" }}>
                    <DataGrid
                        rows={dataApi}
                        columns={columns}
                        initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                        }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                    />
                </Box>
            </>
            }
        </>
    )
}