import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function Minbasepay(props) {
  return (
    <Autocomplete
      value={props.filter.salary}
      onChange={(event, newValue) => {
        props.setFilter((prevState) => ({
          ...prevState,
          salary: newValue,
        }));
      }}
      disablePortal
      fullWidth
      id="combo-box-demo"
      options={min_base_pay}
      renderInput={(params) => (
        <TextField {...params} label="Min Base Pay (in Lakhs/Annum)" />
      )}
    />
  );
}

const min_base_pay = [
  "1",
  "5",
  "10",
  "20",
  "30",
  "40",
  "50",
  "60",
  "70",
  "80",
  "90",
  "100",
];
