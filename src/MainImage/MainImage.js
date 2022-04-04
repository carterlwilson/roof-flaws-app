import './MainImage.css'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import { useState, useRef } from 'react';
import { Typography, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function MainImage(props) {
    const [open, setOpen] = useState(false);
    const [newAnnotationXPosition, setNewX] = useState();
    const [newAnnotationYPosition, setNewY] = useState();
    const [newAnnotationTitle, setTitle] = useState();
    const [newAnnotationDescription, setDescription] = useState();
    const imageContainerRef = useRef();

    function onImageClick(e) {
        if (open == false) {
            handleClickOpen();
            const offsetX = imageContainerRef.current.offsetLeft;
            const offsetY = imageContainerRef.current.offsetTop;
            const xPosition = e.pageX - offsetX;
            const yPosition = e.pageY - offsetY;
            setNewX(xPosition);
            setNewY(yPosition);  
        }
    }

    const handleDialogCancel = () => {
        setOpen(false);
      }
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        props.setAnnotations(props.annotations.concat(
            {
            xPosition: newAnnotationXPosition, 
            yPosition: newAnnotationYPosition, 
            color: "white",
            title: newAnnotationTitle,
            description: newAnnotationDescription
            }));
        setOpen(false);
        console.log(open);
    };

    const onChangeNewTitle = (e) => {
        setTitle(e.target.value);
      }
    
    const onChangeNewDescription = (e) => {
        setDescription(e.target.value);
    }

    const hoverOverAnnotation = (index) => {
        props.annotations[index].color = "#4A89F3";
        props.setAnnotations([...props.annotations]);
      }
    
    const leaveHoverOverAnnotation = (index) => {
        props.annotations[index].color = "white";
        props.setAnnotations([...props.annotations]);
    }

    return (
        <div className="image-container" 
        onClick={onImageClick} 
        ref={imageContainerRef}>
          <Dialog open={open} onClose={handleDialogCancel}>
            <DialogTitle>Flaw Information</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Title"
                type="text"
                fullWidth
                variant="standard"
                onChange={onChangeNewTitle}
              />
              <TextField
                autoFocus
                margin="dense"
                id="description"
                label="Description"
                type="text"
                fullWidth
                variant="standard"
                onChange={onChangeNewDescription}
                multiline
                maxRows={4}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogCancel}>Cancel</Button>
              <Button onClick={handleClose}>Subscribe</Button>
            </DialogActions>
          </Dialog>
          <img 
          src={props.image} 
          className="App-logo" alt="logo"/>
          {
            props.annotations.map((annotation, index) => (
              <div 
              className='annotation-container'
              onMouseEnter={() => hoverOverAnnotation(index)}
              onMouseLeave={() => leaveHoverOverAnnotation(index)}
              style={{ top: annotation.yPosition, left: annotation.xPosition }} >
                <div className='annotation-inner-container'>
                  <ChatBubbleIcon 
                  className='annotation-icon'
                  fontSize='large'
                  style={{ color: annotation.color }}/>
                  <Typography className='annotation-index'>
                    {index + 1}
                  </Typography>
                </div>
              </div>
            ))
          }
      </div>
    )
}