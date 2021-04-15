import Samples from "../models/sample";

const sample = async (req, res, next) => {
  try {
    res.ok("sample");
  } catch (error) {
    next(error);
  }
};

export default { sample };
