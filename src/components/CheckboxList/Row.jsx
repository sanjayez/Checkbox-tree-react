import { useState, useEffect } from "react"

export default function Row({item, ids, level, handleCheck, children}) {

  let [checked, setChecked] = useState(false)

  useEffect(() => {
    setChecked(ids.find((id) => id === item.id) ? true : false)
  }, [ids])

  return(
      <>
        <div style={{paddingLeft: `${level * 20}px`}}>
          <input 
            type='checkbox' 
            id={item.id}
            name={item.GroupTitle}
            value={item.GroupTitle}
            checked = {checked}
            onChange={(e) => handleCheck(e)}/>
          <label htmlFor={item.id} > {item.GroupTitle} </label>
          <br></br>
          </div>
        {children}
      </>
  )
}