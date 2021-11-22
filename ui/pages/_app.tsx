import { useEffect, useState } from "react";
import "../styles.css";
import "react-tippy/dist/tippy.css";
import { withUrqlClient, initUrqlClient } from "next-urql";
import { client } from "../graphql/client";
import Layout from "../components/Layout";
import Modal from "../components/Modal";
import { useQuery, gql } from "urql";
import { Toaster } from "react-hot-toast";

export const TOP_LEVEL_QUERY = gql`
  query TopLevelQuery($collectionSlug: String, $orgSlug: String) {
    event(orgSlug: $orgSlug, collectionSlug: $collectionSlug) {
      id
      slug
      info
      title
      archived
      color
      currency
      registrationPolicy
      maxAmountToBucketPerUser
      bucketCreationCloses
      bucketCreationIsOpen
      grantingOpens
      grantingCloses
      grantingIsOpen
      numberOfApprovedMembers
      about
      allowStretchGoals
      bucketReviewIsOpen
      discourseCategoryId
      guidelines {
        id
        title
        description
        position
      }
      customFields {
        id
        name
        description
        type
        limit
        isRequired
        position
        createdAt
      }
      tags {
        id
        value
      }
    }
    currentUser {
      id
      username
      name
      avatar
      email
      orgMemberships {
        id
        organization {
          id
          name
          slug
        }
      }
    }
    currentOrgMember(orgSlug: $orgSlug) {
      id
      bio
      isOrgAdmin
      discourseUsername
      hasDiscourseApiKey
      user {
        id
        name
        username
        email
      }
      eventMemberships {
        id
        event {
          id
          title
          slug
        }
      }
      currentEventMembership(collectionSlug: $collectionSlug) {
        id
        isAdmin
        isGuide
        isApproved
        balance
        event {
          id
          title
        }
      }
    }

    currentOrg(orgSlug: $orgSlug) {
      __typename
      id
      name
      info
      logo
      slug
      customDomain
      discourseUrl
      finishedTodos
    }
  }
`;

const MyApp = ({ Component, pageProps, router }) => {
  const [
    {
      data: { currentUser, currentOrg, currentOrgMember, event } = {
        currentUser: null,
        currentOrg: null,
        currentOrgMember: null,
        event: null,
      },
      fetching,
      error,
    },
  ] = useQuery({
    query: TOP_LEVEL_QUERY,
    variables: {
      orgSlug: router.query.org,
      collectionSlug: router.query.collection,
    },
  });

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);
  });

  const [modal, setModal] = useState(null);

  const openModal = (name) => {
    if (modal !== name) setModal(name);
  };

  const closeModal = () => {
    setModal(null);
  };

  return (
    <>
      <Modal
        active={modal}
        closeModal={closeModal}
        currentOrgMember={currentOrgMember}
        currentUser={currentUser}
        currentOrg={currentOrg}
      />
      <Layout
        currentUser={currentUser}
        currentOrgMember={currentOrgMember}
        currentOrg={currentOrg}
        openModal={openModal}
        event={event}
        router={router}
        title={
          currentOrg
            ? event
              ? `${event.title} | ${currentOrg.name}`
              : currentOrg.name
            : "Cobudget"
        }
      >
        <Component
          {...pageProps}
          event={event}
          currentUser={currentUser}
          currentOrgMember={currentOrgMember}
          currentOrg={currentOrg}
          openModal={openModal}
          router={router}
        />
        <Toaster />
      </Layout>
    </>
  );
};

//@ts-ignore
export default withUrqlClient(client, { ssr: true })(MyApp as any);
