import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';
import CryptoJS from 'crypto-js';


const Manager = () => {
 


  const encryptPassword = (password, secretKey) => {
    return CryptoJS.AES.encrypt(password, secretKey).toString();
  };

  const decryptPassword = (encryptedPassword, secretKey) => {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };
  
  const ref = useRef()
  const passwordRef = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setPasswordArray] = useState([])

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    setPasswordArray(passwords)
  }


  useEffect(() => {
    getPasswords()
  }, [])


  const copyText = (text) => {
    toast('Copied to clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text)
  }

  
  const showPassword = () => {
    passwordRef.current.type = "text"
    console.log(ref.current.src)
    if (ref.current.src.includes("images/close.png")) {
      ref.current.src = "images/open.png"
      passwordRef.current.type = "password"
    }
    else {
      passwordRef.current.type = "text"
      ref.current.src = "images/close.png"
    }

  }

  const savePassword = async () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      const secretKey = "your-secret-key"; // Replace this with a more secure key management approach
      
      // Encrypt the password
      const encryptedPassword = encryptPassword(form.password, secretKey);
  
      // Update the form object with the encrypted password
      const encryptedForm = { ...form, password: encryptedPassword };
  
      // Delete the existing password if it exists
      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: form.id })
      });
  
      // Save the new encrypted password
      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...encryptedForm, id: uuidv4() })
      });
  
      // Clear the form and show toast
      setform({ site: "", username: "", password: "" });
      toast('Password saved!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast('Error: Password not saved!');
    }
  }
  
  const deletePassword = async (id) => {
    console.log("Deleting password with id ", id)
    let c = confirm("Do you really want to delete this password?")
    if (c) {
      setPasswordArray(passwordArray.filter(item => item.id !== id))

      await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })

      toast('Password Deleted!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

  }

  const editPassword = (id) => {
    const passwordItem = passwordArray.filter(i => i.id === id)[0];
    
    // Decrypt the password before setting it in the form
    const decryptedPassword = decryptPassword(passwordItem.password, "your-secret-key");
    
    setform({ ...passwordItem, password: decryptedPassword, id: id });
    setPasswordArray(passwordArray.filter(item => item.id !== id));
  }
  

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }


  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />

      <div className="relative min-h-screen">
        <div className="absolute inset-0 -z-10 h-full w-full flex items-center px-5 py-24 bg-[radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

        <div className="p-3 md:mycontainer min-h-[88.2vh]">

          <h1 className='text-4xl font-bold text-white text-center'>
            <div className='py-2'>
              <span className='text-violet-950'>
                <lord-icon
                  src="https://cdn.lordicon.com/qtnftfai.json"
                  trigger="hover"
                  colors="primary:#a866ee"
                  className='w-14 h-14'
                >
                </lord-icon>
              </span> Password
              <span className='text-violet-950'> Manager</span>
            </div>
          </h1>

          <p className=' text-lg text-center'>Your own Password Manager</p>

          <div className="flex flex-col p-4 text-black gap-8 items-center">
            <div className="relative  w-full">
              <input
                value={form.site}
                onChange={handleChange}
                placeholder='Enter website URL '
                className='rounded-full border-2 border-violet-500 w-full p-4 pr-12 py-1.5'
                type="text"
                name="site"
                id="site"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-8">
                <lord-icon
                  src="https://cdn.lordicon.com/awgiupxe.json"
                  colors="primary:#000000,secondary:#c69cf4"

                  trigger="hover"
                  className="w-6 h-6"
                >
                </lord-icon>
              </div>
            </div>

            <div className="flex flex-col md:flex-row w-full justify-between gap-8">
              <div className="relative w-full">
                <input
                  value={form.username}
                  onChange={handleChange}
                  placeholder='Enter Username'
                  className='rounded-full border-2 border-violet-500 w-full p-4 py-1.5'
                  type="text"
                  name="username"
                  id="username"
                />
                <div className="absolute inset-y-0 right-0 flex items-center  pr-8">
                  <lord-icon
                    src="https://cdn.lordicon.com/bgebyztw.json"
                    trigger="hover"
                    state="hover-looking-around"
                    colors="primary:#a866ee,secondary:#6c16c7"
                    className="w-6 h-6"
                  >
                  </lord-icon>
                </div>
              </div>

              <div className="relative">
                <input
                  ref={passwordRef}
                  value={form.password}
                  onChange={handleChange}
                  placeholder='Enter Password'
                  className='rounded-full border-2 border-violet-500 w-full p-4 py-1.5'
                  type="password"
                  name="password"
                  id="password"
                />
                <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                  <img ref={ref} className=' py-0.5 pr-3' width={37} src="images/close.png" alt="eye" />
                </span>
              </div>
            </div>
            <button
              onClick={savePassword}
              className='text-violet-950 font-bold flex justify-center items-center  gap-2 bg-violet-400 hover:bg-violet-300 rounded-full px-8 py-2 w-fit border border-violet-900'
            >
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="hover"
              >
              </lord-icon>Save
            </button>
          </div>

          <div className="passwords">
            <h2 className='  text-violet-400 font-bold text-2xl py-4'>Your Passwords</h2>
            {passwordArray.length === 0 && <div className='text-violet-400'>No passwords to show</div>}
            {passwordArray.length !== 0 && (
              <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                <thead className='bg-violet-400  text-violet-950'>
                  <tr>
                    <th className='py-2'>Site</th>
                    <th className='py-2'>Username</th>
                    <th className='py-2'>Password</th>
                    <th className='py-2'>Actions</th>
                  </tr>
                </thead>
                <tbody className='bg-violet-200'>
                  {passwordArray.map((item, index) => (
                    <tr key={index}>

                      <td className='py-2  border border-white  text-center'>
                        <div className='flex items-center justify-center'>
                          <a href={item.site} target='_blank' rel='noreferrer'>{item.site}</a>
                          <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                            <lord-icon
                              style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover">
                            </lord-icon>
                          </div>
                        </div>

                      </td>
                      <td className='py-2  border border-white text-center '>
                        <div className='flex items-center justify-center'>
                          <span>{item.username}</span>
                          <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                            <lord-icon
                              style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            >
                            </lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className='py-2 border border-white text-center'>
                        <div className='flex items-center justify-center'>
                          <span>{"*".repeat(item.password.length)}</span>
                          <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                            <lord-icon
                              style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            >
                            </lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className='justify-center py-2 border border-white text-center'>
                        <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                          <lord-icon
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                            style={{ "width": "25px", "height": "25px" }}
                          >
                          </lord-icon>
                        </span>

                        <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ "width": "25px", "height": "25px" }}
                          >
                          </lord-icon>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager;
