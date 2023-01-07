import React from "react";
import SearchButton from "../SearchButton/SearchButton";
import Input from "../../atoms/Input/Input";

const SearchForm = ({ onChange, onClick, onKeyDown, cityName }) => {
  return (
    <div className="max-w-fit flex">
      <Input onChange={onChange} onKeyDown={onKeyDown} cityName={cityName} />
      <SearchButton onClick={onClick} />
    </div>
  );
};

export default SearchForm;
