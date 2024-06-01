import React, { useState } from "react";
import {
  DatePicker,
  Row,
  Col,
  Divider,
  Typography,
  TreeSelect,
  Select,
  TimePicker,
  Button,
} from "antd";

import { useQuery } from "@tanstack/react-query";

import { getItems, getBranches } from "./api";

const { RangePicker } = DatePicker;
const { SHOW_PARENT } = TreeSelect;

import moment from "moment";

const transformItemsForTreeSelect = (data, lang = "ar") => {
  // Change the language code to "ar" or "en"
  return data.map((category) => {
    const categoryName = JSON.parse(category.product_category_name).en_US;

    return {
      title: categoryName,
      value: category.product_category_id,
      children: category.products.map((product) => {
        const productName =
          lang === "en" ? product.product_name_en : product.product_name_ar;
        return {
          title: productName,
          value: product.product_id,
        };
      }),
    };
  });
};

const transformBranchForTreeSelect = (data, lang = "ar_001") => {
  // Change the language code to "ar_001" or "en_US"
  return data.map((group) => {
    const groupName =
      group.branch_group_name[lang] || group.branch_group_name.en_US;

    return {
      title: groupName,
      value: group.branch_group_id,
      children: group.branches.map((branch) => {
        const children = group.branches
          .filter(
            (childBranch) => childBranch.branch_name === group.branch_group_id
          )
          .map((childBranch) => ({
            title: childBranch.branch_name,
            value: childBranch.branch_name,
          }));

        return {
          title: branch.branch_name,
          value: branch.branch_name,
          children: children.length > 0 ? children : undefined,
        };
      }),
    };
  });
};

const tProps = {
  treeData: [],
  value: [],
  onChange: () => {},
  treeCheckable: true,
  showCheckedStrategy: SHOW_PARENT,
  placeholder: "اختر ...",
  style: {
    width: "100%",
  },
  maxTagCount: 1,
  maxTagTextLength: 10,
  maxTagPlaceholder: (omittedValues) => `+ ${omittedValues.length} ...`,
};

const Filter = ({ setShowFilter, state, dispatch }) => {
  const [item, setItem] = useState([]);
  const [branch, setBranch] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: "items",
    queryFn: getItems,
  });

  const { data: branches, isLoading: branchesLoading } = useQuery({
    queryKey: "branches",
    queryFn: getBranches,
  });

  const tPropsItems = {
    ...tProps,
    treeData: isLoading ? [] : transformItemsForTreeSelect(data),
    value: item,
    onChange: (newValue) => {
      setItem(newValue);
    },
    placeholder: "اختر المنتج ...",
  };

  const tPropsBranches = {
    ...tProps,
    treeData: branchesLoading ? [] : transformBranchForTreeSelect(branches),
    value: branch,
    onChange: (newValue) => setBranch(newValue),
    placeholder: "اختر الفرع ...",
  };

  return (
    <div className="bg-white  w-72 min-h-screen border-2 border-gray-200 rounded-md shadow-md dark:bg-[#1a2748] dark:border-gray-800">
      <Row>
        <Col span={24} className="py-2 px-3 text-light dark:text-white">
          فرز حسب ...
        </Col>
        <Divider className="py-0 my-2" />
        <Col span={24} className="py-2 px-3">
          <Typography type="secondary" level={1}>
            اختر فترة
          </Typography>
          <RangePicker
            onChange={(date, [startDate, endDate]) => {
              dispatch({
                type: "CHANGE_DATE",
                payload: {
                  startDate: moment(startDate).format("YYYY-MM-DD HH:mm:ss"),
                  endDate: moment(endDate).format("YYYY-MM-DD HH:mm:ss"),
                },
              });
            }}
          />
        </Col>
        <Col span={24} className="py-2 px-3">
          <Typography type="secondary" level={1}>
            المنتج
          </Typography>
          <TreeSelect {...tPropsItems} />
        </Col>
        <Col span={24} className="py-2 px-3">
          <Typography type="secondary" level={1}>
            الفرع
          </Typography>
          <TreeSelect {...tPropsBranches} />
        </Col>
        <Col span={24} className="py-2 px-3">
          <Typography type="secondary" level={1}>
            الايام
          </Typography>
          <Select
            mode="multiple"
            style={{
              width: "100%",
            }}
            options={[
              { label: "السبت", value: "السبت" },
              { label: "الأحد", value: "الأحد" },
              { label: "الاثنين", value: "الاثنين" },
              { label: "الثلاثاء", value: "الثلاثاء" },
              { label: "الأربعاء", value: "الأربعاء" },
              { label: "الخميس", value: "الخميس" },
              { label: "الجمعة", value: "الجمعة" },
            ]}
            placeholder="اختر الفئة"
            maxTagCount="responsive"
          />
        </Col>
        <Col span={12} className="py-2 px-3">
          <Typography type="secondary" level={1}>
            اختر الوقت
          </Typography>
          <TimePicker />
        </Col>
        <Col span={12} className="py-2 px-3">
          <Typography type="secondary" level={1}>
            اختر الوقت
          </Typography>
          <TimePicker />
        </Col>
        <Col span={24} className="py-2 px-3">
          <Button
            type="primary"
            className="w-full"
            onClick={() => setShowFilter(false)}
          >
            تطبيق
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Filter;
