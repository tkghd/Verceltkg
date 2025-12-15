const Web3 = require('web3');
const web3 = new Web3(process.env.RPC_URL);

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const { address } = req.query;
    const balance = await web3.eth.getBalance(address);
    res.json({ address, balance: web3.utils.fromWei(balance, 'ether') });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
