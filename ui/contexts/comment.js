import { createContext, useState, useEffect } from "react";
import { gql, useQuery, useSubscription, useMutation } from "urql";

export default createContext();

export const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteComment($dreamId: ID!, $commentId: ID!) {
    deleteComment(dreamId: $dreamId, commentId: $commentId) {
      id
      __typename
    }
  }
`;

export const COMMENTS_QUERY = gql`
  query Comments($dreamId: ID!, $from: Int, $limit: Int, $order: String) {
    commentSet(dreamId: $dreamId, from: $from, limit: $limit, order: $order) {
      total(dreamId: $dreamId, order: $order)
      comments(dreamId: $dreamId, order: $order) {
        id
        content
        htmlContent
        createdAt
        isLog
        orgMember {
          id
          user {
            id
            username
            avatar
          }
        }
        __typename
      }
    }
  }
`;

const ADD_COMMENT_MUTATION = gql`
  mutation addComment($content: String!, $dreamId: ID!) {
    addComment(content: $content, dreamId: $dreamId) {
      id
      content
      htmlContent
      createdAt
      updatedAt
      orgMember {
        id
        user {
          id
          username
          avatar
        }
      }
      __typename
    }
  }
`;

const EDIT_COMMENT_MUTATION = gql`
  mutation EditComment($dreamId: ID!, $commentId: ID!, $content: String!) {
    editComment(dreamId: $dreamId, commentId: $commentId, content: $content) {
      id
      content
      htmlContent
      createdAt
      updatedAt
      orgMember {
        id
        user {
          id
          username
          avatar
        }
      }
      __typename
    }
  }
`;

const COMMENTS_CHANGED_SUBSCRIPTION = gql`
  subscription OnCommentChanged($dreamId: ID!) {
    commentsChanged(dreamId: $dreamId) {
      action
      comment {
        id
        content
        htmlContent
        createdAt
        orgMember {
          id
          user {
            id
            username
            avatar
          }
        }
      }
    }
  }
`;

export const useCommentContext = (initialInput) => {
  const [from, setFrom] = useState(initialInput.from);
  const [limit, setLimit] = useState(initialInput.limit);
  const [order, setOrder] = useState(initialInput.order);

  const [{ data, fetching: loading }] = useQuery({
    query: COMMENTS_QUERY,
    variables: { dreamId: initialInput.dream.id, from, limit, order },
    //notifyOnNetworkStatusChange: true,
  });

  const [, addComment] = useMutation(
    ADD_COMMENT_MUTATION
    //   {
    //   onCompleted(data) {
    //     const commentSet = {
    //       comments: comments.concat(data.addComment),
    //       total: total + 1,
    //     };
    //     updateQuery(() => ({ commentSet }));
    //     setComments(commentSet.comments);
    //     setTotal(commentSet.total);
    //   },
    // }
  );

  const [, editComment] = useMutation(
    EDIT_COMMENT_MUTATION
    //    {
    //   onCompleted(data) {
    //     const commentSet = {
    //       comments: comments.map((c) =>
    //         c.id === data.editComment.id ? data.editComment : c
    //       ),
    //       total,
    //     };
    //     updateQuery(() => ({ commentSet }));
    //     setComments(commentSet.comments);
    //     setTotal(commentSet.total);
    //   },
    // }
  );

  const [, deleteComment] = useMutation(
    DELETE_COMMENT_MUTATION
    //   {
    //   onCompleted(data) {
    //     const commentSet = {
    //       comments: comments.filter((c) => c.id !== data.deleteComment.id),
    //       total: total - 1,
    //     };
    //     updateQuery(() => ({ commentSet }));
    //     setComments(commentSet.comments);
    //     setTotal(commentSet.total);
    //   },
    // }
  );

  // useSubscription({
  //   query: COMMENTS_CHANGED_SUBSCRIPTION,
  //   variables: { dreamId: initialInput.dream.id },
  //   // onSubscriptionData: ({
  //   //   subscriptionData: {
  //   //     data: {
  //   //       commentsChanged: { comment, action },
  //   //     },
  //   //   },
  //   // }) => {
  //   //   switch (action) {
  //   //     case "created":
  //   //       setTotal(total + 1);
  //   //       setComments(comments.concat(comment));
  //   //       break;
  //   //     case "edited":
  //   //       setComments(comments.map((c) => (c.id === comment.id ? comment : c)));
  //   //       break;
  //   //     case "deleted":
  //   //       setTotal(total - 1);
  //   //       setComments(comments.filter((c) => c.id !== comment.id));
  //   //       break;
  //   //   }
  //   // },
  // });

  return {
    dream: initialInput.dream,
    event: initialInput.event,
    currentOrg: initialInput.currentOrg,
    currentOrgMember: initialInput.currentOrgMember,
    from,
    setFrom,
    limit,
    setLimit,
    order,
    setOrder,
    addComment,
    editComment,
    deleteComment,
    comments: data?.commentSet.comments ?? [],
    total: data?.commentSet.total ?? 0,
    loading,
  };
};
