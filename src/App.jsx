import { Navbar, AllRoute, Footer, LeftSideBar, SmallDeviceMenuBar } from "./components/index.js"
import { GetAllQuestions } from './redux/actions/questionsActions';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import KommunicateChat from './Chat.jsx';



function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllQuestions())
  }, [dispatch]);


  return (
    <div className="flex flex-col relative">
      <Navbar />
      <div className='flex justify-center min-h-[90vh]'>
        <div className="w-[15%] border-r-2 hidden md:flex">
          <LeftSideBar />
        </div>
        <div className="w-full md:w-[80%] mb-10 sm:mb-0">
          <AllRoute />
          <KommunicateChat />
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default App
