// import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";
import {getChunkData, getChunkIds} from "./logic/apiCalls";


function App() {

    const [data, setDate] = useState(null);
    const [input, setInput] = useState('');
    const [chunkData, setChunkData] = useState('');

    const getData = async () => {
        const resData = await getChunkIds(input);
        setDate(resData);


        const toPrint = resData.chunks.map(async (item, index) => {
            console.log(item)
            if (item.confidence > 70) {
                const resChunkData = await getChunkData(item.chunkId);
                setChunkData({...chunkData, [item.chunkId]: resChunkData})

            }
        })

        // const resChunkData = await getChunkData(resData.chunks[0].chunkId);
        // setChunkData({[resData.chunks[0].chunkId]: resChunkData})

        console.log("the data state is:", data)
        console.log("the chunkData state is:", chunkData)

    }

    const handleChange = (e) => {
        setInput(e.target.value)
    }

  return (
    <div className="App">
        <p>
          TASK
        </p>
          <div>
              <input
                  value={input}
                  onChange={handleChange}
              ></input>
              <button
                  onClick={()=>getData()}

              >Submit</button>
              {data && data.chunks.map((item, index) => {
                  console.log(item.chunkId)
                  console.log(chunkData[item.chunkId])
                  // console.log(chunkData.chunkId)
                  return (
                      <div>
                          <h5 key={item.chunkId}>{item.confidence}</h5>
                          <h5>{chunkData[item.chunkId]}</h5>
                      </div>
                  )
              })
              }

          </div>

      {/*</header>*/}
    </div>
  );
}

export default App;
