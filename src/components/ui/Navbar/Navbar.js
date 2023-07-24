import Auth from "../Auth/Auth";
import { useSession } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Navbar() {
  const { data: session } = useSession();

  const handleCreatePost = () => {
    if (!session) {
      toast.info("Please signin to create your post.");
    } else {
      // redirect to create post page
      window.location.href = "/post";
    }
  };

  return (
    <nav className="fixed top-0 left-0 z-20 w-full bg-white border-b border-gray-300 dark:bg-gray-900 dark:border-gray-600">
      <div className="flex flex-wrap items-center justify-between w-2/3 p-4 mx-auto">
        <a href="/?category=all" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Sport Finder
          </span>
        </a>
        <div className="flex md:order-2">
          <button
            onClick={handleCreatePost}
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Create a Post
          </button>
          <ToastContainer />
          <Auth />
        </div>
      </div>
    </nav>
  );
}
