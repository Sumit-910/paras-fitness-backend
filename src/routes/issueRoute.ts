import { Router } from "express";

import { issueController } from "../controllers/index";

const issueRoute=Router();

issueRoute.post('/issues',[],issueController.createIssue);
issueRoute.post("/issues",[],issueController.updateIssue);
issueRoute.post("/issues",[],issueController.deleteIssue);

export default issueRoute;