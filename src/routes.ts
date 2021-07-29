import { Router } from 'express';
import { CreateUserController } from './controllers/CreateUserController';
import { CreateTagController } from './controllers/CreateTagController';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateComplimentController } from './controllers/CreateComplimentController';

import { ensureAdmin } from './middlewares/ensureAdmin';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import { ListUserSendComplimentsController } from './controllers/ListUserSendComplimentsController';
import { ListUserReceiveComplimentsController } from './controllers/ListUserReceiveComplimentsController';
import { ListTagsController } from './controllers/ListTagsController';
import { ListUsersController } from './controllers/ListUsersController';

const router = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const createTagController = new CreateTagController();
const listTagsController = new ListTagsController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();

router.post("/users", createUserController.handle);

router.get("/tags",
    ensureAuthenticated,
    listTagsController.handle
);

router.post("/tags",
    ensureAuthenticated,
    ensureAdmin,
    createTagController.handle
);

router.post("/login", authenticateUserController.handle);

router.post("/compliments",
    ensureAuthenticated,
    createComplimentController.handle
);

router.get("/users",
    ensureAuthenticated,
    listUsersController.handle
);

router.get("/users/compliments/send",
    ensureAuthenticated,
    listUserSendComplimentsController.handle
);

router.get("/users/compliments/receive",
    ensureAuthenticated,
    listUserReceiveComplimentsController.handle
);

export { router };