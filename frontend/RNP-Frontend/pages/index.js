import 'bootstrap/dist/css/bootstrap.min.css';
import UserLogin from "./user/login";

const Index = () => {
    const wrapperStyle = {
        backgroundColor: '#d1e6ff',
        height: '100vh',
        width: '100%',
        //fontFamily: 'Roboto'
    };

    return (
        <div style={wrapperStyle}>
            <UserLogin />
        </div>
    );
};

export default Index;
