import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      if (query.includes(' ')) {
        const data = await searchGithub(query); 
        setCandidates(data);
      } else {
        const user = await searchGithubUser(query); 
        setCandidates([user]); 
      }
    } catch (error) {
      setError('Error fetching candidates');
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  if (query.length > 0) {
    handleSearch();
  }
  }, [query]
);

const saveCandidate = (candidate: Candidate) => {
  try {
    const savedCandidates = JSON.parse(localStorage.getItem('saveCandidates') || '[]');
    const updatedCandidates = [...savedCandidates, candidate];
    localStorage.setItem('saveCandidates', JSON.stringify(updatedCandidates));
    alert(`${candidate.name} has been saved!`);
  } catch (error) {
    console.error('Error saving candidate', error);
    alert('Error saving candidate');
  }
};

return (
  <div>
    <h1>Search Candidates</h1>

    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search for GitHub users"
    />
    <button onClick={handleSearch}>Search</button>

    {loading && <p>Loading...</p>}
    {error && <p>{error}</p>}

    <div>
      {candidates.length === 0 && !loading && <p>No candidates found</p>}

      <ul>
        {candidates.map((candidate) => (
          <li key={candidate.username}>
            <img src={candidate.avatar} alt={candidate.name} width="50" />
            <h2>{candidate.name}</h2>
            <p>Username: {candidate.username}</p>
            <p>Location: {candidate.location}</p>
            <p>Email: {candidate.email}</p>
            <p>
              <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                GitHub Profile
              </a>
            </p>
            <p>Company: {candidate.company}</p>
            <button onClick={() => saveCandidate(candidate)}>Save Candidate</button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
};

export default CandidateSearch;
