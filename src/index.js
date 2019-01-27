import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

// Components
import App from './pages';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
