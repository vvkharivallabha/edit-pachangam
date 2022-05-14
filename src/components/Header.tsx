import { observer } from "mobx-react";
import { Link, Route, Routes } from "react-router-dom"
import FirebaseUI from "./FirebaseUI"
import "./Header.css";

const Header: React.FC = () => {
    return (
        <ul>
            <Link to="/edit-pachangam">Home</Link>
            <Routes>
                <Route path="/edit-pachangam" element={<FirebaseUI />} />
            </Routes>
        </ul>)
}

export default observer(Header)