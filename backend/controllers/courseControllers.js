const { v2 } = require("cloudinary");

const uploadMediaToCloudinary = async (req, res) => {
  try {
    const result = await v2.uploader.upload(req.file.path, {
      resource_type: "auto",
    });

    return res
      .status(200)
      .json({ msg: "uploaded successfully", result: result });
  } catch (err) {
    console.log(err);
  }
};

const deleteMediaToCloudinary = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({ msg: "Assest ID not found" });
    }

    await v2.uploader.destroy(id);
    return res.status(200).json({ msg: "" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { uploadMediaToCloudinary, deleteMediaToCloudinary };
