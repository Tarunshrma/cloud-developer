import { Router, Request, Response } from 'express';
import {filterImageFromURL, deleteLocalFiles} from '../../util/util';


const router: Router = Router();

router.get("/", async (req, res)=>{

    let { image_url } = req.query;

    if(!image_url){
      res.status(422).send(`image_url query parameter is required`);
      return;
    }

    let filteredImage = await filterImageFromURL(image_url);
    res.send(filteredImage);
    
    //Send actual file as response.
    //res.sendfile(filteredImage);

   let localFiles = Array<string>();
   localFiles.push(filteredImage);
    //Clear local file
    await deleteLocalFiles(localFiles);
  });

export const ProcessImageRouter: Router = router;