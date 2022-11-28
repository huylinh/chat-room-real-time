import services from "../services/services";

let getAllMessage = async (req, res) => {
  let data = await services.allMessage();
  //   console.log(data);
  return res.status(200).json({
    messages: data,
  });
};

module.exports = {
  getAllMessage,
};
