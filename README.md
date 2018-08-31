## XLazyScriptLoader
XLazyScriptLoader a componetn to load script from the CDN and apppend css
```jsx
import React, {
  Component
} from 'react';
import './App.css';
import {
  XLazyScriptLoader
} from './XLazyScriptLoader'
class Example extends Component {
  componentDidMount() {
    var ctx = this.refs.Lol.getContext('2d')
    var myChart = new window.Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
  render() {
    return (
      <canvas id="myChart" width="400" height="400" ref="Lol"></canvas>
    );
  }
}
class App extends Component {
  render() {
    return ( <XLazyScriptLoader 
      async = {true}
      css = {''}
      loadjs = {
        ['https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.js','https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.10/lodash.core.js']
      }
      loadcss = {
        'https://www.w3schools.com/w3css/4/w3.css'
      }
      loading = {'Loading.....'}
      >
      <Example/>
      </XLazyScriptLoader>
    );
  }
}
export default App;

```

## Available Scripts

```bash
git clone https://github.com/e178551/x-lazy-script-loader.git
npm i
npm start
```

In the project directory, you can run:


Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

