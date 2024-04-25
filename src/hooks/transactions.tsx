import { useEffect, useState } from 'react';
import {getFirestore,collection,getDocs, getDoc, doc} from 'firebase/firestore';
import { app } from '../config/firebase';


const useFetchFirestoreData = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
  const [users,setusers]=useState<any[]>([]);
const [merchants,setmerchants]=useState<any[]>([]);
const [withdraws,setwithdraws]=useState<any[]>([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const firestore=getFirestore(app);
                const snapshot = await getDocs(collection(firestore,'transactions'));
                const fetchedData = snapshot.docs.map((doc) => {
                    const data = doc.data();
                    data.id = doc.id;
                    return data;
                });
                setData(fetchedData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Firestore data:', error);
            }
        };
        const fetchMerchant = async () => {
            try {
                const firestore=getFirestore(app);
                const snapshot = await getDocs(collection(firestore,'merchants'));
                const fetchedData = snapshot.docs.map((doc) => {
                    const data = doc.data();
                    data.id = doc.id;
                    return data;
                });
                setmerchants(fetchedData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Firestore data:', error);
            }
        };
     
        const fetchWithdraws = async () => {
            try {
            const firestore = getFirestore(app);
            const snapshot = await getDocs(collection(firestore, 'withdraw'));
            const fetchedData = snapshot.docs.map((doc) => {
                const data = doc.data();
                data.id = doc.id;
                return data;
            });
            setwithdraws(fetchedData);
            setLoading(false);
            } catch (error) {
            console.error('Error fetching Firestore data:', error);
            }
        };
        const fetchUsers = async () => {
            try {
            const firestore=getFirestore(app);
            const snapshot = await getDocs(collection(firestore,'users'));
            const fetchedData = snapshot.docs.map((doc) => {
                const data = doc.data();
                data.id = doc.id;
                return data;
            });
            setusers(fetchedData);
            setLoading(false);
            } catch (error) {
            console.error('Error fetching Firestore data:', error);
            }
        };
fetchUsers()
fetchMerchant()
        fetchData();
        fetchWithdraws()
    }, []);
     
    const getUserName = async (docId: string) => {
        try {
            const firestore = getFirestore(app);
            const docRef = doc(firestore, 'users', docId);
            const docSnapshot = await getDoc(docRef);
            if (docSnapshot.exists()) {
                const docData = docSnapshot.data();
                return docData.phone;
            } else {
                console.error('Document does not exist');
                return null;
            }
        } catch (error) {
            console.error('Error fetching Firestore document:', error);
            return null;
        }
    };

    const getTotalTransactionAmount = () => {
        let totalAmount = 0;
        data.forEach((transaction) => {
            totalAmount += transaction.amount;
        });
        return totalAmount;
    };

    const getMerchantName = async (id: string) => {
        try {
            const firestore = getFirestore(app);
            const docRef = doc(firestore, 'merchants', id);
            const docSnapshot = await getDoc(docRef);
            if (docSnapshot.exists()) {
                const docData = docSnapshot.data();
                return docData.name;
            } else {
                console.error('Merchant does not exist');
                return null;
            }
        } catch (error) {
            console.error('Error fetching Firestore document:', error);
            return null;
        }
    };

    // Usage example:
    // const docId = 'your-document-id';
    // const collectionData = await getCollectionData(docId);
    return { data, loading ,getUserName,users,merchants,getTotalTransactionAmount,withdraws,getMerchantName};
};

export default useFetchFirestoreData;