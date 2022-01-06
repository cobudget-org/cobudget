import { useForm } from "react-hook-form";
import { useMutation, gql } from "urql";
import toast from "react-hot-toast";
import { TextField, Button } from "@material-ui/core";
import Card from "../styled/Card";
import dirtyValues from "utils/dirtyValues";

const UPDATE_PROFILE_QUERY = gql`
  mutation updateProfile($username: String, $name: String) {
    updateProfile(username: $username, name: $name) {
      id
      email
      avatar
      username
      name
    }
  }
`;

const EditProfile = ({ closeModal, currentUser, currentOrg }) => {
  const [, updateUser] = useMutation(UPDATE_PROFILE_QUERY);
  const {
    handleSubmit,
    register,
    errors,
    formState: { isDirty, dirtyFields },
  } = useForm();
  return (
    <Card>
      <div className="p-5">
        <h1 className="text-2xl">Edit profile</h1>
        <form
          onSubmit={handleSubmit((variables) => {
            if (isDirty) {
              updateUser({
                ...(currentOrg && { orgId: currentOrg.id }),
                ...dirtyValues(dirtyFields, variables),
              }).then(({ error }) => {
                if (error) {
                  toast.error(error.message);
                } else {
                  closeModal();
                }
              });
            } else {
              closeModal();
            }
          })}
        >
          <div className="my-4">
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              defaultValue={currentUser.name}
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
              fullWidth
              inputRef={register({
                required: "Required",
              })}
            />
          </div>

          <div className="my-4">
            <TextField
              name="username"
              label="Username"
              variant="outlined"
              defaultValue={currentUser.username}
              error={Boolean(errors.username)}
              helperText={errors.username?.message}
              fullWidth
              inputRef={register({
                required: "Required",
              })}
            />
          </div>
          {/* {currentUser.currentOrgMember && (
            <div className="my-4">
              <TextField
                name="bio"
                label={`Bio for ${currentOrg.name}`}
                multiline
                rows={5}
                variant="outlined"
                defaultValue={currentUser.currentOrgMember.bio}
                error={Boolean(errors.bio)}
                helperText={errors.bio && errors.bio.message}
                fullWidth
                inputRef={register()}
              />
            </div>
          )} */}
          <div className="space-x-2 flex">
            <Button
              size="large"
              variant="contained"
              // color="secondary"
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="large"
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default EditProfile;
