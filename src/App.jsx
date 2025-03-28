import React, { useState } from 'react'
import { toast } from 'react-toastify';
function App() {
  const [data, setData] = useState({
    name: '',
    email: ''
  })
  const [users, setUsers] = useState([])
  const [isActive, setIsActive] = useState(null)


  const handleChange = (e) => {
    setData({
      ...data, [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    if (data.name === '') {
      toast.error("Name is required !!");
    }
    else if (data.email === '') {
      toast.error("Email is required !!");
    }
    else {
      e.preventDefault()
      setUsers([
        ...users, data
      ])
      toast.success("data submitted successfully !!")
    }
    setData({
      name: '',
      email: ''
    })
  }


  const removeBtn = (index) => {
    const newUser = users.filter((_, i) => {
      return i !== index;
    })
    setUsers(newUser);
  }

  const handleEdit = (index) => {
    setIsActive(index)
    setData(users[index])
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    // users[isActive] = data;
    const copyUser = [...users];
    copyUser[isActive] = data;
    setUsers(copyUser)
    setIsActive(null)
    setData({
      name:'',
      email:''
    })
  }

  return (
    <div>
      <form className="max-w-sm mx-auto shadow p-4">
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
          <input type="text" value={data.name} id="name" onChange={handleChange} name='name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
          <input type="email" value={data.email} id="email" onChange={handleChange} name='email' placeholder="Email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        {
          isActive !== null ?
          <button type="submit" onClick={handleUpdate} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
          :
          <button type="submit" onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        }
      </form>


      <div>
        <table className='w-full'>
          <thead>
            <tr className='border'>
              <th className='p-4'>Name</th>
              <th className='p-4'>Email</th>
              <th className='p-4'>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? users.map((user, index) => {
              return <tr key={index} className='border'>
                <td className='p-4 text-center'>{user.name}</td>
                <td className='p-4 text-center'>{user.email}</td>
                <td className='p-4 text-center'>
                  <button onClick={() => handleEdit(index)} className='bg-yellow-400 border-none p-2 rounded-2xl cursor-pointer font-bold'>Edit</button>
                  <button onClick={() => removeBtn(index)} className='bg-red-500 rounded-2xl p-2 m-2 cursor-pointer font-bold'>Remove</button>
                </td>
              </tr>
            }) : <tr>
              <td colSpan="3" className='p-4 text-center text-gray-500 font-bold' >No data Available</td>
            </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App

