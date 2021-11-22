import { useQuery, gql } from "urql";
import Head from "next/head";

import Dream from "../../../../components/Dream";
import HappySpinner from "../../../../components/HappySpinner";

export const DREAM_QUERY = gql`
  query Dream($id: ID!) {
    dream(id: $id) {
      id
      description
      summary
      title
      minGoal
      maxGoal
      income
      totalContributions
      totalContributionsFromCurrentMember
      approved
      published
      completed
      completedAt
      funded
      fundedAt
      canceled
      canceledAt
      noOfContributions
      latestContributions {
        id
        amount
        createdAt

        eventMember {
          id
          orgMember {
            id
            user {
              id
              name
              username
            }
          }
        }
      }
      tags {
        id
        value
      }
      raisedFlags {
        id
        comment
        guideline {
          id
          title
        }
      }
      customFields {
        id
        value
        customField {
          id
          name
          type
          limit
          description
          isRequired
          position
          createdAt
        }
      }
      cocreators {
        id
        orgMember {
          id
          user {
            id
            username
            avatar
          }
        }
      }
      images {
        id
        small
        large
      }
      discourseTopicUrl

      budgetItems {
        id
        description
        min
        max
        type
      }
    }
  }
`;

const DreamPage = ({
  event,
  currentUser,
  currentOrgMember,
  currentOrg,
  router,
}) => {
  const [
    { data: { dream } = { dream: null }, fetching: loading, error },
  ] = useQuery({ query: DREAM_QUERY, variables: { id: router.query.bucket } });

  if (dream)
    return (
      <div className="page">
        <Head>
          <title>
            {dream.title} | {event.title}
          </title>
        </Head>
        <Dream
          dream={dream}
          event={event}
          currentUser={currentUser}
          currentOrgMember={currentOrgMember}
          currentOrg={currentOrg}
        />
      </div>
    );

  if (loading)
    return (
      <div className="flex-grow flex justify-center items-center h-64">
        <HappySpinner />
      </div>
    );

  if (error) {
    console.error(error);
    return (
      <div className="flex-grow flex justify-center items-center">
        {error.message}
      </div>
    );
  }

  return (
    <div className="flex-grow flex flex-col justify-center items-center">
      <span className="text-4xl">404</span>
      <h1 className="text-2xl">Can&apos;t find this bucket...</h1>
    </div>
  );
};

export default DreamPage;
