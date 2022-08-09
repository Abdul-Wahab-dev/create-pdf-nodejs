const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSehema = new Schema(
  {
    lr_num: {
      type: String,
      required: [true, "lr number is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    truck_no: {
      type: String,
      required: [true, "truck no is required"],
    },
    route: {
      type: String,
      required: [true, "route is required"],
    },
    status: {
      type: String,
      required: [true, "status is required"],
    },
    rate: {
      type: String,
      required: [true, "rate is required"],
    },
    freight: {
      type: Number,
      required: [true, "freight is required"],
      default: 0,
    },
    advance: {
      type: Number,
      required: [true, "advance is required"],
      default: 0,
    },
    charges: {
      type: Number,
      required: [true, "charges is required"],
      default: 0,
    },
    deduction: {
      type: Number,
      required: [true, "deduction is required"],
      default: 0,
    },
    payment: {
      type: Number,
      required: [true, "payment is required"],
      default: 0,
    },
    totalDue: {
      type: Number,
      required: [true, "total is required"],
      default: 0,
    },
    currenct: {
      type: String,
      required: [true, "total is required"],
      default: "₹",
    },
  },
  { timestamps: true }
);

module.exports = Report = mongoose.model("Report", reportSehema);
