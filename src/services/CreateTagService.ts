import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";

interface ITagRequest {
  name: string;
}

class CreateTagService {
  async execute({ name }: ITagRequest) {
    const tagsRepositories = getCustomRepository(TagsRepositories)

    if (!name) {
      throw new Error("Tag Incorrect Name!")
    }

    const tagExists = await tagsRepositories.findOne({
      name
    })

    if (tagExists) {
      throw new Error("Tag Already exists!")
    }


    const tag = tagsRepositories.create({
      name,
    })
    await tagsRepositories.save(tag)
    return tag
  }
}
export { CreateTagService }