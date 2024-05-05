import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function MediaCard(props) {
  return (
    <Card sx={{ width: 345 }}>
      <CardMedia sx={{ height: 140, width: 140 }} image={props.logoUrl} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.companyName}
        </Typography>
        <Typography variant="button" display="block" gutterBottom>
          {props.jobRole}
        </Typography>
        <Typography variant="h5" display="block" gutterBottom>
          {props.location}
        </Typography>
        <Typography>Maximum pay {props.maxJdSalary} L</Typography>
        <Typography>
          Experience {props.minExp} - {props.maxExp}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.jobDetailsFromCompany}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={props.jdLink}>
          Apply Now
        </Button>
      </CardActions>
    </Card>
  );
}
