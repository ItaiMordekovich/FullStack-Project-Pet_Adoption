import { Switch, Typography } from "@mui/material";
import React, { useState } from "react";
import AdvSearch from "./AdvSearch";
import BasicSearch from "./BasicSearch";

const SearchWrapper = () => {
  const [toggleAdvSearch, setToggleAdvSearch] = useState(false);
  const [petType, setPetType] = useState()
  return (
    <div className="centered_content">
      <BasicSearch isAdvOn={toggleAdvSearch} setPetTypeForAdv={setPetType} />
      <div>
        <Typography style={{ display: "inline" }}>
        Advanced Search 
        </Typography>
        <Switch
          checked={toggleAdvSearch}
          onChange={(e) => setToggleAdvSearch(e.target.checked)}
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
      </div>
      <AdvSearch petType={petType} toggleState={toggleAdvSearch} />
    </div>
  );
};

export default SearchWrapper;
