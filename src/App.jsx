import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'
import ProgressBar from './components/ProgressBar'


function App() {

  const [url, setUrl] = useState({ productUrl: '' });
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [responseTime, setResponseTime] = useState(0);


  const startTime = Date.now();

  useEffect(() => {
    if (isLoading) {
      axios.post('https://amazonproductdetailsfinder.onrender.com/product', url)
        .then(res => {
          const endTime = Date.now();
          setData(JSON.stringify(res.data, null, 2));
          setIsLoading(false);
          console.log(`Time taken: ${endTime - startTime}ms`);
          const responseTime = endTime - startTime;
          setResponseTime(responseTime);
        })
        .catch(err => {
          setError(err);
          setIsLoading(false);
        });
    }
  }, [isLoading, url]);

  const handleChange = (e) => {
    setUrl({ ...url, productUrl: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.productUrl) {
      setError('Please enter a valid URL');
      return;
    }
    setIsLoading(true);
  }

  const preRef = useRef(null);

  const handleCopyClick = (e) => {
    // const pre = preRef.current;
    // const range = document.createRange();
    // range.selectNode(pre);
    // window.getSelection().removeAllRanges();
    // window.getSelection().addRange(range);
    // document.execCommand('copy');
    // window.getSelection().removeAllRanges();
    e.preventDefault();
    if (preRef.current !== null) {
      navigator.clipboard.writeText(preRef.current.innerText);
    }
  };


  return (
    <div className="App flex justify-center items-center min-h-screen text-white font-bold">
      <form action="" onSubmit={handleSubmit} className="bg-slate-800 px-12 py-12 flex flex-col gap-6 w-full h-1/3 md:w-1/3">
        <div className="form-group flex flex-col gap-4">
          {/* <label className='' for="homepage">ENTER URL:</label> */}
          <input className='px-3 py-3 text-gray-900' placeholder='Enter Amazon Product URL' type="url" id="homepage" name="homepage" value={url.productUrl} onChange={handleChange} />
        </div>
        {/* <button type="submit">Search Now</button> */}
        <button type='submit' href="#_" className="relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
          <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
          <span className="relative">Search Now</span>
        </button>

        {/* {

          <code className='overflow-x-auto font-sm text-sm font-serif tracking-wider font-extralight'>
            {data}
          </code>
        } */}

        {/* {isLoading ? (
          <div height={300} />
        ) : error ? (
          <p>{error.message}</p>
        ) : ( */}

        {!isLoading &&
          <button className='text-right' onClick={handleCopyClick}>Copy</button>}

        {!isLoading ? (
          <div className='w-full'>
            <pre ref={preRef} className='scrollbar cursor-text overflow-x-auto font-sm text-sm font-serif tracking-wider font-extralight'>{data}</pre>
          </div>) : <ProgressBar responseTime={responseTime} />
          //   <div className='h-[300px] bg-slate-200 text-center text-black'> Loading...

          // </div>
        }




      </form>
    </div>
  )
}

export default App
