import express  from "express";
import { allOrderProfileController, forgotPasswordController, loginController, orderProfileController, orderStatusController, registerController, testController, updateProfileController } from '../controllers/authController.js'
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.post('/register',registerController)

router.post("/login", loginController);

router.post("/forgot-password", forgotPasswordController);

router.get("/test", requireSignIn, isAdmin, testController);


router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
  });

router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

router.put("/profile",requireSignIn,updateProfileController)


router.get("/user-orders",requireSignIn,orderProfileController)

router.get("/all-orders",requireSignIn,isAdmin,allOrderProfileController)

router.put("/order-status/:orderId",requireSignIn,isAdmin,orderStatusController)

export default router