import React, { useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import HappySpinner from "components/HappySpinner";
import createRealitiesApollo from "lib/realities/createRealitiesApollo";
import { REALITIES_CREATE_SUBSCRIPTION } from "lib/realities/subscriptions";

const GET_NEEDS = gql`
  query Needs {
    needs {
      nodeId
      title
      fulfilledBy {
        nodeId
        title
        realizer {
          nodeId
          name
        }
      }
    }
  }
`;

const CREATE_NEED = gql`
  mutation CreateNeed($title: String!) {
    createNeed(title: $title) {
      nodeId
      title
      fulfilledBy {
        nodeId
        title
        realizer {
          nodeId
          name
        }
      }
    }
  }
`;

const realitiesApollo = createRealitiesApollo();

const RealitiesPage = () => {
  const onServer = typeof window === "undefined";
  const { data, error, loading, subscribeToMore } = useQuery(GET_NEEDS, {
    skip: onServer,
    client: realitiesApollo,
  });
  const [createNeed, { mutError }] = useMutation(CREATE_NEED, {
    skip: onServer,
    client: realitiesApollo,
    update: (cache, { data: { createNeed: createNeedRes } }) => {
      const { needs } = cache.readQuery({ query: GET_NEEDS });

      const alreadyExists =
        needs.filter((need) => need.nodeId === createNeedRes.nodeId).length > 0;
      if (!alreadyExists) {
        cache.writeQuery({
          query: GET_NEEDS,
          data: { needs: [createNeedRes, ...needs] },
        });
      }
    },
  });

  useEffect(
    () =>
      subscribeToMore({
        document: REALITIES_CREATE_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const { realityCreated } = subscriptionData.data;

          if (realityCreated.__typename !== "Need") return prev;

          const alreadyExists =
            prev.needs.filter((need) => need.nodeId === realityCreated.nodeId)
              .length > 0;

          if (alreadyExists) return prev;
          return { needs: [realityCreated, ...prev.needs] };
        },
      }),
    [subscribeToMore]
  );

  if (error || mutError) {
    console.error("realities error", error, mutError);
    return "error";
  }
  if (loading) return <HappySpinner />;

  return (
    <div>
      <div>Needs & Resps:</div>
      <ul className="list-disc">
        {data?.needs.map((need) => {
          return (
            <React.Fragment key={need.nodeId}>
              <li>{need.title}</li>
              {need.fulfilledBy.map((resp) => {
                return (
                  <li key={resp.nodeId} className="ml-5">
                    {resp.title}
                  </li>
                );
              })}
            </React.Fragment>
          );
        })}
      </ul>
      <button
        className="mt-4 border-2 border-green-300"
        onClick={() =>
          createNeed({
            variables: { title: `New need ${~~(Math.random() * 1000)}` },
          })
        }
      >
        Create new need
      </button>
    </div>
  );
};

export default RealitiesPage;
