import React from 'react';
import { makeStyles, Modal, Backdrop, Fade } from '@material-ui/core';
import { IModalProps } from './types';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ModalWindow: React.FC<IModalProps> = (props: IModalProps) => {
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 1000 }}>
        <Fade in={props.open}>
          <div className={classes.paper}>
            <p id="transition-modal-description">{props.text}</p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalWindow;
