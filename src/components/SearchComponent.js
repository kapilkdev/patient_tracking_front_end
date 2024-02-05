import React from "react";
import { Button } from "react-bootstrap";

const SearchComponent = ({ onSearch, onCloseOpportunityModal }) => {
  const [searchInput, setSearchInput] = React.useState("");

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchInput);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Search...."
        value={searchInput}
        onChange={handleInputChange}
        style={{
          padding: "10px",
          marginRight: "10px",
          borderRadius: "70px",
          border: "1px solid #ccc",
          width: "300px",
        }}
      />
      <Button
        variant="dark"
        onClick={handleSearch}
        style={{
          backgroundColor: "#343a40",
          color: "#ffffff",
          padding: "10px",
          borderRadius: "10px",
          border: "1px solid #343a40",
        }}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchComponent;
