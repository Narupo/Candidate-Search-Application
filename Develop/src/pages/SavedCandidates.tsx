import {useState, useEffect} from 'react';

interface Candidate {
  name: string;
  username: string;
  location: string;
  avatar: string;
  email: string;
  html_url: string;
  company: string;
}

const SavedCandidates = () => {
  const [SavedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const storedCandidates = localStorage.getItem('savedCandidates');
    if (storedCandidates) {
      setSavedCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('savedCandidates', JSON.stringify(SavedCandidates));
  } , [SavedCandidates]);

  const removeSavedCandidate = (username: string) => {
    const updatedCandidates = SavedCandidates.filter((candidate) => candidate.username !== username);
    setSavedCandidates(updatedCandidates);
  };

  return (
    <div>
      <h1>Potential Candidates</h1>

      {SavedCandidates.length === 0 ? (
        <p>No saved candidates</p>
      ) : (
        <ul>
          {SavedCandidates.map((candidate) => (
            <li key={candidate.username}>
              <img src={candidate.avatar} alt={candidate.name} width="50" />
              <h2>{candidate.name}</h2>
              <p>Username: {candidate.username}</p>
              <p>Location: {candidate.location}</p>
              <p>Email: {candidate.email}</p>
              <p>
                <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
              </p>
              <p>Company: {candidate.company}</p>
              <button onClick={() => removeSavedCandidate(candidate.username)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedCandidates;
