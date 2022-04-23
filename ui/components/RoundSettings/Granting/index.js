import React from "react";
import { Modal, List, Divider } from "@material-ui/core";
import { gql } from "urql";

import { makeStyles } from "@material-ui/core/styles";
import dayjs from "dayjs";
import thousandSeparator from "utils/thousandSeparator";
import capitalize from "utils/capitalize";

import SettingsListItem from "./SettingsListItem";
import SetCurrency from "./SetCurrency";
import SetMaxAmountToBucket from "./SetMaxAmountToBucket";
import SetBucketCreationCloses from "./SetBucketCreationCloses";
import SetGrantingCloses from "./SetGrantingCloses";
import SetGrantingOpens from "./SetGrantingOpens";
import SetRequireBucketApproval from "./SetRequireBucketApproval";
import SetAllowStretchGoals from "./SetAllowStretchGoals";
import SetAbout from "./SetAbout";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    padding: theme.spacing(1),
    alignItems: "center",
    justifyContent: "center",
  },
  innerModal: {
    outline: "none",
    flex: "0 1 500px",
  },
}));

const modals = {
  SET_CURRENCY: SetCurrency,
  SET_BUCKET_CREATION_CLOSES: SetBucketCreationCloses,
  SET_GRANTING_OPENS: SetGrantingOpens,
  SET_GRANTING_CLOSES: SetGrantingCloses,
  SET_MAX_AMOUNT_TO_BUCKET: SetMaxAmountToBucket,
  SET_ALLOW_STRETCH_GOALS: SetAllowStretchGoals,
  SET_REQUIRE_BUCKET_APPROVAL: SetRequireBucketApproval,
  SET_ABOUT: SetAbout,
};

export const UPDATE_GRANTING_SETTINGS = gql`
  mutation updateGrantingSettings(
    $roundId: ID!
    $currency: String
    $maxAmountToBucketPerUser: Int
    $grantingOpens: Date
    $grantingCloses: Date
    $bucketCreationCloses: Date
    $allowStretchGoals: Boolean
    $requireBucketApproval: Boolean
  ) {
    updateGrantingSettings(
      roundId: $roundId
      currency: $currency
      maxAmountToBucketPerUser: $maxAmountToBucketPerUser
      grantingOpens: $grantingOpens
      grantingCloses: $grantingCloses
      bucketCreationCloses: $bucketCreationCloses
      allowStretchGoals: $allowStretchGoals
      requireBucketApproval: $requireBucketApproval
    ) {
      id
      currency
      maxAmountToBucketPerUser
      grantingOpens
      grantingCloses
      grantingIsOpen
      bucketCreationCloses
      bucketCreationIsOpen
      allowStretchGoals
      requireBucketApproval
    }
  }
`;

const RoundSettingsModalGranting = ({ round, currentGroup }) => {
  const [open, setOpen] = React.useState(null);

  const handleOpen = (modal) => {
    setOpen(modal);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const classes = useStyles();

  const ModalContent = modals[open];

  const canEditSettings = true;

  return (
    <div className="-mb-6">
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={Boolean(open)}
        onClose={handleClose}
        className="flex items-start justify-center p-4 sm:pt-24 overflow-y-scroll"
      >
        <div className={classes.innerModal}>
          {open && (
            <ModalContent
              round={round}
              closeModal={handleClose}
              currentGroup={currentGroup}
            />
          )}
        </div>
      </Modal>

      <h2 className="text-2xl font-semibold mb-3 px-6">Funding</h2>
      <div className="border-t">
        <List>
          <SettingsListItem
            primary="Currency"
            secondary={round.currency}
            isSet={round.currency}
            disabled={!round.bucketCreationIsOpen}
            openModal={() => handleOpen("SET_CURRENCY")}
            canEdit={canEditSettings}
            roundColor={round.color}
            classes="px-6"
          />

          <Divider />

          <SettingsListItem
            primary="Allow stretch goals"
            secondary={round.allowStretchGoals?.toString() ?? "false"}
            isSet={typeof round.allowStretchGoals !== "undefined"}
            openModal={() => handleOpen("SET_ALLOW_STRETCH_GOALS")}
            canEdit={canEditSettings}
            roundColor={round.color}
          />

          <Divider />

          <SettingsListItem
            primary={`Require moderator approval of ${process.env.BUCKET_NAME_PLURAL} before funding`}
            secondary={round.requireBucketApproval?.toString() ?? "false"}
            isSet={typeof round.requireBucketApproval !== "undefined"}
            openModal={() => handleOpen("SET_REQUIRE_BUCKET_APPROVAL")}
            canEdit={canEditSettings}
            roundColor={round.color}
          />

          <Divider />

          <SettingsListItem
            primary={`Max. amount to one ${process.env.BUCKET_NAME_SINGULAR} per user`}
            secondary={
              round.maxAmountToBucketPerUser
                ? `${thousandSeparator(round.maxAmountToBucketPerUser / 100)} ${
                    round.currency
                  }`
                : "Not set"
            }
            isSet={!!round.maxAmountToBucketPerUser}
            openModal={() => handleOpen("SET_MAX_AMOUNT_TO_BUCKET")}
            canEdit={canEditSettings}
            roundColor={round.color}
          />

          <Divider />

          <SettingsListItem
            primary={`${capitalize(
              process.env.BUCKET_NAME_PLURAL
            )} creation closes`}
            secondary={
              round.bucketCreationCloses
                ? dayjs(round.bucketCreationCloses).format(
                    "MMMM D, YYYY - h:mm a"
                  )
                : "Not set"
            }
            isSet={round.bucketCreationCloses}
            openModal={() => handleOpen("SET_BUCKET_CREATION_CLOSES")}
            canEdit={canEditSettings}
            roundColor={round.color}
          />

          <Divider />

          <SettingsListItem
            primary="Funding opens"
            secondary={
              round.grantingOpens
                ? dayjs(round.grantingOpens).format("MMMM D, YYYY - h:mm a")
                : "Not set"
            }
            isSet={round.grantingOpens}
            openModal={() => handleOpen("SET_GRANTING_OPENS")}
            canEdit={canEditSettings}
            roundColor={round.color}
          />

          <Divider />

          <SettingsListItem
            primary="Funding closes"
            secondary={
              round.grantingCloses
                ? dayjs(round.grantingCloses).format("MMMM D, YYYY - h:mm a")
                : "Not set"
            }
            isSet={round.grantingCloses}
            openModal={() => handleOpen("SET_GRANTING_CLOSES")}
            canEdit={canEditSettings}
            roundColor={round.color}
          />
        </List>
      </div>
    </div>
  );
};

export default RoundSettingsModalGranting;
