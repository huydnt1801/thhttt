import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetHomePost } from "../slices/Home";

export const Home = () => {
  return (
    <div className="Home w-full flex flex-col items-center">
      <div className="w-full flex flex-col max-w-[900px]">
        <ListPost />
      </div>
    </div>
  );
};

const ListPost = () => {
  const dispatch = useDispatch();
  /**@type {Array<import("../types").Post>} */
  const listPost = useSelector((state) => state.home).listPost;

  useEffect(() => {
    if (listPost.length == 0) {
      dispatch(thunkGetHomePost());
    }
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-1 mt-10">
      {listPost.map((item, index) => (
        <PostItem key={index} item={item} />
      ))}
    </div>
  );
};

const PostItem = ({ item }) => {
  return (
    <div className="aspect-square">
      <img
        className="w-full h-full bg-no-repeat object-cover"
        src={item.link}
      />
    </div>
  );
};

const img =
  "https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D";
