import { useGetBlogsQuery } from "../app/api/blogsApi.ts";
import { Link } from "react-router-dom";
import mongodbLogo from "../images/mongodb.png";
import Spinner from "../components/Spinner.tsx";
import FlexWrapper from "../components/FlexWrapper.tsx";

const noThumbnail = (
  <div className="flex h-[5.5rem] items-center justify-center rounded-tl-2xl rounded-tr-2xl bg-black opacity-50">
    <p className="font-satoshi-light-italic text-xl">No Thumbnail</p>
  </div>
);

export default function Home() {
  const { data: blogsData, isLoading } = useGetBlogsQuery(null);

  const blogs = blogsData?.map((blog) => {
    const blogId = blog._id.toString();
    return (
      <Link to={`blog/${blogId}`} key={blogId}>
        <section className="h-60 w-80 overflow-hidden rounded-2xl border-2 border-[#393E46] bg-slate-900 transition-all duration-300 hover:border-double hover:border-white hover:shadow-2xl">
          {blog.thumbnail ? (
            <div
              className={`flex w-80 justify-center rounded-tl-2xl rounded-tr-2xl bg-purple-500`}
            >
              <img src={blog.thumbnail} className="my-3 h-16" />
            </div>
          ) : (
            noThumbnail
          )}
          <hr className="opacity-5"></hr>
          <div className="space-y-2 p-3">
            <div>
              <h2 className="font-satoshi-bold">
                {blog.title.slice(0, 70)}
                {blog.title.length > 70 && (
                  <span className="opacity-50">...</span>
                )}
              </h2>
              <p className="font-satoshi-italic text-sm opacity-70">
                by {blog.author.username}
              </p>
            </div>
            <p className="font-satoshi-light">
              {blog.body.slice(0, 70)}
              {blog.body.length > 70 && <span className="opacity-50">...</span>}
            </p>
          </div>
        </section>
      </Link>
    );
  });

  if (isLoading) return <Spinner />;
  if (blogs)
    return (
      <FlexWrapper>
        <div className="flex flex-col items-center gap-y-8">
          <div className="flex -translate-x-2 select-none flex-row items-center">
            <img src={mongodbLogo} className="h-16 w-16 hue-rotate-180" />
            <h1 className="font-satoshi-bold text-3xl sm:text-5xl">Blogs</h1>
            <img src={mongodbLogo} className="h-16 w-16 hue-rotate-180" />
          </div>
          {blogsData?.length ? (
            <div className="grid select-none gap-y-4 md:grid-cols-2 md:gap-7">
              {blogs}
            </div>
          ) : (
            <div className="text-center">
              <h2 className="font-satoshi-italic -translate-y-3 text-xl">
                There aren't any blogs yet!
              </h2>
              <Link to="/create">
                <button className="font-satoshi-light rounded-xl border-2 border-transparent bg-green-600 px-3 py-2 text-2xl transition-all hover:border-double hover:border-white hover:bg-green-700">
                  Post The First Blog
                </button>
              </Link>
            </div>
          )}
        </div>
      </FlexWrapper>
    );
}
