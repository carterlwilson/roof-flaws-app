import image from './map-image.png';
import './App.css';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import { useRef, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { CardContent, Card, Typography, Stack, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function App() {
  const [annotations, setAnnotations] = useState([]);
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
    setAnnotations(annotations.concat(
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

  const hoverOverCard = (e, index) => {
    annotations[index].color = "#4A89F3";
    setAnnotations([...annotations]);
  }

  const leaveHoverOverCard = (index) => {
    annotations[index].color = "white";
    setAnnotations([...annotations]);
  }

  const hoverOverAnnotation = (index) => {
    annotations[index].color = "#4A89F3";
    setAnnotations([...annotations]);
  }

  const leaveHoverOverAnnotation = (index) => {
    annotations[index].color = "white";
    setAnnotations([...annotations]);
  }

  const deleteAnnotation = (index) => {
    annotations.splice(index, 1);
    setAnnotations([...annotations]);
  }

  const onChangeNewTitle = (e) => {
    setTitle(e.target.value);
  }

  const onChangeNewDescription = (e) => {
    setDescription(e.target.value);
  }

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={8}>
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
                src={image} 
                className="App-logo" alt="logo"/>
                {
                  annotations.map((annotation, index) => (
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
          </Grid>
          <Grid item xs={4}>
            <Stack spacing={2}>
              {
                annotations.map((annotation, index) => (
                  <Card 
                  onMouseEnter={(e) => hoverOverCard(e, index)}
                  onMouseLeave={() => leaveHoverOverCard(index)}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {annotation.title}
                      </Typography>
                      <Typography variant="body2">
                        {annotation.description}
                      </Typography>
                      <Button 
                      variant="outlined"
                      onClick={() => deleteAnnotation(index)}>Delete</Button>
                    </CardContent>
                  </Card>
                ))
              }
            </Stack>
          </Grid>
      </Grid>
    </div>
  );
}

export default App;
