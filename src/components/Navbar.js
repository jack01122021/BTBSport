import Auth from "./ui/Auth/Auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Navbar() {
  const { data: session } = useSession();

  const handleCreatePost = () => {
    // if (!session) {
    //   toast.info("Please signin to create your post.");
    // } else {
    
    //   window.location.href = "/post";
    // }
    window.location.href = "/post";
  };

  return (
    <nav className="fixed top-0 left-0 z-20 w-full bg-slate-900 border-b border-gray-300 dark:bg-gray-900 dark:border-gray-600">
      <div className="flex flex-wrap items-center justify-between w-2/3 p-4 mx-auto gap-5">
        <a href="/?category=all" className="flex items-center">
        <img src="img/logo.png" className='h-[50px]' alt='logo'/>
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white text-white">
            BTB-Sport Center
          </span>
        </a>
        <div className="flex md:order-2 gap-3">
          <button
            onClick={handleCreatePost}
            className='bg-[#ff3366] p-2 px-3 text-white h-min rounded-full' size='sm' 
          >
            Create a Post
          </button>
          <ToastContainer />
          {/* <Auth /> */}
        </div>
      </div>
    </nav>
  );
}
