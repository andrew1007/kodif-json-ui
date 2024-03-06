import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import CompositeUi from './CompositeUi';
import { fetchViews } from './api';

function App() {
  const [views, setViews] = useState<any[]>([])

  useEffect(() => {
    fetchViews().then(res => {
      setViews(res)
    })
  }, [])

  return (
    <div className="App">
      {views.map(params => {
        return <CompositeUi {...params} />
      })}
    </div>
  );
}

export default App;
