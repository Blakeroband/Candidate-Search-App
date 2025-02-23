import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';
import AddCandidate from '../components/AddCandidate';
import NextCandidate from '../components/NextCandidate';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchNewCandidates = () => {
    searchGithub().then((users: Candidate[]) => {
      if (users.length > 0) {
        const candidatePromises = users.map(user => searchGithubUser(user.login));
        Promise.all(candidatePromises).then(fetchedCandidates => {
          setCandidates(fetchedCandidates.filter(candidate => candidate !== null));
          setCurrentIndex(0);
        });
      } else {
        setCandidates([]);
        setCurrentIndex(0);
      }
    });
  };

  useEffect(() => {
    fetchNewCandidates();
  }, []);

  const handleAddCandidate = (newCandidate: Candidate) => {
    console.log('saving candidate to localStorage:', newCandidate);
    const savedCandidates = localStorage.getItem('savedCandidates');
    const candidates = savedCandidates ? JSON.parse(savedCandidates) : [];
    candidates.push(newCandidate);
    localStorage.setItem('savedCandidates', JSON.stringify(candidates));
    fetchNewCandidates();
  };

  const handleNextCandidate = (index: number) => {
    setCurrentIndex(index);
  };

  if (candidates.length === 0) {
    return <div>Loading...</div>;
  }

  const candidate = candidates[currentIndex];

  return (
    <div>
      <h1>Candidate Information</h1>
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
      <AddCandidate candidate={candidate} onAddCandidate={handleAddCandidate} />
      <NextCandidate
        candidates={candidates}
        currentIndex={currentIndex}
        onNextCandidate={handleNextCandidate}
      />
    </div>
  );
};

export default CandidateSearch;