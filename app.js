const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 3000;
const { API_KEY } = process.env;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const externalApiUrl = `https://stdict.korean.go.kr/api/search.do?certkey_no=6715&key=${API_KEY}&type_search=search&req_type=json&q=`;

if (!API_KEY) {
  console.error(
    "API_KEY is not set. Please set your API_KEY in the environment variables."
  );
  process.exit(1); // 서버 실행을 중단하고 오류를 발생시킵니다.
}

app.get("/", (req, res) => {
  res.send("메인");
});

app.get("/fetch-data", async (req, res) => {
  const { query } = req.query;

  try {
    const response = await axios.get(`${externalApiUrl}${query}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching data from external API");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
