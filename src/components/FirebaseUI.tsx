import FirebaseService from "../services/FirebaseService";
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { observer } from "mobx-react";
import { action } from "mobx";

const FirebaseUI: React.FC = () => {
    const uiConfig: firebaseui.auth.Config = {
        signInFlow: "popup",
        signInOptions: [
            FirebaseService.auth.EmailAuthProvider.PROVIDER_ID,
            FirebaseService.auth.GoogleAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccessWithAuthResult: () => false
        }
    }

    const handleAuthentication = action(() => {
        if (FirebaseService.currentUser) {
            FirebaseService.authInstance.signOut();
            FirebaseService.currentUser = null;
        } else {
            const ui = new firebaseui.auth.AuthUI(FirebaseService.authInstance);
            ui.start("#firebaseui-auth-container", uiConfig);
        }
    })

    return FirebaseService.currentUser ?
        <>
            <li>Hello signed in user! {FirebaseService.currentUser?.displayName}</li>
            <li><button onClick={handleAuthentication}>Click to Sign out</button></li>
        </> :
        <>
            <li>Not signed in !!</li>
            <li><button onClick={handleAuthentication}>Click to Sign in</button></li>
        </>
}

export default observer(FirebaseUI);