
import { Request, Response } from "express";
import { Octokit } from "octokit";

export class GitUser {
  async findGitUser(req: Request, res: Response, octokit: Octokit){
    
    try {
     const { data } = await octokit.request('GET /user');
     const { name, email } = data;
     
     return res.json({ name, email });

    } catch (error) {
      return res.json()
    }
  }
}
