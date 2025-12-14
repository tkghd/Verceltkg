import { sendTransfer } from "../api/transfer";
export default function Transfer(){
  const run=async()=>alert((await sendTransfer()).message);
  return (
    <div>
      <h1>TRANSFER</h1>
      <button onClick={run}>SEND</button>
    </div>
  );
}
