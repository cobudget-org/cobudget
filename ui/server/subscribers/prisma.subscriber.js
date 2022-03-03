/* eslint-disable no-unused-vars */
import { orgHasDiscourse } from "./discourse.subscriber";
import liveUpdate from "../services/liveUpdate.service";
import prisma from "../prisma";
const MIN_POST_LENGTH = 3;
export default {
  initialize(eventHub) {
    eventHub.subscribe(
      "create-bucket",
      "prisma",
      async ({ currentOrg, currentOrgMember, round, bucket, comment }) => {}
    );

    eventHub.subscribe(
      "create-comment",
      "prisma",
      async ({
        currentOrg,
        currentOrgMember,
        currentCollMember,
        round,
        bucket,
        comment: { content },
      }) => {
        if (orgHasDiscourse(currentOrg)) {
          return;
        }

        if (content.length < MIN_POST_LENGTH)
          throw new Error(
            `Your post needs to be at least ${MIN_POST_LENGTH} characters long!`
          );

        const comment = await prisma.comment.create({
          data: {
            bucketId: bucket.id,
            content,
            collMemberId: currentCollMember.id,
          },
        });

        // liveUpdate.publish("commentsChanged", {
        //   commentsChanged: { comment, action: "created" },
        // });

        return comment;
      }
    );

    eventHub.subscribe(
      "edit-comment",
      "prisma",
      async ({
        currentOrg,
        currentOrgMember,
        round,
        roundMember,
        bucket,
        comment,
      }) => {
        if (orgHasDiscourse(currentOrg)) {
          return;
        }

        const updatedComment = await prisma.comment.update({
          where: { id: comment.id },
          data: { content: comment.content },
        });

        // liveUpdate.publish("commentsChanged", {
        //   commentsChanged: { comment: updatedComment, action: "edited" },
        // });

        return updatedComment;
      }
    );

    eventHub.subscribe(
      "delete-comment",
      "prisma",
      async ({ currentOrg, currentCollMember, event, bucket, comment }) => {
        if (orgHasDiscourse(currentOrg)) {
          return;
        }
        if (!comment) return;

        if (comment.collMemberId !== currentCollMember.id) return;
        const deleted = await prisma.comment.delete({
          where: { id: comment.id },
        });

        return deleted;
      }
    );
  },
};
