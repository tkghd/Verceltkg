import React, { useState, useEffect, useRef } from "react";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

export default function Home() {
  const [transactions, setTransactions] = useState<any>(null);

  useEffect(() => {
    fetch("/api/transactions/demoUser").then(r => r.json()).then(setTransactions);
  }, []);

  const txData = transactions ? {
    labels: transactions.transactions.map((t:any) => t.date || t.id),
    datasets: [{
      label: "取引金額推移",
      data: transactions.transactions.map((t:any) => t.amount),
      borderColor: "#36A2EB",
      backgroundColor: "rgba(54,162,235,0.2)",
    }]
  } : null;

  return (
    <div style={{ fontFamily: "system-ui", padding: "2rem" }}>
      <h1>📜 取引履歴 — 時系列グラフ</h1>
      {txData && <Line data={txData} />}
    </div>
  );
}
