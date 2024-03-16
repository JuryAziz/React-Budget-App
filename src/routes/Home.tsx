import { useNavigate } from 'react-router';

const Home = () => {
  const navigate = useNavigate();
  return <button onClick={() => navigate('/budget-app')}> Home </button>;
};

export default Home;
