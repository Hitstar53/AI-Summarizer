import React from 'react'
import { logo } from '../assets';

const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
        <nav className='flex justify-between items-center w-full mb-10 pt-3'>
            <img src={logo} alt='logo' className='w-28 object-contain' />
            <button type='button' className='black_btn font-inter font-semibold' onClick={() => window.open('https://github.com/hitstar53')}>
                Github
            </button>
        </nav>
        <h1 className='head_text'>
            Summarize Articles with <br className='max-md:hidden' /> 
            <span className='orange_gradient'>OpenAI GPT-4</span>
        </h1>
        <h2 className='desc'>
            Simplify your reading experience with Summarize, an open-source article summarizer tool that transforms long articles into short and clear summaries.
        </h2>
    </header>
  )
}

export default Hero