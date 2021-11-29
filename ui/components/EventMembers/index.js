import { useState } from "react";
import { useQuery, useMutation, gql } from "urql";

import Button from "../Button";
import InviteMembersModal from "../InviteMembersModal";
import LoadMore from "../LoadMore";

import MembersTable from "./MembersTable";
import RequestsToJoinTable from "./RequestToJoinTable";

export const EVENT_MEMBERS_QUERY = gql`
  query Members($eventId: ID!, $offset: Int, $limit: Int) {
    approvedMembersPage: membersPage(
      eventId: $eventId
      isApproved: true
      offset: $offset
      limit: $limit
    ) {
      moreExist
      approvedMembers: members(
        eventId: $eventId
        isApproved: true
        offset: $offset
        limit: $limit
      ) {
        id
        isAdmin
        isGuide
        isApproved
        createdAt
        balance
        orgMember {
          id
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
    }
    requestsToJoinPage: membersPage(eventId: $eventId, isApproved: false) {
      requestsToJoin: members(eventId: $eventId, isApproved: false) {
        id
        isAdmin
        isGuide
        isApproved
        createdAt
        balance
        orgMember {
          id
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
    }
  }
`;

const UPDATE_MEMBER = gql`
  mutation UpdateMember(
    $memberId: ID!
    $eventId: ID!
    $isAdmin: Boolean
    $isApproved: Boolean
    $isGuide: Boolean
  ) {
    updateMember(
      memberId: $memberId
      eventId: $eventId
      isAdmin: $isAdmin
      isApproved: $isApproved
      isGuide: $isGuide
    ) {
      id
      isAdmin
      isApproved
      isGuide
    }
  }
`;

const DELETE_MEMBER = gql`
  mutation UpdateMember($memberId: ID!, $eventId: ID!) {
    deleteMember(memberId: $memberId, eventId: $eventId) {
      id
    }
  }
`;

const EventMembers = ({ event }) => {
  const [
    {
      data: {
        approvedMembersPage: { moreExist, approvedMembers },
        requestsToJoinPage: { requestsToJoin },
      } = {
        approvedMembersPage: {
          approvedMembers: [],
        },
        requestsToJoinPage: {
          requestsToJoin: [],
        },
      },
      fetching: loading,
      error,
      fetchMore,
    },
  ] = useQuery({
    query: EVENT_MEMBERS_QUERY,
    //notifyOnNetworkStatusChange: true,
    variables: { eventId: event.id, offset: 0, limit: 1000 },
  });

  const [, updateMember] = useMutation(UPDATE_MEMBER);

  const [, deleteMember] = useMutation(DELETE_MEMBER, {
    variables: { eventId: event.id },
    update(cache, { data: { deleteMember } }) {
      const {
        approvedMembersPage: { approvedMembers },
        requestsToJoinPage: { requestsToJoin },
      } = cache.readQuery({
        query: EVENT_MEMBERS_QUERY,
        variables: { eventId: event.id },
      });

      cache.writeQuery({
        query: EVENT_MEMBERS_QUERY,
        variables: { eventId: event.id },
        data: {
          approvedMembersPage: {
            approvedMembers: approvedMembers.filter(
              (member) => member.id !== deleteMember.id
            ),
          },
        },
      });

      cache.writeQuery({
        query: EVENT_MEMBERS_QUERY,
        variables: { eventId: event.id },
        data: {
          requestsToJoinPage: {
            requestsToJoin: requestsToJoin.filter(
              (member) => member.id !== deleteMember.id
            ),
          },
        },
      });
    },
  });

  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  if (error) {
    console.error(error);
    return null;
  }

  return (
    <>
      <div className="page">
        <RequestsToJoinTable
          requestsToJoin={requestsToJoin}
          updateMember={updateMember}
          deleteMember={deleteMember}
        />

        <div className="flex justify-between mb-3 items-center">
          <h2 className="text-xl font-semibold">All collection members</h2>
          <div className="flex items-center space-x-2">
            <Button onClick={() => setInviteModalOpen(true)}>
              Invite members
            </Button>
            {inviteModalOpen && (
              <InviteMembersModal
                handleClose={() => setInviteModalOpen(false)}
                eventId={event.id}
              />
            )}
          </div>
        </div>

        <MembersTable
          approvedMembers={approvedMembers}
          updateMember={updateMember}
          deleteMember={deleteMember}
          event={event}
        />

        <LoadMore
          moreExist={moreExist}
          loading={loading}
          onClick={() =>
            fetchMore({ variables: { offset: approvedMembers.length } })
          }
        />
      </div>
    </>
  );
};

export default EventMembers;
