import ProductCardList from "@/components/ui/Card/PostCardList";
import Footer from "@/components/ui/Footer/Footer";
import Navbar from "@/components/Navbar";
import TabList from "@/components/ui/Tab/TabList";
import CategoryList from "../../configs/const/Categories";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  collection,
  query,
  getDocs,
  orderBy,
  startAfter,
  where,
  limit,
} from "firebase/firestore";
import { db } from "../../utils/firebase";

export default function Home() {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [lastDoc, setLastDoc] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      setSelectedCategory(router.query.category || "all");
    }
  }, [router.isReady, router.query.category]);

  useEffect(() => {
    if (selectedCategory !== null) {
      getPosts();
    }
  }, [selectedCategory]);

  const getPosts = async () => {
    setIsLoading(true);
    let postsCollectionRef = collection(db, "posts");
    let q;

    if (selectedCategory === "all") {
      if (lastDoc) {
        q = query(
          postsCollectionRef,
          orderBy("__name__"),
          startAfter(lastDoc),
          limit(8)
        );
      } else {
        q = query(postsCollectionRef, orderBy("__name__"), limit(8));
      }
    } else {
      if (lastDoc) {
        q = query(
          postsCollectionRef,
          where("category", "==", selectedCategory),
          orderBy("__name__"),
          startAfter(lastDoc),
          limit(8)
        );
      } else {
        q = query(
          postsCollectionRef,
          where("category", "==", selectedCategory),
          orderBy("__name__"),
          limit(8)
        );
      }
    }

    const postsSnapshot = await getDocs(q);
    const newPosts = postsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setPosts((oldPosts) => [...oldPosts, ...newPosts]);

    const lastVisible = postsSnapshot.docs[postsSnapshot.docs.length - 1];

    // Check if the newly fetched posts match the limit before setting lastDoc
    if (newPosts.length === 8) {
      setLastDoc(lastVisible);
    } else {
      setLastDoc(null); // No more posts to fetch, set lastDoc to null
    }

    setIsLoading(false);
  };

  const handleSelectedCategory = (category) => {
    setSelectedCategory(category);
    setPosts([]);
    setLastDoc(null);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, category: category },
    });
  };

  return (
    <main className="flex flex-col min-h-screen bg-slate-900">
      <div className="flex-shrink-0">
        <Navbar />
      </div>
      <div className="mt-20" />
      <TabList
        categories={CategoryList}
        selectedCategory={selectedCategory}
        setSelectedCategory={handleSelectedCategory}
      />
      <div className="flex-grow">
        <ProductCardList data={posts} />
      </div>
      <div style={{ textAlign: "center" }}>
        {lastDoc && !isLoading && (
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={getPosts}
          >
            Load More
          </button>
        )}
      </div>

      <div className="mt-20" />
      <div className="flex-shrink-0">
        <Footer />
      </div>
    </main>
  );
}
