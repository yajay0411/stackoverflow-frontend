import React from 'react';
import { Routes, Route } from "react-router-dom"
import { Home, Auth, ResetPassword, AuthenticateUser, Question, AskQuestions, Tags, Users, QuestionDetail, UserDetails, Community, CreatePost, PostDetail } from './index.js';


const AllRoute = () => {
  return (
    <div className='mb-10'>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/auth' element={<Auth />} />
        <Route exact path='/resetpassword' element={<ResetPassword />} />
        <Route exact path='/authenticateuser' element={<AuthenticateUser />} />
        <Route exact path='/questions' element={<Question />} />
        <Route exact path='/questions/:questionID' element={<QuestionDetail />} />
        <Route exact path='/askquestion' element={<AskQuestions />} />
        <Route exact path='/tags' element={<Tags />} />
        <Route exact path='/users' element={<Users />} />
        <Route exact path='/users/:userId' element={<UserDetails />} />
        <Route exact path='/community' element={<Community />} />
        <Route exact path='/community/createpost' element={<CreatePost />} />
        <Route exact path='/community/:postID' element={<PostDetail />} />

      </Routes>
    </div>
  )
}

export default AllRoute
