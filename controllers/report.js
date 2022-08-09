const ejs = require("ejs");
const pdf = require("html-pdf");
const options = {
  format: "Letter",
  height: "10.5in",
  width: "8in",
  orientation: "portrait",
};
const Report = require("../models/ReportModel");
const converter = require("number-to-words");
// @route                       POST /api/v1/report
// @desc                        create report record in db
// @access                      Public
exports.create = async (req, res, next) => {
  try {
    const report = await Report.create({
      lr_num: req.body.lr_num,
      truck_no: req.body.truck_no,
      route: req.body.route,
      status: req.body.status,
      rate: req.body.rate,
      freight: req.body.freight,
      advance: req.body.advance,
      charges: req.body.charges,
      deduction: req.body.deduction,
      payment: req.body.payment,
      totalDue: req.body.totalDue,
    });
    if (!report) {
      return res.status(400);
    }
    res.status(201).json({
      status: "success",
      report,
    });
  } catch (err) {
    return next(err);
  }
};

// @route                       GET /api/v1/report
// @desc                        generate report
// @access                      Public
exports.createReport = async (req, res, next) => {
  try {
    const data = await Report.find({});
    let totalDues = 0;
    let freight = 0;
    let advance = 0;
    let charges = 0;
    let deduction = 0;
    let payment = 0;

    data.forEach((el) => {
      totalDues += el.totalDue;
      freight += el.freight;
      advance += el.advance;
      charges += el.charges;
      deduction += el.deduction;
      payment += el.payment;
    });

    const totalDue_in_words = converter.toWords(totalDues);

    const setHeader = res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment;filename=invoice.pdf`,
    });
    // console.log("HIHIOHIHIHIOIOH");
    ejs
      .renderFile(require.resolve("./table.ejs"), {
        report: data,
        totalDues,
        freight,
        advance,
        charges,
        payment,
        deduction,
        total_in_words: totalDue_in_words,
        bill_to: "John Doe",
        contact: "+91 7903385911",
      })
      .then((result) => {
        pdf.create(result, options).toStream((err, stream) => {
          stream.pipe(setHeader);
        });
      })
      .catch((err) => console.log(err));
  } catch (err) {
    next(err);
  }
};
