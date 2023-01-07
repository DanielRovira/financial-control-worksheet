import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
const lang = require(`../../../../Languages/${process.env.REACT_APP_LANG}.json`);

export default function DataGridDemo({ rawData, deleteDocument, updateDocument, sheetType }) {
const itens = Array.from(rawData)
const categoriesList = JSON.parse(localStorage.getItem("categories")) || [];
let provenience = Array.from(categoriesList || []).filter(item => item.type === 'provenience').sort((a, b) => a.name.localeCompare(b.name))
let categories = Array.from(categoriesList || []).filter(item => item.type === 'category').sort((a, b) => a.name.localeCompare(b.name))
let subCategories = Array.from(categoriesList || []).filter(item => item.type === 'subCategory').sort((a, b) => a.name.localeCompare(b.name))
console.log(provenience)
const columns = [ 
  {
    field: 'date',
    headerName: `${lang.date}`,
    type: 'date',
    width: 105,
    editable: true,
    defaultValue: '',
  },
  {
    field: 'expense',
    headerName: `${lang.type}`,
    width: 160,
    editable: true,
    defaultValue: '',
    // type: "singleSelect",
    // valueOptions: [lang.expense, lang.entry],
    // valueGetter:( params) => params.row.expense ? lang.expense : lang.entry
  },
  {
    field: 'prov',
    headerName: `${lang.source}`,
    width: 160,
    editable: true,
    defaultValue: '',
    // type: "singleSelect",
    // valueOptions: provenience.name,
  },
  {
    field: 'category',
    headerName: `${lang.category}`,
    width: 160,
    editable: true,
    defaultValue: '',
  },
  {
    field: 'subCategory',
    headerName: `${lang.subCategory}`,
    width: 160,
    editable: true,
    defaultValue: '',
  },
  {
    field: 'forn',
    headerName: `${lang.supplier}`,
    width: 160,
    editable: true,
    defaultValue: '',
  },
  {
    field: 'desc',
    headerName: `${lang.description}`,
    width: 160,
    editable: true,
    defaultValue: '',
  },
  {
    field: 'amount',
    headerName: `${lang.value}`,
    description: 'This column has a value getter and is not sortable.',
    width: 150,
    editable: true,
    type: 'number',
    defaultValue: '',
  },
];

  return (
    <Box sx={{ height: 400, width: '90%', margin: '0 100px', backgroundColor: 'white' }}>
      <DataGrid
        getRowId={(row) => row._id}
        rows={rawData}
        columns={columns}
        pageSize={10}
        defaultValue={''}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}