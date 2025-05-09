import React, { useState } from 'react'
import { useQuery } from 'react-query'

import './App.scss'

const fetchSwitchBoardData = async () => {
  return [
    {
      name: 'Our Giant Kelp Forests, soaking up lost of carbon, fast growing, home and shelter to much of our ocean wildlife',
      state: false,
      image: 'Giant-Kelp.jpg',
    },
    {
      name: 'Be a good home to the creatures even if they nibble on you',
      state: false,
    },
    { name: 'Green', state: false },
    { name: 'If people think youre gross too bad', state: false },
  ]
}

const Switchboard = () => {
  const { data, isLoading, error } = useQuery(
    'switchboardData',
    fetchSwitchBoardData
  )
  const [switches, setSwitches] = useState([])

  React.useEffect(() => {
    if (data) {
      setSwitches(data)
    }
  }, [data])

  if (isLoading) return 'Loading...'
  if (error) return 'Error has occured'

  return (
    <div className="switchboard">
      <h1 className="title">What we can learn from seaweed...</h1>
      <br></br>
      {switches.map((item, index) => (
        <div className="switchboard" key={index}>
          <h2 className="switchboard">{item.name}:</h2>
          <img src={item.image} alt={item.name} className="switchboard-image" />
        </div>
      ))}
    </div>
  )
}

export default Switchboard
