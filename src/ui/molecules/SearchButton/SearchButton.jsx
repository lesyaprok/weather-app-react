import React from "react";
import Button from "../../atoms/Button/Button";
import SearchIcon from "../../atoms/SearchIcon/SearchIcon";

const SearchButton = ({ onClick }) => {
  return (
    <div>
      <Button onClick={onClick} className="hover:bg-opacity-20">
        <SearchIcon />
      </Button>
    </div>
  );
};

export default SearchButton;
