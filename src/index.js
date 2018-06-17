import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ApodGallery from './apod-gallery/components/apod-gallery';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ApodGallery />, document.getElementById('apod-gallery'));
registerServiceWorker();
