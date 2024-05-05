import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function Experience(props) {
  return (
    <Autocomplete
      value={props.filter.experience}
      onChange={(event, newValue) => {
        props.setFilter((prevState) => ({
          ...prevState,
          experience: newValue,
        }));
      }}
      fullWidth
      disablePortal
      id="combo-box-demo"
      options={experience}
      renderInput={(params) => (
        <TextField {...params} label="Experience (years)" />
      )}
    />
  );
}

const experience = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
];
