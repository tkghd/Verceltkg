import Web3HUD from './components/Web3HUD';
export default function Page() {
  return (
    <main style={{padding:24}}>
      <h1>{process.env.NEXT_PUBLIC_APP_NAME || 'HUD'}</h1>
      <Web3HUD />
      <section>
        <h2>Assets / Coins / NFTs</h2>
        <ul>
          <li><a href={(process.env.NEXT_PUBLIC_GATEWAY_PATH || '/api/gateway') + '?p=assets'} target="_blank">assets</a></li>
          <li><a href={(process.env.NEXT_PUBLIC_GATEWAY_PATH || '/api/gateway') + '?p=coins'} target="_blank">coins</a></li>
          <li><a href={(process.env.NEXT_PUBLIC_GATEWAY_PATH || '/api/gateway') + '?p=nfts'} target="_blank">nfts</a></li>
        </ul>
      </section>
    </main>
  );
}
