import express from "express";
import {
  roomCreate,
  getRoom,
  joinRoom,
  removePlayer,
} from "../controllers/RoomController.js";

const router = express.Router();

router.route("/make").post(roomCreate);
router.route("/get/:roomId").get(getRoom);
router.route("/entry").post(joinRoom);
router.route("/remove").post(removePlayer);

export default router;
