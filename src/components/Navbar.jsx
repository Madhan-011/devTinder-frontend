import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import { removeUser } from '../store/subStore/userSlice'

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(store => store.user)

  const handleLogout = async ()=>{
    try{
      const res = await axios.post(BASE_URL+"/logout", {}, {withCredentials:true})
      dispatch(removeUser())
      navigate("/login")
      
    }catch(err){
      console.error(err.message)
    }
  }
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to={"/"}  className="btn btn-ghost text-xl">DevTinder</Link >
      </div>
     {user && <div className="flex gap-2">
      <div className='mt-2 '>Welcome, {user.firstName}</div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar mx-6"
          >
            <div className="w-10 rounded-full">
              <img
                alt="user image"
                src={user.photoUrl}
              />
            </div>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to={"/profile"} className="justify-between">
                Profile
              </Link>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <Link onClick={handleLogout}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>}
    </div>
  )
}

export default Navbar
