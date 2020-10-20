import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "antd/dist/antd.css";
import { Table } from "antd";

function About() {
  const [total, setTotal] = useState(0);
  const shareholderName = useSelector((state) => state.search);

  const [data, setData] = useState([]);
  const columns = [
    {
      title: "Symbol",
      dataIndex: "code",
      sorter: (a, b) => sorter(a.code, b.code),
    },
    {
      title: "Company",
      dataIndex: "name",
      sorter: (a, b) => sorter(a.name, b.name),
    },
    {
      title: "Market",
      dataIndex: "market",
      sorter: (a, b) => sorter(a.market, b.market),
    },
    {
      title: "Industry",
      dataIndex: "industry",
      sorter: (a, b) => sorter(a.industry, b.industry),
    },
    {
      title: "Share",
      dataIndex: "share",
      sorter: (a, b) => sorter(parseInt(a.share), parseInt(b.share)),
    },
    {
      title: "Percent",
      dataIndex: "percent",
      sorter: (a, b) => sorter(a.percent, b.percent),
    },
    {
      title: "Current Price",
      dataIndex: "price",
      sorter: (a, b) => sorter(a.percent, b.percent),
    },
    {
      title: "Value",
      dataIndex: "value",
      sorter: (a, b) => sorter(a.percent, b.percent),
    },
  ];
  async function getCurrentPrice(stockName) {
    const price = await fetch(
      `https://cors-anywhere.herokuapp.com/finance.yahoo.com/quote/${stockName}.BK/`
    )
      .then((res) => res.text())
      .then((text) => {
        const parser = new DOMParser();
        const htmlDocument = parser.parseFromString(text, "text/html");
        const section = htmlDocument.documentElement.querySelector(
          "#quote-header-info [data-reactid='33']"
        );
        // console.log(parseFloat(section.textContent).toFixed(2));
        return parseFloat(section.textContent).toFixed(2);
      });
    return price;
  }
  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  const sorter = (a, b) =>
    isNaN(a) && isNaN(b) ? (a || "").localeCompare(b || "") : a - b;
  useEffect(() => {
    const fetchData = async () => {
      const dataDB = await axios.post("http://localhost:8000/api", {
        name: shareholderName,
      });

      dataDB.data.map(async (x) => {
        const stockIn = await axios.post(
          "http://localhost:8000/stock/getById",
          { id: x.stock_id }
        );
        const currentPrice = await getCurrentPrice(stockIn.data.code);
        // console.log(currentPrice);
        data.push({
          key: stockIn.data.id,
          name: stockIn.data.name,
          code: stockIn.data.code,
          market: stockIn.data.market,
          industry: stockIn.data.industry,
          share: formatNumber(x.share),
          percent: x.percent_c,
          price: currentPrice,
          value: formatNumber((currentPrice * x.share).toFixed(2)),
        });
        setData([...data]);
        //console.log(x.share);
        setTotal(
          (prevTotal) =>
            prevTotal + parseFloat((currentPrice * x.share).toFixed(2))
        );
        //console.log(total);
        return { ...x, stocks: [stockIn.data] };
      });

      // console.log(newData);
    };

    fetchData();
  }, []);
  return (
    <div>
      <h1>{shareholderName}</h1>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          total: data.length,
          pageSize: data.length,
          hideOnSinglePage: true,
        }}
      />
      <h2>{formatNumber(total)} THB</h2>
    </div>
  );
}

export default About;
