import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg' // this is in assest 
import viteLogo from '/vite.svg' // so here vite logo is imported as single slash or plain import because its not in asset
import Header from './components/Header'
import Footer from './components/Footer'
import Solo from './assets/solo.jpg'
import './App.css'

function App() {
  const greeting = import.meta.env.VITE_API_URL;
  const [count, setCount] = useState(0)

  const [ipaddres, setIpaddress] = useState("");
  useEffect(() => {
    const fetchIPaddress = async () => {
      const apiUrl = import.meta.env.VITE_API_URL;

      try {
        //we are facing CORS error because our browser is not getting approapriate header response from the server
        //const response = await fetch(`${apiUrl}?format=json`);
        const response = await fetch(`${apiUrl}?format=json`);

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }
        const data = await response.json();
        setIpaddress(data.ip);
      } catch (err) {
        setIpaddress("Not Available");
        console.log(err.message);
      }
    };

    fetchIPaddress(); // 👈 You forgot this
  }, []);

  return (
    <>
      <div>
        <Header />
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://Solo.dev" target="_blank">
          <img src={Solo} className="logo solo" alt="Solo logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      {/* <h3>{greeting}</h3> */}
      <h3>Your IP Address: {ipaddres}</h3>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Footer />
    </>
  )
}

export default App
