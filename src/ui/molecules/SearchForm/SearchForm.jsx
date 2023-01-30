import React from "react";
import SearchButton from "../SearchButton/SearchButton";
import Input from "../../atoms/Input/Input";

const SearchForm = ({ onChange, onClick, onKeyDown, cityName, isFound }) => {
  return (
    <div className="max-w-fit flex">
      <Input onChange={onChange} onKeyDown={onKeyDown} cityName={cityName} />
      <SearchButton onClick={onClick} />
      {!isFound && <p className="absolute -bottom-4 text-white text-sm font-light">City not found. Please try again</p>}
    </div>
  );
};

export default SearchForm;
