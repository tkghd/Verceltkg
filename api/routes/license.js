module.exports = {
  generateEMI: (owner) => ({
    owner,
    license_id: "EMI-" + Date.now(),
    country: "Lithuania",
    status: "APPROVED"
  })
};
