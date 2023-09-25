import styled from "styled-components";
import useSWR from "swr";

const List = styled.li`
  display: flex;
  flex-direction: column;
  border: 2px solid;
  gap: 20px;
  padding: 20px;
  margin: 20px;
`;

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function getProductByFetch() {
  const { data, error, isLoading } = useSWR("../api/products/", fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <ul>
      {data.map((product) => {
        const { id, name, description, price, currency, category } = product;
        return (
          <List key={id}>
            ID: {id}, Name: {name}, Description: {description}, Price: {price}{" "}
            {currency}, Category: {category}
          </List>
        );
      })}
    </ul>
  );
}
