const usersDB = {
  users: require("../Model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");

const handleLogout = async (req, res) => {
  // onclient also delets accessToken
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204); //no content
  //   is refreshtoken in database

  const refreshToken = cookies.jwt;

  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!foundUser) {
    res.clearCookies("jwt, {httpOnly:true}");
    return res.sendStatus(204);
  }
  // delete refresh token in  database

  const otherUsers = usersDB.users.filter(
    (person) => person.refreshToken !== foundUser.refreshToken
  );
  const currentUsers = { ...otherUsers, refreshToken: "" };
  usersDB.setUsers([...otherUsers, currentUsers]);
  await fsPromise.writeFile(
    path.join(__dirname, "..", "model", "users.json"),
    JSON.stringify(usersDB.users)
  );
  res.cookies("jwt", { httpOnly: true });
  res.sendStatus(204);
};

module.exports = { handleLogout };
