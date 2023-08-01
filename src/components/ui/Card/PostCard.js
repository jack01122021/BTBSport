export default function PostCard({ post }) {
  return (
    <>
      {post && (
        <div className="relative flex flex-col w-full max-w-xs m-10 overflow-hidden bg-white border border-gray-100 rounded-lg shadow-md">
          <span className="relative flex mx-3 mt-3 overflow-hidden h-60 rounded-xl">
            <img
              className="object-cover"
              src={post.locationImage}
              alt="post image"
            />
          </span>
          <div className="px-5 pb-5 mt-4">
            <h5 className="text-xl tracking-tight text-slate-900">
              {post.title}
            </h5>
            <h3 className="text-xl tracking-tight text-slate-900">
              {post.details}
            </h3>

            <div className="flex items-center justify-between mt-2 mb-5">
              <p>
                <span className="text-3xl font-bold text-slate-900">
                  ${post.cost}
                </span>
              </p>
              <div className="flex items-center">
                <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                  size {post.numberPlayer}
                </span>
              </div>
              
            </div>
            <button className=" flex justify-center border-1 border rounded-full bg-slate-900 h-[40px] w-[150px] text-white">Add to Carts</button>
          </div>
        </div>
      )}
    </>
  );
}
