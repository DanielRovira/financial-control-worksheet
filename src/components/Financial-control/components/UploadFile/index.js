import './styles.css'
import { useEffect } from 'react';
import uploadImage from './uploadImage.svg' //throwIfNamespace: false
import { useAtomValue } from 'jotai';
import { languageAtom } from 'components/global';

function UploadFile({ isDragActive, acceptedFiles, setUploadedData, insertDocument, taskTitle }) {
    const language = useAtomValue(languageAtom)
    const user = JSON.parse(localStorage.getItem("user")) || [];
    const lang = require(`components/Languages/${language}.json`);

    // CSV UPLOAD. USE CAREFULLY
    const fileReader = new FileReader();

    const csvFileToArray = string => {
        const csvHeader = Array.from(string.slice(0, string.indexOf("\r\n")).replaceAll('"','').split(";"));
        const csvRows = string.slice(string.indexOf("\n") + 1).replaceAll('"','').split("\n");

        const csvArray = csvRows.map(i => {
            const values = i.split(";");
            const obj = csvHeader.reduce((object, header, index) => {
              object[header] = values[index];
              return object;
            }, {});
            return obj;
        });
// console.log(csvHeader)
// console.log(csvRows)
        csvArray.map((item, index) => 
            csvArray[index] = {
                ...csvArray[index],
                date: `${item.date.slice(-4,10)}-${item.date.slice(3,-5)}-${item.date.slice(0,2)}`,
                amount: Number(item.amount),
                expense: item.expense === "Saída" ? true : false,
                deleted: false,
                archived: false,
                status: "financialControl",
                costCenter: taskTitle,
            }
        )
        console.log(csvArray)
        csvArray.forEach((item, index) => index === csvArray.length - 1 ? insertDocument(item, true) : insertDocument(item))
    };
    // END OF CSV SECTION

    useEffect(() => {
        handleSubmit(acceptedFiles)
    }, [acceptedFiles]); // eslint-disable-line

    async function handleSubmit(acceptedFiles) {
        let file = acceptedFiles[0]

        if (file) {
            if (file.type === "text/csv") {
                if (process.env.REACT_APP_CSV_UPLOAD === "true" && user.type === "admin") {
                    fileReader.onload = function (event) {
                        const csvOutput = event.target.result;
                        csvFileToArray(csvOutput);
                      };
                      fileReader.readAsText(file);
                }
                else {console.log("CSV upload disabled by admin")}
                return
                }
            else {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('fileName', file.name);
                // console.log(Object.fromEntries(formData.entries()))
                const res = await fetch(`/api/finances/uploadFile`,
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

                let uploadData = {
                    text: res.text,
                    fields: res.fields,
                    date: res.date,
                    desc: file.name.slice(-4,-3) === "." ? file.name.slice(0,-4) : file.name,
                    amount: res.amount,
                    provider: res.destiny
                }
                setUploadedData(uploadData)
            }
        }
        // return
    }

    return (
        <div className="UploadFile" style={{display: isDragActive ? 'flex' : 'none'}}>
            <div className="UploadFileContent">
                <img src={uploadImage} alt="Upload" />
                <p>{lang.dropFile}</p>
            </div>
        </div>
      )
}

export default UploadFile;