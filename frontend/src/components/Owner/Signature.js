import React, { useEffect, useState } from "react";
import { final } from "../../web3Components/config";
import Navbar from "../Navbar/Navbar";

import "./Owner.css";

const SIGNING_DOMAIN_NAME = "REIGNLABS";
const SIGNING_DOMAIN_VERSION = "1";

const Signature = ({ passContract, chain_id, address, signer }) => {
  const [err, setErr] = useState("");
  const [form, setForm] = useState({ type: "", to: "" });
  const [succ, setSucc] = useState("");
  const [c, setC] = useState(false);

  useEffect(() => {}, []);

  const createSignature = async () => {
    try {
      if (final.passContractAddress && chain_id && signer) {
        const obj = { type: form.type, to: form.to };
        const domain = {
          name: SIGNING_DOMAIN_NAME,
          version: SIGNING_DOMAIN_VERSION,
          verifyingContract: final.passContractAddress,
          chainId: chain_id,
        };
        const types = {
          Struct: [
            { name: "type", type: "uint256" },
            { name: "to", type: "string" },
          ],
        };
        console.log(obj, domain, types);
        const signature = await signer._signTypedData(domain, types, obj);
        console.log(signature);
        setSucc(() => signature);
        setForm((x) => {
          return { ...x, signature };
        });
      } else {
        setErr(() => "Something Went Wrong!!!");
      }
    } catch (err) {
      setErr(err?.message || "Something went Wrong");
    }
  };

  return (
    <div>
      <div className="bg-03">
        <Navbar></Navbar>
        <div className="form">
          <div>
            <label>
              Type :
              <input
                onChange={(e) => {
                  setForm((y) => {
                    return { ...y, type: Number(e.target.value) };
                  });
                }}
                type="text"
              />
            </label>
          </div>
          <div>
            <label>
              To :
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
          <div>
            <button className="btn" onClick={createSignature}>
              {" "}
              Generate{" "}
            </button>
          </div>
          <div className="err">
            <p>{err}</p>
          </div>
          <div
            onClick={() => {
              navigator.clipboard.writeText(succ);
              setC(true);
            }}
            className="succ"
          >{`${succ.slice(0, 15)}....${succ.slice(-15)} ${
            c ? "(COPIED)" : "(CLICK TO COPY)"
          }`}</div>
        </div>
      </div>
    </div>
  );
};

export default Signature;
