import { useState } from 'react';
import axios from 'axios';
import LeftBar from './components/ProgramScreens/LeftBar';
import Panel from './components/ProgramScreens/Panel';
import AddPanel from './components/ProgramScreens/AddProgramPanel';


axios.defaults.baseURL = import.meta.env.VITE_BASEURL;
axios.defaults.withCredentials = true;

function App() {
  const [UpdatedPrograms, setUpdatedPrograms] = useState(false);
  const [showAddPanel, setShowPanel] = useState(true);
  const [selectedProgram, setSelectedProgram] = useState(null);

  const handleAddButtonClick = () => {
    setSelectedProgram(null);
    setShowPanel(true);
  };

  const handleProgClick = () => {
    setShowPanel(false);
  };

  const handleDeleteSuccess = () => {
    
    setSelectedProgram(null);
    setShowPanel(true);
    // navigate('/');
  };

  return (
    <>
      <div className="w-full flex">
        <LeftBar
          UpdatedPrograms={UpdatedPrograms}
          onAddButtonClick={handleAddButtonClick}
          onProgramClick={handleProgClick}
          selectedProgram={selectedProgram}
          setSelectedProgram={setSelectedProgram}
          setShowPanel={setShowPanel}
        />
        {showAddPanel ? (
          <AddPanel setUpdatedPrograms={setUpdatedPrograms} onDeleteSuccess={handleDeleteSuccess} />
        ) : (
          selectedProgram && <Panel setUpdatedPrograms={setUpdatedPrograms} selectedProgram={selectedProgram} onDeleteSuccess={handleDeleteSuccess} />
        )}
      </div>
    </>
  );
}

export default App;
