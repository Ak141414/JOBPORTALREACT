import * as React from "react";
import TextField from "@mui/material/TextField";

import Autocomplete from "@mui/material/Autocomplete";

export default function CompanyName(props) {
  return (
    <Autocomplete
      value={props.filter.companyName}
      onChange={(event, newValue) => {
        props.setFilter((prevState) => ({
          ...prevState,
          companyName: newValue,
        }));
      }}
      multiple
      fullWidth
      options={props.companyNames.map((option) => option.companyName)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Company Name"
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
        />
      )}
    />
  );
}
