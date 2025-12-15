const Web3 = require('web3');
const web3 = new Web3(process.env.RPC_URL);

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  try {
    const { from, to, amount, privateKey } = req.body;
    const tx = { from, to, value: web3.utils.toWei(amount.toString(), 'ether'), gas: 21000 };
    const signed = await web3.eth.accounts.signTransaction(tx, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
    res.json({ success: true, txHash: receipt.transactionHash });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
