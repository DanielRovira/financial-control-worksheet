import React, {useState} from 'react';

function UploadFile() {

  const [file, setFile] = useState()

  function handleChange(event) {
    setFile(event.target.files[0])
  }
  
  async function handleSubmit(event) {
    event.preventDefault()
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
    return
  }

  return (
    <div className="UploadFile">
        <form onSubmit={handleSubmit}>
          <h1>React File Upload</h1>
          <input type="file" onChange={handleChange}/>
          <button type="submit">Upload</button>
        </form>
    </div>
  );
}

export default UploadFile;