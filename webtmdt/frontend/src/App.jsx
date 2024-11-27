import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from './components/admin/layout/sidebar.layout'
import Head from './components/admin/layout/head.layout'
import Navbar from './components/admin/layout/nav.layout'

function App() {
  return (
    <Router>
      <div className="App">
        <Head />
        <Navbar />
        <Sidebar />
        <div className="content-wrapper">
          <Switch>
            {/* Định nghĩa các route của bạn ở đây */}
            <Route path="/admin/statistical" component={Statistical} />
            <Route path="/admin/account" component={Account} />
            {/* Các route khác */}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
