import Typography from '@mui/material/Typography';
import { Link, useNavigate } from "react-router-dom";


export default function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="https://www.facebook.com/ducpham.javalorant">
                COFFEE PAGE
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}