import React, { useState } from 'react';
import './Navbar.css'; // Ensure this file is updated with custom styles

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            <nav className='bg-violet-400'>
                <div className="mycontainer flex justify-between items-center px-4 py-5 h-7">
                    <div className='logo font-bold text-white flex gap-5'>
                        <div>
                            <lord-icon
                                src="https://cdn.lordicon.com/akvmsdmv.json"
                                trigger="hover"
                                stroke="bold"
                                colors="primary:#000000,secondary:#6c16c7"
                                className="w-9 h-9"
                            ></lord-icon>
                        </div>
                        <div className='py-2'>
                            <span className='text-violet-950'>Wings </span>Password
                            <span className='text-violet-950'> Manager </span>
                        </div>
                    </div>
                    <button className='lg:hidden' onClick={toggleMenu}>
                        <div className='w-6 h-0.5 bg-white mb-1'></div>
                        <div className='w-6 h-0.5 bg-white mb-1'></div>
                        <div className='w-6 h-0.5 bg-white'></div>
                    </button>
                    <ul className='hidden lg:flex'>
                        <li className='flex gap-5'>
                            <a className='hover:font-bold ' href="">Home</a>
                            <a className='hover:font-bold ' href="">About</a>
                            <a className='hover:font-bold ' href="">Contact</a>
                            <a className='hover:font-bold ' href="">Feedback</a>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className={`z-20 fixed top-0 right-0 w-2/3 h-full bg-transparent  backdrop-blur-md shadow-lg transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} lg:hidden`}>
                <button className='absolute top-2 right-4 text-2xl' onClick={toggleMenu}><lord-icon
                    src="https://cdn.lordicon.com/lhscugaw.json"
                    trigger="morph"
                    stroke="bold"
                    state="morph-circle"
                    colors="primary:#FFFFFF,secondary:#c69cf4"
                    className='w-6 h-6'>
                </lord-icon></button>
                <ul className='mt-20 flex flex-col items-center justify-center h-full'>
                    <li className='my-4'><a className='text-violet-300 hover:font-bold text-2xl border bg-black  py-1 px-5 rounded-full font-thin' href="">Home</a></li>
                    <li className='my-4'><a className='text-violet-300 hover:font-bold text-2xl border bg-black  py-1 px-5 rounded-full font-thin' href="">About</a></li>
                    <li className='my-4'><a className='text-violet-300 hover:font-bold text-2xl border bg-black  py-1 px-5 rounded-full font-thin' href="">Contact</a></li>
                    <li className='my-4'><a className='text-violet-300 hover:font-bold text-2xl border bg-black  py-1 px-5 rounded-full font-thin' href="">Feedback</a></li>
                    <li className='mt-16'>
                        <div className='flex flex-col justify-center items-center'>

                            <div>
                            <lord-icon
                                src="https://cdn.lordicon.com/akvmsdmv.json"
                                trigger="hover"
                                stroke="bold"
                                colors="primary:#c69cf4,secondary:#000000"
                                className="w-20 h-20"
                            ></lord-icon></div>
                            <div className='text-xl text-center text-violet-300 '>Your Secure Password Manager</div>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Navbar;
