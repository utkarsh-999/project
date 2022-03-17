const Token = (user, res) => {
  const token = user.getJWTToken();

  res.json({
    success: true,
    user,
    token,
  });
};

module.exports = Token;
