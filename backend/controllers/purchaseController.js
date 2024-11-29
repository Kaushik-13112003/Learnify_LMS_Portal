const paypal = require("paypal-rest-sdk");
const purchaseModel = require("../models/purchaseModel");
const studentCoursesModel = require("../models/studentCoursesModel");
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
          paymentId: paymentInfo?._id,
          course: courseId,
        });

        await createNewPurchase.save();

        //find student update my_courses
        const findStudent = await userModel.findById(purchasedBy);

        if (!findStudent) {
          return res.status(404).json({ msg: "student not found" });
        }

        if (!findStudent.my_courses.includes(courseId)) {
          await userModel.findByIdAndUpdate(purchasedBy, {
            $push: {
              my_courses: courseId,
            },
          });
        } else {
          return res.status(400).json({
            msg: "course already purchased",
          });
        }

        //approve url
        // const approveURL = paymentInfo.links.find(
        //   (link) => link.rel === "approval_url"
        // ).href;

        return res.status(200).json({
          msg: "payment successfull",
          // approveURL: approveURL,
          // purchaseId: createNewPurchase._id,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const capturePurchaseController = async (req, res) => {
  try {
    const { id, paymentId, payerId } = req.body;

    //find whether payment exist or not
    const findPayment = await purchaseModel.findById(id);

    if (!findPayment) {
      return res.status(404).json({ msg: "payment not found" });
    }

    await purchaseModel.findByIdAndUpdate(id, {
      payment_status: "Paid",
      purchase_status: "Confirmed",
      payerId: payerId,
      paymentId: paymentId,
    });

    //now update students in particular course
    const studentCourses = await studentCoursesModel.findOne({
      studentId: findPayment.studentId,
    });

    if (studentCourses) {
      studentCourses.courses.push({
        courseId: findPayment.courseId,
        title: findPayment.courseTitle,
        instructorId: findPayment.instructorId,
        instructorName: findPayment.instructorName,
        dateOfPurchase: findPayment.purchase_date,
        courseImage: findPayment.courseImage,
        coursePrice: findPayment.coursePrice,
      });

      await studentCourses.save();
    } else {
      await studentCoursesModel.create({
        studentId: findPayment.studentId,
        courses: [
          {
            courseId: findPayment.courseId,
            title: findPayment.courseTitle,
            instructorId: findPayment.instructorId,
            instructorName: findPayment.instructorName,
            dateOfPurchase: findPayment.purchase_date,
            courseImage: findPayment.courseImage,
            coursePrice: findPayment.coursePrice,
          },
        ],
      });
    }

    //update students in course model
    await courseModel.findByIdAndUpdate(findPayment.courseId, {
      $addToSet: {
        students: {
          studentId: findPayment.studentId,
          studentName: findPayment.studentName,
          studentEmail: findPayment.studentEmail,
          paidAmount: findPayment.coursePrice,
        },
      },
    });

    return res
      .status(200)
      .json({ msg: "payment confirmed", paymentData: findPayment });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { makePurchaseController, capturePurchaseController };
