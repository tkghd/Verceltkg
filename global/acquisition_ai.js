exports.recommend = (budget) => {
  const data = require("./banks.json");
  return data.filter(x => x.price_usd <= budget);
};
