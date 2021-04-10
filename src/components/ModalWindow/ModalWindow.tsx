import React from 'react';
import { Modal, Backdrop, Fade } from '@material-ui/core';
import { timeout } from '../../constants';
import { IModalProps } from './types';
import useStyles from './styles';

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
        BackdropProps={{ timeout }}>
        <Fade in={props.open}>
          <>
            {props.isText && (
              <div className={classes.paper}>
                <p id="transition-modal-description">{props.text}</p>
              </div>
            )}
            {!props.isText && props.table}
          </>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalWindow;
