import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const TokenBlacklist = mongoose.model("TokenBlacklist", blacklistTokenSchema);

export default TokenBlacklist;
