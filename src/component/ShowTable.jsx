import { Input, Table } from "antd";
import { useEffect, useState } from "react";

const ShowTable = ({ col, data }) => {
  const [input, setInput] = useState("");
  const [filterData, setFilterData] = useState(data);

  const filterCol = col.map((col) => col?.title?.toLowerCase());

  const dataOfSelectedCol = data.map((item) => {
    let filteredItem = {};
    filterCol.forEach((key) => {
      filteredItem[key] = item[key];
    });
    return filteredItem;
  });

  const handleInput = (e) => {
    setInput(e.target.value);

    const filterData = dataOfSelectedCol.filter((data) => {
      return Object.values(data)
        .join("")
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setFilterData(filterData);
  };

  useEffect(() => {
    setFilterData;
  }, [col]);

  return (
   
      <div className="overflow-x-scroll my-5">
        <Input value={input} onChange={handleInput} className="mb-3" />
        <Table columns={col} dataSource={filterData} />
      </div>
  
  );
};

export default ShowTable;
