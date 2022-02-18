import React from "react";
import Snackbar from "@mui/material/Snackbar";
import { useSelector, useDispatch } from "react-redux";
import MuiAlert from "@mui/material/Alert";
import Slide from '@mui/material/Slide';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SimpleSnackbar({open, setOpen, message, severity}) {
  let status = useSelector((state) => state.login.loginSuccess);
  if (open){
    status = open
  } 

  const dispatch = useDispatch();

  function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
  }
  const handleClose = () => {
    dispatch({ type: "SET_LOGIN_SUCCESS", payload: false });
  };
//   const action = (
//     <Alert  severity="success" sx={{ width: "100%" }}>
//      Login Succesful!
//     </Alert>
//   );

  return (
    <div>
      <Snackbar
        open={status}
        autoHideDuration={3000}
        message="Note archived"
        // action={action}
        TransitionComponent={SlideTransition}
        onClose={handleClose}
      >
        <Alert  severity={severity} sx={{ width: "100%" }}>
         {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
