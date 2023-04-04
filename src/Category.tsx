import { TextField, Box, Button } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { post_catagory, updateCategory } from "./service/post_category";
import Autocomplete from "@mui/material/Autocomplete";
import { getCategory } from "./service/post_category";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { get_category } from "./service/post_category";
import {Card,CardContent,CardActions} from "@mui/material";
import { SnackbarProvider, useSnackbar } from "notistack";
import { Navigate,useNavigate } from "react-router";



export default function Category() {

  const navigate = useNavigate();
  const { register, handleSubmit, reset, setValue, getValues, watch } = useForm();
  type Data1 = { name: "string"; code: "unknown"; parent_id: null };
  const [categories, setCategories] = useState<any>([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [file, setFile] = useState<any>();
  // const [valuee,setValuee]=useState()
  const { id } = useParams();
  const currentUrl = window.location.href;
  const isView = currentUrl.includes("view");
  const isEdit = currentUrl.includes("edit");
  const isAdd = currentUrl.includes("add");
  const [isDisabled, setIsDisabled] = useState<any>(false);
  
  const [showResults, setShowResults,
    //  resetResult
    ] = React.useState<any>(false);
  const fetchData = async () => {
   
    try {
      const response = await getCategory();
      console.log("response", response);
      setCategories(response.data.data);
      console.log(categories);
      // console.log(response.data.data.id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const get_Item = async (id: any) => {
    debugger;
    
    try {
      const response = await get_category(id);
      setShowResults(true);
    {
      isView ? setIsDisabled(true) : setIsDisabled(false);
    }
      if (response.status == 200) {
        console.log("success");
        reset(response.data.data);
        setValue("parent",response.data.data.parentCategory)
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      get_Item(id);
    }
  }, []);

  const onSubmit = async (data: any) => {
    if (id) {
      enqueueSnackbar(" Updated product successfully !!", { variant: "success" });
      navigate("/getcategory");
      try {
        const finalData: Data1 = {
          name: data.name,
          code: data.code,
          parent_id: data.parent ? data.parent.id : null,
        };

        const response2 = await updateCategory(finalData,id);

        if (response2) {
            enqueueSnackbar("successfully Added", { variant: "success" });
          console.log("success");
        }
      } catch (error) {
        enqueueSnackbar("Please try again !!", { variant: "error" });
        console.log(error);
      }
    } else {
      navigate("/getcategory");
        enqueueSnackbar("Product Added successfully !! ", {
          variant: "success",
        });
      try {
        const finalData: Data1 = {
          name: data.name,
          code: data.code,
          parent_id: data.parent ? data.parent.id : null,
        };

        const response2 = await post_catagory(finalData);

        if (response2) {
            enqueueSnackbar("successfully Added", { variant: "success" });
          console.log("success");
        }
      } catch (error) {
        enqueueSnackbar("Please try again !!", { variant: "error" });
        console.log(error);
      }
    }
  };

  const refresh = () => {
    window.location.reload();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        

<Card sx={{ minWidth: 100 ,alignItems:"center",
          justifyContent:"center",
          margin:"auto",
          marginTop:7,backgroundColor:"#E0F7FA",height:450,width:500}} >

      <CardContent  sx={{marginLeft:18,marginTop:4}} >



          <h1> Add Category</h1>

          <TextField
            variant="standard"
            placeholder="Enter Catagory name"
           
            type="text"
          
            // disabled={isDisabled}
            required
            {...register("name")}
          ></TextField>

          <TextField
            variant="standard"
            placeholder="Enter Catagory Code"
            margin="normal"
            // disabled={isDisabled}
            type="text"
            required
            {...register("code")}
          >
            {" "}
          </TextField>

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            // options={CategoryType}
            options={categories}
            value={watch("parent") || null}
            getOptionLabel={(option: any) => option.name}
            onChange={(event: any, newValue: any) => {
              debugger;
              setValue("parent", newValue);

              
            }}
            sx={{ width: 165, height: 45, marginTop: 3 }}
            renderInput={(params) => (
              <TextField {...params} label="Select Catagory" />
            )}
          />
          </CardContent>
          <CardActions sx={{justifyContent:"center"}}>
          {!isView && (
          <Button
            type="submit"
            variant="contained"
            value={showResults}
            color="warning"
            sx={{ marginTop: 4, borderRadius: 3,backgroundColor:"#2196F3" }}
            onClick={refresh}
          >
            {isEdit ? "Edit Category" : "Add Category"}
            {/* Add category */}
          </Button>
             )}
      </CardActions>

        {/* </Box> */}
        
        </Card>
      </form>
    </div>
  );
}
