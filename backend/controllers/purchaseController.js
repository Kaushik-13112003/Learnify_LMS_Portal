const paypal = require("paypal-rest-sdk");
const purchaseModel = require("../models/purchaseModel");
const courseModel = require("../models/courseModel");
const userModel = require("../models/userModel");

// const makePurchaseController = async (req, res) => {
//   try {
//     const {
//       studentId,
//       studentEmail,
//       studentName,
//       instructorId,
//       instructorName,
//       courseId,
//       payment_status,
//       payment_method,
//       purchase_status,
//       purchase_date,
//       paymentId,
//       payerId,
//       coursePrice,
//       courseTitle,
//       courseImage,
//     } = req.body;

//     const create_payment_json = {
//       intent: "sale",
//       payer: {
//         payment_method: "paypal",
//       },
//       redirect_urls: {
//         return_url: `${process.env.CLIENT_URL}/payment-return`,
//         cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
//       },
//       transactions: [
//         {
//           item_lists: {
//             items: [
//               {
//                 name: courseTitle,
//                 sku: courseId,
//                 price: coursePrice,
//                 currency: "USD",
//                 quantity: 1,
//               },
//             ],
//           },
//           amount: {
//             currency: "USD",
//             total: coursePrice,
//           },
//           description: courseTitle,
//         },
//       ],
//     };

//     paypal.payment.create(create_payment_json, async (err, paymentInfo) => {
//       if (err) {
//         console.log(err);
//         return res.status(500).json({ msg: "something went wrong" });
//       } else {
//         const createNewPurchase = new purchaseModel({
//           studentId,
//           studentEmail,
//           studentName,
//           instructorName,
//           instructorId,
//           courseId,
//           payment_status,
//           payment_method,
//           purchase_status,
//           purchase_date,
//           paymentId,
//           payerId,
//           coursePrice,
//           courseTitle,
//           courseImage,
//         });

//         await createNewPurchase.save();

//         //approve url
//         const approveURL = paymentInfo.links.find(
//           (link) => link.rel === "approval_url"
//         ).href;

//         return res.status(200).json({
//           msg: "payment successfull",
//           approveURL: approveURL,
//           purchaseId: createNewPurchase._id,
//         });
//       }
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

const makePurchaseController = async (req, res) => {
  try {
    const { purchasedBy, instructor, courseId, coursePrice, courseTitle } =
      req.body;

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: `${process.env.CLIENT_URL}/payment-return`,
        cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
      },
      transactions: [
        {
          item_lists: {
            items: [
              {
                name: courseTitle,
                sku: courseId,
                price: coursePrice,
                currency: "USD",
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: "USD",
            total: coursePrice,
          },
          description: courseTitle,
        },
      ],
    };

    paypal.payment.create(create_payment_json, async (err, paymentInfo) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "something went wrong" });
      } else {
        const createNewPurchase = new purchaseModel({
          purchasedBy,
          instructor,
          paymentId: paymentInfo?.id,
          course: courseId,
        });

        await createNewPurchase.save();

        //approve url
        const approveURL = paymentInfo.links.find(
          (link) => link.rel === "approval_url"
        ).href;

        return res.status(200).json({
          // msg: "payment successfull",
          approveURL: approveURL,
          purchaseId: createNewPurchase._id,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const getPaymentController = async (req, res) => {
  const { purchasedBy, id, paymentId, payerId, purchaseId } = req.body;

  try {
    const execute_payment_json = {
      payer_id: payerId,
    };

    const purchase = await purchaseModel.findById(purchaseId);

    if (!purchase) {
      return res.status(404).json({ msg: "Purchase not found" });
    }

    //find student update my_courses
    const findStudent = await userModel.findById(purchasedBy);
    const findCourse = await courseModel.findById(id);

    if (!findStudent) {
      return res.status(404).json({ msg: "student not found" });
    }

    if (!findCourse) {
      return res.status(404).json({ msg: "student not found" });
    }

    if (!findStudent.my_courses.includes(id)) {
      await userModel.findByIdAndUpdate(purchasedBy, {
        $push: {
          my_courses: id,
        },
      });

      await courseModel.findByIdAndUpdate(id, {
        $push: {
          students: {
            studentId: findStudent._id,
            studentName: findStudent.name,
            studentEmail: findStudent.email,
            paidAmount: findCourse.pricing,
          },
        },
      });
    } else {
      return res.status(400).json({
        msg: "course already purchased",
      });
    }

    // Capture the payment
    paypal.payment.execute(
      paymentId,
      execute_payment_json,
      async (err, payment) => {
        if (err) {
          purchase.payment_status = "Failed"; // or whatever your status is
          purchase.paymentId = paymentId; // save the paymentId if needed
          await purchase.save();
          console.error(err);
          return res.status(500).json({ msg: "Payment execution failed" });
        } else {
          purchase.payment_status = "Completed"; // or whatever your status is
          purchase.paymentId = paymentId; // save the paymentId if needed
          await purchase.save();

          return res.status(200).json({ msg: "Payment successful" });
        }
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

module.exports = { makePurchaseController, getPaymentController };
