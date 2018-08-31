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
