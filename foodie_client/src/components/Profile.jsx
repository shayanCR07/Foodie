import React from "react"
import { useNavigate } from "react-router-dom";

const Profile = ({ user }) => {
  return (
    <div>
      <div className="drawer drawer-end z-50">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-ghost btn-circle avatar"
          >
           <div className="w-10 rounded-full" >
          { 
            user.photoURL ? <img
                alt="Tailwind CSS Navbar component"
                src={user.photoURL}
              />
        : 
        <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
           }
           document.getElementById("my_modal_5").close()
          
           
        </div> 
        
        
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-white text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <a href="/update-profile">Profile</a>
            </li>
            <li>
              <a>Orders</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>LogOut</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
