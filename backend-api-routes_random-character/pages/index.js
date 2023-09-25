import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function HomePage() {
  const { data, error, isLoading } = useSWR("/api/random-character", fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <h2>
        {data.firstName} {data.lastName}
      </h2>

      <h3>Twitter: {data.twitter}</h3>
      <h3>Geohash: {data.geohash}</h3>
    </>
  );
}
