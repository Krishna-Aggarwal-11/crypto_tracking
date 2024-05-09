import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  
  const handleChange = (e) => {
    setFormData({
      ...formData,[e.target.id]:e.target.value.trim()
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch('http://localhost/crypto/server/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json();
      
      if (response.ok) {
        console.log(data);
        setLoading(false);
        navigate('/sign-in');
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className=" mx-auto max-w-xl p-3">
        <h1 className="px-3 text-3xl text-center py-3  m-3 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-lg ">
          Sign Up
        </h1>
        <div className="flex-1 items-center">
          <form
            className="flex flex-col gap-4"
            action=""
            onSubmit={handleSubmit}
          >
            <div>
              <Label value="UserName" />
              <TextInput
                type="text"
                placeholder="username"
                id="username"
                
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Email" />
              <TextInput
                type="email"
                placeholder="email"
                id="email"
                
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Password" />
              <TextInput
                type="password"
                placeholder="password"
                id="password"
                
                onChange={handleChange}
              />
            </div>
            <Button className=' max-w-xs ml-auto mr-auto' gradientDuoTone="purpleToBlue" outline type='submit' disabled={loading}>{
              loading ? (
                <>
                <Spinner size="sm"/>
                  <span className='pl-3'>Loading...</span>
                
                </>
              ) : 'Register'
            }
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5 ">
            <span>Have an account?</span>
            <Link to={"/sign-in"} className="text-blue-500">
              Sign In
            </Link>
          </div>
          {errorMessage && <Alert className='mt-5' color="failure">{errorMessage}</Alert>}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
