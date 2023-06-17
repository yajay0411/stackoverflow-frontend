import { Navbar, AllRoute, Footer, LeftSideBar } from "./components/index.js"
import { GetAllQuestions } from './redux/actions/questionsActions';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';



function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllQuestions())
  }, [dispatch]);


  return (
    <div className="flex flex-col relative">
      <Navbar />
      <div className='flex min-h-[100vh]'>
        <div className="w-[20%] border-r-2 hidden sm:flex">
          <LeftSideBar />
        </div>
        <div className="w-full mb-10 sm:mb-0">
          <AllRoute />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default App
