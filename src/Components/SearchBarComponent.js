import { React, useState } from "react";
import { Button, Flex, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const SearchBarComponent = ({ setWeatherData }) => {
  const [searchString, setSearchString] = useState("");
  const handleChange = async (event) => {
    setSearchString(event.target.value);
  };

  return (
    <div>
      <Flex>
        <Input
          style={{ margin: "10px", fontSize: "1.2em" }}
          placeholder="Search location"
          onChange={handleChange}
        />
        <Button
          style={{ margin: "10px" }}
          type="primary"
          onClick={() => setWeatherData(searchString)}
        >
          Go
        </Button>
      </Flex>
    </div>
  );
};

export default SearchBarComponent;
