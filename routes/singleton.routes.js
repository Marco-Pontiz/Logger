import {Routes} from "exporess";
import {getSingleton} from "../persistence/container/singleton.controller";

const router = Router();

router.get('/', getSingleton);

export default router;