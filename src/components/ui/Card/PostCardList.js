import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";

export default function PostCardList({ data }) {
  return (
    <React.Fragment>
      {data.length !== 0 ? (
        <div className="flex justify-center w-full h-full">
          <div className="grid w-2/3 grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {data.map((item, idx) => {
              return (
                <React.Fragment key={idx}>
                  <PostCard post={item} />
                </React.Fragment>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex items-start justify-center w-full h-full">
          <span className="text-xl text-center text-gray-500">
            No Posts Found
          </span>
        </div>
      )}
    </React.Fragment>
  );
}
