import React from "react";
import Button from "../../atoms/Button/Button";
import Input from "../../atoms/Input/Input";

const SearchForm = ({ onChange, onClick, onKeyDown, cityName }) => {
  return (
    <div className="max-w-fit flex">
      <Input onChange={onChange} onKeyDown={onKeyDown} cityName={cityName} />
      <Button onClick={onClick}>Search</Button>
    </div>
  );
};

export default SearchForm;
