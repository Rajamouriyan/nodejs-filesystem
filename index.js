const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

// to create a text file in a particular folder 
app.post("/createFile/:folderName", (req, res) => {
  fs.mkdir(`./${req.params.folderName}`, function () {
    console.log("Folder created");
  });

  // new Date object
  let timestamp = new Date();
  //  date
  let date = `${timestamp.getDate()}`;
  //  month
  let month = `${timestamp.getMonth()}`;
  //  year
  let year = timestamp.getFullYear();
  //  hours
  let hours = `${timestamp.getHours()}`;
  //  minutes
  let minutes = `${timestamp.getMinutes()}`;
  //  seconds
  let seconds = `${timestamp.getSeconds()}`;

  // filename format
  let fileName = `${year}-${month}-${date} ${hours}H${minutes}M${seconds}S`;

  // to create a text file in a particular folder
  fs.writeFile(`./${req.params.folderName}/${fileName}.txt`, `${timestamp}`, (err) => {
    if (err) {
      console.log(err);
    } ;
    res.json({ message: `${fileName}.txt file created in ${req.params.folderName} folder` });
  });
});

// to retrieve the text files in that particular folder
app.get("/readFolder/:folderName", (req, res) => {
  fs.readdir(`./${req.params.folderName}`, (err, files) => {
    if (err)  {
      console.log(err);
    } ;
    const txtFiles = [];
    // to get only the text files
    files.forEach((file) => {
      if (path.extname(file) == ".txt") {
        txtFiles.push(file);
      }
    });
    res.json({ text_files: txtFiles });
  });
});

app.listen(process.env.PORT || 3000);