import { observer } from "mobx-react";
import { Link, Route, Routes } from "react-router-dom"
import FirebaseUI from "./FirebaseUI"
import "./Header.css";

const Header: React.FC = () => {
    return (
        <ul>
            <Link to="/">Home</Link>
            <Routes>
                <Route path="/" element={<FirebaseUI />} />
            </Routes>
        </ul>)
}

export default observer(Header)