import emailService from "../services/EmailService/email.service";
import prisma from "../prisma";

export async function createOrGetUser({
  email,
  facebookId,
}: {
  email: string;
  facebookId?: string;
}) {
  const olderUser = await prisma.user.findUnique({ where: { email } });

  if (
    olderUser.facebookId &&
    facebookId &&
    olderUser.facebookId !== facebookId
  ) {
    // something weird is going on, maybe best to error to be on the safe side
    throw new Error(
      "User trying to log in with a different facebook account attached to the same email"
    );
  }

  const newerUser = await prisma.user.upsert({
    create: {
      email,
      ...(facebookId && { facebookId }),
      verifiedEmail: true,
    },
    update: {
      verifiedEmail: true,
      ...(!olderUser.facebookId && facebookId && { facebookId }),
    },
    where: {
      email,
    },
  });

  // the user can join the app in two ways:
  // 1. they go to the website and sign up
  // 2. they get an invite to an group/coll from someone (when invited,
  // their User object is also created). that invite just
  // links them to the group/coll . then the user signs up like in case 1.
  // In both cases they end up here where we can send their welcome mail
  // (note that they also end up here when simply signing in)

  if (olderUser?.verifiedEmail !== newerUser.verifiedEmail) {
    // if true then it's a new user
    await emailService.welcomeEmail({ newUser: newerUser });
  }

  return newerUser;
}
