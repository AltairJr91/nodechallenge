import { Router } from "express";
import { UserController } from "./controller/UserController";
import { AuthUser } from "./controller/AuthTokenController";
import { GitUser } from "./controller/GituserController";
import { FileUploader } from "./controller/FileUploadController";
import { FileDownloader } from "./controller/FileDownloadController";

export const router = Router();

const fileUploader = new FileUploader;
const authUser = new AuthUser;
const usercontroller = new UserController;
const gitUser = new GitUser;
const FileDownload = new FileDownloader;

// Routes
router.post('/login',authUser.authenticate)
router.get('/readusers', usercontroller.readUser); 
router.post('/createnewuser', usercontroller.store); 
router.delete('/destroyuser',usercontroller.deleteUser);
router.put('/updateuser', usercontroller.updateUser);
router.get('/gituserlist', gitUser.findGitUser as any); // from github user api
router.post('/postfile', fileUploader.storeFile);// upload file
router.get('/downloadfile',FileDownload.downloadFile ); // download file