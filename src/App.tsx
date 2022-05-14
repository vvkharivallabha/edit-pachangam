import { useEffect, useState } from 'react';
import FirebaseService from './services/FirebaseService';
import EditPanchangam from './components/EditPanchangam';
import Header from './components/Header';
import { observer } from "mobx-react";
import './App.css';
import PanchangamTable from './components/PanchangamTable';
import StorageService from './services/StorageService';
import MockTools from './components/MockTools';

function App() {

  const [mock, setMock] = useState(true);

  useEffect(() => {
    try {
      FirebaseService.reset();
      StorageService.clear();
      if (mock) {
        StorageService.mockInitialize();
        FirebaseService.mockInitialize();
      } else {
        FirebaseService.initialize();
      }
      ;
    } catch (e) {
      console.error(e);
    }
  }, [mock])

  const toggleMockSetter: React.MouseEventHandler<HTMLInputElement> = (e) => {
    setMock(e.currentTarget.checked)
  }

  return (
    <div className="App">
      <MockTools toggleMockSetter={toggleMockSetter} />
      {FirebaseService.initialized &&
        <>
          <Header />
          {FirebaseService.currentUser && <EditPanchangam />}
          {FirebaseService.currentUser && <PanchangamTable />}
        </>
      }
      <div id="firebaseui-auth-container"></div>
    </div>
  );
}

export default observer(App);
