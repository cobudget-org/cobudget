import { createContext, useState, useEffect } from "react";
import { gql, useQuery, useSubscription, useMutation } from "urql";

export default createContext();

export const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteComment($bucketId: ID!, $commentId: ID!) {
    deleteComment(bucketId: $bucketId, commentId: $commentId) {
      id
      __typename
    }
  }
`;

export const COMMENTS_QUERY = gql`
  query Comments($bucketId: ID!, $from: Int, $limit: Int, $order: String) {
    commentSet(bucketId: $bucketId, from: $from, limit: $limit, order: $order) {
      total(bucketId: $bucketId, order: $order)
      comments(bucketId: $bucketId, order: $order) {
        id
        content
        htmlContent
        createdAt
        isLog
        collectionMember {
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
  mutation addComment($content: String!, $bucketId: ID!) {
    addComment(content: $content, bucketId: $bucketId) {
      id
      content
      htmlContent
      createdAt
      updatedAt
      collectionMember {
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
  mutation EditComment($bucketId: ID!, $commentId: ID!, $content: String!) {
    editComment(bucketId: $bucketId, commentId: $commentId, content: $content) {
      id
      content
      htmlContent
      createdAt
      updatedAt
      collectionMember {
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

export const useCommentContext = (initialInput) => {
  const [from, setFrom] = useState(initialInput.from);
  const [limit, setLimit] = useState(initialInput.limit);
  const [order, setOrder] = useState(initialInput.order);

  const [{ data, fetching: loading }] = useQuery({
    query: COMMENTS_QUERY,
    variables: { bucketId: initialInput.bucketId, from, limit, order },
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
  //   variables: { bucketId: initialInput.bucket.id },
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
    bucketId: initialInput.bucketId,
    collection: initialInput.collection,
    currentOrg: initialInput.currentOrg,
    currentUser: initialInput.currentUser,
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
