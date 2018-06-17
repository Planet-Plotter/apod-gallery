import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ApodGallery from './components/apod-gallery';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ApodGallery />, document.getElementById('apod-gallery'));
registerServiceWorker();
