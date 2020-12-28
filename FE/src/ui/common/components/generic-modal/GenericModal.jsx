import { React, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Backdrop, Fade } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export const GenericModal = ({ externalOpen, isOpen, onClose, timeoutOnInit, children }) => {
  const classes = useStyles();
  const [stateOpen, setOpen] = useState(false);

  const open = externalOpen ? isOpen : stateOpen;

  useEffect(() => {
    if (!externalOpen) {
      setTimeout(() => setOpen(true), timeoutOnInit || 0);
    }
  }, [timeoutOnInit]);

  const handleClose = () => {
    setOpen(false);
    onClose && onClose();
  };

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
            {children}
        </div>
      </Fade>
    </Modal>
  );
};

GenericModal.defaultProps = {
    externalOpen:false, 
    isOpen:false, 
    timeoutOnInit:0,
    onClose:null
}