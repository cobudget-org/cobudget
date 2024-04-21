import prisma from "server/prisma";

export const markBucketAsFavorite = async ({
  bucketId,
  userId,
}: {
  bucketId: string;
  userId: string;
}) => {
  const bucket = await prisma.bucket.findUnique({ where: { id: bucketId } });
  const roundMembership = await prisma.roundMember.findFirst({
    where: {
      userId: userId,
      roundId: bucket.roundId,
      hasJoined: true,
      isApproved: true,
    },
  });
  if (!roundMembership) {
    throw new Error(
      "You are not member of this round. Join this round to mark buckets as favorite."
    );
  }
  try {
    await prisma.favoriteBucket.create({
      data: {
        bucketId,
        roundMemberId: roundMembership.id,
      },
    });
  } catch (err) {
    return err;
  }

  return bucket;
};

export const unmarkBucketAsFavorite = async ({
  bucketId,
  userId,
}: {
  bucketId: string;
  userId: string;
}) => {
  const bucket = await prisma.bucket.findUnique({ where: { id: bucketId } });
  const roundMembership = await prisma.roundMember.findUnique({
    where: {
      userId_roundId: {
        userId: userId,
        roundId: bucket.roundId,
      },
    },
  });

  await prisma.favoriteBucket.delete({
    where: {
      bucketId_roundMemberId: {
        bucketId: bucket.id,
        roundMemberId: roundMembership?.id,
      },
    },
  });

  return bucket;
};

export const isBucketFavorite = async ({
  bucketId,
  userId,
}: {
  bucketId: string;
  userId: string;
}) => {
  const bucket = await prisma.bucket.findUnique({ where: { id: bucketId } });
  const roundMembership = await prisma.roundMember.findUnique({
    where: {
      userId_roundId: {
        userId: userId,
        roundId: bucket.roundId,
      },
    },
  });

  const row = await prisma.favoriteBucket.findUnique({
    where: {
      bucketId_roundMemberId: {
        bucketId,
        roundMemberId: roundMembership?.id,
      },
    },
    select: {
      id: true,
    },
  });
  return !!row;
};

export const getStarredBuckets = async ({
  userId,
  take,
  skip,
}: {
  userId: string;
  take: number;
  skip: number;
}) => {
  const memberships = await prisma.roundMember.findMany({
    where: {
      userId,
    },
  });
  return prisma.favoriteBucket.findMany({
    where: {
      roundMemberId: {
        in: memberships.map((member) => member.id),
      },
    },
    take,
    skip,
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getStarredBucketsCount = async ({
  userId,
  take,
  skip,
}: {
  userId: string;
  take: number;
  skip: number;
}) => {
  const memberships = await prisma.roundMember.findMany({
    where: {
      userId,
      hasJoined: true,
      isApproved: true,
    },
  });
  return prisma.favoriteBucket.count({
    where: {
      roundMemberId: {
        in: memberships.map((member) => member.id),
      },
    },
  });
};
