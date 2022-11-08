import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from "react";
import eventData from '../public/events-data.json';

export default function Home({ data }) {
  const [events, setevents] = useState([]);
 
  const fetchEvents = async () => {
    var event1 = eventData.events[Math.floor(Math.random() * eventData.events.length)];
    var event2 = eventData.events[Math.floor(Math.random() * eventData.events.length)];

    const carbon1 = await fetch(`/api/carbon/${event1.date}`);
    const carbon2 = await fetch(`/api/carbon/${event2.date}`);

    const carbon1data = await carbon1.json();
    const carbon2data = await carbon2.json();

    const eventModel1 = { date: event1.date, name: event1.name, carbon: carbon1data.carbonTotal, image: event1.image, correct: carbon1data.carbonTotal > carbon2data.carbonTotal };
    const eventModel2 = { date: event2.date, name: event2.name, carbon: carbon2data.carbonTotal, image: event2.image, correct: carbon2data.carbonTotal > carbon1data.carbonTotal};

    const events = [eventModel1, eventModel2];

    setevents(events);
  };

  function reveal(correct) {
    if(correct) { alert('You win'); } else { alert('You lose'); }

    const boxes = Array.from(document.getElementsByClassName('hidden'));

    boxes.forEach((box, index) => {
      box.removeAttribute('class');
    });
  }

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
          On which day was the UK National Grid's carbon intensity higher?
        </p>

        <button onClick={fetchEvents}>Let's play!</button>
        <div className={styles.grid}>
          {events.map((event) => {
            return (
              <a key={event.date} className={styles.card} onClick={() => reveal(event.correct)}>
                  <h2>{event.name}</h2>
                  <p>{event.date}</p>
                  <Image src={event.image} width={140} height={100} />  
                  <p className={"result hidden"}>{event.carbon}</p>
              </a>
            );
          })}
        </div>

        <div className="results"></div>
                
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