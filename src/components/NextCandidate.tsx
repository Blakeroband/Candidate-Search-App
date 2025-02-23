import { Candidate } from '../interfaces/Candidate.interface';

interface NextCandidateProps {
  candidates: Candidate[];
  currentIndex: number;
  onNextCandidate: (index: number) => void;
}

const NextCandidate = ({ candidates, currentIndex, onNextCandidate }: NextCandidateProps) => {
  const handleNextCandidate = () => {
    const nextIndex = (currentIndex + 1) % candidates.length;
    onNextCandidate(nextIndex);
  };

  return (
    <div>
      <button onClick={handleNextCandidate}>-</button>
    </div>
  );
};

export default NextCandidate;