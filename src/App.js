//import image from './map-image.png';
import './App.css';
import { useRef, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import MainImage from './MainImage/MainImage';
import AnnotationCards from './AnnotationCards/AnnotationCards';

function App() {
  const [annotations, setAnnotations] = useState([]);
  const [open, setOpen] = useState(false);
  const [newAnnotationXPosition, setNewX] = useState();
  const [newAnnotationYPosition, setNewY] = useState();
  const [newAnnotationTitle, setTitle] = useState();
  const [newAnnotationDescription, setDescription] = useState();
  const [image, setImage] = useState();
  const imageContainerRef = useRef();

  const printPdf = (e) => {
    window.print();
  }

  const handleOnChange = e => {
    if (FileReader) {
      var fr = new FileReader();
      fr.onload = function () {
          setImage(fr.result);
      }
      fr.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    //if await is removed, console log will be called before the uploadFile() is executed completely.
    //since the await is added, this will pause here then console log will be called
    //let res = await uploadFile(file);
    //console.log(res.data);
    console.log('test')
  };

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={12}>
            <MainImage 
            annotations={annotations}
            setAnnotations={setAnnotations}
            image={image}/>
          </Grid>
          <Grid item xs={12}>
            <AnnotationCards
            annotations={annotations}
            setAnnotations={setAnnotations}/>
          </Grid>
      </Grid>
      <Button onClick={printPdf}>
        print pdf
      </Button>
      <div>
        <form onSubmit={handleSubmit}>
          <h1>React File Upload</h1>
          <input type="file" onChange={handleOnChange} />
          <button type="submit">Upload File</button>
        </form>
      </div>
    </div>
  );
}

export default App;
