import React, { PureComponent } from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import Header from './components/header';

//You need your personal access token, which you can get from mapbox site
// https://docs.mapbox.com/help/glossary/access-token
const token = "<Use your own Access tokenA>";
class App extends PureComponent {
  state = {
    address: '',
    markers: [],
    viewport: {
      width: 2000,
      height: 1000,
      latitude: 17.440081,
      longitude: 78.348915,
      zoom: 12
    }
  };

  setMarker = ({latitude, longitude}) => {
    this.setState({
      markers: [...this.state.markers, {
        latitude,
        longitude 
      }]
    });
  }

  handleClick = (e) => {
    this.setState({
      markers: [...this.state.markers, {
        latitude: e.lngLat[1],
        longitude: e.lngLat[0] 
      }]
    });
  }

  render() {
    return (
      <div className="App">
        <Header setMarker={this.setMarker}/>
        <ReactMapGL
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
        mapboxApiAccessToken={token}
        onClick={this.handleClick}
        >
        {
          this.state.markers.map((marker, i) => {
            return (
              <Marker key={i}
                latitude={parseFloat(marker.latitude)}
                longitude={parseFloat(marker.longitude)}
                offsetLeft={-20}
                offsetTop={-10} >
                <span className="pin"></span>
              </Marker>
            )
          })
        }
       </ReactMapGL>
      </div>
    );
  }
}

export default App;
