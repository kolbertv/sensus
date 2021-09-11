const error400 = (req, res) => {
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      data: "Bad Request",
    })
  );
};

module.exports = error400;
