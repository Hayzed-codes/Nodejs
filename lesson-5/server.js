const { create } = require("domain");
const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3500;

// serving static files
app.use(express.static(path.join(__dirname, "public")));

app.get("^/$|/index(.html)?", (req, res) => {
  // res.sendFile("./views/index.html", {root: __dirname});
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "new-page.html");
});

// ROUTE HANDLERS
app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("You are trying to access hello.html");
    next();
  },
  (req, res) => {
    res.send("Hello Zainabuu, Nafiah and Basirat");
  }
);

const one = (req, res, next) => {
  console.log("one");
  next();
}

const two = (req, res, next) => {
  console.log("two");
  next();
}

const three = (req, res, next) => {
  console.log("three");
  res.send("Finished");
}

app.get("/chain(.html)?", [one, two, three]);

app.all("*", (req, res) => {
  res.status(404);
  if(req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if(req.accepts("json")) {
    res.json({ error: "404! Not found" });
  } else {
    res.type("txt").send("404! Not found");
  }
})

// server.listen() is a method used to start the HTTP server and make it listen for incoming connections on a specified port.
app.listen(PORT, () => console.log(`server running on port ${PORT}`));