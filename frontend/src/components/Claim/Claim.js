import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { notifySuccess, notifyInfo, notifyError } from "./../notification";
import { ToastContainer } from "react-toastify";
import "./../Owner/Owner.css";

const Claim = ({ passContract, chain_id, address, signer }) => {
  const [form, setForm] = useState({ type: 0, id: "", sig: "" });

  const claimSignature = async () => {
    try {
      console.log(form.sig);
      notifyInfo("The transaction has started");
      const tx = await passContract.giveAwayPass(
        form.id,
        form.type,
        address,
        form.sig
      );
      const receipt = await tx.wait();
      console.log(receipt);

      notifySuccess(`Your Pass was minted successfully`);
    } catch (err) {
      notifyError("Something went wrong!");
    }
  };
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
        pauseOnHover
      />
      <div className="bg-03">
        <Navbar />
        <div className="form">
          <div>
            <label className="select">
              Type :
              <select
                onChange={(e) => {
                  setForm((x) => {
                    return { ...x, type: Number(e.target.value) };
                  });
                }}
              >
                <option value="0">Basic Pass</option>
                <option value="1">Elite Pass</option>
                <option value="2">Pro Pass</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              <span>Unique Id :</span>
              <input
                onChange={(e) => {
                  setForm((y) => {
                    return { ...y, id: Number(e.target.value) };
                  });
                }}
                type="text"
              />
            </label>
          </div>
          <div>
            <label>
              Signature :
              <input
                onChange={(e) => {
                  setForm((y) => {
                    return { ...y, sig: e.target.value };
                  });
                }}
                type="text"
              />
            </label>
          </div>
          <div style={{ textAlign: "center" }}>
            <button className="btn" onClick={claimSignature}>
              {" "}
              Claim{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Claim;
