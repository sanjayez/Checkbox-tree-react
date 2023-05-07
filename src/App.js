import CheckboxWrapper from "./components/CheckBoxWrapper/CheckboxWrapper";
import { data } from "./data";

export default function App() {
  return (
    <h1 className="md:container mx-auto grid gap-6 grid-cols-1 md:grid-cols-2 p-6 mb-10">
      <CheckboxWrapper
        title={"Checkbox with single select"}
        data={data}
        type={"SINGLE"}
      />
      <CheckboxWrapper
        title={"Checkbox with multiple select"}
        data={data}
        type={"MULTIPLE"}
      />
    </h1>
  );
}
