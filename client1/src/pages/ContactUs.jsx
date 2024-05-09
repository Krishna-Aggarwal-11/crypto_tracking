import React , { useState } from 'react'
import { Label, TextInput, Button, Textarea } from 'flowbite-react';

import { BsFacebook, BsInstagram, BsTwitch, BsTwitterX } from "react-icons/bs";

const ContactUs = () => {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  }
  return (
    <div className="min-h-screen mt-20">
    <div className=" mx-auto max-w-xl p-3">
      <h1 className="px-3 text-3xl text-center py-3  m-3 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-lg ">
        Contact Us
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
            <Label value="Message" />
            <Textarea
              type="message"
              placeholder="message"
              id="message"
              
              onChange={handleChange}
            />
          </div>
          <Button className=' max-w-xs ml-auto mr-auto' gradientDuoTone="purpleToBlue" outline type='submit' >
            Send Message
          </Button>
        </form>
        <div className="flex mt-10 gap-10 sm:mt-10 sm:justify-center">
            <a href="#" >
              <BsFacebook/>
            </a>
            <a href="#" >
              <BsInstagram/>
            </a>
            <a href="#" >
              <BsTwitch/>
            </a>
            <a href="#" >
              <BsTwitterX/>
            </a>
          </div>
      </div>
    </div>
  </div>
  )
}

export default ContactUs