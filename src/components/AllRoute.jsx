import React from 'react';
import { Routes, Route } from "react-router-dom"
import { Home, Auth, Question, AskQuestions, Tags, Users, QuestionDetail, UserDetails } from './index.js';


const AllRoute = () => {
  return (
    <div className='mb-10'>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/auth' element={<Auth />} />
        <Route exact path='/questions' element={<Question />} />
        <Route exact path='/questions/:questionID' element={<QuestionDetail />} />
        <Route exact path='/askquestion' element={<AskQuestions />} />
        <Route exact path='/tags' element={<Tags />} />
        <Route exact path='/users' element={<Users />} />
        <Route exact path='/users/:userId' element={<UserDetails />} />
      </Routes>
    </div>
  )
}

export default AllRoute
