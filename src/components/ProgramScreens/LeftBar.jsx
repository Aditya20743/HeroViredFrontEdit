import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import add from '../../assets/add.png';

const LeftBar = ({ UpdatedPrograms, onAddButtonClick, setSelectedProgram, setShowPanel }) => {
  const [selectedCategoryPredefined, setSelectedCategoryPredefined] = useState('All');
  const [selectedCategoryDatabase, setSelectedCategoryDatabase] = useState('All');
  const [programNames, setProgramNames] = useState([]);

  useEffect(() => {
    const fetchProgramNames = async () => {
      try {
        const response = await axios.get('/routes/programs');
        if (Array.isArray(response.data.msg)) {
          const filteredPrograms = response.data.msg.filter(program => {
            if (selectedCategoryPredefined === 'All') return true;

            const domainMap = {
              'Data': 'Data',
              'Finance': 'Finance',
              'Future Tech': 'Tech',
            };

            return program.domain === domainMap[selectedCategoryPredefined];
          });

          setProgramNames(filteredPrograms);
        } else {
          console.error('API response does not contain an array under "msg":', response.data);
        }
      } catch (error) {
        console.error('Error fetching program names:', error);
      }
    };

    fetchProgramNames();
  }, [selectedCategoryPredefined, UpdatedPrograms]);

  const handleButtonClickPredefined = (category) => {
    setSelectedCategoryPredefined(category);
  };

  const handleButtonClickDatabase = (program) => {
    setSelectedCategoryDatabase(program.name);
    setShowPanel(false);
    setSelectedProgram(program);
  };

  return (
    <div className='px-6 py-8 flex flex-col border border-r-1 w-1/5 h-screen bg-gray-200'>
      <div className='logo-div flex items-center justify-between'>
        <span className='text-3xl font-bold'>Programs</span>
        <button onClick={onAddButtonClick}>
          <img src={add} alt="Add" className='object-cover h-10 w-10'/>
        </button>
      </div>

      {/* Search bar */}
      <div className="max-w-md mx-auto mt-4">
        <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white border border-black overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <input
            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 border-none"
            type="text"
            id="search"
            placeholder="Search something.."
          />
        </div>
      </div>

      {/* Buttons for predefined categories */}
      <div className="flex mt-4 space-x-2">
        {['All', 'Data', 'Finance', 'Future Tech'].map(category => (
          <button
            key={category}
            className={`transition-colors duration-300 ease-in-out 
                        ${selectedCategoryPredefined === category ? 'bg-blue-300 text-white' : 'bg-white text-black'} 
                        border border-black rounded-full px-3 py-1.5 text-xs font-bold focus:outline-none`}
            onClick={() => handleButtonClickPredefined(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Buttons for program names from the database */}
      <div className="flex flex-col mt-4 space-y-2">
        {programNames.map(program => (
          <button 
            key={program.id}
            className={`transition-colors duration-300 ease-in-out 
                        ${selectedCategoryDatabase === program.name ? 'bg-blue-300 text-white' : 'bg-white text-black'} 
                        border border-black rounded-md px-3 py-1.5 text-xs font-bold focus:outline-none`}
            onClick={() => handleButtonClickDatabase(program)}
          >
            {program.name}
          </button>
        ))}
      </div>
    </div>
  );
};


export default LeftBar;
