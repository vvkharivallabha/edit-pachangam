import { collection, CollectionReference, DocumentData, DocumentReference, getDocs, QueryDocumentSnapshot, runTransaction, Timestamp } from "firebase/firestore";
import { Firestore } from "firebase/firestore";
import { action, makeAutoObservable, observable } from "mobx";
import FirebaseService from "./FirebaseService";

interface PanchangamDocument {
    date: Timestamp;
    tithi: string;
}

export interface Panchangam {
    id: string;
    tithi: string;
    ref?: DocumentReference;
}

class StorageService {

    db!: Firestore;
    private _collection?: CollectionReference<DocumentData>;
    docs = new Map<string, Panchangam>();
    mock = true;

    static instance = new StorageService();

    constructor() {
        makeAutoObservable(this, {
            docs: observable,
            mock: observable
        })
    }

    @action
    setCollection(name?: string) {
        this._collection = collection(this.db, name || "panchangam")
    }

    @action
    async getDocs() {
        if (this._collection) {
            const snapShot = await getDocs(this._collection);
            snapShot.forEach(action((doc) => {
                const panchangamDocument = doc as QueryDocumentSnapshot<PanchangamDocument>;
                const data = panchangamDocument.data();
                this.docs.set(data.date.toDate().toDateString(), {
                    id: panchangamDocument.id,
                    tithi: data.tithi,
                    ref: panchangamDocument.ref
                })
            }))
        }

    }

    get collection() {
        return this._collection;
    }

    updateValue = (documentRef: DocumentReference, newValue: Panchangam) => {
        if (FirebaseService.fireStore) {
            try {
                runTransaction(FirebaseService.fireStore, async (transaction) => {
                    const doc = await transaction.get(documentRef);
                    if (!doc.exists()) {
                        throw new Error("Document does not exist!");
                    }
                    const data = doc.data() as Panchangam;
                    if (data.tithi !== newValue.tithi) {
                        transaction.update(documentRef, { tithi: newValue.tithi });
                    }
                });
                console.log("Transaction successfully committed!");
            } catch (e) {
                console.log("Transaction failed: ", e);
            }
        } else {
            console.error("firestore not available")
        }

    }

    intialize() {
        this.db = FirebaseService.fireStore!;
        this.setCollection();
        this.getDocs();
    }

    mockInitialize() {
        this.docs.set("Sun May 15 2022", { id: "1", tithi: "Trayodashi" })
        this.docs.set("Sat May 14 2022", { id: "2", tithi: "Chaturdasi" })
    }

    @action
    clear() {
        this._collection = undefined;
        this.docs = new Map<string, Panchangam>();
    }
}

export default StorageService.instance;