import React from "react";
import { Snackbar, Alert, AlertTitle } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

type Props = {
  open: boolean;
  error: string;
  handleClose: (event: React.MouseEvent<HTMLDivElement>) => void;
};
const ErrorSnackbar: React.FC<Props> = ({ open, error, handleClose }) => {
  return (
    <>
      <Snackbar
        open={open}
        onClose={(event) =>
          handleClose(event as React.MouseEvent<HTMLDivElement>)
        }
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="error"
          action={
            <div
              onClick={(event) => handleClose(event)}
              style={{ cursor: "pointer" }}
            >
              <ClearIcon />
            </div>
          }
        >
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ErrorSnackbar;
