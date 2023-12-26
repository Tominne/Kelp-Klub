import React, {useState} from "react";
import { useQuery } from 'react-query';

import './App.scss'

const fetchSwitchBoardData = async () => {
  return [
  { name: 'Name', state: false },
  { name: 'Saggy MC', state: false},
  { name: 'Beans', state: false},
  { name: 'Harris', state: false},
  { name: 'Ark Server', state: false}
  ]
}

const Switchboard = () => {
  const { data, isLoading, error } = useQuery('switchboardData', fetchSwitchBoardData)
  const [switches, setSwitches] = useState([])

  React.useEffect(() => {
    if (data) {
      setSwitches(data)
    }
  }, [data])

  const toggleSwitch = (index) => {
    setSwitches(switches.map((item, i) => i === index ? { ...item, state: !item.state} : item))
  }

  if (isLoading) return 'Loading...'
  if (error) return 'Error has occured'

  return(
    <div>
      <h1>Izzy's Switchboard</h1>
      {switches.map((item, index) => (
        <div key={index}>
          <h2>{item.name}</h2>
         </div>
      ))}
    </div>
  )
}

export default Switchboard