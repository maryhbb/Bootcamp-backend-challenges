import { useRouter } from "next/router";

import styled from "styled-components";
import useSWR from "swr";

const Root = styled.div`
  border: 2px solid;
  padding: 10px;
  margin: 20px;
`;

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function getProductDetailByFetch() {
  const router = useRouter();
  const routerId = router.query.id;

  const { data, error, isLoading } = useSWR(
    `../api/products/${routerId}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <Root>
      <small>ID: {data.id}</small>
      <h1>Product: {data.name} </h1>
      <p>Description: {data.description} </p>
      <p>
        Price: {data.price} {data.currency}
      </p>
      <p>Category: {data.category} </p>
    </Root>
  );
}
