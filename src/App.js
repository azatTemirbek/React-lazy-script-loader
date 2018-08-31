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
      loadjs = {
        ['https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.js','https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.10/lodash.core.js']
      }
      loadcss = {
        'https://www.w3schools.com/w3css/4/w3.css'
      }
      loading = {'Loading.....'}
      >'azat'</XLazyScriptLoader>
    );
  }
}
export default App;
