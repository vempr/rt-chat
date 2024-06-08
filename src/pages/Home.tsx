import { useQuery } from "@tanstack/react-query";
import {
  blogMongoSchema,
  BlogMongoType,
} from "../../shared/schemas/blogSchema.ts";

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: () =>
      fetch("http://localhost:5174/blogs").then(async (res) => {
        const blogs: BlogMongoType[] = await res.json();

        try {
          for (const blog of blogs) {
            blogMongoSchema.parse(blog);
          }
          return blogs;
        } catch (err) {
          console.log(err);
          return "";
        }
      }),
  });

  console.log(data);
  if (data != "" && !isLoading && !error) return <div>Data fetched!</div>;
}
