const express = require("express")
const app = express()
const port = process.env.PORT || 5500

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json())

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});

app.get("/", (req, res) =>{
  res.send(
    "Hellooo!!!"
  )
})

app.get("/api", (req, res) => {
  const slack_name = req.query.slack_name
  const track = req.query.track

  res.setHeader('Content-Type', 'application/json');

  if (!slack_name || !track) {
    return res
      .status(400)
      .send({ error: "slack_name and track parameters are required!" })
  }

  const currentDate = new Date()
  const Day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]

  const currentDay = Day[currentDate.getUTCDay()]
  const utcTime = new Date().toISOString()
  const githubFileUrl = "https://github.com/jorshimayor/backend_zuri1_/index.js"
  const githubRepoUrl = "https://github.com/jorshimayor/backend_zuri1_"

  const response = {
    slack_name,
    current_day: currentDay,
    utc_time: utcTime,
    track,
    github_file_url: githubFileUrl,
    github_repo_url: githubRepoUrl,
    status_code: 200,
  };

  res.json(response)
});

app.get("*", (req, res) => {
  res.status(404).json({
    message: "Not Found!",
  });
});


module.exports = app