const data = [
  {
    description: "Founders Pass Reign Labs",
    name: "Basic Pass",
    image:
      "https://ipfs.io/ipfs/QmXijpbBYXjgRkYeSJDso1VcX28AYL9iDJBodeep6Nw6P7/1.webm",
    attributes: [
      {
        trait_type: "Type",
        value: "Basic",
      },
      {
        trait_type: "Sales Fee",
        value: "5%",
        display_type: "string",
      },
    ],
  },
  {
    description: "Founders Pass Reign Labs",
    name: "Elite Pass",
    image:
      "https://ipfs.io/ipfs/QmXijpbBYXjgRkYeSJDso1VcX28AYL9iDJBodeep6Nw6P7/2.webm",
    attributes: [
      {
        trait_type: "Type",
        value: "Elite",
      },
      {
        trait_type: "Sales Fee",
        value: "2%",
        display_type: "string",
      },
    ],
  },
  {
    description: "Founders Pass Reign Labs",
    name: "Pro Pass",
    image:
      "https://ipfs.io/QmXijpbBYXjgRkYeSJDso1VcX28AYL9iDJBodeep6Nw6P7/3.webm",
    attributes: [
      {
        trait_type: "Type",
        value: "Pro",
      },
      {
        trait_type: "Sales Fee",
        value: "0%",
        display_type: "string",
      },
    ],
  },
];

exports.returnJson = (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (id < 3 && id >= 0) {
      res.status(200).json(data[id]);
    } else {
      res.status(200).json({ message: "No such id present" });
    }
  } catch (err) {
    console.log(err);
  }
};
