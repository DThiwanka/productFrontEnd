import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  makeStyles,
  TextField,
  Button,
  Container,
  Grid,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { getProductById, updateProductById } from "../actions/product";
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

function Update() {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products?.item);
  const [inputs, setInputs] = useState({
    sku: "",
    quantity: "",
    productname: "",
    image: "",
    productdesc: ""
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setInputs(product);
    }
  }, [product]);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    if (!inputs.sku || !inputs.quantity || !inputs.productname || inputs.image || inputs.productdesc) {
      return;
    }
    dispatch(updateProductById(id, inputs, history));
  }

  return (
    <React.Fragment>
    <Navbar />
    <Container>
      <div style={{ display: "flex", textAlign: "center" }}>
        <div
          style={{
            fontStyle: "normal",
            letterSpacing: "0.15em",
            fontSize: "36px",
            fontWeight: "900",
            marginBottom: "30px",
          }}
        >
          PRODUCTS {" > "}
        </div>{" "}
        
        
        Update Product

      </div>
      {/* <div style={{ textAlign: "center" }}>Create Prodct</div> */}
      <form
        // className={classes.root}
        // style={{
        //   display: "flex",

        //   flexDirection: "column",
        // }}
        onSubmit={handleSubmit}
      >
        {/* <div style={{ display: "flex", flexDirection: "row" }}>
          <p>SKU</p>
          <TextField
            variant="filled"
            type="text"
            name="sku"
            value={inputs.sku}
            onChange={handleChange}
            fullWidth
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <div>
            <p>SKU</p>
            <TextField
              variant="filled"
              type="text"
              name="sku"
              value={inputs.sku}
              onChange={handleChange}
              fullWidth
            />
          </div>
          <div>
            <p>SKU</p>
            <TextField
              variant="filled"
              type="text"
              name="sku"
              value={inputs.sku}
              onChange={handleChange}
              fullWidth
            />
          </div>
        </div> */}

        <Grid container spacing={5}>
          <Grid item xs={6} style={{ paddingLeft: "0px" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <p style={{ marginRight: "40px", }}>SKU</p>
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

          <Grid item xs={6}></Grid>
          <Grid item xs={6} style={{ paddingLeft: "0px" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <p style={{ marginRight: "30px" }}>Name</p>
              <TextField
                type="text"
                variant="filled"
                name="productname"
                value={inputs.productname}
                onChange={handleChange}
                fullWidth
              />
            </div>
          </Grid>
          <Grid item xs={6} style={{ paddingLeft: "0px" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <p style={{ marginRight: "30px" }}>Quantity</p>
              <TextField
                type="text"
                variant="filled"
                name="quantity"
                value={inputs.quantity}
                onChange={handleChange}
                fullWidth
              />
            </div>
          </Grid>
          <Grid item xs={12} style={{ paddingLeft: "0px" }}>
            <p style={{ marginRight: "30px" }}>Product Description</p>
            <span>A small description about the product</span>
            <TextField
              type="text"
              variant="filled"
              multiline={10}
              name="productdesc"
              value={inputs.productdesc}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} style={{ paddingLeft: "0px" }}>
            <p style={{ marginRight: "30px" }}>Product Image</p>
            <span>Add Image</span>
            <TextField
              type="text"
              variant="filled"
              name="image"
              value={inputs.image}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} style={{ paddingLeft: "0px" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
            <p style={{ marginRight: "30px" }}>Product Images</p>
            <a style={{marginTop:"15px"}} href="">Add Images</a>
            </div>
           
            <span>JPEG, PNG, SVG or GIF</span>
            <br/>
            <span>{"(Maximum file size 50MB)"}</span>
            
            {/* <TextField
              type="text"
              variant="filled"
              multiline={10}
              name="productdesc"
              value={inputs.productdesc}
              onChange={handleChange}
              fullWidth
            /> */}
          </Grid>
          
        </Grid>
        

       <div align="right">
       <Button
          
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
       </div>

       

        
      </form>
    </Container>
  </React.Fragment>
  );
}

export default Update;
