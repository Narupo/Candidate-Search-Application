import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    handleSearch();

  }, []);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchGithub(); 
      console.log("Data:", data);
      console.log("Number of Candidates:", data.length);
      const randomUser = data[0].login; 
      const userDetails = await searchGithubUser(randomUser); 
      setCurrentCandidate(userDetails);
    } catch (err) {
      console.error('Error fetching random candidate:', err);
      setError('Failed to load candidate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

const saveCandidate = (candidate: Candidate) => {
  try {
    const savedCandidates = JSON.parse(localStorage.getItem('saveCandidates') || '[]');
    const updatedCandidates = [...savedCandidates, candidate];
    localStorage.setItem('saveCandidates', JSON.stringify(updatedCandidates));
    alert(`${candidate.name || candidate.login} has been saved!`);
  } catch (error) {
    console.error('Error saving candidate', error);
    alert('Error saving candidate');
  }
};

return (
  <div>
    <h1>Search Candidates</h1>

    {loading && <p>Loading candidate...</p>}
    {error && <p className="error">{error}</p>}
    {!loading && !error && currentCandidate && (
      <div key={currentCandidate.login}>
        <img src={currentCandidate.avatar_url} alt={currentCandidate.name || 'No avatar avaiable'} width="100" />
        <h2>{currentCandidate.name || 'No name available'}</h2>
        <p>Username: {currentCandidate.login}</p>
        <p>Location: {currentCandidate.location || 'Not provided'}</p>
        <p>Email: {currentCandidate.email || 'Not provided'}</p>
        <p>Company: {currentCandidate.company || 'Not provided'}</p>
        <p>
          <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">
            View GitHub Profile
          </a>
        </p>
        <button onClick={() => saveCandidate(currentCandidate)}>Save Candidate</button>
        <button onClick={handleSearch}>Next Candidate</button>
      </div>
    )}

    {!loading && !error && !currentCandidate && <p>No candidate available. Please try again.</p>}
  </div>
);
};

export default CandidateSearch;
