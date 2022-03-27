import { useEffect, useState } from "react";
import { useQuery, gql } from "urql";
import Link from "next/link";
import BucketCard from "../../../components/BucketCard";
import Filterbar from "../../../components/Filterbar";
import SubMenu from "../../../components/SubMenu";
import PageHero from "../../../components/PageHero";
import Button from "../../../components/Button";
import NewBucketModal from "../../../components/NewBucketModal";
import EditableField from "../../../components/EditableField";
import LoadMore from "../../../components/LoadMore";
import getCurrencySymbol from "utils/getCurrencySymbol";
import { useRouter } from "next/router";
import HappySpinner from "components/HappySpinner";
import { HeaderSkeleton } from "components/Skeleton";

export const ROUND_QUERY = gql`
  query Round($roundSlug: String!, $groupSlug: String) {
    round(roundSlug: $roundSlug, groupSlug: $groupSlug) {
      id
      slug
      title
      info
      color
      bucketCreationIsOpen
      totalInMembersBalances
      currency
      tags {
        id
        value
      }
      bucketStatusCount {
        PENDING_APPROVAL
        OPEN_FOR_FUNDING
        FUNDED
        CANCELED
        COMPLETED
      }
    }
  }
`;

export const BUCKETS_QUERY = gql`
  query Buckets(
    $roundId: ID!
    $textSearchTerm: String
    $tag: String
    $offset: Int
    $limit: Int
    $status: [StatusType!]
  ) {
    bucketsPage(
      roundId: $roundId
      textSearchTerm: $textSearchTerm
      tag: $tag
      offset: $offset
      limit: $limit
      status: $status
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
  round,
  group,
  statusFilter,
}) => {
  const { tag, s } = router.query;

  const [{ data, fetching, error }] = useQuery({
    query: BUCKETS_QUERY,
    variables: {
      roundId: round?.id,
      offset: variables.offset,
      limit: variables.limit,
      status: statusFilter,
      ...(!!s && { textSearchTerm: s }),
      ...(!!tag && { tag }),
    },
    pause: !round,
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
          href={`/${group?.slug ?? "c"}/${round.slug}/${bucket.id}`}
          key={bucket.id}
        >
          <a className="flex focus:outline-none focus:ring rounded-lg">
            <BucketCard bucket={bucket} round={round} />
          </a>
        </Link>
      ))}

      {isFirstPage &&
        buckets.length === 0 &&
        (!fetching ? (
          <div className="absolute w-full flex justify-center items-center h-64">
            <h1 className="text-3xl text-gray-500 text-center ">
              No buckets...
            </h1>
          </div>
        ) : (
          <div className="absolute w-full flex justify-center items-center h-64">
            <HappySpinner />
          </div>
          // <div className="bg-white rounded-lg shadow-md animate-pulse overflow-hidden">
          //   <div className="bg-anthracit h-48"></div>
          //   <div className="animate-pulse flex space-x-4 p-4">
          //     <div className="flex-1 space-y-4 py-1">
          //       <div className="h-4 bg-gray-400 rounded w-3/4"></div>
          //       <div className="space-y-2">
          //         <div className="h-4 bg-gray-400 rounded"></div>
          //         <div className="h-4 bg-gray-400 rounded w-5/6"></div>
          //       </div>
          //     </div>
          //   </div>
          // </div>
        ))}
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

const stringOrArrayIntoArray = (stringOrArray) => {
  if (stringOrArray instanceof Array) return stringOrArray;
  return stringOrArray ? [stringOrArray] : [];
};

const getStandardFilter = (bucketStatusCount) => {
  let stdFilter = [];

  // if there is either pending or open for funding buckets, show those categories
  if (
    bucketStatusCount["PENDING_APPROVAL"] ||
    bucketStatusCount["OPEN_FOR_FUNDING"]
  ) {
    if (bucketStatusCount["PENDING_APPROVAL"])
      stdFilter.push("PENDING_APPROVAL");
    if (bucketStatusCount["OPEN_FOR_FUNDING"])
      stdFilter.push("OPEN_FOR_FUNDING");
  } else {
    // otherwise show every other
    const statusNames = Object.keys(bucketStatusCount);
    const values = Object.values(bucketStatusCount);
    stdFilter = statusNames
      .filter((status, i) => !!values[i])
      .filter((status) => status !== "__typename");
  }
  return stdFilter;
};

const RoundPage = ({ currentGroup, currentUser }) => {
  const [newBucketModalOpen, setNewBucketModalOpen] = useState(false);
  const [pageVariables, setPageVariables] = useState([
    { limit: 12, offset: 0 },
  ]);
  const router = useRouter();

  const [{ data, fetching }] = useQuery({
    query: ROUND_QUERY,
    variables: {
      roundSlug: router.query.round,
      groupSlug: router.query.group,
    },
    pause: !router.isReady,
  });
  const round = data?.round;

  const [bucketStatusCount, setBucketStatusCount] = useState(
    data?.round?.bucketStatusCount ?? {}
  );

  const { tag, s, f } = router.query;
  const [statusFilter, setStatusFilter] = useState(stringOrArrayIntoArray(f));

  useEffect(() => {
    setStatusFilter(stringOrArrayIntoArray(f));
  }, [f]);

  useEffect(() => {
    setBucketStatusCount(data?.round?.bucketStatusCount ?? {});
  }, [data]);

  // apply standard filter (hidden from URL)
  useEffect(() => {
    const filter = f ?? getStandardFilter(bucketStatusCount);
    setStatusFilter(stringOrArrayIntoArray(filter));
  }, [bucketStatusCount, f]);

  // if (!router.isReady || (fetching && !round)) {
  //   return (
  //     <div className="flex-grow flex justify-center items-center h-64">
  //       <HappySpinner />
  //     </div>
  //   );
  // }

  if (!round && !fetching && router.isReady) {
    return (
      <div className="text-center mt-7">
        This round either doesn&apos;t exist or you don&apos;t have access to it
      </div>
    );
  }

  const canEdit =
    currentUser?.currentGroupMember?.isAdmin ||
    currentUser?.currentCollMember?.isAdmin;
  return (
    <div>
      <SubMenu currentUser={currentUser} round={round} />
      <PageHero>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="col-span-2">
            {round ? (
              <EditableField
                defaultValue={round.info}
                name="info"
                label="Add homepage message"
                placeholder={`# Welcome to ${round.title}'s bucket page`}
                canEdit={canEdit}
                className="h-10"
                MUTATION={gql`
                  mutation EditHomepageMessage($roundId: ID!, $info: String) {
                    editRound(roundId: $roundId, info: $info) {
                      id
                      info
                    }
                  }
                `}
                variables={{ roundId: round.id }}
                required
              />
            ) : (
              <HeaderSkeleton />
            )}
          </div>
          <div className={`flex flex-col justify-end items-start`}>
            {round?.bucketCreationIsOpen &&
              currentUser?.currentCollMember?.isApproved &&
              currentUser?.currentCollMember?.hasJoined && (
                <>
                  <div className="p-3 mb-5 bg-gray-50 shadow-md rounded-md">
                    <p className="font-bold my-0.5">Funds available</p>
                    <div>
                      <table>
                        <tr>
                          <td className="pr-3">In your account</td>
                          <td className="font-bold">
                            {currentUser.currentCollMember.balance / 100}
                            {getCurrencySymbol(round.currency)}
                          </td>
                        </tr>
                        <tr>
                          <td className="pr-3">In this round</td>
                          <td className="font-bold">
                            {round.totalInMembersBalances / 100}
                            {getCurrencySymbol(round.currency)}
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>

                  <Button
                    size="large"
                    color={round.color}
                    onClick={() => setNewBucketModalOpen(true)}
                  >
                    New bucket
                  </Button>
                  {newBucketModalOpen && (
                    <NewBucketModal
                      round={round}
                      handleClose={() => setNewBucketModalOpen(false)}
                      currentGroup={currentGroup}
                    />
                  )}
                </>
              )}
          </div>
        </div>
      </PageHero>

      <div className="page flex-1">
        <Filterbar
          round={round}
          currentGroup={currentGroup}
          textSearchTerm={s}
          tag={tag}
          statusFilter={statusFilter}
          bucketStatusCount={bucketStatusCount}
        />
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 relative pb-20">
          {pageVariables.map((variables, i) => {
            return (
              <Page
                group={currentGroup}
                router={router}
                round={round}
                key={"" + variables.limit + i}
                variables={variables}
                isFirstPage={i === 0}
                isLastPage={i === pageVariables.length - 1}
                onLoadMore={({ limit, offset }) => {
                  setPageVariables([...pageVariables, { limit, offset }]);
                }}
                statusFilter={statusFilter}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RoundPage;
