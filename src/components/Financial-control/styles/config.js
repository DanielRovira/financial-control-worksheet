const lang = require(`../../Languages/${process.env.REACT_APP_LANG}.json`);
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

  export default columns