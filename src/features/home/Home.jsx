import { Chart } from "react-google-charts";
import { useEffect, useReducer, useState } from "react";
import PageHeader from "@components/page/header";
import { Col, Row, Segmented, Breadcrumb } from "antd";
import { Icon } from "@iconify/react";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";

import Filter from "./Filter";
import { getTotalAmount } from "./api";

const initialChart = {
  chartType: "LineChart",
  data: [
    ["الفرع", "المبيعات"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ],
  options: {
    title: "Company Performance",
  },
};

const chartReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_CHART_TYPE":
      return {
        ...state,
        chartType: action.payload,
      };
    case "CHANGE_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "CHANGE_OPTIONS":
      return {
        ...state,
        options: action.payload,
      };
    default:
      return state;
  }
};

const initialFilter = {
  // first day of the current year
  start_date: moment().startOf("year").format("YYYY-MM-DD HH:mm:ss"),
  end_date: moment(new Date(), "YYYY-MM-DD").format("YYYY-MM-DD HH:mm:ss"),
  group_by: "", //(branch, product)
  qty: true, //just send true to get qty for branch or item , else dont send true and it will give u amount
  date_type: "day", // (day,month,year)
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_DATE":
      return {
        ...state,
        start_date: action.payload.startDate,
        end_date: action.payload.endDate,
      };
    case "CHANGE_GROUP_BY":
      if (action.payload === "branch") {
        return {
          ...state,
          qty: true,
          group_by: action.payload,
        };
      }
      return {
        ...state,
        qty: "",
        group_by: action.payload,
      };

    case "CHANGE_DATE_TYPE":
      return {
        ...state,
        date_type: action.payload,
      };
    default:
      return state;
  }
};

const types = [
  "LineChart",
  "AreaChart",
  "BarChart",
  "ColumnChart",
  "SteppedAreaChart",
  "ScatterChart",
  "ComboChart",
  "Histogram",
  "Line",
  "Bar",
  "Scatter",
];

const Home = () => {
  const [chartState, chartDispatch] = useReducer(chartReducer, initialChart);
  const [state, dispatch] = useReducer(filterReducer, initialFilter);
  const [showFilter, setShowFilter] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["total_amount", state],
    queryFn: getTotalAmount,
  });

  useEffect(() => {
    if (isLoading) return;
    let newData = [];
    if (state.group_by === "branch") {
      switch (state.date_type) {
        case "day":
          newData = [
            ["الفرع", "المبيعات"],
            ...data.map((item) => {
              const total = item.days.reduce(
                (acc, curr) => acc + curr.total_qty,
                0
              );
              return [item.branch_name, total];
            }),
          ];
          break;

        default:
          newData = [
            ["الفرع", "المبيعات"],
            ...data.map((item) => [item.branch_name, item.total_qty]),
          ];
          break;
      }
    } else if (state.group_by === "product") {
      switch (state.date_type) {
        case "day":
          newData = [
            ["المنتج", "المبيعات"],
            ...data.map((item) => {
              const total = item.days.reduce(
                (acc, curr) => acc + curr.total_amount,
                0
              );
              return [item.product_name.ar_001, total];
            }),
          ];
          break;
        case "month":
          newData = [
            ["المنتج", "المبيعات"],
            ...data.map((item) => {
              const total = item.months.reduce(
                (acc, curr) => acc + curr.total_amount,
                0
              );
              return [item.product_name.ar_001, total];
            }),
          ];
          break;
        case "year":
          newData = [
            ["المنتج", "المبيعات"],
            ...data.map((item) => {
              const total = item.years.reduce(
                (acc, curr) => acc + curr.total_amount,
                0
              );
              return [item.product_name.ar_001, total];
            }),
          ];
          break;

        default:
          newData = [
            ["المنتج", "المبيعات"],
            ...data.map((item) => [
              item.product_name.ar_001,
              item.total_amount,
            ]),
          ];
          break;
      }
    } else {
      newData = [
        ["الفرع", "المبيعات"],
        ["الكل", data.total_amount],
      ];
    }

    chartDispatch({ type: "CHANGE_DATA", payload: newData });
  }, [data, isLoading, state]);

  return (
    <Row className="p-2">
      <Col span={24}>
        <PageHeader
          title={
            <Breadcrumb>
              <Breadcrumb.Item>الرئيسية</Breadcrumb.Item>
            </Breadcrumb>
          }
          buttons={
            <button type="button" onClick={() => setShowFilter(!showFilter)}>
              <Icon icon="carbon:filter" className="text-xl" />
            </button>
          }
        />
      </Col>
      <Col span={24}>
        <div className="flex my-5 gap-3">
          <Segmented
            options={["بالساعة", "الورديات النهارية", "الورديات الليلية"]}
            onChange={(value) => {
              console.log(value);
            }}
            className="bg-gray-300 dark:text-black"
          />
          <Segmented
            options={["الكمية", "المبيعات", "الخصم", "الضريبة"]}
            onChange={(value) => {
              console.log(value);
            }}
            className="bg-blue-300 dark:text-black "
          />
          <Segmented
            options={["ATV"]}
            onChange={(value) => {
              console.log(value);
            }}
          />
          <Segmented
            options={[
              {
                label: "الكل",
                value: "",
              },
              {
                label: "الفروع",
                value: "branch",
              },
              {
                label: "المنتجات",
                value: "product",
              },
            ]}
            onChange={(value) => {
              // group by branch or product
              dispatch({ type: "CHANGE_GROUP_BY", payload: value });
            }}
            value={state.group_by}
            className="bg-green-300 dark:text-black"
          />
          <Segmented
            options={[
              {
                label: "اليوم",
                value: "day",
              },
              {
                label: "الشهر",
                value: "month",
              },
              {
                label: "السنة",
                value: "year",
              },
            ]}
            onChange={(value) => {
              dispatch({ type: "CHANGE_DATE_TYPE", payload: value });
            }}
            value={state.date_type}
            className="bg-red-300 dark:text-black"
            seg_color="red"
          />
        </div>
      </Col>
      <Col span={24} className="bg-white dark:bg-[#1a2748] p-5 rounded-md">
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          () => <div>Error</div>
        ) : (
          <Chart
            width={"100%"}
            height={"400px"}
            chartType={chartState.chartType}
            loader={<div>Loading Chart</div>}
            data={chartState.data}
            options={chartState.options}
          />
        )}
      </Col>
      <div className={`${showFilter ? "" : "hidden"} absolute top-0 left-0`}>
        <Filter
          setShowFilter={setShowFilter}
          state={state}
          dispatch={dispatch}
        />
      </div>
    </Row>
  );
};

export default Home;
