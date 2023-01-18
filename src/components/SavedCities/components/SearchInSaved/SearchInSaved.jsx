import React, { useEffect, useState } from "react";
import Search from "../../../../ui/atoms/Search/Search";

const SearchInSaved = ({ savedCities, setSaved }) => {
  const [searchedValue, setSearchedValue] = useState("");
  const searchInSaved = () => {
    const filteredCities = savedCities.filter((item) => {
      const savedCity = item.name.toLowerCase();
      return savedCity.startsWith(searchedValue.trim().toLowerCase());
    });
    setSaved(filteredCities);
  };
  useEffect(() => setSaved(savedCities), [savedCities]);
  useEffect(() => searchInSaved(), [searchedValue]);

  return (
    <Search
      placeholder="Search city in saved..."
      value={searchedValue}
      onChange={(e) => setSearchedValue(e.target.value)}
    />
  );
};

export default SearchInSaved;
