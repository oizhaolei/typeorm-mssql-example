import { faker } from "@faker-js/faker";
import { createConnection } from "typeorm";
import { Post } from "./entity/Post";
import { Category } from "./entity/Category";

// Note: The incoming request has too many parameters. The server supports a maximum of 2100 parameters. Reduce the number of parameters and resend the request.
const chunk = 10;
const repeat = 1000;
createConnection()
  .then(async (connection) => {
    const queryRunner = connection.createQueryRunner();

    await queryRunner.startTransaction();

    try {
      for (var i = 0; i < chunk; ++i) {
        const posts: Post[] = " "
          .repeat(repeat)
          .split("")
          .map(() => {
            const category1 = new Category();
            category1.name = faker.commerce.productName();

            const category2 = new Category();
            category2.name = faker.commerce.productName();

            const post = new Post();
            post.title = faker.commerce.productName();
            post.text = faker.commerce.productDescription();
            post.categories = [category1, category2];
            return post;
          });
        const saveResult = await queryRunner.manager.save(posts);
        console.log("Post has been saved: ", saveResult.length);
      }

      await queryRunner.commitTransaction();

      const countPost = await queryRunner.manager.count(Post);
      console.log("countPost:", countPost);
    } catch (err) {
      console.log("err:", err);

      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release();
    }
    process.exit();
  })
  .catch((error) => console.log("Error: ", error));
