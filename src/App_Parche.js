import App from "./App"
import {useLocation} from 'react-router-dom';

export default function App_P(){
    const location = useLocation();
    return (
        <App name={location.state.name} sol_active={location.state.sol_active} solutions={location.state.solutions} balls={location.state.balls} loop={location.state.is_loop} throws={location.state.throws} times={location.state.times}/>
    )
}