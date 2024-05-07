const fsPromises = require("fs").promises;
const path = require("path");

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "git.txt"),
      "utf8"
    );
    console.log(data);

    await fsPromises.unlink(path.join(__dirname, "files", "git.txt"));
    await fsPromises.writeFile(path.join(__dirname, "files", "promiseWrite.txt"), data)
    await fsPromises.appendFile(path.join(__dirname, "files", "promiseWrite.txt"), "\nNice to have you!", "utf8")
    await fsPromises.rename(path.join(__dirname, "files", "promiseWrite.txt"), path.join(__dirname, "files", "promiseComplete.txt"));
    
    const hoyee = await fsPromises.readFile(path.join(__dirname, "files", "promiseComplete.txt"), "utf8")
    console.log(hoyee);


  } catch (error) {
    console.error(error);
  }
};

fileOps();
