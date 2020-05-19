import React from 'react';
import 'normalize.css'; 
import './App.css';

class Mars extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      weather: []
    }
  }


componentDidMount() {
  let dayArray = []

   //Fetch test data from the NASA Open APIs and display information on the screen:
fetch('https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0',{
  mode: 'cors'
  })
      .then(response => response.json())
      .then(data =>  {
          const dayArr = data.sol_keys
          const weatherArr = []
          
           for (let i=0; i<dayArr.length; i++) {
             let sol = dayArr[i]
             weatherArr.push({
              day: sol, 
              season: data[sol].Season, 
              wind: data[sol].HWS.av,
              direction: data[sol].WD.most_common.compass_point,
              pressure: data[sol].PRE.av,
              temperature: data[sol].AT.av
            })
          }
          // console.log(weatherArr)
          this.setState({
            weather: weatherArr
          })
       })
}


 

render() {
const {weather} = this.state    
// console.log(`This is what is in the render: ${weather}`)

    return (
      <div className="App">
        <header>
          <div>
            <h1>MARS</h1>
            <h2>Weather Watch</h2>
          </div>
        </header>
  {/* Create the weather data cards */}
        <section>

          {weather.map(d => {
            // console.log(d)
            return(
              <article key={d.day}>
                <h3>Day: SOL {d.day}</h3>
                  <ul>
                    <li>Temperature: {d.temperature}</li>
                    <li>Wind Speed: {d.wind}</li>
                    <li>Wind Direction: {d.direction}</li>
                    <li>Season: {d.season}</li>
                  </ul>
              </article>
            )
          })}

        </section>
      </div>
    );
  }
}
  

export default Mars;
