import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/sidebar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Link from "next/link";

import firebase from "../firebase/index";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { addCenter } from "./api";

const Add = () => {
  const [user, loading, error] = useAuthState(firebase.auth());
  const [state, setState] = useState({});
  const router = useRouter();

  const handleOnChange = (e) => {
    const { value } = e.target;
    setState({ ...state, [e.target.id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(state);
    addCenter(state)
      .then(() => {
        // alert("center added successfully");
        setState({ name: "", district: "", phone: "", address: "", pin: "" });
      })
      .catch((err) => {
        alert(err);
        console.log("adding content failed");
      });
  };

  if (loading) {
    return (
      <div style={{ widht: "100%", alignItems: "center", padding: "5em" }}>
        Loading...
      </div>
    );
  }
  if (user) {
    return (
      <div>
        <Sidebar />
        <Header />
        <div style={{ marginLeft: "250px", padding: "20px", height: "100%" }}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{ height: "100%" }}
          >
            <CardContent
              style={{
                width: "50em",
                padding: "20px",
                margin: "20px",
                backgroundColor: "#fafaff",
                borderRadius: "15px",
              }}
            >
              <h1 style={{ textAlign: "center", color: "#005" }}>
                {" "}
                ADD CENTER
              </h1>
              <TextField
                id="name"
                label="Center Name"
                style={{
                  width: "100%",
                  marginBottom: "20px",
                  background: "#fbfbff",
                }}
                value={state.name}
                onChange={(e) => handleOnChange(e)}
                variant="outlined"
              />
              <TextField
                id="address"
                multiline
                maxRows={4}
                label="Address"
                style={{
                  width: "100%",
                  marginBottom: "20px",
                  background: "#fbfbff",
                }}
                value={state.address}
                onChange={(e) => handleOnChange(e)}
                variant="outlined"
              />
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <TextField
                  id="district"
                  label="District"
                  style={{
                    width: "49%",
                    marginBottom: "20px",
                    background: "#fbfbff",
                  }}
                  value={state.district}
                  onChange={(e) => handleOnChange(e)}
                  variant="outlined"
                />
                <TextField
                  id="pin"
                  label="pin"
                  style={{
                    width: "49%",
                    marginBottom: "20px",
                    background: "#fbfbff",
                  }}
                  value={state.pin}
                  onChange={(e) => handleOnChange(e)}
                  variant="outlined"
                />
              </Grid>
              <TextField
                id="phone"
                label="Phone Number"
                style={{
                  width: "100%",
                  marginBottom: "20px",
                  background: "#fbfbff",
                }}
                value={state.phone}
                onChange={(e) => handleOnChange(e)}
                variant="outlined"
              />
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: "15px 0;" }}
                  onClick={handleSubmit}
                >
                  ADD
                </Button>
              </Grid>
            </CardContent>
          </Grid>
        </div>
      </div>
    );
  }
  if (user == null) {
    router.push({
      pathname: "/auth",
    });
    return (
      <div style={{ widht: "100%", alignItems: "center", padding: "5em" }}>
        {/* <Link href="/auth">
          <button style={{ margin: "0 auto" }}>Login</button>
        </Link> */}
        Loading...
      </div>
    );
  }
};

export default Add;
