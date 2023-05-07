const handleCheck = (e) => {
    let {name, id, checked} = e.target

    if(checked){
      setIds([...ids, e.target.id])
      setTitles([...titles, e.target.name])
    }else{
      let idArray = ids.filter((i) => i !== id)
      let nameArray = titles.filter((n) => n !== name)
      setIds(idArray)
      setTitles(nameArray)
      
    }
  }