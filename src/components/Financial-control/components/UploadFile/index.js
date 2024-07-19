import { useEffect, useState } from 'react';

function UploadFile({ setDate, setDesc, setAmount, setProvider }) {

  const [file, setFile] = useState()

  function handleChange(event) {
    setFile(event.target.files[0])
  }

  useEffect(() => {
    handleSubmit()
    setFile(null)
  }, [file]);
  
  async function handleSubmit() {
    // event.preventDefault()
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    // console.log(Object.fromEntries(formData.entries()))
    const res = await fetch(`/api/financial-control/uploadFile`,
    {
        method:'POST',
        // headers: { 'Content-Type': 'multipart/form-data' },
        credentials: 'include',
        body: formData
    })
    .then(response => response.json())
    .catch(error => {
        // return (alert("Erro"));
    })
    if (res.amount) {
        setDate(`${res.date.slice(-4)}-${res.date.slice(3,5)}-${res.date.slice(0,2)}`)
        setDesc(file.name.slice(-4,-3) === "." ? file.name.slice(0,-4) : file.name)
        setAmount(Number(res.amount.replace('.','').replace(/,/g, '.')))
        setProvider(res.destiny)
    }
    return
  }

  return (
    <div className="UploadFile">
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleChange}/>
          <button id="inputFile" type="submit" style={{visibility:"hidden"}} >Upload</button>
        </form>
    </div>
  );
}

export default UploadFile;