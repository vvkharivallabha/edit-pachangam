import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import * as FirebaseAuth from "firebase/auth"
import { Analytics, getAnalytics } from "firebase/analytics";
import { FirebaseConfig } from "../config";
import { action, makeAutoObservable, observable } from "mobx";
import StorageService from "./StorageService";

/**
 * Service to handle Firebase related modules
 */
class FirebaseService {
    private _app!: FirebaseApp;
    private _analytics!: Analytics;
    private _authInstance!: FirebaseAuth.Auth;
    fireStore?: Firestore;
    currentUser: FirebaseAuth.User | null = null;
    initialized: boolean = false;

    constructor() {
        makeAutoObservable(this, {
            initialized: observable,
            currentUser: observable,
            fireStore: observable
        })
    }

    static instance = new FirebaseService();

    // Main app of firebase
    get app() {
        return this._app;
    }

    // Auth module
    get auth() {
        return FirebaseAuth;
    }

    // Auth instance
    get authInstance() {
        return this._authInstance;
    }

    // Analytics
    get analytics() {
        return this._analytics;
    }

    initializeStore = () => {
        this.fireStore = getFirestore(this._app);
        StorageService.intialize();
    }

    removeStore = () => {
        this.fireStore = undefined;
        StorageService.clear();
    }

    @action
    initialize() {
        this._app = initializeApp(FirebaseConfig);
        this._analytics = getAnalytics(this._app);
        this._authInstance = this.auth.getAuth();
        this._authInstance.onAuthStateChanged(action((user: FirebaseAuth.User | null) => {
            this.currentUser = user;
            user ? this.initializeStore() : this.removeStore();
        }))
        this.initialized = true;
    }

    mockInitialize = () => {
        this.currentUser = {
            displayName: "Hari Vallabha",
        } as FirebaseAuth.User;
        this._authInstance = {
            signOut: () => { this.currentUser = null }
        } as FirebaseAuth.Auth;
        this.initialized = true;
    }

    reset = () => {
        this.initialized = false;
    }
}

export default FirebaseService.instance;
