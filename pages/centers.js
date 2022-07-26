import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/sidebar";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Link from "next/link";

import firebase from "../firebase/index";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import { deleteCenter } from "./api";

import MUIDataTable from "mui-datatables";

const Centers = () => {
  const db = firebase.firestore();

  const [user, loading, error] = useAuthState(firebase.auth());
  const router = useRouter();

  const [tempUser, setTempUser] = useState([]);
  const [userFlag, setUserFlag] = useState(0);

  useEffect(async () => {
    console.log("inside useEffect");
    const querySnapshot = await getDocs(collection(db, "centers"));
    const size = querySnapshot.size;
    var count = 0;
    var temp = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      // setUsers([...users, doc.data()]);
      // console.log(users);
      temp.push(doc.data());
      count++;
      if (count == size) {
        setUserFlag(1);
        // console.log(temp);
        // users.current = temp;
        setTempUser(temp);
      }
    });
  }, []);

  const columns = [
    {
      name: "name",
      label: "Center Name",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { textAlign: "left", fontWeight: 900, color: "#007" },
        }),
        setCellProps: () => ({ style: { alignItems: "center" } }),
      },
    },
    {
      name: "address",
      label: "Address",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { textAlign: "left", fontWeight: 900, color: "#007" },
        }),
        setCellProps: () => ({ style: { alignItems: "center" } }),
      },
    },
    {
      name: "district",
      label: "District",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { textAlign: "left", fontWeight: 900, color: "#007" },
        }),
        setCellProps: () => ({ style: { alignItems: "center" ,textAlign: "center"} }),
      },
    },
    {
      name: "pin",
      label: "Pincode",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { textAlign: "left", fontWeight: 900, color: "#007" },
        }),
        setCellProps: () => ({ style: { alignItems: "center",textAlign: "center"} }),
      },
    },
    {
      name: "phone",
      label: "Contact",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { textAlign: "left", fontWeight: 900, color: "#007" },
        }),
        setCellProps: () => ({ style: { alignItems: "center",textAlign: "center" } }),
      },
    },
    {
      name: "",
      label: "Actions",
      options: {
        setCellProps: () => ({ style: { alignItems: "center" ,textAlign:"center"} }),
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button
              color="error"
              style={{ textAlign: "center",alignItems: "center" }}
              startIcon={<DeleteIcon />}
              onClick={async () => {
                var temp = tempUser;
                // console.log(temp)
                temp.splice(tableMeta.rowIndex, 1);
                setUserFlag(0);
                await deleteCenter(tableMeta.rowData[0])
                  .then(() => {
                    setTempUser(temp);
                    console.log(
                      tableMeta.rowData,
                      "deleted value successfully"
                    );
                  })
                  .catch((err) => {
                    console.log("deleting value failed");
                  });
                setUserFlag(1);
              }}
            ></Button>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "checkbox",
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
          {userFlag == 0 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h5>Loading...</h5>
            </div>
          ) : (
            <div style={{ width: "100%" }}>
              {/* {JSON.stringify(tempUser)} */}

              {tempUser && (
                <MUIDataTable
                  title={""}
                  data={tempUser}
                  columns={columns}
                  // options={options}
                />
              )}
            </div>
          )}
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

export default Centers;
