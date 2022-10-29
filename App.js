import { useState, useEffect, useRef } from 'react';
import './App.css';



function App() {
  const [cardsValue, setCardsValue] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);

  const numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

  const cardsSelected=useRef([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]);

  const completedArray=useRef([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);

  const value= useRef([]);

  const Index= useRef([]);

  useEffect(() => {
    cardsValue.map((cardValue,index)=>{
        let randomNum=numbers[parseInt(Math.random()*numbers.length)];
        cardsValue[index]=randomNum;
        let randomIndex=numbers.indexOf(randomNum);
        numbers.splice(randomIndex,1);
    })
    setCardsValue([...cardsValue]);
  }, []);


  return (
    <div className="cards-container">
      {
        cardsValue.map((cardValue, index) => {
          return (
            <div className={completedArray.current[index] ? "card-completed" : cardsSelected.current[index] ? "card-true" : "card-false"} key={index} onClick={() => {

              if(completedArray.current[index]==0){ 
                cardsSelected.current[index] = !cardsSelected.current[index];
              }

              setCardsValue([...cardsValue]);

              if(value.current.length>=2){
                value.current=[];
                if(completedArray.current[index]==0){
                  value.current.push(cardValue);
                }
              }else{
                if(completedArray.current[index]==0){
                  value.current.push(cardValue);
                }
              }


              if(Index.current.length>=2){
                cardsSelected.current[Index.current[0]]=false;
                cardsSelected.current[Index.current[1]]=false;
                Index.current=[];
                if(completedArray.current[index]==0){
                  Index.current.push(index);
                }
              }else{
                if(completedArray.current[index]==0){
                  Index.current.push(index);
                }
              }

              if(value.current[0]==value.current[1]){
                if(Index.current[0]!=Index.current[1]){
                  completedArray.current[Index.current[0]]=1;
                  completedArray.current[Index.current[1]]=1;
                }
              }


            }}>{cardValue}</div>
          )
        })
      }
    </div>
  );
}

export default App;