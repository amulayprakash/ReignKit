import React from "react";

function MintOptions({ description, title, features, price, src, mintPass }) {
  return (
    <div className="border-2 border-solid  w-[380px] min-[1600px]:w-[320px] m-5   flex-grow  bg-[#152C4A]">
      <video
        height="100px"
        width="400px"
        autoPlay
        muted
        className="object-cover   w-full p-8 "
      >
        <source src={src} type="video/mp4" />
      </video>

      <div className="description text-center mr-7 text-[#e0e0e0] font-normal text-[16px] ml-7">
        {description}
      </div>
      <div className="title m-7 font-normal text-white text-[20px] border-solid border-2 flex justify-between items-center  h-[100px] p-4">
        <div className="titletext w-[50%]">{`${title.toUpperCase()} FOUNDERS PASS`}</div>
        <div className="fee w-[40%]">4% SALES FEES</div>
      </div>
      <div className="font-normal text-[#e0e0e0] m-7">
        {features.map((e, l) => {
          return (
            <div key={l} className="item ">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  readOnly
                  checked
                  className="mb-5 p-3 bg-red-200 mt-5 border-0 bg-transparent text-transparent focus-within:hidden mr-5"
                />
                <label htmlFor="disabled-checked-checkbox" className="">
                  {e}
                </label>
              </div>
              <div className="divider h-[1px]   bg-[#bababa]"></div>
            </div>
          );
        })}
      </div>
      <div className="price font-medium text-white text-[67px]  font-beba m-5 text-center">
        {price} ETH
      </div>
      <div className="text-center m-auto mb-10 mintbtn w-[209px] h-[57px] m-5 flex justify-center items-center font-semibold text-[#9BE5FF] bg-gradient-to-bl to-[#9b3fc9] from-[#27198a]">
        <div onClick={mintPass} className="tes">
          {`${title.toUpperCase()}`} ELITE PASS
        </div>
      </div>
    </div>
  );
}

export default MintOptions;
