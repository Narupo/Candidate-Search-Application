import {useState, useEffect} from 'react';
import type {Candidate} from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const storedCandidates = localStorage.getItem('saveCandidates')
   // console.log("Stored Candidates:", storedCandidates);
    if (storedCandidates == undefined) {
      setSavedCandidates([]);
    } else {
      setSavedCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('saveCandidates', JSON.stringify(savedCandidates));
  } , [savedCandidates]);

  const removeSavedCandidate = (username: string) => {
    const updatedCandidates = savedCandidates.filter((candidate) => candidate.login !== username);
    setSavedCandidates(updatedCandidates);
  };

  return (
    <div>
      <h1>Potential Candidates</h1>

      {savedCandidates.length === 0 ? (
        <p>No saved candidates</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Username</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Profile</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate) => (
              <tr key={candidate.login}>
                <td>
                  <img src={candidate.avatar_url} alt={candidate.name} width="50" />
                </td>
                <td>{candidate.name}</td>
                <td>{candidate.login}</td>
                <td>{candidate.location || 'N/A'}</td>
                <td>{candidate.email || 'N/A'}</td>
                <td>{candidate.company || 'N/A'}</td>
                <td>
                  <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                    GitHub Profile
                  </a>
                </td>
                <td>
                  <button onClick={() => removeSavedCandidate(candidate.login)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavedCandidates;
