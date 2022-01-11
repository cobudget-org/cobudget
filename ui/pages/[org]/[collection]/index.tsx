import { useState } from "react";
import { useQuery, gql } from "urql";
import Link from "next/link";
import DreamCard from "../../../components/DreamCard";
import Filterbar from "../../../components/Filterbar";
import SubMenu from "../../../components/SubMenu";
import PageHero from "../../../components/PageHero";
import Button from "../../../components/Button";
import NewDreamModal from "../../../components/NewDreamModal";
import EditableField from "../../../components/EditableField";
import LoadMore from "../../../components/LoadMore";

export const BUCKETS_QUERY = gql`
  query Buckets(
    $collectionId: ID!
    $textSearchTerm: String
    $tag: String
    $offset: Int
    $limit: Int
  ) {
    bucketsPage(
      collectionId: $collectionId
      textSearchTerm: $textSearchTerm
      tag: $tag
      offset: $offset
      limit: $limit
    ) {
      moreExist
      buckets {
        id
        description
        summary
        title
        minGoal
        maxGoal
        income
        totalContributions
        noOfComments
        published
        approved
        canceled
        customFields {
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
        images {
          id
          small
          large
        }
      }
    }
  }
`;

const Page = ({
  variables,
  isLastPage,
  isFirstPage,
  onLoadMore,
  router,
  collection,
  org,
}) => {
  const { tag, s } = router.query;

  const [{ data, fetching, error }] = useQuery({
    query: BUCKETS_QUERY,
    variables: {
      collectionId: collection.id,
      offset: variables.offset,
      limit: variables.limit,
      ...(!!s && { textSearchTerm: s }),
      ...(!!tag && { tag }),
    },
  });

  const moreExist = data?.bucketsPage.moreExist;
  const buckets = data?.bucketsPage.buckets ?? [];

  if (error) {
    console.error(error);
  }

  return (
    <>
      {buckets.map((bucket) => (
        <Link
          href={`/${org?.slug ?? "c"}/${collection.slug}/${bucket.id}`}
          key={bucket.id}
        >
          <a className="flex focus:outline-none focus:ring rounded-lg">
            <DreamCard
              dream={bucket}
              collection={collection}
              currentOrg={org}
            />
          </a>
        </Link>
      ))}
      {isFirstPage && buckets.length === 0 && !fetching && (
        <div className="absolute w-full flex justify-center items-center h-64">
          <h1 className="text-3xl text-gray-500 text-center ">No buckets...</h1>
        </div>
      )}
      {isLastPage && moreExist && (
        <div className="absolute bottom-0 justify-center flex w-full">
          <LoadMore
            moreExist={moreExist}
            loading={fetching}
            onClick={() =>
              onLoadMore({
                limit: variables.limit,
                offset: variables.offset + buckets.length,
              })
            }
          />{" "}
        </div>
      )}
    </>
  );
};

const CollectionPage = ({ collection, router, currentOrg, currentUser }) => {
  const [newDreamModalOpen, setNewDreamModalOpen] = useState(false);
  const [pageVariables, setPageVariables] = useState([
    { limit: 12, offset: 0 },
  ]);
  const { tag, s } = router.query;

  if (!collection) return null;
  const canEdit =
    currentUser?.currentOrgMember?.isAdmin ||
    currentUser?.currentCollMember?.isAdmin;
  return (
    <div>
      <SubMenu currentUser={currentUser} collection={collection} />
      <PageHero>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="col-span-2">
            <EditableField
              value={collection.info}
              label="Add homepage message"
              placeholder={`# Welcome to ${collection.title}'s dream page`}
              canEdit={canEdit}
              name="info"
              className="h-10"
              MUTATION={gql`
                mutation EditHomepageMessage(
                  $collectionId: ID!
                  $info: String
                ) {
                  editCollection(collectionId: $collectionId, info: $info) {
                    id
                    info
                  }
                }
              `}
              variables={{ collectionId: collection.id }}
              required
            />
          </div>
          <div className="flex justify-end items-start">
            {collection.bucketCreationIsOpen &&
              currentUser?.currentCollMember?.isApproved && (
                <>
                  <Button
                    size="large"
                    color={collection.color}
                    onClick={() => setNewDreamModalOpen(true)}
                  >
                    New bucket
                  </Button>
                  {newDreamModalOpen && (
                    <NewDreamModal
                      collection={collection}
                      handleClose={() => setNewDreamModalOpen(false)}
                      currentOrg={currentOrg}
                    />
                  )}
                </>
              )}
          </div>
        </div>
      </PageHero>

      <div className="page flex-1">
        <Filterbar
          textSearchTerm={s}
          tag={tag}
          collection={collection}
          currentOrg={currentOrg}
        />
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 relative pb-20">
          {pageVariables.map((variables, i) => {
            return (
              <Page
                org={currentOrg}
                router={router}
                collection={collection}
                key={"" + variables.limit + i}
                variables={variables}
                isFirstPage={i === 0}
                isLastPage={i === pageVariables.length - 1}
                onLoadMore={({ limit, offset }) => {
                  setPageVariables([...pageVariables, { limit, offset }]);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
