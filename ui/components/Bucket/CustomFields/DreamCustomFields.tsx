import { useQuery, gql } from "urql";
import { useRouter } from "next/router";

import DreamCustomField from "./DreamCustomField";

const CUSTOM_FIELDS_QUERY = gql`
  query CustomFields($orgSlug: String!, $collectionSlug: String!) {
    collection(orgSlug: $orgSlug, collectionSlug: $collectionSlug) {
      id
      customFields {
        id
        name
        description
        type
        limit
        isRequired
        position
      }
    }
  }
`;

const DreamCustomFields = ({
  customFields,
  canEdit,
  collectionId,
  bucketId,
}) => {
  const router = useRouter();
  const [{ data }] = useQuery({
    query: CUSTOM_FIELDS_QUERY,
    variables: {
      orgSlug: router.query.org,
      collectionSlug: router.query.collection,
    },
  });

  if (!data) {
    return null;
  }

  // TODO: can use the custom fields already fetched in the event query in _app
  const { customFields: defaultCustomFields } = data.collection;

  return (
    <div>
      {[...defaultCustomFields]
        .sort((a, b) => a.position - b.position)
        .map((defaultCustomField) => {
          const customField = customFields.filter(
            (field) => field.customField?.id == defaultCustomField.id
          );
          return (
            <DreamCustomField
              key={defaultCustomField.id}
              defaultCustomField={defaultCustomField}
              customField={
                customField && customField.length > 0 ? customField[0] : null
              }
              collectionId={collectionId}
              bucketId={bucketId}
              canEdit={canEdit}
            />
          );
        })}
    </div>
  );
};

export default DreamCustomFields;
