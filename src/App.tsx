import { useRef, useState } from 'react'
import './App.css'
import Square from './components/square';

const intial_positon = {
  x: 100, y: 100
}

function App() {
  // const squareRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [divPosition, setDivPosition] = useState(intial_positon);


  return (
    <>

      <div className='wrapper' ref={wrapperRef} >

        <Square

          setDivPosition={setDivPosition}
          divPosition={divPosition}
          wrapperRef={wrapperRef} />
      </div >
    </>
  )
}

export default App
