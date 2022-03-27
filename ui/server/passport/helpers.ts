import emailService from "../services/EmailService/email.service";
import prisma from "../prisma";

export async function createOrGetUser({ email }: { email: string }) {
  const olderUser = await prisma.user.findUnique({ where: { email } });

  const newerUser = await prisma.user.upsert({
    create: {
      email,
      verifiedEmail: true,
    },
    update: {
      verifiedEmail: true,
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
