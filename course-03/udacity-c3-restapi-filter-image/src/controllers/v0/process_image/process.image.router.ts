import { Router, Request, Response } from 'express';
import {filterImageFromURL, deleteLocalFiles} from '../../../util/util';


const router: Router = Router();

router.get("/", async (req: Request, res: Response)=>{

    let { image_url } = req.query;

    if(!image_url){
      res.status(422).send(`image_url query parameter is required`);
      return;
    }

    let filteredImage = await filterImageFromURL(image_url);
    
    //Send actual file as response.
   res.sendFile(filteredImage,async (error : Error) => {
      if(!error){
        let localFiles = Array<string>();
        localFiles.push(filteredImage);
         //Clear local file
         await deleteLocalFiles(localFiles);
      }
   });
  });

export const ProcessImageRouter: Router = router;