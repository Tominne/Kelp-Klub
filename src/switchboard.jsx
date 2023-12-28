import React, {useState} from "react";
import { useQuery } from 'react-query';

import './App.scss'

const fetchSwitchBoardData = async () => {
  return [
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


  if (isLoading) return 'Loading...'
  if (error) return 'Error has occured'

  return(
    <div className="switchboard">
      <h1 className="title">Izzy's Switchboard</h1>
      <br></br>
      {switches.map((item, index) => (
        <div className="switchboard" key={index}>
          <h2 className="switchboard">{item.name}:</h2>
         </div>
      ))}
    </div>
  )
}

export default Switchboard