import { useEffect, useState } from "react";
import "../styles.css";
import "react-tippy/dist/tippy.css";
import { withUrqlClient, initUrqlClient } from "next-urql";
import { client } from "../graphql/client";
import Layout from "../components/Layout";
import Modal from "../components/Modal";
import { useQuery, gql } from "urql";
import { Toaster } from "react-hot-toast";
import FinishSignup from "components/FinishSignup";

export const TOP_LEVEL_QUERY = gql`
  query TopLevelQuery($collectionSlug: String, $orgSlug: String) {
    collection(orgSlug: $orgSlug, collectionSlug: $collectionSlug) {
      id
      slug
      info
      title
      archived
      color
      currency
      registrationPolicy
      visibility
      maxAmountToBucketPerUser
      bucketCreationCloses
      bucketCreationIsOpen
      grantingOpens
      grantingCloses
      grantingIsOpen
      numberOfApprovedMembers
      about
      allowStretchGoals
      requireBucketApproval
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
        isAdmin
        organization {
          id
          name
          slug
          logo
        }
      }
      collectionMemberships {
        id
        isAdmin
        isApproved
        collection {
          id
          title
          slug
          organization {
            id
            name
            slug
            logo
          }
        }
      }
      currentCollMember(orgSlug: $orgSlug, collectionSlug: $collectionSlug) {
        id
        isAdmin
        isModerator
        isApproved
        hasJoined
        balance
        collection {
          id
          title
        }
      }
      currentOrgMember(orgSlug: $orgSlug) {
        id
        bio
        isAdmin
        discourseUsername
        hasDiscourseApiKey
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
      data: { currentUser, currentOrg, collection } = {
        currentUser: null,
        currentOrg: null,
        collection: null,
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

  if (error) {
    console.error("Top level query failed:", error);
    return error.message;
  }

  const showFinishSignupModal = !!(currentUser && !currentUser.username);

  if (error) {
    console.error("Top level query failed:", error);
    return error.message;
  }

  return (
    <>
      <Modal
        active={modal}
        closeModal={closeModal}
        currentUser={currentUser}
        currentOrg={currentOrg}
      />
      <FinishSignup isOpen={showFinishSignupModal} currentUser={currentUser} />
      <Layout
        currentUser={currentUser}
        currentOrg={currentOrg}
        openModal={openModal}
        collection={collection}
        router={router}
        title={
          currentOrg
            ? collection
              ? `${collection.title} | ${currentOrg.name}`
              : currentOrg.name
            : collection
            ? collection.title
            : "Cobudget"
        }
      >
        <Component
          {...pageProps}
          collection={collection}
          currentUser={currentUser}
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
