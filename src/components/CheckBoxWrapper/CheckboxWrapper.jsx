import React, { useEffect, useState } from "react";
import CheckboxList from "../CheckboxList/CheckboxList";

export default function CheckboxWrapper({ title, data, type }) {
  let [query, setQuery] = useState("");
  let [titles, setTitles] = useState([]);
  let [ids, setIds] = useState([]);
  let [id, setId] = useState("");

  const handleCheck = (e) => {
    let { name, id, checked } = e.target;

    if (checked) {
      setIds([id]);
      setTitles([name]);
    } else {
      setIds([]);
      setTitles([]);
    }
  };

  useEffect(() => {
    const updateParent = (id) => {
      let item = data.find((item) => item.id === id);
      let parent = data.find((i) => i.id === item.parent);
      if (!parent) return;

      let children = data
        .filter((item) => item.parent === parent.id)
        .map((i) => i.id);

      const containsAllChildren = children.every((c) => ids.includes(c));

      // if contains all children, add parent
      if (containsAllChildren) {
        setIds([...ids, parent.id]);
        setTitles([...titles, parent.GroupTitle]);
      }
    };

    if (id !== "") {
      updateParent(id);
    }
  }, [id]);

  const setChecked = (id, name) => {
    // setIds([...ids, id])
    let children = data.filter((i) => i.parent === id).map((i) => i.id);
    setIds([...new Set([...ids, id, ...children])]);

    let childrenNames = data
      .filter((i) => i.parent === id)
      .map((i) => i.GroupTitle);
    setTitles([...new Set([...titles, name, ...childrenNames])]);
  };

  const setUnchecked = (id, name) => {
    let children = data.filter((i) => i.parent === id).map((i) => i.id);
    children.push(id);

    let childrenNames = data
      .filter((i) => i.parent === id)
      .map((i) => i.GroupTitle);
    childrenNames.push(name);

    let idArray = ids;
    let namesArray = titles;

    for (let value of children) {
      idArray = idArray.filter((i) => i !== value);
    }

    for (let value of childrenNames) {
      namesArray = namesArray.filter((i) => i !== value);
    }
    setIds(idArray);
    setTitles(namesArray);
  };

  const handleMultiple = (e) => {
    let { name, id, checked } = e.target;
    setId(id);

    if (checked) {
      setChecked(id, name);
    } else {
      setUnchecked(id, name);
    }
  };

  return (
    <div className="mt-4">
      <h3 className="font-bold text-xl">{title}</h3>
      <form>
        <div className="grid mb-6">
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            First name
          </label>
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search groups"
          />
        </div>
      </form>

      <CheckboxList
        ids={ids}
        treeData={data}
        handleCheck={type === "SINGLE" ? handleCheck : handleMultiple}
      />

      <h3 className="font-bold text-xl mt-4">Selected Names</h3>
      <div className="grid grid-cols-2 gap-2">
        <div className="m-4 col-span">
          {titles.map((title, idx) => {
            return (
              <h3 key={idx} className=" text-sm">
                {title}
              </h3>
            );
          })}
        </div>
        <div className="m-4">
          {ids.map((title, idx) => {
            return (
              <h3 key={idx} className=" text-md">
                {title}
              </h3>
            );
          })}
        </div>
      </div>
    </div>
  );
}
