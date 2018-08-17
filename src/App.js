import React, {
  Component
} from 'react';
import './App.css';
import {
  XLazyScriptLoader
} from './XLazyScriptLoader'

class App extends Component {
  render() {
    return ( <XLazyScriptLoader css = {''}
      load = {
        [{
          name: 'Chart',
          src: 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.js',
        }, {
          name: 'ReactChartjs2',
          src: 'https://cdnjs.cloudflare.com/ajax/libs/react-chartjs-2/2.7.4/react-chartjs-2.js'
        }]
      }
      loading = {'Loading.....'}
      >'azat'</XLazyScriptLoader>
    );
  }
}
export default App;
