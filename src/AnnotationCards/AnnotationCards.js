import { CardContent, Card, Typography, Stack, Button } from '@mui/material';

export default function AnnotationCards(props) {

    const leaveHoverOverCard = (index) => {
        props.annotations[index].color = "white";
        props.setAnnotations([...props.annotations]);
    }

    const hoverOverCard = (e, index) => {
        props.annotations[index].color = "#4A89F3";
        props.setAnnotations([...props.annotations]);
    }

    const deleteAnnotation = (index) => {
        props.annotations.splice(index, 1);
        props.setAnnotations([...props.annotations]);
    }

    return(
        <Stack spacing={2}>
            {
                props.annotations.map((annotation, index) => (
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
    )
}