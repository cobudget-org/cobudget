import fetch from "isomorphic-unfetch";
import forge from "node-forge";
import prisma from "../../server/prisma";
import getHostInfo from "utils/getHostInfo";

const atob = (a) => Buffer.from(a, "base64").toString("binary");

export default async function (req, res) {
  return null;
  const { query } = req;
  const { payload } = query;
  const pem = process.env.PRIVATE_TOKEN_KEY;
  const privKey = forge.pki.privateKeyFromPem(pem);

  const cleanPayload = payload.replace(/ /g, "");
  const cypherCode = atob(cleanPayload);
  const decryptedPayload = privKey.decrypt(cypherCode, "RSAES-PKCS1-V1_5");
  const parsedPayload = JSON.parse(decryptedPayload);

  const { key: discourseApiKey } = parsedPayload;

  // const { accessToken } = await auth(req).getAccessToken(req, res);
  // const { sub: userId } = jwt.decode(accessToken);

  // const db = await getConnection(process.env.MONGO_URL);
  // const { OrgMember, Organization } = getModels(db);

  const { subdomain, host } = getHostInfo(req);

  console.log({ DEPLOY_URL: process.env.DEPLOY_URL, host });

  let currentOrg;

  // if (host.includes(process.env.DEPLOY_URL)) {
  //   currentOrg = await Organization.findOne({ subdomain });
  // } else {
  //   currentOrg = await Organization.findOne({ customDomain: host });
  // }

  if (!currentOrg.discourse) throw new Error("Missing discourse config");

  // get discourse username
  const discourseUserResponse = await fetch(
    `${currentOrg.discourse.url}/session/current.json`,
    {
      headers: {
        "User-Api-Key": discourseApiKey,
        "Content-Type": "application/json",
      },
    }
  );

  const {
    current_user: { username },
  } = await discourseUserResponse.json();

  // save discourse user api key and username in database
  await OrgMember.update(
    { userId, organizationId: currentOrg.id },
    { discourseApiKey, discourseUsername: username }
  );

  // TODO: error handling

  res.writeHead(302, {
    Location: "/connect-discourse",
  });
  res.end();
}
