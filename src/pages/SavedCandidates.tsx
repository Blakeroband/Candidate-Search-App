import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const savedCandidates = localStorage.getItem('savedCandidates');
    if (savedCandidates) {
      setCandidates(JSON.parse(savedCandidates));
    }
  }, []);

  return (
    <div>
      <h1>Saved Candidates</h1>
      {candidates.length === 0 ? (
        <p>No candidates have been saved.</p>
      ) : (
        <ul>
          {candidates.map((candidate) => (
            <li key={candidate.login}>
              <img src={candidate.avatar_url} alt={`${candidate.login}'s avatar`} />
              <p>Name: {candidate.name || 'N/A'}</p>
              <p>Username: {candidate.login}</p>
              <p>Location: {candidate.location || 'N/A'}</p>
              <p>Email: {candidate.email || 'N/A'}</p>
              <p>Company: {candidate.company || 'N/A'}</p>
              <p>Bio: {candidate.bio || 'N/A'}</p>
              <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                GitHub Profile
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedCandidates;