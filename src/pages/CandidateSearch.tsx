import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

// WHEN the candidate search page loads
// THEN the information for one candidate should be displayed, including the candidate's name, username, location, avatar, email, html_url, and company

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);

  const fetchNewCandidate = () => {
    searchGithub().then((users: Candidate[]) => {
      if (users.length > 0) {
        searchGithubUser(users[0].login).then((user) => {
          if (user) setCandidate(user);
        });
      } else {
        setCandidate(null);
      }
    });
  };

  useEffect(() => {
    fetchNewCandidate();
  }, []);

  if (!candidate) {
    return <div>Loading...</div>;
  }

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
    </div>
  );
};

export default CandidateSearch;