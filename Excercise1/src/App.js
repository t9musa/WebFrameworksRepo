import React from 'react'
import styles from './App.module.css'
import YlaPalkki from './components/YlaPalkki'
import UutisValikko from './components/UutisValikko'
import AiheNavBar from './components/AiheNavBar'
import PaaUutiset from './components/PaaUutiset'

export default function App() {
  return (

    <div className={styles.tausta}>
      <YlaPalkki/>
      <AiheNavBar/>
      <UutisValikko/>
      <PaaUutiset/>
    </div>
  )
}
