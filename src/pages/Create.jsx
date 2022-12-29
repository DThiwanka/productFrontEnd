import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  makeStyles,
  TextField,
  Button,
  CircularProgress,
  Container,
  Grid,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { createProduct } from "./../actions/product";
import Navbar from "../components/Navbar";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "50ch",
    },
    buttonProgress: {
      color: "#fff",
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12,
    },
  },
}));

function Create() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.users?.loading);
  const [inputs, setInputs] = useState({
    sku: "",
    quantity: "",
    productname: "",
    image: "",
    productdesc: ""

  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    handleValidate(inputs);
  }, [inputs]);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    if (handleValidate(inputs)) {
      dispatch(createProduct(inputs, history));
    }
  }

  function handleValidate(values) {
    let errors = {};
    let isValid = true;
    if (!values["sku"]) {
      isValid = false;
      errors["sku"] = "Please enter SKU";
    }

    if (!values["quantity"]) {
      isValid = false;
      errors["quantity"] = "Please enter quantity.";
    }

    if (!values["productname"]) {
      isValid = false;
      errors["productname"] = "Please enter productname";
    }

    if (!values["image"]) {
      isValid = false;
      errors["image"] = "Please enter image";
    }

    if (!values["productdesc"]) {
      isValid = false;
      errors["productdesc"] = "Please productdesc";
    }

    setErrors(errors);
    return isValid;
  }

  return (
    <React.Fragment>
      <Navbar />
      <Container>
        <div style={{ display: "flex", textAlign: "center" }}>
          <div style={{ fontStyle: "normal", letterSpacing: "0.15em", fontSize: "36px", fontWeight: "900", marginBottom: "30px" }}>PRODUCTS > </div> Add New Product
        </div>
        <div style={{ textAlign: "center" }}>Create Prodct</div>
        <form
          className={classes.root}
          style={{
            display: "flex",
            
            flexDirection: "column",
          }}
          onSubmit={handleSubmit}
        >

          <Grid container spacing={5} justifyContent="space-evenly" > 
            <Grid item xs={6}>
              <div style={{ display: "flex", flexDirection: "row",}}>
              <p style={{marginRight:"30px"}}>SKU</p>
              <TextField
              variant="filled"
                type="text"
                name="sku"
                
                value={inputs.sku}
                onChange={handleChange}
                fullWidth
              />
              </div>
            </Grid>

            <Grid item xs={6}>
            

             
            </Grid>
            <Grid item xs={6}>

            <TextField
                type="text"
                variant="filled"
                name="quantity"
                label="Quantity"
                value={inputs.quantity}
                onChange={handleChange}
                fullWidth
              />

            
            </Grid>
            <Grid item xs={6}>
            <TextField
                type="text"
                variant="filled"
                name="image"
                label="Email"
                value={inputs.image}
                onChange={handleChange}
                fullWidth
              />

            
            </Grid>
          </Grid>

          <TextField
                type="text"
                variant="filled"
                name="productname"
                label="Email"
                value={inputs.productname}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                type="text"
                variant="filled"
                name="productdesc"
                label="Email"
                value={inputs.productdesc}
                onChange={handleChange}
                fullWidth
              />
              
              <Button
                disabled={loading}
                type="submit"
                variant="contained"
                color="primary"
              >
                Submit
              </Button>








          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </form>
      </Container>

    </React.Fragment>
  );
}

export default Create;