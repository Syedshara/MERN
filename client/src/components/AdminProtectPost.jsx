import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminProtectPost = () => {
    const { currentUser } = useSelector(state => state.user);

    if (!currentUser) {
        return <Navigate to="/sign-in" />;
    }

    return currentUser.isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default AdminProtectPost;
