import { useEffect, useState } from 'react';
import './App.css';
import CompositeUi from './CompositeUi';
import { fetchViews } from './api';
import { CompositeUiProps } from './CompositeUi/types';

function App() {
  const [views, setViews] = useState<CompositeUiProps[]>([])

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
