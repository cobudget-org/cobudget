import { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

import Button from "components/Button";
import HappySpinner from "components/HappySpinner";

import InviteMembersModal from "components/InviteMembersModal";

import OrgMembersTable from "./OrgMembersTable";

export const ORG_MEMBERS_QUERY = gql`
  query OrgMembers {
    orgMembers {
      id
      isOrgAdmin
      bio
      user {
        id
        name
        username
        email
        verifiedEmail
        avatar
      }
    }
  }
`;

const UPDATE_ORG_MEMBER = gql`
  mutation UpdateOrgMember($memberId: ID!, $isOrgAdmin: Boolean) {
    updateOrgMember(memberId: $memberId, isOrgAdmin: $isOrgAdmin) {
      id
      isOrgAdmin
    }
  }
`;

// // TODO: change to deleting org members, not event members
// const DELETE_MEMBER = gql`
//   mutation UpdateMember($memberId: ID!, $eventId: ID!) {
//     deleteMember(memberId: $memberId, eventId: $eventId) {
//       id
//     }
//   }
// `;

const OrgMembers = () => {
  const { data, loading, error } = useQuery(ORG_MEMBERS_QUERY);
  const orgMembers = data?.orgMembers;
  const [updateOrgMember] = useMutation(UPDATE_ORG_MEMBER);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  // const [deleteMember] = useMutation(DELETE_MEMBER, {
  //   variables: { eventId: event.id },
  //   update(cache, { data: { deleteMember } }) {
  //     const { members } = cache.readQuery({
  //       query: MEMBERS_QUERY,
  //       variables: { eventId: event.id },
  //     });

  //     cache.writeQuery({
  //       query: MEMBERS_QUERY,
  //       variables: { eventId: event.id },
  //       data: {
  //         members: members.filter((member) => member.id !== deleteMember.id),
  //       },
  //     });
  //   },
  // });

  if (error) {
    console.error(error);
    return null;
  }
  if (loading)
    return (
      <div className="flex-grow flex justify-center items-center">
        <HappySpinner />
      </div>
    );

  return (
    <div>
      <div className="flex justify-between mb-3 items-center">
        <h2 className="text-xl font-semibold">{orgMembers.length} members</h2>{" "}
        <div>
          <Button onClick={() => setInviteModalOpen(true)}>
            Invite members
          </Button>
          {inviteModalOpen && (
            <InviteMembersModal handleClose={() => setInviteModalOpen(false)} />
          )}
        </div>
      </div>

      <OrgMembersTable members={orgMembers} updateOrgMember={updateOrgMember} />
    </div>
  );
};

export default OrgMembers;
