import axios from "axios";
import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Owner.css";
import { final } from "../../web3Components/config";

const MutateToken = () => {
  const [form, setForm] = useState({
    tokenId: 0,
    Status: 0,
  });
  const [err, setErr] = useState(null);

  console.log(form);

  const submit = async () => {
    setErr(() => "loading");
    try {
      const data = await axios.patch(`${final.url}/api/pass/mutatePass`, {
        t_id: form.tokenId,
        active: form.Status,
        password: "reignPrivate123@#*",
      });

      console.log(data);
      if (data.data.ok === false) {
        setErr(() => data.data.message);
      } else {
        setErr(
          () => `token ID : ${data.data.pass.token_id} status was updated`
        );
      }
    } catch (err) {
      console.log(err);
      setErr(err?.response?.data?.message || "Something Went Wrong!!!");
    }
  };

  return (
    <div>
      <div className="bg-02">
        <Navbar />
        <div className="form">
          <div>
            <label>
              Token Id:
              <input
                onChange={(e) => {
                  setForm((y) => {
                    return { ...y, tokenId: Number(e.target.value) };
                  });
                }}
                type="text"
              />
            </label>
          </div>
          <div>
            <label className="select">
              Status :
              <select
                onChange={(e) => {
                  setForm((x) => {
                    return { ...x, Status: Number(e.target.value) };
                  });
                }}
              >
                <option value="0">Inactive</option>
                <option value="1">Active</option>
                <option value="2">Expired</option>
              </select>
            </label>
          </div>
          <div>
            <button className="btn" onClick={() => submit()}>
              Save
            </button>
          </div>
          <div className="err">
            <p>{err}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MutateToken;