import axios from "axios";

export const getItems = async () => {
  const response = await axios.get("http://127.0.0.1:8000/api/pos-item-list/");
  return response.data.result;
};

export const getBranches = async () => {
  const response = await axios.get(
    "http://127.0.0.1:8000/api/pos-branch-list/"
  );
  return response.data.result;
};

export const getTotalAmount = async ({ queryKey }) => {
  const [_, filters] = queryKey;
  const response = await axios.get(
    "http://127.0.0.1:8000/api/pos-order/total_amount",
    {
      params: filters,
    }
  );
  return response.data.result ?? response.data.results;
};
