import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  makeStyles,
  TextField,
  Button,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { getProductById, updateProductById } from "../actions/product";

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
      <h1 style={{ textAlign: "center" }}>Update Product</h1>
      <form
        className={classes.root}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          name="sku"
          label="SKU"
          value={inputs.sku}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="quantity"
          label="Quentity"
          value={inputs.quantity}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="productname"
          label="Product Name"
          value={inputs.productname}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          name="image"
          label="Image"
          value={inputs.image}
          onChange={handleChange}
          fullWidth
        />


        <TextField
          name="productdesc"
          label="Product Desc"
          value={inputs.productdesc}
          onChange={handleChange}
          fullWidth
        />



        <Button

          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </form>
    </React.Fragment>
  );
}

export default Update;
