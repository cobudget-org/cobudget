import React from "react";
import PropTypes from "prop-types";
import { gql, useMutation } from "@apollo/client";
import { Button } from "reactstrap";
import { useRouter } from "next/router";
import getRealitiesApollo from "lib/realities/getRealitiesApollo";

const REMOVE_DEPENDENCY = gql`
  mutation RemoveDependency_removeResponsibilityDependsOnResponsibilitiesMutation(
    $from: _ResponsibilityInput!
    $to: _ResponsibilityInput!
  ) {
    removeResponsibilityDependsOnResponsibilities(from: $from, to: $to) {
      from {
        nodeId
        dependsOnResponsibilities {
          nodeId
          title
          fulfills {
            nodeId
          }
        }
      }
    }
  }
`;

const RemoveDependency = ({ nodeId }) => {
  const router = useRouter();
  const realitiesApollo = getRealitiesApollo();
  const [removeDependency, { loading }] = useMutation(REMOVE_DEPENDENCY, {
    client: realitiesApollo,
  });

  return (
    <Button
      size="sm"
      color="danger"
      disabled={loading}
      onClick={(e) => {
        e.stopPropagation();
        removeDependency({
          variables: {
            from: {
              nodeId: router.query.responsibilityId || router.query.needId,
            },
            to: { nodeId },
          },
        });
      }}
    >
      Remove
    </Button>
  );
};

RemoveDependency.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      needId: PropTypes.string,
      responsibilityId: PropTypes.string,
    }),
  }),
  nodeType: PropTypes.string,
  nodeId: PropTypes.string,
};

RemoveDependency.defaultProps = {
  match: {
    params: {
      needId: undefined,
      responsibilityId: undefined,
    },
  },
  nodeType: "Need",
  nodeId: "",
};

export default RemoveDependency;
