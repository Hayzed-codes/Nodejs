const User = require("../Model/User");

const handleLogout = async (req, res) => {
  // onclient also delets accessToken
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204); //no content

  const refreshToken = cookies.jwt;

  //   is refreshtoken in database
  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) {
    res.clearCookies("jwt", { httpOnly: true, sameSite: "none", secure: true });
    return res.sendStatus(204);
  }
  // delete refresh token in  database

  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result);

  res.clearCookies("jwt", { httpOnly: true, sameSite: "none", secure: true });
  res.sendStatus(204);
};

module.exports = { handleLogout };
