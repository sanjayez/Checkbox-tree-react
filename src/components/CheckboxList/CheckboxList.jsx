import Row from "./Row";

export default function CheckboxList({treeData, handleCheck, ids, parentId = '1', level = 0}) {
  const items = treeData.filter((item) => item.parent === parentId)
  if (!items.length) return null;

  return (
    <>
      {items.map((item) => (
        <Row key={item.id} ids={ids} handleCheck={handleCheck} item={item} level={level}>
          <CheckboxList key={item.id} ids={ids} treeData={treeData} handleCheck={handleCheck} parentId={item.id} level={level + 1} />
        </Row>
      ))}
    </>
  )
}
