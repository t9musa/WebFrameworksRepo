import React from 'react'

import UutisDataMapper from './UutisDataMapper'

export default function UutisData() {    
    const paivanUutiset = [
    { 
      topic: 'AFGANISTAN',
      body: 'Afganistanilaiset naiset osoittivat yli­opistolla tukeaan Talebanin sukupuoli­erottelulle?',
      picture: 'hesariPNG'
    },
    { 
      topic: 'PÄIVÄN TIMANTTI',
      body: 'Are you working hard or hardly working?',
      picture: 'hesariPNG'
    },
    { 
      topic: 'SAMPLE TEXT',
      body: 'Sample text, sample text, sample text',
      picture: 'hesariPNG'
    },
  ]
  return (
    <UutisDataMapper paivanUutiset={paivanUutiset}/>
    )
}
