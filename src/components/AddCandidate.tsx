// WHEN I click the "+" button
// THEN the candidate should be saved to the list of potential candidates and the next candidate's information should be displayed
import { useState } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const AddCandidate = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>(() => {
      const savedCandidates = localStorage.getItem('savedCandidates'); 
      return savedCandidates ? JSON.parse(savedCandidates) : [];
  });


  const handleAddCandidate = () => {
    if (candidate) {
      const updatedCandidates = [...candidates, candidate];
      setCandidates(updatedCandidates);
      localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
      setCandidate(null);
    }
  }

  return (
    <div>
      <button onClick={handleAddCandidate}>+</button>
    </div>
  );
};

export default AddCandidate;