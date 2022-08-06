import React  from 'react'

import Form from './components/Form'
import Title from './components/Title'
import Weather from './components/weather'

class App extends React.Component{

    state ={
        longitude:undefined,
        latitude:undefined,
        temperature:undefined,
        humidity:undefined,
        description:undefined,
        wind:undefined,
        error:undefined
    }

    getweather = async (e) => {
       e.preventDefault()
       const longitude = e.target.elements.longitude.value
       const latitude = e.target.elements.latitude.value
       const API_call = await fetch(`https://fcc-weather-api.glitch.me/api/current?lon=${longitude}&lat=${latitude}`,{method : `get`})
       const data = await API_call.json( )
       console.log(data)

       // condition based render the data
       if(latitude&&longitude){
          this.setState = {
                longitude:data.coord.log,
                latitude: data.coord.lat,
                temperature: data.main.temp,
                humidity: data.main.humidity,
                description: data.weather[0].description,
                wind: data.wind.speed,
                error: ""
          }
       } else{
          this.setState = {
                longitude:undefined,
                latitude:undefined,
                temperature:undefined,
                humidity:undefined,
                description:undefined,
                wind:undefined,
                error:"Please enter the values"
        }
       } 
    }

    render(){
        return(
            <React.Fragment>

                <div>
                <div className="wrapper">
				        <div className="main">
				             <div className="container shadow ">
						          <div className="row">
						          	    <div className="col-sm-5 title-container">
									        <Title/>
									    </div>
									    <div className="col-sm-7 form-container">
											<Form getWeather={this.getWeather} />  
											<Weather 
											longitude={this.state.longitude}
											lattitude={this.state.latitude}
											temperature={this.state.temperature}
											humidity={this.state.humidity}
											description={this.state.description}
											wind={this.state.wind}
											error={this.state.error}
											/>
										</div>
								   </div>
							 </div>
						</div>
					</div>
                </div>

            </React.Fragment>
        )
    }
}

export default App