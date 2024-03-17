import { useNavigate } from 'react-router';

const Home = () => {
  const navigate = useNavigate();
  return (
    <section>
      <h3> Welcome to J - budget tracker </h3>
      <button onClick={() => navigate('/budget-app')}> Start tracking </button>
    </section>
  );
};

export default Home;
