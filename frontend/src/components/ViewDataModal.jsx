import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import HomeDataTable from './HomeDataTable';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1200,
  height:'100%',
  overflow:'scroll',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const ViewDataModal = ({showModal, setShowModal ,processData}) => {
  const handleClose = () => setShowModal(!showModal);

    return (
        <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={showModal}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={showModal}>
              <Box sx={style}>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                  Text in a modal
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  <HomeDataTable rows={processData} />
                </Typography>
              </Box>
            </Fade>
          </Modal>
        </div>
    );
};

export default ViewDataModal;