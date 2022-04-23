import Link from "next/link";
import { useQuery, gql } from "urql";

import { SlashIcon } from "../Icons";
import Selector from "./Selector";

const capLength = (title: string) =>
  title.length <= 30 ? title : title.substr(0, 30) + "...";

const GroupAndRoundHeader = ({
  currentGroup,
  round,
  currentUser,
  router,
  color,
  bucket,
}) => {
  return (
    <div className="flex items-center max-w-screen overflow-hidden">
      {process.env.SINGLE_GROUP_MODE !== "true" && (
        <Link href="/">
          <a className={`p-1 text-white rounded-md font-medium flex space-x-4`}>
            <img src="/cobudget-logo.png" className="h-6 max-w-none" />
            {!currentUser && !currentGroup && !round && (
              <h1 className="leading-normal">{process.env.PLATFORM_NAME}</h1>
            )}
          </a>
        </Link>
      )}

      {(currentGroup || round || currentUser) && (
        <>
          {process.env.SINGLE_GROUP_MODE !== "true" && (
            <SlashIcon className={`w-7 h-7 flex-none text-white opacity-25`} />
          )}

          {currentGroup ? (
            <Link
              href={`/${currentGroup.slug === "c" ? "" : currentGroup.slug}`}
            >
              <a
                className={
                  "px-2 py-1 rounded-md flex items-center group space-x-3 text-white truncate"
                }
              >
                {currentGroup.logo && (
                  <img
                    className="h-6 w-6 object-cover rounded opacity-75 group-hover:opacity-100 transition-opacity max-w-none"
                    src={currentGroup?.logo}
                  />
                )}
                <span className={`text-white font-medium truncate`}>
                  {capLength(currentGroup.name)}
                </span>
              </a>
            </Link>
          ) : round ? (
            <Link href={`/c/${round.slug}`}>
              <a
                className={
                  "flex-shrink px-2 py-1 rounded-md flex items-center group space-x-2 text-white font-medium truncate"
                }
              >
                {capLength(round.title)}
              </a>
            </Link>
          ) : null}
          {currentUser && process.env.SINGLE_GROUP_MODE !== "true" && (
            <Selector
              currentUser={currentUser}
              currentGroup={currentGroup}
              round={round}
              color={color}
              className="max-w-none"
            />
          )}
        </>
      )}

      {currentGroup && round && (
        <>
          <SlashIcon className={`w-7 h-7 flex-none text-white opacity-25`} />

          <Link href={`/${currentGroup?.slug ?? "c"}/${round.slug}`}>
            <a
              className={`px-2 py-1 text-white rounded-md mx-0 font-medium truncate`}
            >
              {capLength(round.title)}
            </a>
          </Link>
        </>
      )}
      {bucket && router.query?.bucket && (
        <>
          <SlashIcon
            className={`w-7 h-7 flex-none text-white opacity-25 hidden sm:block`}
          />

          <span
            className={
              "px-2 py-1 text-white rounded-md mx-0 font-medium truncate hidden sm:block"
            }
          >
            {capLength(bucket.title)}
          </span>
        </>
      )}
    </div>
  );
};

export default GroupAndRoundHeader;
