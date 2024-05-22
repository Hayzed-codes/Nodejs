const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd)
    return res
      .status(400)
      .json({ Message: "Username and password are required" });

  const duplicate = usersDB.users.find((person) => person.username === user);
  if (duplicate) return res.sendStatus(409); // meaning conflict

  try {
    // encrypting the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    // storing the new user
    const newUser = {
      username: user,
      roles: { User: 2001 },
      password: hashedPwd,
    };
    usersDB.setUsers([...usersDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "../model/users.json"),
      JSON.stringify(usersDB.users)
    );
    console.log(usersDB.users);
    res.status(201).json({ Successs: `New User ${user} created` });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

module.exports = { handleNewUser };
