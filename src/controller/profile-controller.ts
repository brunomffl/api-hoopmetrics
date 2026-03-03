import { ProfileService } from "@/services/profile-service";
import { Request, Response } from "express";

class ProfileController {

    private profileService: ProfileService;

    constructor(){
        this.profileService = new ProfileService();
    }

    async getProfile(req: Request, res: Response){
        const user_id = req.user.sub;

        return res.status(200).json(await this.profileService.getProfile(user_id));
    };

    async update(req: Request, res: Response){
        const user_id = req.user.sub;

        const { pfp_url } = req.body;

        if(pfp_url !== undefined){
            return res.status(200).json(await this.profileService.update(user_id, pfp_url));
        } else {
            return res.status(200).json({ message: "Nenhum dado foi atualizado." })
        }
    }
};

export { ProfileController };