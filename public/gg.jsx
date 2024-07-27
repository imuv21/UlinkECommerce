import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PayPalButton from './PayPalButton';
import Success from './Success';
import Cancel from './Cancel';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <div>
            <h1>PayPal Payment</h1>
            <PayPalButton 
              amount={10.00} 
              description="Your purchase description" 
              currency="USD" 
              successUrl="http://localhost:3000/success" 
              cancelUrl="http://localhost:3000/cancel" 
            />
          </div>
        </Route>
        <Route path="/success" component={Success} />
        <Route path="/cancel" component={Cancel} />
      </Switch>
    </Router>
  );
};

export default App;``