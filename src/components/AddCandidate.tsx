
import { Candidate } from '../interfaces/Candidate.interface';

interface AddCandidateProps {
  candidate: Candidate | null;
  onAddCandidate: (candidate: Candidate) => void;
}

const AddCandidate = ({ candidate, onAddCandidate }: AddCandidateProps) => {

  const handleAddCandidate = () => {
    if (candidate) {
      console.log('Adding candidate:', candidate);
      onAddCandidate(candidate);
    } else {
      console.log('No candidate to add.');
    }
  };

  return (
    <div>
      <button onClick={handleAddCandidate}>+</button>
    </div>
  );
};

export default AddCandidate;