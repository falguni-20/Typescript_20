
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { getCategory } from "./service/post_category";
import { Button } from "@mui/material";
import { deleteCategory } from "./service/post_category";
import { useNavigate } from "react-router";


import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";


import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { Card, CardContent, CardActions } from "@mui/material";

export default function Get_category() {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "category name",
      width: 150,
      editable: true,
    },
    {
      field: "code",
      headerName: "code",
      width: 150,
      editable: true,
    },
    {
      field: "parentCategory",
      headerName: "parent name",
      width: 150,
      editable: true,
      renderCell: (params) => {
        return params.row.parentCategory ? params.row.parentCategory.name : "No Parent" 
      }

    },

    {
      field: "view",
      headerName: "view",
      width: 160,
      renderCell: (params) => {
        // debugger
        return (
          <Button
            onClick={() => {
              viewCategory(params.row.id);
            }}
          >
            <VisibilityIcon />
          </Button>
        );
      },
    },

    {
      field: "edit",
      headerName: "edit",
      width: 160,
      renderCell: (params) => {
        return (
          <Button
            onClick={() => {
              editCategory(params.row.id);
            }}
          >
            <EditIcon />
          </Button>
        );
      },
    },

    {
      field: "delete",
      headerName: "delete",
      width: 160,
      renderCell: (params) => {
        const removeItem = async (id: number) => {
          debugger;
          try {
            const response = await deleteCategory(id);
            fetchData();

            if (response.status == 200) {
              // enqueueSnackbar("Product has been removed !!", { variant: "info" });
              console.log("deleted");
            }
          } catch (error) {
            // enqueueSnackbar("Please try again !!", { variant: "error" });
            console.log(" not - deleted");
          }
        };

        return (
          <Button
            onClick={() => {
              removeItem(params.row.id);
            }}
          >
            <DeleteIcon />
          </Button>
        );
      },
    },
  ];

  const handleClickOpen = () => {
          setOpen(true);
        };
    
        const handleClose = () => {
          // debugger
          setOpen(false);
        };

  function viewCategory(id: any) {
    navigate(`/category/view/${id}`);
  }

  function editCategory(id: any) {
    navigate(`/category/edit/${id}`);
  }

  const [parent,setparent] =useState<any>("hello")

  const [categories, setCategories] = useState<any>([]);
  const [deleteItemId, setDeleteItemId] = useState<any>();
  const [open, setOpen] = React.useState<any>(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    debugger;
    try {
      const response = await getCategory();
      console.log("response", response);
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
   
      <Card
        sx={{
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
          marginTop: 7,
          backgroundColor: "#E0F7FA",
          height: 500,
          width: 1000,
        }}
      >
         
        <CardContent sx={{justifyContent:"center", marginTop: 4 }}>
          <Box sx={{ height: 800, width: "100%" }}>
            <DataGrid rows={categories} columns={columns} />
          </Box>
        </CardContent>
      </Card>







     
    </>
  );
}
