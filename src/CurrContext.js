import axios, { Axios } from 'axios';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { onSnapshot, doc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { CoinList } from './Api/Api';

const Currency=createContext();
const CurrContext = ({children}) => {
    const [currency,setCurrency]=useState('INR');
    const [symbol,setSymbol]=useState('₹');
    const [coins,setCoins]=useState([]);
    const [loading,setLoading]=useState(false);
    const [user, setUser] =useState(null);
    const [alert, setAlert] = useState({
      open: false,
      message: "",
      type: "success",
    });
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
      if (user) {
        const coinRef = doc(db, "watchlist", user?.uid);
        var unsubscribe = onSnapshot(coinRef, (coin) => {
          if (coin.exists()) {
            console.log(coin.data().coins);
            setWatchlist(coin.data().coins);
          } else {
            console.log("No Items in Watchlist");
          }
        });
  
        return () => {
          unsubscribe();
        };
      }
    }, [user]);
  

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) setUser(user);
        else setUser(null);

        console.log(user);
      });
    }, []);
    
    
    const fetchCoins=async()=>{
      setLoading(true);
      const {data}=await axios.get(CoinList(currency));
      setCoins(data);
      setLoading(false);
    };

    useEffect(()=>{
        if(currency==='INR')setSymbol('₹');
        if(currency==='USD')setSymbol('$');
    },[currency]);
    return (
      <Currency.Provider
        value={{
          currency,
          setCurrency,
          symbol,
          alert,
          setAlert,
          user,
          coins,
          loading,
          watchlist,
        }}
      >
        {children}
      </Currency.Provider>)
};

export default CurrContext;

export const CurrencyState=()=>useContext(Currency);