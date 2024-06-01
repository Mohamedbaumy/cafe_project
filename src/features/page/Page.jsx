import React from "react";
import PageHeader from "@components/page/header";
import { Segmented } from "antd";

const Page = () => {
  return (
    <div className="m-2">
      <PageHeader title={"Page"} />
      <Segmented
        options={[
          {
            label: "Option 1",
            value: "1",
          },
          {
            label: "Option 2",
            value: "2",
          },
        ]}
        onChange={(value) => {
          alert(value);
        }}
        className="bg-red-500"
      />
    </div>
  );
};

export default Page;
