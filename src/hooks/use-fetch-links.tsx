import { db } from "../../firebase";
import { toast } from "react-toastify";
import { toastrConfig } from "../util";
import { useEffect, useState } from "react";
import { Firebase } from "../ts/enums/firebase.enum";
import { getDocs, collection } from "firebase/firestore";
import { IFirebaseLink } from "../ts/models/firebase-link.model";

export const useFetchLinks = () => {
    const [{ isLoading, links }, setLinks] = useState<{ isLoading: boolean; links: IFirebaseLink[] }>({ isLoading: true, links: [] });

    useEffect(() => {
        (async () => {
            try {
                const querySnapshot = await getDocs(collection(db, Firebase.COLLECTION));
                const links = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as IFirebaseLink[];

                setLinks({ isLoading: false, links });
            } catch {
                setLinks({ isLoading: false, links: [] });
                toast.error('Error fetching links. Please try again!', toastrConfig);
            }
        })();
    }, []);

    return { isLoading, links, setLinks };
}