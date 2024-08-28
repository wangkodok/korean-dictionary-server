const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config(); // node에서 .env 파일 이용하려면 dotenv 설치하고 코드 작성

const app = express();
const port = 3000;
const { API_KEY } = process.env;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const externalApiUrl = `https://stdict.korean.go.kr/api/search.do?key=${API_KEY}&type_search=search&req_type=json&q=`;

let query = null;

app.get("/", (req, res) => {
  res.send("메인");
});

app.get("/fetch-data", (req, res) => {
  const { query } = req.query;

  try {
    setTimeout(() => {
      // console.log("External API URL:", externalApiUrl);
      const response = axios.get(`${externalApiUrl}${query}`);
      // console.log(response.data.channel.item);
      res.json(response.data);
    }, 0);
  } catch (error) {
    res.status(500).send("Error fetching data from external API");
  }
});

app.post("/api/search", async (req, res) => {
  query = req.body.queryData; // React에서 보낸 검색어
  // console.log(req.body.queryData);
  console.log(query);

  try {
    const response = await axios.get(`${externalApiUrl}${query}`);
    res.json(response.data); // json 변환
    console.log(response.data.channel.item, "리액트에서 보낸 값");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data from API" });
  }
});

app.get("/api/search", (req, res) => {
  console.log(query, "get");
  try {
    setTimeout(() => {
      // console.log("External API URL:", externalApiUrl);
      const response = axios.get(`${externalApiUrl}${query}`);
      // console.log(response.data.channel.item);
      res.json(response.data);
    }, 0);
  } catch (error) {
    res.status(500).send("Error fetching data from external API");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
