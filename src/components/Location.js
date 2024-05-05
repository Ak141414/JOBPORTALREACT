import * as React from "react";
import TextField from "@mui/material/TextField";

import Autocomplete from "@mui/material/Autocomplete";

export default function Locations(props) {
  return (
    <Autocomplete
      value={props.filter.location}
      onChange={(event, newValue) => {
        props.setFilter((prevState) => ({
          ...prevState,
          location: newValue,
        }));
      }}
      fullWidth
      multiple
      options={props.locations.map((option) => option.location)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Locations"
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
        />
      )}
    />
  );
}
