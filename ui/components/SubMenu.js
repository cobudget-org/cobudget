import { useRouter } from "next/router";
import Link from "next/link";

const orgItems = ({ currentOrgMember, orgSlug }) => {
  return [
    { label: "Overview", href: `/${orgSlug}` },
    // { label: "Realities", href: "/realities" },
    { label: "Members", href: `/${orgSlug}/members` },
    { label: "Settings", href: `/${orgSlug}/settings`, admin: true },
  ].filter((i) => (i.admin ? currentOrgMember?.isOrgAdmin : true));
};

export const eventItems = ({ orgSlug, currentOrgMember, event }) => {
  const isAdmin =
    currentOrgMember?.isOrgAdmin ||
    currentOrgMember?.currentEventMembership?.isAdmin;
  return [
    { label: "Overview", href: `/${orgSlug}/${event.slug}` },
    { label: "About", href: `/${orgSlug}/${event.slug}/about` },
    { label: "Members", href: `/${orgSlug}/${event.slug}/members` },
    {
      label: "Transactions",
      href: `/${event.slug}/transactions`,
      admin: true,
    },
    { label: "Settings", href: `/${event.slug}/settings`, admin: true },
  ].filter((i) => (i.admin ? isAdmin : true));
};

export default function SubMenu({ event, currentOrgMember, orgSlug }) {
  const router = useRouter();

  const items = event
    ? eventItems({
        event,
        currentOrgMember,
        orgSlug,
      })
    : orgItems({ currentOrgMember, orgSlug });

  const color = event?.color ?? "anthracit";

  // don't show the menu if the only option is the default page
  if (items.length === 1) return null;

  return (
    <div className="space-x-2 bg-white border-b border-b-default">
      <div className="max-w-screen-xl mx-auto flex px-2 md:px-4 overflow-x-auto">
        {items.map((item) => {
          return (
            <Link href={item.href} key={item.href}>
              <a
                className={`block px-2 py-4 border-b-2 font-medium transition-colors ${
                  item.href === router.asPath
                    ? `border-${color} text-${color}`
                    : "border-transparent text-gray-500"
                }`}
              >
                {item.label}
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
