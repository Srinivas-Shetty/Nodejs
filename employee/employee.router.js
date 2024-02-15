
const router=require('express').Router();
const { getallusers ,insertusers,updateusers,deleteusers,loginvalidates, tokengets,changepasswords,forgotpasswords} = require('./employee.controller');
const {tokenGenerator,authenticationToken} = require('../middleware/token');

router.get('/getall',getallusers);
router.post('/adduser',insertusers);
router.put('/updateuser',updateusers);
router.delete('/deleteuser',deleteusers);
router.post('/getuser',loginvalidates,tokenGenerator);
router.get('/gettoken',authenticationToken,tokengets);

router.put('/forgotpassword',forgotpasswords);


router.put('/updatepassword',changepasswords);

module.exports=router;
