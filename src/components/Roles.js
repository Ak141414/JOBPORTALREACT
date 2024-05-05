import * as React from "react";
import TextField from "@mui/material/TextField";

import Autocomplete from "@mui/material/Autocomplete";

export default function Roles(props) {
  return (
    <Autocomplete
      value={props.filter.jobRole}
      onChange={(event, newValue) => {
        props.setFilter((prevState) => ({
          ...prevState,
          jobRole: newValue,
        }));
      }}
      multiple
      fullWidth
      options={props.jobRole.map((option) => option.jobRole)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Roles"
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
        />
      )}
    />
  );
}
