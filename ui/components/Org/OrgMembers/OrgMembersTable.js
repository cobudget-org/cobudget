import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";

const ActionsDropdown = ({
  onlyOneAdmin,
  updateOrgMember,
  //deleteMember,
  member,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          disabled={onlyOneAdmin && member.isOrgAdmin}
          onClick={() => {
            updateOrgMember({
              variables: {
                memberId: member.id,
                isOrgAdmin: !member.isOrgAdmin,
              },
            }).then(() => {
              handleClose();
            });
          }}
        >
          {member.isOrgAdmin ? "Remove admin" : "Make admin"}
        </MenuItem>
        {/* how to also remove the user's event memberships when their org
            membership is removed?
        <MenuItem
          color="error.main"
          onClick={() => {
            if (
              confirm(
                `Are you sure you would like to delete org membership from user with email ${member.user.email}?`
              )
            )
              deleteMember({
                variables: { memberId: member.id },
              });
          }}
        >
          <Box color="error.main">Delete</Box>
        </MenuItem>*/}
      </Menu>
    </>
  );
};

const OrgMembersTable = ({ members, updateOrgMember, deleteMember }) => {
  const onlyOneAdmin =
    members.filter((member) => member.isOrgAdmin).length <= 1;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Bio</TableCell>
              <TableCell align="right">Role</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell component="th" scope="row">
                  {member.user.username}
                </TableCell>
                <TableCell component="th" scope="row">
                  {member.user.name}
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Box m="0 8px 0">{member.user.email}</Box>
                    {!member.user.verifiedEmail && (
                      <Tooltip title="Email not verified" placement="right">
                        <HelpOutlineOutlinedIcon fontSize="small" />
                      </Tooltip>
                    )}
                  </Box>
                </TableCell>
                <TableCell component="th" scope="row">
                  {member.bio}
                </TableCell>
                <TableCell align="right">
                  {member.isOrgAdmin && <span className="mr-2">Admin</span>}
                </TableCell>
                <TableCell align="right" padding="none">
                  <ActionsDropdown
                    member={member}
                    deleteMember={deleteMember}
                    updateOrgMember={updateOrgMember}
                    onlyOneAdmin={onlyOneAdmin}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrgMembersTable;
