import React , { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { Label, TextInput , Button } from 'flowbite-react'
import { useDispatch , useSelector } from 'react-redux';
import { loginFailure , loginStart, loginSuccess } from '../redux/user/userSlice';

const SignIn = () => {
  const [formData,setFormData] = useState({})
  const dispatch = useDispatch();
  const {loading , error :errorMessage} = useSelector((state)=>state.user);
  const navigate = useNavigate();




  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(loginFailure({errorMessage : 'All fields are required'}));
      
    }
    try {
      dispatch(loginStart());
      const response = await fetch('http://localhost/crypto/server/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        
      })

      const data = await response.json();
      
      if (response.ok) {
        dispatch(loginSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
    }

  }
  const handleChange = (e) => {
    setFormData({
      ...formData,[e.target.id]:e.target.value.trim()
    });
  }
  return (
    <div className='min-h-screen mt-20'>
      <div className=' mx-auto max-w-xl p-3'>
      <h1 className='px-3 text-3xl text-center py-3  m-3 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-lg '>Sign In</h1>
        <div className='flex-1 items-center'>
          <form className='flex flex-col gap-4' action="" onSubmit={handleSubmit}>
           
            <div >
              <Label value='Email'/>
              <TextInput type='email' placeholder='email' id='email' onChange={handleChange}/>
            </div>
            <div >
              <Label value='Password'/>
              <TextInput type='password' placeholder='password' id='password' onChange={handleChange}/>
            </div>
            <Button className=' max-w-xs ml-auto mr-auto' gradientDuoTone="purpleToBlue" outline type='submit' >{
               'Login'
            }
            </Button>
            
          </form>
          <div className='flex gap-2 text-sm mt-5 '>
            <span>Don't Have an account?</span>
            <Link to={'/sign-up'} className='text-blue-500'>Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn