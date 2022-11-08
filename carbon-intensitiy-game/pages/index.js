import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from "react";

export default function Home() {
  const [events, setevents] = useState([]);
 
  const fetchEvents = async () => {
    
    const event1 = await fetch("/api/carbon/2022-02-01");
    const event2 = await fetch("/api/carbon/2022-02-02");
    const event1data = await event1.json();
    const event2data = await event2.json();
    const events = [event1data, event2data];

    setevents(events);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the carbon intensity game!
        </h1>

        <p className={styles.description}>
          Todays star studded events, who will consume the most energy, what a time to be alive!
          </p>

          <button onClick={fetchEvents}>Get events</button>
     
          {events.map((event) => {
            return (
              <div key={event.requestedDate} className={styles.grid}>
                  <h2>{event.carbonTotal}</h2>
              </div>
            );
          })}
        
                
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
          <Image src="/biscuit.jpg" alt="Mcvities Victoria biscuits" width={140} height={100} />            
          </span>
        </a>
      </footer>
    </div>
  );
}