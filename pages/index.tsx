import { useState, useEffect } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import { Question, Button, Header } from '../components';
import styles from '../styles/Home.module.css'

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header  />
      <main className={styles.main} style={{ padding: '10rem'}}>


      </main>
    </>
  )
}
