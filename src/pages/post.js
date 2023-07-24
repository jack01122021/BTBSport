import { useState } from "react";
import FileImport from "@/components/ui/FileImport/FileImport";
import Footer from "@/components/ui/Footer/Footer";
import Navbar from "@/components/ui/Navbar/Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doc, setDoc } from "firebase/firestore";
import { storage, db } from "../../utils/firebase";
import { useSession } from "next-auth/react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/router";

const defaultFormData = {
  phoneNumber: "",
  category: "",
  title: "",
  numberPlayer: "",
  details: [""],
  cost: "",
  locationImage: "",
};

export default function Sell() {
  const { data: session } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState(defaultFormData);

  // Update form data on input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddDetailInput = () => {
    setFormData((prevState) => ({
      ...prevState,
      details: [...prevState.details, ""],
    }));
  };

  // Remove product detail input
  const handleRemoveDetailInput = (index) => {
    setFormData((prevState) => {
      const updatedDetails = [...prevState.details];
      updatedDetails.splice(index, 1);
      return {
        ...prevState,
        details: updatedDetails,
      };
    });
  };

  // Update form data on file upload
  const handleFileUpload = (files) => {
    console.log(files);
    setFormData((prevState) => ({
      ...prevState,
      locationImage: files,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.info("Create Post Started!");

    try {
      // 1. upload image to firestorage
      const locationImageRef = ref(
        storage,
        `images/${formData.locationImage[0].file.name}`
      );
      const snapshot = await uploadBytes(
        locationImageRef,
        formData.locationImage[0].file
      );

      // 2. Get URL of Image from Firestorage
      const imageUrl = await getDownloadURL(snapshot.ref);

      // 3. Create Record of Post in Firestore
      await setDoc(doc(db, "posts", Date.now().toString()), {
        ...formData,
        locationImage: imageUrl,
        username: session.user.name,
        userImage: session.user.image,
      });

      toast.success("Post is created Successfully");
      setFormData(defaultFormData);
      // redirect to create post page
      setTimeout(() => {
        router.push("/?category=all");
      }, 2000);
    } catch (err) {
      console.log(err);
      toast.error("Create Post Fail");
      setFormData(defaultFormData);
    }
  };

  return (
    <>
      <section className="min-h-screen">
        <Navbar />
        <ToastContainer />
        <div className="mt-40" />
        <div className="flex justify-center">
          <form className="w-1/3" onSubmit={handleSubmit}>
            {/* Telegram Number */}
            <div className="mb-6 ">
              <label
                htmlFor="phone_number"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone number (Telegram)
              </label>
              <input
                type="tel"
                pattern="[0-9]{3}[0-9]{3}[0-9]{3}"
                name="phoneNumber"
                id="phone_number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="012345678"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>

            {/* Sport Category */}
            <div className="mb-6">
              <label
                htmlFor="sport_category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Sport Category
              </label>
              <select
                id="sport_category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="none">Choose a category</option>
                <option value="football">Football</option>
                <option value="table tennis">Table Tennis</option>
                <option value="volleyball">Volleyball</option>
              </select>
            </div>

            {/* Title */}
            <div className="mb-6">
              <label
                htmlFor="sport_title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Title
              </label>
              <input
                type="text"
                id="sport_title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Football Charity"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            {/* Number of Players */}
            <div className="mb-6">
              <label
                htmlFor="number_of_players"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Number of Players
              </label>
              <input
                type="number"
                name="numberPlayer"
                value={formData.numberPlayer}
                onChange={handleInputChange}
                id="number_of_players"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            {/* Details */}
            <div className="mb-6">
              <label
                htmlFor="sport_detail"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Detail
              </label>
              <div className="flex flex-col mb-2">
                {formData.details.map((detail, index) => (
                  <div className="flex items-center" key={index}>
                    <input
                      type="text"
                      id={`sport_detail_${index}`}
                      placeholder={`Detail ${index + 1}`}
                      className="mb-2 flex-grow bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={detail}
                      onChange={(e) => {
                        const updatedDetails = [...formData.details];
                        updatedDetails[index] = e.target.value;
                        setFormData((prevState) => ({
                          ...prevState,
                          details: updatedDetails,
                        }));
                      }}
                    />
                    <button
                      type="button"
                      className="ml-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5 flex items-center justify-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                      onClick={() => handleRemoveDetailInput(index)}
                    >
                      -
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="flex-shrink-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleAddDetailInput}
                >
                  +
                </button>
              </div>
            </div>

            {/* Cost Per Person */}
            <div className="mb-6">
              <div>
                <label
                  htmlFor="cost"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Cost Per Person
                </label>
                <div className="flex">
                  <span
                    id="dropdown-button-2"
                    data-dropdown-toggle="dropdown-search-city"
                    className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-l-lg focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                    type="button"
                  >
                    USD
                  </span>
                  <div className="relative w-full">
                    <input
                      id="cost"
                      type="number"
                      name="cost"
                      onChange={handleInputChange}
                      className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                      placeholder="100"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Location Image
              </label>
              <FileImport
                onFileUpload={handleFileUpload}
                file={formData.locationImage}
              />
            </div>

            {/* Sell Product Button */}
            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create Your Post
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
