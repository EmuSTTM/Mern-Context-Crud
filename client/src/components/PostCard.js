import toast from "react-hot-toast";

export function PostCard({ post }) {
  return (
    <div
      className="bg-zinc-800 text-white rounded-sm shadow-md
     shadow-black hover:bg-zinc-700 hover:cursor-pointer"
    >
      <div className="px-4 py-7">
        <div className="flex justify-between ">
          <h3>{post.title}</h3>
          <buttton
            className="bg-red-600 text-sm px-2 py-1 rounded-sm"
            onClick={() => toast.success("Hello World!")}
          >
            Delete
          </buttton>
        </div>
        <p>{post.description}</p>
      </div>
    </div>
  );
}
