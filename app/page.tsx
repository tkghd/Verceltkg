import Web3HUD from './components/Web3HUD';
export default function Page(){ return(<main style={{padding:24}}><h1>{process.env.NEXT_PUBLIC_APP_NAME||'HUD'}</h1><Web3HUD/></main>); }
