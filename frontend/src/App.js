import React, { useState } from 'react';
import './App.css';
import MahasiswaList from './components/MahasiswaList';
import MahasiswaForm from './components/MahasiswaForm';

function App() {
    const [refresh, setRefresh] = useState(false);

    const handleRefresh = () => {
        setRefresh(!refresh);
    };

    return (
        <div className="App">
            <h1>CRUD Mahasiswa</h1>
            <MahasiswaForm onSuccess={handleRefresh} />
            <MahasiswaList onRefresh={refresh} />
        </div>
    );
}

export default App;
