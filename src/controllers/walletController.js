const SkillWallet =
  require(
    "../models/SkillWallet"
  );

const getWallet =
  async (req, res) => {

    const wallet =
      await SkillWallet.findOne({
        user:
          req.user._id
      });

    res.json(wallet);
  };

module.exports = {
  getWallet
};