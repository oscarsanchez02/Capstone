

export default function Register(){


    return (
      <div className="bg-gradient-to-b from-sky-400 to-white h-screen flex justify-center content-center">
      <div className="bg-white h-screen w-[1500px] p-4 justify-center">
      <h1 className=' pt-6 block text-5xl font-medium leading-6 text-gray-900 text-center'>Getting Signed Up Is E EASY!</h1>
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4" >
            <div>
              <label
                htmlFor='first_name'
                className='block text-sm font-medium leading-6 text-white text-center'
              >
                First Name
              </label>
              <div className='mt-2'>
                <input
                  id='first_name'
                  name='first_name'
                  type='text'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
    
            <div>
              <label
                htmlFor='last_name'
                className='block text-sm font-medium leading-6 text-white text-center'
              >
                Last Name
              </label>
              <div className='mt-2'>
                <input
                  id='last_name'
                  name='last_name'
                  type='text'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
    
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-white text-center'
              >
                Email address
              </label>
              <div className='mt-2'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
    
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium leading-6 text-white text-center'
              >
                Password
              </label>
            </div>
            <div className='mt-2'>
              <input
                id='password'
                name='password'
                type='password'
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>
    
            <div className='mt-2'>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
        </div>
        </div>
      );
    }