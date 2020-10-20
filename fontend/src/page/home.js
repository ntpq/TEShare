import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { search } from "../action";
import { Button, Select } from "antd";
import { Link } from "react-router-dom";
import Axios from "axios";

function Home() {
  const [list, setList] = useState();
  const dispatch = useDispatch();
  // const name = useSelector((state) => state.search);
  const { Option } = Select;
  function onChange(value) {
    //console.log(`selected ${value}`);
    getName(value);
  }

  function onSearch(val) {
    //console.log("search:", val);
    getShareholderName(val);
  }
  function getShareholderName(name) {
    Axios.post("http://localhost:8000/shareholder/search", {
      name: name,
    })
      .then((res, rej) => {
        setList(res.data);
        //console.log(list);
      })
      .catch((err) => console.log(err));
  }
  const getName = (name) => {
    dispatch(search(name));
  };
  return (
    <div>
      Home Page
      <div>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select a person"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="พระบาทสมเด็จพระวชิรเกล้าเจ้าอยู่หัว">
            พระบาทสมเด็จพระวชิรเกล้าเจ้าอยู่หัว
          </Option>
          <Option value="ธนาคาร ออมสิน"> ธนาคาร ออมสิน</Option>
          <Option value="สำนักงานประกันสังคม">สำนักงานประกันสังคม</Option>
          {list
            ? list.map((data) => {
                return <Option value={data.name}>{data.name}</Option>;
              })
            : null}
        </Select>

        <Link to="/about">
          <Button>Click</Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
