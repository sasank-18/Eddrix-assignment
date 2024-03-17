import { Button, Checkbox } from "antd";
import useFetchUserData from "../hooks/useFetchUserData";
import { useEffect, useState } from "react";
import ShowTable from "./ShowTable";
import Map from "./Map";

const TableRenderer = () => {
  const [checkedValue, setCheckedValue] = useState();
  const [column, setColumn] = useState();
  const [clicked, setClicked] = useState(false);
  const [geoLocation, setGeoLocation] = useState(false);
  const data = useFetchUserData();

  const onchangeCheckBox = (checkedValues) => {
    setCheckedValue(checkedValues);
  };

  const onSubmitCheckBox = () => {
    const Columns = checkedValue.map((col) => {
      return {
        title: col.toUpperCase(),
        dataIndex: col,
        key: col,
        render: (content) => {
          if (col === "id") return <div>{content}</div>;
          else if (col === "name") return <div>{content}</div>;
          else if (col === "username") return <div>{content}</div>;
          else if (col === "email")
            return <div className="text-blue-600">{content}</div>;
          else if (col === "phone") return <div>{content}</div>;
          else if (col === "website") return <div>{content}</div>;
          else if (col === "address") {
            return (
              <div>
                <div>
                  {content?.street} ,{content?.suite} ,{content?.city} ,
                  {content?.zipcode}
                </div>

                <button
                  className="bg-blue-500 text-xs active:bg-blue-400 rounded-md text-white my-1 px-2 py-1"
                  type="primary"
                  onClick={() => {
                    document.getElementById("mapselect").classList.add("add");
                    setGeoLocation(geo);
                  }}
                >
                  View on Map
                </button>
              </div>
            );
          } else if (col === "company") {
            return (
              <div>
                <div className="font-bold">{content?.name}, </div>
                <div>
                  {content?.catchPhrase}, {content?.bs}
                </div>
              </div>
            );
          }
        },
      };
    });

    setColumn(Columns);
    setClicked(true);
  };

  if (!data) return;
  const titleData = Object.keys(data[0]);

  return (
    <div className="lg:px-32 sm:px-6 h-auto w-full relative">
      <div className="flex  mt-4 flex-col h-20 justify-center items-start gap-y-5">
        <Checkbox.Group
          className=""
          options={titleData}
          onChange={onchangeCheckBox}
        />

        <Button
          className="bg-blue-500 "
          onClick={onSubmitCheckBox}
          type="primary"
        >
          submit
        </Button>
      </div>

      {clicked && <ShowTable col={column} data={data} />}

      <div
        id="mapselect"
        className="  fixed hidden  z-10 top-[9rem] left-[25%] lg:left-[37%]"
      >
        <button
          onClick={() => {
            document.getElementById("mapselect").classList.remove("add");
          }}
          className="px-3 py-1  text-white bg-black "
        >
          ✕
        </button>
        <Map geoLocation={geoLocation} />
      </div>
    </div>
  );
};

export default TableRenderer;
