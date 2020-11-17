import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@material-ui/core";
import { useRouter } from "next/router";
import { Tooltip } from "react-tippy";
//import useAuth from "hooks/useAuth";
import ProfileDropdown from "components/ProfileDropdown";
import Avatar from "components/Avatar";
import LoginModal from "components/LoginModal";
import { modals } from "components/Modal/index";
import { HomeIcon, DotsHorizontalIcon } from "components/Icons";
import EventSettingsModal from "components/EventSettingsModal";
import NewDreamModal from "components/NewDreamModal";
import IconButton from "components/IconButton";

import { useAuth } from "oidc-react";

const css = {
  mobileProfileItem:
    "mx-1 px-3 py-2 block text-gray-800 text-left rounded hover:bg-gray-200 focus:outline-none focus:shadow-outline",
};

const NavItem = ({
  onClick,
  href,
  as,
  currentPath = "",
  className,
  children,
  primary,
  eventColor,
}) => {
  const active = currentPath === href;

  const regularClasses = `border-transparent text-gray-800 hover:bg-gray-300`;
  const primaryClasses = `border-anthracit hover:bg-anthracit-darker hover:text-gray-200`;
  const regularEventClasses = `border-transparent text-white hover:bg-${eventColor}-darker`;
  const primaryEventClasses = `border-white text-white hover:bg-white hover:text-${eventColor}`;
  const eventActiveClasses = `border-transparent bg-${eventColor}-darker text-white`;

  const colorsClasses = eventColor
    ? primary
      ? primaryEventClasses
      : active
      ? eventActiveClasses
      : regularEventClasses
    : primary
    ? primaryClasses
    : regularClasses;

  const classes =
    "my-1 mx-1 px-3 py-1 sm:my-0 block rounded focus:outline-none font-medium transitions-colors transitions-opacity duration-75 border-2 " +
    colorsClasses +
    " " +
    className;

  if (Boolean(onClick)) {
    return (
      <button className={classes} onClick={onClick}>
        {children}
      </button>
    );
  }
  return (
    <Link href={href} as={as}>
      <a className={classes}>{children}</a>
    </Link>
  );
};

const Header = ({ event, currentUser, currentOrg, openModal, logOut }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [eventSettingsModalOpen, setEventSettingsModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [newDreamModalOpen, setNewDreamModalOpen] = useState(false);

  const auth = useAuth();

  console.log({ auth });

  const router = useRouter();
  return (
    <header
      className={
        (event?.color ? `bg-${event.color} shadow-md` : "") + " mb-8 w-full"
      }
    >
      <div>
        <button onClick={() => auth.signIn()}>Sign in</button>
        <button onClick={() => auth.signOut()}>Sign out</button>
        user: {auth?.userData?.profile.name}
        {/* <div>{`User is ${
          !keycloak.authenticated ? "NOT " : ""
        }authenticated`}</div>

        {!!keycloak.authenticated ? (
          <button
            type="button"
            onClick={() => {
              // keycloak.logout({
              //   redirectUri:
              //     "http://dispatch.localhost:3000/?redirect=http%3A%2F%2Fborderland.localhost%3A3000",
              // });
              keycloak.logout();
            }}
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => {
              // keycloak.login({
              //   redirectUri:
              //     "http://dispatch.localhost:3000/?redirect=http%3A%2F%2Fborderland.localhost%3A3000",
              // });
              keycloak.login();
            }}
          >
            log in
          </button>
        )} */}
      </div>
      <div className=" sm:flex sm:justify-between sm:items-center sm:py-2 px-2 md:px-4">
        <div className="flex items-center justify-between py-2 sm:p-0">
          <div className="flex items-center">
            {event ? (
              <>
                <Tooltip
                  title={currentOrg?.name ?? `See all events`}
                  position="bottom"
                  size="small"
                >
                  <div className="">
                    <Link href="/">
                      {currentOrg?.logo ? (
                        <a
                          className={
                            "block rounded overflow-hidden opacity-50 hover:opacity-100 transition-opacity duration-100"
                          }
                        >
                          <img className="h-7 w-7" src={currentOrg?.logo} />
                        </a>
                      ) : (
                        <a
                          className={
                            "block p-1 rounded-md " +
                            (event.color
                              ? `text-white opacity-75 hover:opacity-100 hover:bg-${event.color}-darker`
                              : "hover:bg-gray-200 text-gray-500 hover:text-gray-800")
                          }
                        >
                          <HomeIcon className="h-5 w-5 " />
                        </a>
                      )}
                    </Link>
                  </div>
                </Tooltip>

                <div className="group flex items-center">
                  <Link href="/[event]" as={`/${event.slug}`}>
                    <a
                      className={`hover:bg-${event.color}-darker px-2 py-1 text-white rounded-md mx-2 font-medium`}
                    >
                      <h1>{event.title}</h1>
                    </a>
                  </Link>
                  {(currentUser?.membership?.isAdmin ||
                    currentUser?.isOrgAdmin) && (
                    <>
                      <Tooltip
                        title="Event settings"
                        position="bottom"
                        size="small"
                      >
                        <IconButton
                          onClick={() => setEventSettingsModalOpen(true)}
                          className={
                            event.color
                              ? `text-white bg-${event.color} hover:bg-${event.color}-darker opacity-75 hover:opacity-100`
                              : "text-gray-500 hover:text-gray-800"
                          }
                        >
                          <DotsHorizontalIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      {eventSettingsModalOpen && (
                        <EventSettingsModal
                          event={event}
                          currentUser={currentUser}
                          handleClose={() => setEventSettingsModalOpen(false)}
                        />
                      )}
                    </>
                  )}
                </div>
              </>
            ) : (
              <Link href="/">
                <a className="flex">
                  {currentOrg?.logo && (
                    <img
                      className="h-7 w-7 block rounded overflow-hidden mr-4"
                      src={currentOrg.logo}
                    />
                  )}
                  <h1 className="text-lg font-medium text-gray-900 ">
                    {currentOrg?.name ?? "Dreams"}
                  </h1>
                </a>
              </Link>
            )}
          </div>

          <div className="sm:hidden">
            <button
              onClick={() => setMenuOpen(!isMenuOpen)}
              className={
                `p-1 my-1 block focus:outline-none rounded opacity-75 ` +
                (event?.color
                  ? `text-white hover:bg-${event.color}-darker focus:bg-${event.color}-darker focus:opacity-100`
                  : "text-gray-800 hover:bg-gray-200")
              }
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path
                    fillRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                ) : (
                  <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <nav
          className={` ${
            isMenuOpen ? "block" : "hidden"
          } -ml-3 -mr-3 min-w-full sm:m-0 sm:min-w-0 sm:block bg-${
            event?.color ? event.color : "gray-100"
          } sm:bg-transparent`}
        >
          <div className="py-2 sm:flex sm:p-0 sm:items-center">
            {currentUser ? (
              <>
                {event && (
                  <>
                    <NavItem
                      href="/[event]/about"
                      as={`/${event.slug}/about`}
                      currentPath={router.pathname}
                      eventColor={event.color}
                    >
                      About
                    </NavItem>
                    {(currentUser.membership?.isAdmin ||
                      currentUser.isOrgAdmin) && (
                      <>
                        <NavItem
                          href="/[event]/members"
                          as={`/${event.slug}/members`}
                          currentPath={router.pathname}
                          eventColor={event.color}
                        >
                          Members
                        </NavItem>
                      </>
                    )}

                    {currentUser.membership?.isApproved &&
                      event.dreamCreationIsOpen && (
                        <>
                          <NavItem
                            onClick={() => setNewDreamModalOpen(true)}
                            eventColor={event.color}
                            className="ml-2"
                            primary
                          >
                            New dream
                          </NavItem>
                          <NewDreamModal
                            open={newDreamModalOpen}
                            handleClose={() => setNewDreamModalOpen(false)}
                            event={event}
                          />
                        </>
                      )}

                    {currentUser && !currentUser.membership && (
                      <>
                        {event.registrationPolicy !== "INVITE_ONLY" && (
                          <NavItem
                            href="/[event]/register"
                            as={`/${event.slug}/register`}
                            currentPath={router.pathname}
                            eventColor={event.color}
                            primary
                          >
                            {event.registrationPolicy === "REQUEST_TO_JOIN"
                              ? "Request to join"
                              : "Join"}
                          </NavItem>
                        )}
                      </>
                    )}
                  </>
                )}

                {!event && currentUser.isOrgAdmin && (
                  <NavItem
                    primary
                    currentPath={router.pathname}
                    href="/create-event"
                  >
                    New event
                  </NavItem>
                )}

                <div className="hidden sm:block sm:ml-4">
                  <ProfileDropdown
                    currentUser={currentUser}
                    logOut={logOut}
                    openModal={openModal}
                    event={event}
                  />
                </div>
              </>
            ) : (
              <>
                {currentOrg && (
                  <>
                    <NavItem
                      onClick={() => setLoginModalOpen(true)}
                      eventColor={event?.color}
                      primary
                    >
                      Login or Sign up
                    </NavItem>
                    <LoginModal
                      open={loginModalOpen}
                      handleClose={() => setLoginModalOpen(false)}
                    />
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile view of profile dropdown contents above (i.e. all profile dropdown items are declared twice!)*/}
          {currentUser && (
            <div className="pt-4 pb-1 sm:hidden bg-white mb-4 border-gray-300">
              <div className="flex items-center px-3">
                <Badge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  badgeContent={
                    currentUser.membership &&
                    currentUser.membership.availableGrants
                  }
                  color="primary"
                >
                  <Avatar user={currentUser} />
                </Badge>
                <div className="ml-4">
                  <span className="font-semibold text-gray-600">
                    {currentUser.name}
                  </span>
                  {/* {currentUser.membership &&
                  Boolean(currentUser.membership.availableGrants) && (
                    <span className="block text-sm text-gray-600">
                      You have {currentUser.membership.availableGrants} grants
                      left
                    </span>
                  )} */}
                </div>
              </div>
              <div className="mt-2 flex flex-col items-stretch">
                {/* <Link href="/profile">
                <a className={css.mobileProfileItem}>Profile</a>
              </Link> */}
                <h2 className="px-4 text-xs my-1 font-semibold text-gray-600 uppercase tracking-wider">
                  Memberships
                </h2>
                {currentUser.membership && (
                  <div className="mx-2 px-2 py-1 rounded-lg bg-gray-200 mb-1 text-gray-800">
                    {currentUser.membership.event.title}
                    {Boolean(currentUser.membership.availableGrants) && (
                      <p className=" text-gray-800 text-sm">
                        You have {currentUser.membership.availableGrants} grants
                        left
                      </p>
                    )}
                  </div>
                )}
                {currentUser.memberships.map((membership) => {
                  if (
                    currentUser.membership &&
                    currentUser.membership.id === membership.id
                  ) {
                    return null;
                  }
                  return (
                    <Link
                      href="/[event]"
                      as={`/${membership.event.slug}`}
                      key={membership.id}
                    >
                      <a className={css.mobileProfileItem}>
                        {membership.event.title}
                      </a>
                    </Link>
                  );
                })}
                <hr className="my-2" />

                <button
                  onClick={() => {
                    openModal(modals.EDIT_PROFILE);
                  }}
                  className={css.mobileProfileItem}
                >
                  Edit profile
                </button>
                <button onClick={logOut} className={css.mobileProfileItem}>
                  Sign out
                </button>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
