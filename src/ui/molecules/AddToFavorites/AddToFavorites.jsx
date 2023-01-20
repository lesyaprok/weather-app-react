import React from "react";
import FavoriteIcon from "../../atoms/SavedIcon/FavoriteIcon";

const AddToFavorites = ({ onClick, isSaved }) => {
  return (
    <button type="button" className="absolute right-0 top-0" onClick={onClick}>
      <FavoriteIcon isSaved={isSaved} />
    </button>
  );
};

export default AddToFavorites;
