import React, { useEffect, useState } from "react";
import { final } from "../../web3Components/config";
import Navbar from "../Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import { useSignTypedData } from "@web3modal/react";

import "./Owner.css";
import { notifyError } from "../notification";
import { ethers } from "ethers";
const Signature = ({ passContract, chain_id, address, signer }) => {
  const [err, setErr] = useState("");
  const [form, setForm] = useState({ type: 0, to: "" });
  const [succ, setSucc] = useState("");
  const [id, setId] = useState("");
  const [c, setC] = useState(false);
  const [k, setK] = useState(false);

  const clip = async (x) => {
    if (x === 1) {
      await navigator.clipboard.writeText(succ);
      setC(true);
    } else if (x === 2) {
      await navigator.clipboard.writeText(id);
      setK(true);
    }
  };

  const createSignature = async () => {
    try {
      const SIGNING_DOMAIN_NAME = "REIGNLABS";
      const SIGNING_DOMAIN_VERSION = "1";
      class SignHelper {
        constructor(contractAddress, chainId, signer) {
          this.contractAddress = contractAddress;
          this.chainId = chainId;
          this.signer = signer;
        }
        async createSignature(id, _type, _address) {
          const obj = { id, _type, _address };
          // console.log(obj);
          const domain = await this._signingDomain();
          const types = {
            Struct: [
              { name: "id", type: "uint256" },
              { name: "_type", type: "uint256" },
              { name: "_address", type: "address" },
            ],
          };
          console.log(domain, types, obj);
          const signature = await this.signer._signTypedData(
            domain,
            types,
            obj
          );

          return { ...obj, signature };
        }
        async _signingDomain() {
          if (this._domain != null) {
            return this._domain;
          }
          const chainId = await this.chainId;
          this._domain = {
            name: SIGNING_DOMAIN_NAME,
            version: SIGNING_DOMAIN_VERSION,
            verifyingContract: this.contractAddress,
            chainId,
          };
          return this._domain;
        }
        static async getSign(
          contractAddress,
          chainId,
          uniqueId,
          _type,
          address
        ) {
          var lm = new SignHelper(contractAddress, chainId, signer);
          // console.log(lm);
          var v = await lm.createSignature(uniqueId, _type, address);
          return v;
        }
      }

      const new_id = Number(new Date().valueOf());
      const voucher = await SignHelper.getSign(
        final.passContractAddress,
        chain_id,
        new_id,
        form.type,
        form.to
      );

      console.log(voucher);
      setId(() => new_id);
      setSucc(() => voucher.signature);
    } catch (err) {
      console.log(err);
      notifyError(err?.message || "Something went Wrong");
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
        <Navbar></Navbar>
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
              Address To :
              <input
                onChange={(e) => {
                  setForm((y) => {
                    return { ...y, to: e.target.value };
                  });
                }}
                type="text"
              />
            </label>
          </div>
          <div style={{ textAlign: "center" }}>
            <button className="btn" onClick={createSignature}>
              {" "}
              Generate{" "}
            </button>
          </div>
          <div
            onClick={() => {
              clip(1);
            }}
            className="succ"
            style={{ width: "90vw" }}
          >
            {/* {`Signature: ${succ.slice(0, 15)}....${succ.slice(-15)} ${
            c ? "(COPIED)" : "(CLICK TO COPY)"
          }`} */}
            {`Signature: ${succ}`}
          </div>
          <div
            onClick={() => {
              clip(2);
            }}
            className="succ"
          >
            {/* {`Unique Id: ${id ? id : "-"} ${
            k ? "(COPIED)" : "(CLICK TO COPY)"
          }`} */}
            {`id: ${id}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signature;
