import { RootState } from '@/redux/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const useAuthRole = () => {
  const role = useSelector((state: RootState) => state.role.role);
  const navigate = useNavigate();

  useEffect(() => {
    if (!role) {
      
      navigate('/');
    }
  }, [role, navigate]);

  return role; 
};

export default useAuthRole;
