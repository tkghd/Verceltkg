module.exports = {
  getCountries: () => require("../../global/banks.json"),
  getAcquisitionList: () => require("../../global/banks.json").map(x => ({
    bank: x.name,
    country: x.country,
    est_price_usd: x.price_usd
  }))
};
