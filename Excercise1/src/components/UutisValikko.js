import React from 'react'
import UutisValikkoPrintter from './UutisValikkoPrintter.js'


export default function UutisValikko() 
{
    
    const UutisData = 
    [
      { 
        topic: 'AFGANISTAN',
        body: 'Afganistanilaiset naiset osoittivat yli­opistolla tukeaan Talebanin sukupuoli­erottelulle?'
      },
      { 
        topic: 'PÄIVÄN TIMANTTI',
        body: 'Are you working hard or hardly working?'
      },
      { 
        topic: 'SAMPLE TEXT',
        body: 'Sample text, sample text, sample text'
      },
    ];

  return (
      
      <div>
      {  
        UutisData.map(element => <UutisValikkoPrintter topic={element.topic} body={element.body}/>)
      } 
      </div>
  )
}
