import { useGetBlogsQuery } from "../app/api/blogsApi.ts";
import Spinner from "../components/Spinner.tsx";

export default function Home() {
  const { data, isLoading } = useGetBlogsQuery(null);

  if (isLoading) return <Spinner />;
  return <div>DATA FETCHED</div>;
}
