import React, { useEffect, useState } from "react";
import Range from "./Range";
import { doc, getDoc } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase/config";
import Loading from "./Loading";

const Characteristics = () => {
   const { user } = UserAuth();
   const [data, setData] = useState({});
   const [isLoaded, setIsLoaded] = useState(false);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const docRef = doc(db, "test-results", `${user.uid}`);
            const docSnap = await getDoc(docRef);
            setData(docSnap.data());
            setIsLoaded(true);

            if (data.length < 1) {
               throw new Error("Please update your Data");
            }
         } catch (e) {}
      };
      fetchData();
   }, [user.uid]);

   // console.log(data);
   const chars = [
      { min: "Депрессия", max: "Счастье", value: data.depression },
      { min: "Пассивность", max: "Активность", value: data.passivness },
      { min: "Пустота", max: "Наполненность", value: data.emptiness },
      { min: "Паника", max: "Спокйоствие", value: data.anxiety },
   ];
   return (
      <div className="mx-auto my-5 px-4 py-2 shadow-lg rounded-lg ">
         <h2 className="text-slate-800 font-semibold text-lg">
            Характеристика
         </h2>

         {isLoaded ? (
            chars.map((el, idx) => {
               return (
                  <Range min={el.min} max={el.max} value={el.value} key={idx} />
               );
            })
         ) : (
            <Loading />
         )}
      </div>
   );
};

export default Characteristics;
