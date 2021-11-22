import { useForm } from "react-hook-form";
import { useMutation, gql } from "urql";
import Card from "components/styled/Card";
import { Box, Button, TextField } from "@material-ui/core";

const EDIT_EVENT = gql`
  mutation editEvent($eventId: ID!, $about: String) {
    editEvent(eventId: $eventId, about: $about) {
      id
      about
    }
  }
`;

export default ({ closeModal, event }) => {
  const [, editEvent] = useMutation(EDIT_EVENT);
  const { handleSubmit, register } = useForm();

  return (
    <Card>
      <Box p={3}>
        <h1 className="text-3xl">Set about</h1>
        <form
          onSubmit={handleSubmit((variables) => {
            editEvent({ ...variables, eventId: event.id })
              .then(() => {
                closeModal();
              })
              .catch((err) => {
                console.log({ err });
                alert(err.message);
              });
          })}
        >
          <Box m="15px 0">
            <TextField
              name="about"
              label="About (markdown)"
              defaultValue={event.about}
              inputRef={register}
              fullWidth
              multiline
              variant="outlined"
            />
          </Box>

          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </form>
      </Box>
    </Card>
  );
};
