import MapController from './MapController.js';

class Main {
  constructor() {
    this.mapWrapper = document.querySelector('#map');
    this.timerWrapper = document.querySelector('#timer');

    this.init();
  }
  
  init() {
    this.mapController = new MapController(this.mapWrapper, this.timerWrapper);
    this.mapController.create();
    this.mapController.createMap();
  }
}

new Main();