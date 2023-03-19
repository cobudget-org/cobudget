import Button from "components/Button";
import TextField from "components/TextField";
import { GRAPHQL_EXPENSE_COCREATOR_ONLY } from "../../../constants";
import { GRAPHQL_NOT_LOGGED_IN } from "../../../constants";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FormattedMessage, useIntl } from "react-intl";
import { gql, useMutation } from "urql";

const SUBMIT_EXPENSE = gql`
  mutation CreateExpense(
    $bucketId: String!
    $title: String!
    $recipientName: String!
    $recipientEmail: String!
    $swiftCode: String
    $iban: String
    $country: String!
    $city: String!
    $recipientAddress: String!
    $recipientPostalCode: String!
  ) {
    createExpense(
      bucketId: $bucketId
      title: $title
      recipientName: $recipientName
      recipientEmail: $recipientEmail
      swiftCode: $swiftCode
      iban: $iban
      country: $country
      city: $city
      recipientAddress: $recipientAddress
      recipientPostalCode: $recipientPostalCode
    ) {
      bucketId
      title
    }
  }
`;

function AddExpense({ bucketId, close }) {
  const intl = useIntl();

  const [{ fetching, error }, submitExpense] = useMutation(SUBMIT_EXPENSE);
  const { handleSubmit, register, errors } = useForm();
  const onSubmission = (variables) => {
    submitExpense({
      ...variables,
      bucketId,
    }).then((data) => {
      if (data.error?.message.indexOf(GRAPHQL_NOT_LOGGED_IN) > -1) {
        toast.error(
          intl.formatMessage({
            defaultMessage: "You need to login to submit an expense",
          })
        );
        return;
      } else if (
        data.error?.message.indexOf(GRAPHQL_EXPENSE_COCREATOR_ONLY) > -1
      ) {
        toast.error(
          intl.formatMessage({
            defaultMessage: "Only cocreators can add expense",
          })
        );
        return;
      }
      toast.success(intl.formatMessage({ defaultMessage: "Expense Added" }));
      close();
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 focus:outline-none flex-1 max-w-screen-sm">
      <form onSubmit={handleSubmit(onSubmission)}>
        <h1 className="text-xl font-semibold">
          <FormattedMessage defaultMessage="Submit Expense" />
        </h1>

        <TextField
          className="my-1"
          name="title"
          size="small"
          placeholder={intl.formatMessage({ defaultMessage: "Title" })}
          inputRef={register({
            required: "Required",
          })}
          autoFocus
          error={Boolean(errors.title)}
          helperText={errors.title?.message}
          testid="new-bucket-title-input"
        />

        <h2 className="text-xl font-semibold mt-2">
          <FormattedMessage defaultMessage="Payment Method" />
        </h2>

        <div className="flex flex-col sm:flex-row mt-2">
          <div className="mr-2 sm:my-0 flex-1">
            <TextField
              className="my-1"
              name="recipientName"
              size="small"
              placeholder={intl.formatMessage({
                defaultMessage: "Full name of recipient",
              })}
              inputRef={register({
                required: "Required",
              })}
              autoFocus
              error={Boolean(errors.recipientName)}
              helperText={errors.recipientName?.message}
              testid="new-bucket-title-input"
            />
          </div>
          <div className="mr-2 sm:my-0 flex-1">
            <TextField
              className="my-1"
              name="recipientEmail"
              size="small"
              placeholder={intl.formatMessage({
                defaultMessage: "Recipient Email",
              })}
              inputRef={register({
                required: "Required",
              })}
              autoFocus
              error={Boolean(errors.recipientEmail)}
              helperText={errors.recipientEmail?.message}
              testid="new-bucket-title-input"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row">
          <div className="mr-2 sm:my-0 flex-1">
            <TextField
              className="my-1"
              name="swiftCode"
              size="small"
              placeholder={intl.formatMessage({
                defaultMessage: "Bank code (BIC/SWIFT)",
              })}
              inputRef={register({
                required: "Required",
              })}
              autoFocus
              error={Boolean(errors.swiftCode)}
              helperText={errors.swiftCode?.message}
              testid="new-bucket-title-input"
            />
          </div>
          <div className="mr-2 sm:my-0 flex-1">
            <TextField
              className="my-1"
              name="iban"
              size="small"
              placeholder={intl.formatMessage({
                defaultMessage: "IBAN number",
              })}
              inputRef={register({
                required: "Required",
              })}
              autoFocus
              error={Boolean(errors.iban)}
              helperText={errors.iban?.message}
              testid="new-bucket-title-input"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row">
          <div className="mr-2 sm:my-0 flex-1">
            <TextField
              className="my-1"
              name="country"
              size="small"
              placeholder={intl.formatMessage({ defaultMessage: "Country" })}
              inputRef={register({
                required: "Required",
              })}
              autoFocus
              error={Boolean(errors.country)}
              helperText={errors.country?.message}
              testid="new-bucket-title-input"
            />
          </div>
          <div className="mr-2 sm:my-0 flex-1">
            <TextField
              className="my-1"
              name="city"
              size="small"
              placeholder={intl.formatMessage({ defaultMessage: "City" })}
              inputRef={register({
                required: "Required",
              })}
              autoFocus
              error={Boolean(errors.city)}
              helperText={errors.city?.message}
              testid="new-bucket-title-input"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row">
          <div className="mr-2 sm:my-0 flex-1">
            <TextField
              className="my-1"
              name="recipientAddress"
              size="small"
              placeholder={intl.formatMessage({
                defaultMessage: "Recipient Address",
              })}
              inputRef={register({
                required: "Required",
              })}
              autoFocus
              error={Boolean(errors.recipientAddress)}
              helperText={errors.recipientAddress?.message}
              testid="new-bucket-title-input"
            />
          </div>
          <div className="mr-2 sm:my-0 flex-1">
            <TextField
              className="my-1"
              name="recipientPostalCode"
              size="small"
              placeholder={intl.formatMessage({
                defaultMessage: "Postal Code",
              })}
              inputRef={register({
                required: "Required",
              })}
              autoFocus
              error={Boolean(errors.recipientPostalCode)}
              helperText={errors.recipientPostalCode?.message}
              testid="new-bucket-title-input"
            />
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button onClick={close} variant="secondary" className="mr-2">
            <FormattedMessage defaultMessage="Cancel" />
          </Button>
          <Button type="submit" loading={fetching}>
            <FormattedMessage defaultMessage="Save" />
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddExpense;
