import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "urql";
import { Tooltip } from "react-tippy";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";

import TextField from "components/TextField";
import Button from "components/Button";
import IconButton from "components/IconButton";
import { EditIcon } from "components/Icons";
import Markdown from "./Markdown";

const EditableField = ({
  defaultValue,
  label,
  canEdit,
  MUTATION,
  placeholder,
  variables,
  maxLength = undefined,
  required,
  className = "",
}) => {
  const [{ fetching: loading }, mutation] = useMutation(MUTATION);

  const schema = useMemo(() => {
    const maxInfo = yup.string().max(maxLength ?? Infinity, "Too long");
    return yup.object().shape({
      info: required ? maxInfo.required("Required") : maxInfo,
    });
  }, [maxLength, required]);

  const { handleSubmit, register, setValue, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    register({ name: "info" });
  }, [register]);

  if (editing)
    return (
      <form
        onSubmit={handleSubmit((vars) =>
          mutation({ ...variables, ...vars })
            .then(() => setEditing(false))
            .catch((err) => alert(err.message))
        )}
      >
        <TextField
          placeholder={placeholder}
          multiline
          rows={3}
          defaultValue={defaultValue}
          autoFocus
          error={errors.info}
          helperText={errors.info?.message}
          onChange={(e) => setValue("info", e.target.value)}
          className="mb-2"
          wysiwyg
        />
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-600 font-medium pl-4">
            <a
              href="https://www.markdownguide.org/cheat-sheet/"
              target="_/blank"
              className="text-blue-600 hover:text-blue-800"
            >
              Markdown
            </a>{" "}
            allowed
          </div>
          <div className="flex">
            <Button
              onClick={() => setEditing(false)}
              variant="secondary"
              className="mr-2"
            >
              Cancel
            </Button>
            <Button type="submit" loading={loading}>
              Save
            </Button>
          </div>
        </div>
      </form>
    );
  if (defaultValue)
    return (
      <div className="relative">
        <Markdown source={defaultValue} />
        {canEdit && (
          <div className="absolute top-0 right-0">
            <Tooltip title="Edit info" position="bottom" size="small">
              <IconButton onClick={() => setEditing(true)}>
                <EditIcon className="h-6 w-6" />
              </IconButton>
            </Tooltip>
          </div>
        )}
      </div>
    );

  return (
    <>
      {defaultValue ? (
        // this code is never reached?
        <Markdown source={defaultValue} />
      ) : (
        <button
          onClick={() => null}
          className={
            className +
            " block w-full text-gray-500 font-semibold rounded-lg border-3 border-dashed focus:outline-none focus:bg-gray-100 hover:bg-gray-100 mb-4"
          }
        >
          + {label}
        </button>
      )}
    </>
  );
};

export default EditableField;
