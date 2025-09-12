import { YouTubeLearningContainer } from '../../../containers/YouTubeLearningContainer';

interface YouTubeLearningPageProps {
  params: {
    songId: string;
  };
}

export default function YouTubeLearningPage({ params }: YouTubeLearningPageProps) {
  return <YouTubeLearningContainer songId={params.songId} />;
}
