const fs = require("fs");
const path = require("path");

// fs.readFile("./files/open.txt", "utf8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// fs.readFile(path.join(__dirname, "files", "open.txt"), "utf8", (err, data) => {
//     if (err) throw err;
//     console.log(data);
//   });

// fs.writeFile(path.join(__dirname, "files", "open.txt"), "Yoo we are moving", (err, data) => {
//     if (err) throw err;
//     console.log('adding more text');

//     fs.appendFile(path.join(__dirname, "files", "open.txt"), "\n\n\n\nWo i'm tired", (err, data) => {
//         if (err) throw err;
//         console.log('append text');
//     });
// });

// //to create a new folder named files with text life hard

// fs.writeFile(
//   path.join(__dirname, "files", "open.txt"),
//   "life hard waaaaal",
//   (err, data) => {
//     if (err) throw err;
//     console.log("adding more text");

//     //to add to
//     fs.appendFile(
//       path.join(__dirname, "files", "open.txt"),
//       "\n\n\n\nClosing period please",
//       (err, data) => {
//         if (err) throw err;
//         console.log("append text");

//         fs.rename(
//           path.join(__dirname, "files", "open.txt"),
//           (__dirname, "files", "git.txt"),
//           (err, data) => {
//             if (err) throw err;
//             console.log("name change");

//         }
//     );
//       }
//     );
//   }
// );
fs.writeFile(
  "server.js",
  `const fsPromises = require("fs").promises;`,
  "utf8",
  (err) => {
    if (err) throw err;
    console.log("File created!");

    fs.appendFile(
      "server.js",
      `\nconst paths = require("path")`,
      "utf8",
      (err) => {
        if (err) throw err;
        console.log("Content added!");
      }
    );
  }
);

console.log("Zainab");

process.on("uncaughtException", (err) => {
  console.log(`There was an uncaught error :${err}`);
  process.exit();
});
